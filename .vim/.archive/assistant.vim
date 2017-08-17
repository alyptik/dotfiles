" == "acomment" == {{{
"
"          File:  assistant.vim
"          Path:  ~/.vim/plugin
"        Author:  Alvan
"      Modifier:  Alvan
"      Modified:  2014-07-22
"       License:  Public Domain
"   Description:  1. Display the definition of functions, variables, etc(<C-k>).
"                 2. Complete keywords(<C-x><C-u>).
"
" --}}}

" Exit if already loaded
if exists("g:loaded_assistant")
    finish
endif
let g:loaded_assistant = "1.5.8"

" ================================== Conf {{{ ==================================
"
if !exists("g:assistant_exclude_complete_filetypes")
    let g:assistant_exclude_complete_filetypes = []
endif

au Filetype,BufEnter,BufRead * :call ASetComplete()
nnoremap <silent> <unique> <M-k> :call <SID>PopHelpList()<Cr>

" Mapping for Eclipse user
"
" inoremap <silent> <unique> <A-/> <C-x><C-u>
" nnoremap <silent> <unique> <A-/> :call <SID>PopHelpList()<Cr>
"
"
" Mapping for Netbeans user
"
" inoremap <silent> <unique> <C-\> <C-x><C-u>
" nnoremap <silent> <unique> <C-\> :call <SID>PopHelpList()<Cr>

let s:aChar = '[a-zA-Z0-9_#]'
let s:aTags = '[fm]'

let s:types = {}
let s:paths = {}
let s:dicts = {}
" ================================== }}} Conf ==================================

" ================================== Apis {{{ ==================================
"
function! AGetUserDict(...)
    let type = a:0 > 0 ? a:1 : s:GetFileType()
    return s:LocUserDict(type) ? s:dicts[type] : {}
endf

function! ASetComplete(...)
    if &cfu != ''
        return
    endif

    let type = a:0 > 0 ? a:1 : s:GetFileType()
    if index(g:assistant_exclude_complete_filetypes, type) < 0
        set cfu=ARunComplete
    endif
endf

function! ARunComplete(init, base)
    if a:init
        let init = col('.') - 1
        let line = getline('.')
        while init > 0 && line[init - 1] =~ s:aChar
            let init -= 1
        endwhile
        return init
    else
        if a:base =~ '^\s*$'
            return []
        endif

        if !s:LocUserDict()
            return []
        endif

        let type = s:GetFileType()
        let blen = strlen(a:base)

        let tags = {}
        let tlst = taglist('^'.a:base)
        let tlen = len(tlst) - 1
        while tlen >= 0
            let tags[tlst[tlen]['name']] = 1
            let tlen -= 1
        endw
        unl tlst tlen

        let dlst = []
        let keys = keys(s:dicts[s:types[type]])
        let dlen = len(keys) - 1
        while dlen >= 0
            if strpart(keys[dlen], 0, blen) == a:base
                if has_key(tags, keys[dlen])
                    call remove(tags, keys[dlen])
                endif
                call add(dlst, {'word':keys[dlen], 'menu':s:dicts[s:types[type]][keys[dlen]]})
            " elseif len(dlst) " dict file should be sorted first!!
                " break
            endif

            let dlen -= 1
        endw
        unl keys dlen

        return sort(keys(tags)) + sort(dlst)
    endif
endf
" ================================== }}} Apis ==================================

" ================================== Main {{{ ==================================
"
function s:GetFileType()
    return getwinvar(winnr(), '&filetype')
endf

function s:LocUserDict(...)
    let type = a:0 < 1 ? s:GetFileType() : a:1

    if type == ''
        return 0
    endif

    if !has_key(s:types, type)
        let s:types[type] = type
    endif

    if !has_key(s:paths, s:types[type])
        let s:paths[s:types[type]] = expand(substitute(globpath(&rtp, 'plugin/assistant/'), "\n", ',', 'g').s:types[type].'.dict.txt')
    endif

    if !has_key(s:dicts, s:types[type])
        let s:dicts[s:types[type]] = {}

        if s:paths[s:types[type]] != '' && filereadable(s:paths[s:types[type]])
            for line in readfile(s:paths[s:types[type]])
                let mtls = matchlist(line, '^\s*\([^ ]\+\)\s\+\(.*[^ ]\)\s*$')
                if len(mtls) >= 3
                    let s:dicts[s:types[type]][mtls[1]] = mtls[2]
                endif
            endfor
        endif
    endif

    return has_key(s:paths, s:types[type]) && s:paths[s:types[type]] != '' ? 1 : 0
endf

function s:PopHelpList()
    if !s:LocUserDict()
        echo 'assistant.ERR: no filetype'
        return
    endif

    let str = getline(".")
    let col = col(".")
    let end = col("$")

    let num = col - 1
    while num >= 0
        if strpart(str, num, 1) !~ s:aChar
            break
        endif
        let lcol = num
        let num -= 1
    endw
    if !exists("lcol")
        echo 'assistant.ERR: The current content under the cursor is not a keyword'
        return
    endif

    let num = col - 1
    while num <= end
        if strpart(str, num, 1) !~ s:aChar
            break
        endif
        let rcol = num
        let num += 1
    endw

    let list = []
    let type = s:GetFileType()
    let keys = keys(s:dicts[s:types[type]])

    let len = len(keys) - 1
    let key = strpart(str, lcol, rcol-lcol+1)

    let tlst = taglist('^'.key.'$')
    let tlen = len(tlst) - 1
    while tlen >= 0
        if tlst[tlen]['kind'] =~ s:aTags
            call add(list, substitute(substitute(tlst[tlen]['cmd'], '^\s*/^\s*', '', ''), '\s*\$/$', '', '') . '  in  ' . pathshorten(tlst[tlen]['filename']))
        endif
        let tlen -= 1
    endw

    while len >= 0
        if keys[len] == key || keys[len] =~ '[\.:]'.key.'$'
            call add(list, keys[len] . s:dicts[s:types[type]][keys[len]])
        endif
        let len -= 1
    endw

    echo len(list) > 0 ? join(sort(list), "\n") : 'assistant.MIS: "'.key.'"'
endf
" ================================== }}} Main ==================================
" vim:ft=vim:ff=unix:tabstop=4:shiftwidth=4:softtabstop=4:expandtab
" End of file : assistant.vim
