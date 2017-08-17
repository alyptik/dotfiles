" File: workspace.vim
" Workspace manager for Vim
" Author: Yegappan Lakshmanan (yegappan AT yahoo DOT com)
" Version: 1.0 Beta 1
" Last Modified: 27th Nov 2005
"
" The workspace plugin allows you to easily access groups of frequently used
" files and run any command on a selected set of files from the workspace.
" 
" You can create one or more groups in a workspace. Each group can contain
" additional sub-groups. The workspace and the groups can contain one or more
" filenames.
" 
" The contents of a workspace are saved in a user specified file. This allows
" you to create multiple workspaces and to load the desired workspace when
" needed.
" 
" You can run any Vim ex command or an external shell command on a selected
" group of files from the workspace.
"
" For more information about using this plugin, after installing the
" workspace plugin, use the ":help workspace" command.
"
" Installation
" ------------
" 1. Download the workspace.zip file and unzip the files to the $HOME/.vim
"    or the $HOME/vimfiles or the $VIM/vimfiles directory. This should
"    unzip the following two files (the directory structure should be
"    preserved):
"
"       plugin/workspace.vim - main workspace plugin file
"       doc/workspace.txt    - documentation (help) file
"
"    Refer to the 'add-plugin', 'add-global-plugin' and 'runtimepath'
"    Vim help pages for more details about installing Vim plugins.
" 2. Change to the $HOME/.vim/doc or $HOME/vimfiles/doc or
"    $VIM/doc/vimfiles directory, start Vim and run the ":helptags ."
"    command to process the workspace help file.
" 3. If you are running a terminal/console version of Vim and the terminal
"    doesn't support changing the window width then set the 'Ws_Inc_Winwidth'
"    variable to 0 in the .vimrc file.
" 5. Restart Vim.
" 6. You can now use the ":WsOpen <filename>" command to open a workspace.
"    You can use the ":help workspace" command to get more information about
"    using the workspace plugin.
"
" ****************** Do not modify after this line ************************
"
if exists("loaded_workspace")
    finish
endif

" Line continuation used here
let s:cpo_save = &cpo
set cpo&vim

let loaded_work = 1

" Workspace filename
if !exists('Ws_File')
    let Ws_File = ''
endif

" Workspace window split (horizontal/vertical) control
if !exists('Ws_Use_Horiz_Window')
    let Ws_Use_Horiz_Window = 0
endif

" Open the vertically split workspace window on the left or on the right side.
" This setting is relevant only if Ws_Use_Horiz_Window is set to zero (i.e.
" only for vertically split windows)
if !exists('Ws_Use_Right_Window')
    let Ws_Use_Right_Window = 0
endif

" Increase Vim window width to display vertically split workspace window.  For
" MS-Windows version of Vim running in a MS-DOS window, this must be set to 0
" otherwise the system may hang due to a Vim limitation.
if !exists('Ws_Inc_Winwidth')
    if (has('win16') || has('win95')) && !has('gui_running')
        let Ws_Inc_Winwidth = 0
    else
        let Ws_Inc_Winwidth = 1
    endif
endif

" Vertically split workspace window width setting
if !exists('Ws_WinWidth')
    let Ws_WinWidth = 30
endif

" Horizontally split workspace window height setting
if !exists('Ws_WinHeight')
    let Ws_WinHeight = 10
endif

" Automatically open the workspace window on Vim startup
if !exists('Ws_Auto_Open')
    let Ws_Auto_Open = 0
endif

if !exists('Ws_Close_On_File_Select')
    let Ws_Close_On_File_Select = 0
endif

" Use single left mouse click to jump to a workspace. By default this is
" disabled.  Only double click using the mouse will be processed.
if !exists('Ws_Use_Single_Click')
    let Ws_Use_Single_Click = 0
endif

" Exit Vim if only the workspace window is currently open. By default, this is
" set to zero.
if !exists('Ws_Exit_Only_Window')
    let Ws_Exit_Only_Window = 0
endif

" Enable fold column to display the folding for the workspace tree
if !exists('Ws_Enable_Fold_Column')
    let Ws_Enable_Fold_Column = 1
endif

" Quote character for file names
if !exists("Ws_Quote_Char")
    if has("win32") || has("win16") || has("win95")
        let Ws_Quote_Char = '"'
    else
        let Ws_Quote_Char = "'"
    endif
endif

" Workspace modification indicator
let s:ws_modified = 0
" Name and type of the topmost entry
let s:ws_entry_name = 'Workspace'
let s:ws_entry_type = 'workspace'
" Number of entries in the workspace
let s:ws_entry_count = 0
" Are we displaying brief help text
let s:ws_brief_help = 1
" Vim window size is changed by the workspace plugin or not
let s:ws_winsize_chgd = 0
" Workspace window is maximized or not
let s:ws_win_maximized = 0
" Is workspace part of other plugins like winmanager?
let s:ws_app_name = "none"
" Deleted entry count
let s:ws_deleted_count = 0

" Do not change the name of the workspace title variable. The winmanager
" plugin relies on this name to determine the title for the workspace plugin.
let Workspace_title = "__Workspace__"

function! s:Ws_Warn_Msg(msg)
    echohl WarningMsg
    echomsg a:msg
    echohl none
endfunction

" Ws_Get_Entry_Idx_By_Line
" Return a command to set the prefix of the parent and the index for an
" a entry matching the specified line number
function! s:Ws_Get_Entry_Idx_By_Line(prefix, lnum)
    if a:lnum < s:ws_start_lnum
	return ''
    endif

    if a:lnum == s:ws_start_lnum
        return 'let prefix="s:ws_entry" | let idx=""'
    endif

    let ecount = {a:prefix}count
    let left = 0
    let right = ecount - 1

    while left <= right
	let mid = (right + left + 1) / 2
	let mid_lnum = {a:prefix}{mid}_lnum

        if a:lnum == mid_lnum
            let cmd = 'let prefix="' . a:prefix . '" |'
            let cmd = cmd . 'let idx = ' . mid
            return cmd
	endif

        if a:lnum > mid_lnum && {a:prefix}{mid}_type == 'group'
            if mid < ecount - 1
                let next_entry_lnum = {a:prefix}{mid + 1}_lnum
            else
                let next_entry_lnum = line('$') + 1
            endif
            if a:lnum < next_entry_lnum
                return s:Ws_Get_Entry_Idx_By_Line(a:prefix . mid . '_', a:lnum)
	    endif
	endif

        if mid_lnum > a:lnum
	    let right = mid - 1
	else
	    let left = mid
	endif
    endwhile

    return ''
endfunction

function! s:Ws_Display_Entry(prefix, index, indent)
    let entry_name = a:prefix . a:index . '_name'
    if !exists(entry_name)
        return
    endif

    if {a:prefix}{a:index}_type == 'file'
        let disp_name = fnamemodify({entry_name}, ':t')
    else
        let disp_name = {entry_name}
    endif

    put =a:indent . disp_name

    let {a:prefix}{a:index}_lnum = line('.')

    if {a:prefix}{a:index}_type == 'file'
        return
    endif

    let i = 0
    while i < {a:prefix}{a:index}_count
        let entry = a:prefix . a:index . '_'
        call s:Ws_Display_Entry(entry, i, a:indent . '  ')
        let i = i + 1
    endwhile

    " Define a fold for this group
    let fold_start = {a:prefix}{a:index}_lnum
    let fold_end = line('.')
    exe fold_start . ',' . fold_end . 'fold'
    exe 'silent! ' . fold_start . ',' . fold_end . 'foldopen!'
endfunction

" Ws_Display_Help()
function! s:Ws_Display_Help()
    " Display the help at the beginning of the buffer
    normal! gg

    if s:ws_brief_help
        " Add the brief help
        let help_txt = '" Press ? to display help text'
    else
        " Add the extensive help
        let help_txt =
          \  '" <enter> : Open file       o  : Open file in new window' . "\n" .
          \  '" ag : Add new group        af : Add new file(s)' . "\n" .
          \  '" ig : Insert new group     if : Insert new file(s)' . "\n" .
          \  '" yy : Copy entry           dd : Delete entry' . "\n" .
          \  '" p : Paste below           P  : Paste after'. "\n" .
          \  '" r  : Rename entry         s  : Save workspace' . "\n" .
          \  '" x  : Zoom window          q  : Close window' . "\n" .
          \  '" + : Open a fold           -  : Close a fold' . "\n" .
          \  '" * : Open all folds        =  : Close all folds' . "\n" .
          \  '" <space> : Display entry information' . "\n" .
          \  '" ? : Remove help text'
    endif

    silent! 0put! =help_txt
endfunction

" Ws_Toggle_Help_Text()
" Toggle the workspace help text between the full version and the brief
" version
function! s:Ws_Toggle_Help_Text()
    " Toggle between brief and full help text
    let s:ws_brief_help = !s:ws_brief_help

    call s:Ws_Refresh()
endfunction

function! s:Ws_Refresh()
    setlocal modifiable

    " Clear the highlighted file name
    match none

    let save_lnum = line('.')
    let save_col = col('.')

    silent! %delete _

    call s:Ws_Display_Help()

    " Display the workspace items after the help text
    normal! G

    " Display the workspace name at the top
    put =fnamemodify(g:Ws_File, ':p:t')
    let s:ws_start_lnum = line('.')

    let i = 0
    while i < s:ws_entry_count
        call s:Ws_Display_Entry('s:ws_entry_', i, '  ')
        let i = i + 1
    endwhile

    " Create a fold for the entire workspace
    exe 'silent! ' . (s:ws_start_lnum + 1) . ',$fold'
    exe 'silent! ' . s:ws_start_lnum . ',$foldopen!'

    if s:ws_app_name == "winmanager"
        " To handle a bug in the winmanager plugin, add a space at the
        " last line
        call append('$', ' ')
    endif

    " Restore the cursor
    call cursor(save_lnum, save_col)

    setlocal nomodifiable
endfunction

" Ws_Add_Group
function! s:Ws_Add_Group(parent_prefix, insert_idx, gname)
    if a:gname == '' || a:gname =~ '^\s\+$'
        return
    endif

    " Check whether the group is already present
    let i = 0
    while i < {a:parent_prefix}count
        if {a:parent_prefix}{i}_type == 'group' &&
		    \ {a:parent_prefix}{i}_name == a:gname
            call s:Ws_Warn_Msg('workspace: Group ' . a:gname .
			\ ' already exists')
            return
        endif
        let i = i + 1
    endwhile

    " Move all the entries below the current entry to make room for the
    " new group
    let i = {a:parent_prefix}count - 1
    while i >= a:insert_idx
	call s:Ws_Rename_Entry(a:parent_prefix, i, i + 1, '_')
	let i = i - 1
    endwhile

    let {a:parent_prefix}{a:insert_idx}_type = 'group'
    let {a:parent_prefix}{a:insert_idx}_name = a:gname
    let {a:parent_prefix}{a:insert_idx}_count = 0
    let {a:parent_prefix}{a:insert_idx}_lnum = 0

    let {a:parent_prefix}count = {a:parent_prefix}count + 1

    let s:ws_modified = 1
endfunction

" Ws_Add_Groups
" Add a new group at the current entry location or add it at the end of
" current group.
function! s:Ws_Add_Groups(args, append)
    " Get the current group
    let lnum = line('.')
    let cmd = s:Ws_Get_Entry_Idx_By_Line('s:ws_entry_', lnum)
    if cmd == ''
	" Add the new group at the end of the workgroup
        let prefix="s:ws_entry"
	let idx=""
    endif

    exe cmd
    if {prefix}{idx}_type == 'group' || {prefix}{idx}_type == 'workspace'
        " Cursor is on a group name. Add the new group to this group
        let prefix = prefix . idx . '_'
        let idx = 0
    endif

    let group_names = a:args

    if group_names == ''
        let group_names = input("Enter group name(s): ")
        if group_names == ''
            return
        endif
    endif

    let len = strlen(group_names)
    let start = 0
    let i = 0

    while start != -1 && start < len
        " Skip whitespace characters
        if group_names[start] =~ '\s'
            let start = matchend(group_names, '\s\+', start)
        endif

        if group_names[start] == "'"
            " Single-quoted group name
            let pat = "'[^']\\+'"
        elseif group_names[start] == '"'
            " Double-quoted group name
            let pat = '"[^"]\+"'
        else
            " Unquoted group name
            let pat = '.\{-}[^\\]\(\s\|$\)'
        endif

        let one_gname = matchstr(group_names, pat, start)
	let skip_pat = "['" . '"]\=\zs.\{-}\ze[' . "'" . '"]\=$'
        let one_gname = matchstr(one_gname, skip_pat)

        let start = matchend(group_names, pat, start)

        if one_gname != ''
	    if a:append
		call s:Ws_Add_Group(prefix, {prefix}count, one_gname)
	    else
		call s:Ws_Add_Group(prefix, idx + i, one_gname)
		let i = i + 1
	    endif
        endif
    endwhile

    call s:Ws_Refresh()
endfunction

" Ws_Rename_Group
" Rename the current group name
function! s:Ws_Rename_Group()
    " Get the current group
    let lnum = line('.')
    let cmd = s:Ws_Get_Entry_Idx_By_Line('s:ws_entry_', lnum)
    if cmd == ''
        return
    endif

    exe cmd
    if {prefix}{idx}_type != 'group'
        return
    endif

    let new_name = input("Enter new name for group '" .
                \ {prefix}{idx}_name . "'?")
    if new_name == ''
        return
    endif

    let {prefix}{idx}_name = new_name

    let s:ws_modified = 1

    call s:Ws_Refresh()
endfunction

" Ws_Add_File
" Add one file to the current group at the specified location
function! s:Ws_Add_File(parent_prefix, insert_idx, one_file)
    if a:one_file == '' || a:one_file =~ '^\s\+$'
        return
    endif

    let full_path = fnamemodify(a:one_file, ":p")

    " Check whether the file is already present
    let i = 0
    while i < {a:parent_prefix}count
        if {a:parent_prefix}{i}_type == 'file' &&
                    \ {a:parent_prefix}{i}_name == full_path
            call s:Ws_Warn_Msg('workspace: File ' . full_path .
                        \ ' already exists')
            return
        endif
        let i = i + 1
    endwhile

    let {a:parent_prefix}{a:insert_idx}_type = 'file'
    let {a:parent_prefix}{a:insert_idx}_name = full_path
    let {a:parent_prefix}{a:insert_idx}_lnum = 0

    let {a:parent_prefix}count = {a:parent_prefix}count + 1

    let s:ws_modified = 1
endfunction

" Ws_Add_Files
" Add one or more files to the current group in the workspace
function! s:Ws_Add_Files(args, append)
    " Get the current group
    let lnum = line('.')
    let cmd = s:Ws_Get_Entry_Idx_By_Line('s:ws_entry_', lnum)
    if cmd == ''
	" Add the new files at the end of the workgroup
        let prefix="s:ws_entry"
	let idx=""
    endif

    exe cmd
    if {prefix}{idx}_type == 'group' || {prefix}{idx}_type == 'workspace'
        " Cursor is on a group name. Add the new file to this group
        let prefix = prefix . idx . '_'
        let idx = 0
    endif

    let file_names = a:args

    if file_names == ''
        let file_names = input("Enter file name(s): ")
        if file_names == ''
            return
        endif
    endif

    let len = strlen(file_names)
    let start = 0
    let i = 0

    while start != -1 && start < len
        " Skip whitespace characters
        if file_names[start] =~ '\s'
            let start = matchend(file_names, '\s\+', start)
        endif

        if file_names[start] == "'"
            " Single-quoted file name
            let pat = "'[^']\\+'"
        elseif file_names[start] == '"'
            " Double-quoted file name
            let pat = '"[^"]\+"'
        else
            " Unquoted filename
            let pat = '.\{-}[^\\]\(\s\|$\)'
        endif

        " Extract one filename
        let fnames = matchstr(file_names, pat, start)
	let skip_pat = "['" . '"]\=\zs.\{-}\ze[' . "'" . '"]\=$'
        let fnames = matchstr(fnames, skip_pat)

        let start = matchend(file_names, pat, start)

        if fnames != ''
            let fnames = glob(fnames) . "\n"
            while fnames != ''
                let one_fname = strpart(fnames, 0, stridx(fnames, "\n"))
                if a:append
                    call s:Ws_Add_File(prefix, {prefix}count, one_fname)
                else
                    call s:Ws_Add_File(prefix, idx + i, one_fname)
                endif
                let i = i + 1
                let fnames = strpart(fnames, stridx(fnames, "\n") + 1)
            endwhile
        endif
    endwhile

    call s:Ws_Refresh()
endfunction

" Ws_Copy_Entry
" Copy a entry from one list to another list
function! s:Ws_Copy_Entry(src_prefix, src_idx, dst_prefix, dst_idx)
    let {a:dst_prefix}{a:dst_idx}_name = {a:src_prefix}{a:src_idx}_name
    let etype = {a:src_prefix}{a:src_idx}_type
    let {a:dst_prefix}{a:dst_idx}_type = etype

    if etype == 'group'
        let ecount = {a:src_prefix}{a:src_idx}_count
        let {a:dst_prefix}{a:dst_idx}_count = ecount
        let i = 0
        while i < ecount
            call s:Ws_Copy_Entry(a:src_prefix . a:src_idx . '_', i,
                        \ a:dst_prefix . a:dst_idx . '_', i)
            let i = i + 1
        endwhile
    endif
endfunction

" Ws_Paste_Entry
function! s:Ws_Paste_Entry(before)
    if s:ws_deleted_count <= 0
        " Nothing to paste
        return
    endif

    " Get the current entry
    let lnum = line('.')
    let cmd = s:Ws_Get_Entry_Idx_By_Line('s:ws_entry_', lnum)
    if cmd == ''
        return
    endif

    exe cmd

    if {prefix}{idx}_type == 'workspace'
        if a:before
            " Cannot paste entries before the workspace
            return
        endif
        let prefix = 's:ws_entry_'
        let paste_idx = 0
    elseif {prefix}{idx}_type == 'group' && !a:before
        " If the cursor on a group name and we are about to paste
        " below, then paste into the group
        let prefix = prefix . idx . '_'
        let paste_idx = 0
    else
        if a:before
            let paste_idx = idx
        else
            let paste_idx = idx + 1
        endif
    endif

    let d_prefix = 's:ws_deleted_' . (s:ws_deleted_count - 1) . '_'
    let d_cnt = {d_prefix}count

    let i = {prefix}count - 1
    while i >= paste_idx
        call s:Ws_Rename_Entry(prefix, i, i + d_cnt, '_')
        let i = i - 1
    endwhile

    let i = 0
    while i < d_cnt
        call s:Ws_Copy_Entry(d_prefix, i, prefix, paste_idx + i)
        call s:Ws_Discard_Entry(d_prefix, i)
        let i = i + 1
    endwhile

    call s:Ws_Discard_Entry('s:ws_deleted_', s:ws_deleted_count - 1)
    let s:ws_deleted_count = s:ws_deleted_count - 1

    let {prefix}count = {prefix}count + d_cnt

    let s:ws_modified = 1

    call s:Ws_Refresh()

    " Place the cursor on the location of the moved entry
    call cursor({prefix}{paste_idx}_lnum, 0)
endfunction

" Ws_Rename_Entry
function! s:Ws_Rename_Entry(prefix, old_index, new_index, suffix)
    let old_prefix = a:prefix . a:old_index . a:suffix
    let new_prefix = a:prefix . a:new_index . a:suffix

    let entry_type = {old_prefix}type

    " Copy the values from old index to new index
    let {new_prefix}name = {old_prefix}name
    let {new_prefix}type = {old_prefix}type
    let {new_prefix}lnum = {old_prefix}lnum

    " Remove the old entries
    unlet! {old_prefix}name
    unlet! {old_prefix}type
    unlet! {old_prefix}lnum

    if entry_type == 'group'
        let {new_prefix}count = {old_prefix}count
        unlet! {old_prefix}count

        let ecount = {new_prefix}count
        let i = 0
        while i < ecount
            call s:Ws_Rename_Entry(a:prefix, a:old_index, a:new_index,
                        \ a:suffix . i . '_')
            let i = i + 1
        endwhile
    endif
endfunction

" Ws_Remove_Entry
function! s:Ws_Remove_Entry(prefix, index)
    call s:Ws_Discard_Entry(a:prefix, a:index)

    let ecount = {a:prefix}count

    let i = a:index + 1

    while i < ecount
        call s:Ws_Rename_Entry(a:prefix, i, i - 1, '_')
        let i = i + 1
    endwhile

    let {a:prefix}count = ecount - 1
endfunction

" Ws_Copy_Delete_Entry
" Delete a range of entries starting with start_lnum and ending in end_lnum
function! s:Ws_Copy_Delete_Entry(line1, line2, copy)
    let i = a:line1
    let d_idx = 0
    let d_prefix = 's:ws_deleted_' . s:ws_deleted_count . '_'

    while i <= a:line2
        let lnum = i
        let i = i + 1
        if getline(lnum) == ''
            " Skip empty lines
            continue
        endif

        let cmd = s:Ws_Get_Entry_Idx_By_Line('s:ws_entry_', lnum)
        if cmd == ''
            continue
        endif

        exe cmd

        if {prefix}{idx}_type == 'workspace'
            " Cannot delete the workspace entry
            continue
        endif

        if {prefix}{idx}_type == 'group'
            let i = lnum + {prefix}{idx}_count + 1
        endif

        " Copy the entry to the end of the deleted list
        call s:Ws_Copy_Entry(prefix, idx, d_prefix, d_idx)

        if !a:copy
            " Remove the entry from the workspace
            call s:Ws_Remove_Entry(prefix, idx)
        endif

        let d_idx = d_idx + 1
    endwhile

    if d_idx
        let {d_prefix}count = d_idx
        let s:ws_deleted_count = s:ws_deleted_count + 1

        if !a:copy
            let s:ws_modified = 1
            call s:Ws_Refresh()
        endif
    endif
endfunction

" Ws_Save_Entry
" Silently echoes the workspace contents recursively.
" The output should redirected to a file by the caller
function! s:Ws_Save_Entry(prefix, index)
    let etype = s:{a:prefix}{a:index}_type

    exe 'silent! echo "let ' . a:prefix . a:index . '_name = ' .
                \ "'" . escape(s:{a:prefix}{a:index}_name, '\') . "'" . '"'
    exe 'silent! echo "let ' . a:prefix . a:index . "_type = '" .
                \ etype . "'" . '"'

    if etype == 'group'
        let ecount = s:{a:prefix}{a:index}_count
        exe 'silent! echo "let ' . a:prefix . a:index . '_count = ' .
                    \ ecount . '"'

        let i = 0
        while i < ecount
            call s:Ws_Save_Entry(a:prefix . a:index . '_', i)
            let i = i + 1
        endwhile
    endif
endfunction

" Ws_Save
" Save the current workspace
function! s:Ws_Save()
    if g:Ws_File == ''
        return
    endif

    " Create the workspace. Overwrite it, if it already exists
    exe 'redir! > ' . g:Ws_File
    silent! echo '" Vim workspace file. This file is auto-generated.'

    silent! echo 'let ws_entry_count = ' . s:ws_entry_count

    let i = 0
    while i < s:ws_entry_count
        call s:Ws_Save_Entry('ws_entry_', i)
        let i = i + 1
    endwhile

    silent! echo "\n"

    redir END

    let s:ws_modified = 0
endfunction

" Ws_Load_Entry
" Loads the workspace contents recursively.
function! s:Ws_Load_Entry(prefix, index)
    let s:{a:prefix}{a:index}_name = g:{a:prefix}{a:index}_name
    unlet! g:{a:prefix}{a:index}_name

    let etype = g:{a:prefix}{a:index}_type
    let s:{a:prefix}{a:index}_type = etype
    unlet! g:{a:prefix}{a:index}_type

    if etype == 'group'
        let ecount = g:{a:prefix}{a:index}_count
        let s:{a:prefix}{a:index}_count = ecount
        unlet! g:{a:prefix}{a:index}_count

        let i = 0
        while i < ecount
            call s:Ws_Load_Entry(a:prefix . a:index . '_', i)
            let i = i + 1
        endwhile
    endif
endfunction

" Ws_Load
" Loads a workspace from the specified file
function! s:Ws_Load(ws_filename)
    exe "source " . escape(a:ws_filename, ' ')

    " Rename the global workspace variables to script-local variables
    let s:ws_entry_count = g:ws_entry_count
    unlet! g:ws_entry_count

    let i = 0
    while i < s:ws_entry_count
        call s:Ws_Load_Entry('ws_entry_', i)
        let i = i + 1
    endwhile

    let s:ws_modified = 0
endfunction

" Ws_Open
function! s:Ws_Open(preserve_win, ...)
    if a:1 == '' && g:Ws_File == ''
        call s:Ws_Warn_Msg("Workspace: Error - Workspace name is not specified")
        return
    endif

    if a:1 != ''
        " If a new workspace is opened, discard the old workspace
        if g:Ws_File != ''
            if !s:Ws_Discard_Workspace()
                " Not able to discard the changes to the current workspace
                return
            endif
        endif

        let g:Ws_File = fnamemodify(a:1, ':p')
        let s:ws_modified = 0

        if filereadable(g:Ws_File)
            call s:Ws_Load(g:Ws_File)
        endif
    endif

    let cur_bnum = bufnr('%')

    call s:Ws_Open_Window()

    call s:Ws_Refresh()

    " Jump to the cursor location before the worspace window was
    " closed
    if line("'\"") > 0 && line ("'\"") <= line("$")
        normal g'"
    endif

    if a:preserve_win
        " Jump back to the previous window
	let wnum = bufwinnr(cur_bnum)
	if wnum != winnr()
	    exe wnum . 'wincmd w'
	endif
    endif
endfunction

" Ws_Open_File
function! s:Ws_Open_File(split_win)
    " Do not process comment lines and empty lines
    let curline = getline('.')
    if curline =~ '^\s*$' || curline[0] == '"'
        return
    endif

    " If inside a closed fold, then open the fold
    let lnum = foldclosed('.')
    if lnum != -1
        " Open the closed fold
        .foldopen!
        return
    endif

    let lnum = line('.')
    let cmd = s:Ws_Get_Entry_Idx_By_Line('s:ws_entry_', lnum)
    if cmd == ''
        return
    endif

    exe cmd

    if {prefix}{idx}_type != 'file'
        return
    endif

    let fname = {prefix}{idx}_name

    " Clear previously selected file name
    match none

    " Highlight the currently selected file name
    exe 'match WsFileName /\%' . lnum . 'l\s\+\zs.*/'

    if s:ws_app_name == "winmanager"
        " Let the winmanager edit the file
        call WinManagerFileEdit(fname, a:split_win)
        return
    endif

    " Goto the window containing the file.  If the window is not there,
    " open a new window
    let winnum = bufwinnr(fname)
    if winnum != -1
        exe winnum . 'wincmd w'

        " If the user asked to open the file in a new window, then split
        " the existing window into two.
        if a:split_win
            split
        endif

        if g:Ws_Close_On_File_Select
            " Close the workspace window
            call s:Ws_Close_Window()
        endif

        return
    endif

    " Locate the previously used window for opening a file
    let fwin_num = 0
    let first_usable_win = 0

    let i = 1
    let bnum = winbufnr(i)
    while bnum != -1
        if getwinvar(i, 'ws_file_window') == 'yes'
            let fwin_num = i
            break
        endif

        if first_usable_win == 0 && bufname(bnum) != g:Workspace_title
                    \ && getbufvar(bnum, '&buftype') == ''
            " First non-workspace and a non-plugin window
            let first_usable_win = i
        endif
        let i = i + 1
        let bnum = winbufnr(i)
    endwhile

    " If a previously used window is not found, then use the first
    " non-workspace window
    if fwin_num == 0
        let fwin_num = first_usable_win
    endif

    if fwin_num != 0
        " Jump to the file window
        exe fwin_num . "wincmd w"

        " If the user asked to jump to the file in a new window, then
        " split the existing window into two.
        if a:split_win
            split
        endif
        exe "edit " . fname
    else
        " Open a new window
        if g:Ws_Use_Horiz_Window
            exe 'rightbelow split ' fname
            " Go to the workspace window to change the window size to
            " the user configured value
            wincmd p
            exe 'resize ' . g:Ws_WinHeight
            " Go back to the file window
            wincmd p
        else
            " Open the file in a window and skip refreshing the
            " workspace window
            exe 'rightbelow vertical split ' . fname
            " Go to the workspace window to change the window size to
            " the user configured value
            wincmd p
            exe 'vertical resize ' . g:Ws_WinWidth
            " Go back to the file window
            wincmd p
        endif
    endif

    " Mark the window, so that it can be reused.
    let w:ws_file_window = "yes"

    if g:Ws_Close_On_File_Select
        " Close the workspace window
        call s:Ws_Close_Window()
    endif
endfunction

function! s:Ws_Show_Entry_Details()
    if getline('.') == ''
        " Skip empty lines
        return
    endif

    let lnum = line('.')

    let cmd = s:Ws_Get_Entry_Idx_By_Line('s:ws_entry_', lnum)
    if cmd == ''
        return
    endif

    exe cmd

    if {prefix}{idx}_type != 'workspace'
        echo {prefix}{idx}_name
    else
        echo g:Ws_File
    endif
endfunction

function! s:Ws_Discard_Entry(prefix, index)
    let entry_type = a:prefix . a:index . '_type'
    if !exists(entry_type)
        return
    endif

    if {entry_type} == 'group'
        let i = 0
        while i < {a:prefix}{a:index}_count
            let entry = a:prefix . a:index . '_'
            call s:Ws_Discard_Entry(entry, i)
            let i = i + 1
        endwhile
        unlet! {a:prefix}{a:index}_count
    endif

    unlet! {a:prefix}{a:index}_lnum
    unlet! {a:prefix}{a:index}_name
    unlet! {a:prefix}{a:index}_type
endfunction

function! s:Ws_Discard_Workspace()
    if g:Ws_File == ''
        return 1
    endif

    if s:ws_modified
        let ans = confirm("Save changes to workspace " . g:Ws_File . "?",
                    \ "&Yes\n&No\n&Cancel", 3)
        if ans == 0 || ans == 3
            return 0
        endif

        if ans == 1
            " Save the workspace
            call s:Ws_Save()
        endif
    endif

    let i = 0
    while i < s:ws_entry_count
        call s:Ws_Discard_Entry('s:ws_entry_', i)
        let i = i + 1
    endwhile

    let g:Ws_File = ''
    let s:ws_modified = 0
    let s:ws_entry_count = 0

    return 1
endfunction

function! s:Ws_Get_Filenames(prefix, idx, quote)
    if {a:prefix}{a:idx}_type == 'file'
	if a:quote
	    return g:Ws_Quote_Char . {a:prefix}{a:idx}_name . g:Ws_Quote_Char
	else
	    return escape({a:prefix}{a:idx}_name, ' ')
	endif
    endif

    let filenames = ''
    let i = 0
    while i < {a:prefix}{a:idx}_count
        let filenames = filenames .
		\ s:Ws_Get_Filenames(a:prefix . a:idx . '_', i, a:quote) . ' '
        let i = i + 1
    endwhile

    return filenames
endfunction

" Ws_Run
" Run the user specified command with a list of filenames from
" the workspace.
function! s:Ws_Run(line1, line2, user_cmd, quote)
    let filenames = ''
    let i = a:line1

    while i <= a:line2
        let cmd = s:Ws_Get_Entry_Idx_By_Line('s:ws_entry_', i)
        if cmd == ''
            continue
        endif

        exe cmd

        let filenames = filenames .
		    \ s:Ws_Get_Filenames(prefix, idx, a:quote) . ' '

        let i = i + 1
    endwhile

    if a:user_cmd =~ '\$\*'
        " Replace $* with the filenames
        let filenames = escape(filenames, '\\')
        let full_cmd = substitute(a:user_cmd, '\$\*', filenames, 'g')
    else
        " Add filenames at the end of the command
        let full_cmd = a:user_cmd . ' ' . filenames
    endif

    exe full_cmd
endfunction

" Ws_VimExit_Check
" On exiting Vim, check whether the workspace needs to be saved.
function! s:Ws_VimExit_Check()
    if s:ws_modified
        let ans = confirm("Workspace " . g:Ws_File .
                    \ " has unsaved modifications.\nSave the workspace?",
                    \ "&Yes\n&No", 1)
        if ans == 1
            " Save the workspace
            call s:Ws_Save()
        endif
    endif
endfunction

" Ws_Post_Close_Cleanup()
" Cleanup the workspace buffer settings and adjust the Vim window width, if
" needed.
function! s:Ws_Post_Close_Cleanup()
    " Remove the workspace autocommands
    silent! autocmd! WsAutoCmds

    " Clear all the highlighting
    match none
    silent! syntax clear WsComment
    silent! syntax clear WsFileName

    " Remove the left mouse click mapping if it was setup initially
    if g:Ws_Use_Single_Click
        if hasmapto('<LeftMouse>')
            nunmap <LeftMouse>
        endif
    endif

    let b:ws_buf_initialized = 0

    if s:ws_app_name != "winmanager"
    if g:Ws_Use_Horiz_Window || g:Ws_Inc_Winwidth == 0 ||
                \ s:ws_winsize_chgd == 0 ||
                \ &columns < (80 + g:Ws_WinWidth)
        " No need to adjust window width if using horizontally split workspace
        " window or if columns is less than 101 or if the user chose not to
        " adjust the window width
    else
        " If the user didn't manually move the window, then restore the window
        " position to the pre-workspace position
        if s:ws_pre_winx != -1 && s:ws_pre_winy != -1 &&
                    \ getwinposx() == s:ws_winx &&
                    \ getwinposy() == s:ws_winy
            exe 'winpos ' . s:ws_pre_winx . ' ' . s:ws_pre_winy
        endif

        " Adjust the Vim window width
        let &columns= &columns - (g:Ws_WinWidth + 1)
    endif
    endif

    " Reset workspace state variables
    if s:ws_app_name == "winmanager"
        let s:ws_app_name = "none"
    endif
endfunction

" Ws_Zoom_Window
" Zoom (maximize/minimize) the workspace window
function! s:Ws_Zoom_Window()
    if s:ws_win_maximized
        " Restore the window back to the previous size
        if g:Ws_Use_Horiz_Window
            exe 'resize ' . g:Ws_WinHeight
        else
            exe 'vert resize ' . g:Ws_WinWidth
        endif
        let s:ws_win_maximized = 0
    else
        " Set the window size to the maximum possible without closing other
        " windows
        if g:Ws_Use_Horiz_Window
            resize
        else
            vert resize
        endif
        let s:ws_win_maximized = 1
    endif
endfunction

" Ws_Check_Window_Width
" Check the width of the workspace window. For horizontally split windows, the
" 'winfixheight' option is used to fix the height of the window. For
" vertically split windows, Vim doesn't support the 'winfixwidth' option. So
" need to handle window width changes from this function.
function! s:Ws_Check_Window_Width()
    if g:Ws_Use_Horiz_Window || g:Ws_Inc_Winwidth == 0 ||
		\ s:ws_app_name == 'winmanager'
	" No need to check the window width, when using a horizontally split
	" workspace window.
	return
    endif

    let ws_winnr = bufwinnr(g:Workspace_title)
    if ws_winnr == -1
        return
    endif

    let width = winwidth(ws_winnr)
    if width != g:Ws_WinWidth
        let save_winnr = winnr()
        if save_winnr != ws_winnr
            exe ws_winnr . 'wincmd w'
        endif
        exe 'vert resize ' . g:Ws_WinWidth
        if save_winnr != ws_winnr
            wincmd p
        endif
    endif
endfunction

" Ws_Adjust_Vim_WinWidth
function! s:Ws_Adjust_Vim_WinWidth()
    if g:Ws_Use_Horiz_Window || g:Ws_Inc_Winwidth == 0 ||
		\ s:ws_app_name == 'winmanager'
	" No need to adjust the window width, when using a horizontally split
	" workspace window or when used from the winmanager plugin
	return
    endif

    " Open a vertically split window. Increase the window size, if
    " needed, to accomodate the new window
    if g:Ws_Inc_Winwidth &&
		\ &columns < (80 + g:Ws_WinWidth)
	" Save the original window position
	let s:ws_pre_winx = getwinposx()
	let s:ws_pre_winy = getwinposy()

	" one extra column is needed to include the vertical split
	let &columns= &columns + g:Ws_WinWidth + 1

	" Save the new window position
	let s:ws_winx = getwinposx()
	let s:ws_winy = getwinposy()

	let s:ws_winsize_chgd = 1
    else
	let s:ws_winsize_chgd = 0
    endif

endfunction

" Ws_Open_Window
function! s:Ws_Open_Window()
    " If the window is open, jump to it
    let winnum = bufwinnr(g:Workspace_title)
    if winnum != -1
        " Jump to the existing window
        if winnr() != winnum
            exe winnum . 'wincmd w'
        endif

	if !exists('b:ws_buf_initialized') || !b:ws_buf_initialized
	    call s:Ws_Adjust_Vim_WinWidth()
	    call s:Ws_Check_Window_Width()
	    call s:Ws_Init_Window()
	endif
        return
    endif

    " If used with winmanager don't open windows. Winmanager will handle
    " the window/buffer management
    if s:ws_app_name == "winmanager"
        return
    endif

    " Create a new window. If user prefers a horizontal window, then open
    " a horizontally split window. Otherwise open a vertically split
    " window
    if g:Ws_Use_Horiz_Window
        " Open a horizontally split window
        let win_dir = 'topleft'
        " Horizontal window height
        let win_size = g:Ws_WinHeight
    else
	call s:Ws_Adjust_Vim_WinWidth()

        if g:Ws_Use_Right_Window
            " Open the window at the rightmost place
            let win_dir = 'botright vertical'
        else
            " Open the window at the leftmost place
            let win_dir = 'topleft vertical'
        endif
        let win_size = g:Ws_WinWidth
    endif

    " If the workspace temporary buffer already exists, then reuse it.
    " Otherwise create a new buffer
    let bufnum = bufnr(g:Workspace_title)
    if bufnum == -1
        " Create a new buffer
        let wcmd = g:Workspace_title
    else
        " Edit the existing buffer
        let wcmd = '+buffer' . bufnum
    endif

    " Create the workspace window
    exe 'silent! ' . win_dir . ' ' . win_size . 'split ' . wcmd

    " Initialize the workspace window
    call s:Ws_Init_Window()
endfunction

" Ws_Init_Window
" Initialize the workspace window
function! s:Ws_Init_Window()
    if has('gui_running') || &t_Co > 2
        syntax match WsComment '^" .*'
        highlight default link WsComment Comment

        highlight default link WsFileName Search
    else
        highlight WsFileName term-reverse cterm=reverse
    endif

    " Folding related settings
    setlocal foldenable
    setlocal foldminlines=0
    setlocal foldmethod=manual
    if g:Ws_Enable_Fold_Column
        setlocal foldcolumn=3
    else
        setlocal foldcolumn=0
    endif
    setlocal foldtext=v:folddashes.getline(v:foldstart)

    if s:ws_app_name != "winmanager"
        " Mark buffer as scratch
        silent! setlocal buftype=nofile
        if s:ws_app_name == "none"
            silent! setlocal bufhidden=delete
        endif
        silent! setlocal noswapfile
        " Due to a bug in Vim 6.0, the winbufnr() function fails for unlisted
        " buffers. So if the workspace buffer is unlisted, multiple workspace
        " windows will be opened. This bug is fixed in Vim 6.1 and above
        if v:version >= 601
            silent! setlocal nobuflisted
        endif
    endif

    silent! setlocal nowrap

    " If the 'number' option is set in the source window, it will affect the
    " workspace window. So forcefully disable 'number' option for the
    " workspace window
    silent! setlocal nonumber

    " Use fixed height when horizontally split window is used
    if g:Ws_Use_Horiz_Window
        if v:version >= 602
            set winfixheight
        endif
    endif

    " Setup the cpoptions properly for the maps to work
    let old_cpoptions = &cpoptions
    set cpoptions&vim

    nnoremap <buffer> <silent> <CR> :call <SID>Ws_Open_File(0)<CR>
    nnoremap <buffer> <silent> <2-LeftMouse> :call <SID>Ws_Open_File(0)<CR>
    nnoremap <buffer> <silent> o :call <SID>Ws_Open_File(1)<CR>
    nnoremap <buffer> <silent> + :silent! foldopen<CR>
    nnoremap <buffer> <silent> - :silent! foldclose<CR>
    nnoremap <buffer> <silent> * :silent! %foldopen!<CR>
    nnoremap <buffer> <silent> = :silent! %foldclose<CR>
    nnoremap <buffer> <silent> <kPlus> :silent! foldopen<CR>
    nnoremap <buffer> <silent> <kMinus> :silent! foldclose<CR>
    nnoremap <buffer> <silent> <kMultiply> :silent! %foldopen!<CR>
    nnoremap <buffer> <silent> ag :<C-U>call <SID>Ws_Add_Groups('', 1)<CR>
    nnoremap <buffer> <silent> af :<C-U>call <SID>Ws_Add_Files('', 1)<CR>
    nnoremap <buffer> <silent> ig :<C-U>call <SID>Ws_Add_Groups('', 0)<CR>
    nnoremap <buffer> <silent> if :<C-U>call <SID>Ws_Add_Files('', 0)<CR>
    nnoremap <buffer> <silent> yy :WsCopyEntry<CR>
    vnoremap <buffer> <silent> y :WsCopyEntry<CR>
    nnoremap <buffer> <silent> dd :WsDeleteEntry<CR>
    vnoremap <buffer> <silent> d :WsDeleteEntry<CR>
    nnoremap <buffer> <silent> p :<C-U>call <SID>Ws_Paste_Entry(0)<CR>
    nnoremap <buffer> <silent> P :<C-U>call <SID>Ws_Paste_Entry(1)<CR>
    nnoremap <buffer> <silent> r :<C-U>call <SID>Ws_Rename_Group()<CR>
    nnoremap <buffer> <silent> s :<C-U>call <SID>Ws_Save()<CR>
    nnoremap <buffer> <silent> <Space> :call <SID>Ws_Show_Entry_Details()<CR>
    nnoremap <buffer> <silent> x :call <SID>Ws_Zoom_Window()<CR>
    nnoremap <buffer> <silent> ? :call <SID>Ws_Toggle_Help_Text()<CR>
    nnoremap <buffer> <silent> q :close<CR>

    " Insert mode mappings
    inoremap <buffer> <silent> <CR> <C-O>:call <SID>Ws_Open_File(0)<CR>
    inoremap <buffer> <silent> <2-LeftMouse>
			    \ <C-O>:call <SID>Ws_Open_File(0)<CR>
    inoremap <buffer> <silent> o <C-O>:call <SID>Ws_Open_File(1)<CR>
    inoremap <buffer> <silent> + <C-O>:silent! foldopen<CR>
    inoremap <buffer> <silent> - <C-O>:silent! foldclose<CR>
    inoremap <buffer> <silent> * <C-O>:silent! %foldopen!<CR>
    inoremap <buffer> <silent> = <C-O>:silent! %foldclose<CR>
    inoremap <buffer> <silent> <kPlus> <C-O>:silent! foldopen<CR>
    inoremap <buffer> <silent> <kMinus> <C-O>:silent! foldclose<CR>
    inoremap <buffer> <silent> <kMultiply> <C-O>:silent! %foldopen!<CR>
    inoremap <buffer> <silent> ag <C-O>:<C-U>call <SID>Ws_Add_Groups('', 1)<CR>
    inoremap <buffer> <silent> af <C-O>:<C-U>call <SID>Ws_Add_Files('', 1)<CR>
    inoremap <buffer> <silent> ig <C-O>:<C-U>call <SID>Ws_Add_Groups('', 0)<CR>
    inoremap <buffer> <silent> if <C-O>:<C-U>call <SID>Ws_Add_Files('', 0)<CR>
    inoremap <buffer> <silent> yy <C-O>:WsCopyEntry<CR>
    inoremap <buffer> <silent> dd <C-O>:WsDeleteEntry<CR>
    inoremap <buffer> <silent> p <C-O>:<C-U>call <SID>Ws_Paste_Entry(0)<CR>
    inoremap <buffer> <silent> P <C-O>:<C-U>call <SID>Ws_Paste_Entry(1)<CR>
    inoremap <buffer> <silent> r <C-O>:<C-U>call <SID>Ws_Rename_Group()<CR>
    inoremap <buffer> <silent> s <C-O>:<C-U>call <SID>Ws_Save()<CR>
    inoremap <buffer> <silent> <Space>
		\ <C-O>:call <SID>Ws_Show_Entry_Details()<CR>
    inoremap <buffer> <silent> x <C-O>:call <SID>Ws_Zoom_Window()<CR>
    inoremap <buffer> <silent> ? <C-O>:call <SID>Ws_Toggle_Help_Text()<CR>
    inoremap <buffer> <silent> q <C-O>:close<CR>

    " Map single left mouse click if the user wants this functionality
    if g:Ws_Use_Single_Click == 1
        " attempt to perform single click mapping, it would be much nicer if
        " we could nnoremap <buffer> ... however vim does not fire the
        " <buffer> <leftmouse> when you use the mouse to enter a buffer.
        let clickmap = ':if bufname("%") =~ "__Workspace__" <bar> ' .
                    \ 'call <SID>Ws_Open_File(0) <bar> endif <CR>'
        if maparg('<leftmouse>', 'n') == ''
            " no mapping for leftmouse
            exe ':nnoremap <silent> <leftmouse> <leftmouse>' . clickmap
        else
            " we have a mapping
            let mapcmd = ':nnoremap <silent> <leftmouse> <leftmouse>'
            let mapcmd = mapcmd . substitute(substitute(
                        \ maparg('<leftmouse>', 'n'), '|', '<bar>', 'g'),
                        \ '\c^<leftmouse>', '', '')
            let mapcmd = mapcmd . clickmap
            exe mapcmd
        endif
    endif

    " Define the workspace autocommands
    augroup WsAutoCmds
        autocmd!

        " Adjust the Vim window width when workspace window is closed
        autocmd BufUnload __Workspace__ call s:Ws_Post_Close_Cleanup()

        " Exit Vim itself if only the workspace window is present (optional)
        if g:Ws_Exit_Only_Window
            " Before quitting Vim, delete the workspace buffer so that
            " the '0 mark is correctly set to the previous buffer.
            autocmd BufEnter __Workspace__ nested if winbufnr(2) == -1 | 
                        \ bdelete | quit | endif
        endif

        if !g:Ws_Use_Horiz_Window
            autocmd WinEnter * call s:Ws_Check_Window_Width()
        endif
    augroup end

    command! -buffer -nargs=* WsAddGroup call s:Ws_Add_Groups(<q-args>, 1)
    command! -buffer -nargs=* -complete=file WsAddFile
                \ call s:Ws_Add_Files(<q-args>, 1)
    command! -buffer -nargs=* WsInsertGroup call s:Ws_Add_Groups(<q-args>, 0)
    command! -buffer -nargs=* -complete=file WsInsertFile
                \ call s:Ws_Add_Files(<q-args>, 0)
    command! -buffer -range WsCopyEntry 
                \ call s:Ws_Copy_Delete_Entry(<line1>, <line2>, 1)
    command! -buffer -range WsDeleteEntry 
                \ call s:Ws_Copy_Delete_Entry(<line1>, <line2>, 0)
    command! -buffer -range -nargs=+ -complete=command WsRun
                \ call s:Ws_Run(<line1>, <line2>, <q-args>, 0)
    command! -buffer -range -nargs=+ -complete=command WsRunq
                \ call s:Ws_Run(<line1>, <line2>, <q-args>, 1)

    let b:ws_buf_initialized = 1

    " Restore the previous cpoptions settings
    let &cpoptions = old_cpoptions
endfunction

" Ws_Close_Window
function! s:Ws_Close_Window()
    " Make sure the workspace window exists
    let winnum = bufwinnr(g:Workspace_title)
    if winnum == -1
        call s:Ws_Warn_Msg('Error: Workspace window is not open')
        return
    endif

    if winnr() == winnum
        " Already in the workspace window. Close it and return
        if winbufnr(2) != -1
            " If a window other than the workspace window is open,
            " then only close the workspace window.
            close
        endif
    else
        " Goto the workspace window, close it and then come back to the
        " original window
        let curbufnr = bufnr('%')
        exe winnum . 'wincmd w'
        close
        " Need to jump back to the original window only if we are not
        " already in that window
        let winnum = bufwinnr(curbufnr)
        if winnr() != winnum
            exe winnum . 'wincmd w'
        endif
    endif
endfunction

" Ws_Toggle_Window
" Toggle the workspace window
function! s:Ws_Toggle_Window()
    let winnum = bufwinnr(g:Workspace_title)
    if winnum != -1
        " Window is opened, close it
        call s:Ws_Close_Window()
        return
    endif

    " Open the workspace window
    call s:Ws_Open(0, g:Ws_File)
endfunction

" Ws_Session_Open
function! s:Ws_Session_Open(workspace_name)
    " Make sure the workspace file exists and is readable
    if !filereadable(a:workspace_name)
	call s:Ws_Warn_Msg('Workspace ' . a:workspace_name . ' is not readable')
	return
    endif

    " If the session file exists, then load it first
    let ses_fname = fnamemodify(a:workspace_name, ':p:r') . '.session'
    if filereadable(ses_fname)
	exe 'source ' . escape(ses_fname, ' ')
    endif

    " Open the workspace
    call s:Ws_Open(0, a:workspace_name)
endfunction

" Ws_Session_Save
function! s:Ws_Session_Save()
    if g:Ws_File == ''
	return
    endif

    let ses_fname = fnamemodify(g:Ws_File, ':r') . '.session'

    " Create the Vim session
    exe 'mksession! ' . ses_fname

    " Save the workspace
    call s:Ws_Save()
endfunction

" On exiting Vim, check whether the workspace needs to be saved
autocmd VimLeavePre * call s:Ws_VimExit_Check()

" Define the autocommand to automatically open the workspace window on
" Vim startup
if g:Ws_Auto_Open
    autocmd VimEnter * nested call s:Ws_Open(1, g:Ws_File)
endif

command! -nargs=? -complete=file WsOpen call s:Ws_Open(0, <q-args>)
command! WsClose call s:Ws_Close_Window()
command! WsToggle call s:Ws_Toggle_Window()
command! WsSave call s:Ws_Save()
command! -nargs=1 -complete=file WsSessionOpen call s:Ws_Session_Open(<q-args>)
command! WsSessionSave call s:Ws_Session_Save()

" Workspace_Set_App
" Set the name of the external plugin/application to which workspace belongs.
" Workspace plugin is part of another plugin like cream or winmanager.
function! Workspace_Set_App(name)
    if a:name == ""
        return
    endif

    let s:ws_app_name = a:name
endfunction

" Integration with the winmanager plugin

" Initialization required for integration with winmanager
function! Workspace_Start()
    " If current buffer is not workspace buffer, then don't proceed
    if bufname('%') != g:Workspace_title
        return
    endif

    call Workspace_Set_App('winmanager')

    " Initialize the workspace window, if it is not already initialized
    if !exists('b:ws_buf_initialized') || !b:ws_buf_initialized
        let b:ws_buf_initialized = 0
        call s:Ws_Open(0, g:Ws_File)
    endif
endfunction

function! Workspace_IsValid()
    return 1
endfunction

function! Workspace_WrapUp()
    return 0
endfunction

" restore 'cpo'
let &cpo = s:cpo_save
unlet s:cpo_save

