" vim: ft=vim fdm=marker

let vimrc = get(g:, 'vimrc', expand('<sfile>:p'))
let vimdir_conf = has('nvim') ? $HOME.'/.config/nvim' : $HOME.'/.vim'
let vimdir_data = has('nvim') ? $HOME.'/.local/share/nvim' : $HOME.'/.vim'
let $VIMDIR = get(g:, '$VIMDIR', vimdir_data)


" Important
" ----------------------------------------

set nocompatible
set pastetoggle=<F6>

let &packpath = join([$VIMDIR, vimdir_conf, $VIMRUNTIME], ',')
let mapleader = ','
let maplocalleader = ';'


" Moving Around, Searching and Patterns
" ----------------------------------------

set ignorecase
set incsearch
set path=.,,**
set smartcase
set whichwrap=b,s,<,>,[,]

noremap <silent> j gj
noremap <silent> k gk

map <silent> <M-j> 5j
map <silent> <M-k> 5k

noremap <silent> <M-C-H> 15h
noremap <silent> <M-C-L> 15l

noremap <silent> <C-E> 5<C-E>
noremap <silent> <C-Y> 5<C-Y>

noremap <silent> zh 15zh
noremap <silent> zl 15zl

" Move visual block <http://vimrcfu.com/snippet/77>
vnoremap J :m '>+1<CR>gv
vnoremap K :m '<-2<CR>gv


" Tags
" ----------------------------------------

set tags-=./tags tags-=./tags; tags^=./tags;

nnoremap <silent> <F12> :call system('mktags')
    \ \| call utils#EchoWarn('mktags finished')<CR>
nnoremap <Leader>lt :ltag /


" Displaying Text
" ----------------------------------------

set display=lastline
set list
set listchars=eol:¬,tab:>-,trail:-,extends:>,precedes:<,nbsp:+
set nowrap
set scrolloff=2
set sidescroll=15
set sidescrolloff=15

nnoremap <Leader>L :setl <C-R>=&list ? 'nolist' : 'list'<CR><CR>
nnoremap <Leader>U :setl display<C-R>=&display =~# 'uhex' ? '-' : '+'<CR>=uhex<CR>
nnoremap <Leader>W :setl <C-R>=&wrap ? 'nowrap' : 'wrap'<CR><CR>


" Syntax, Highlighting and Spelling
" ----------------------------------------

set colorcolumn=+1,84
set hlsearch
set spelllang=en_us

let c_comment_strings = 1
let load_doxygen_syntax = 1
let python_highlight_all = 1

nnoremap <silent> <Space> :nohlsearch \| echo<CR>
nnoremap <silent> # :let @/ = '\V'.escape(expand('<cWORD>'), '\') \| set hls<CR>
nnoremap <silent> * :let @/ = '\V'.escape(expand('<cword>'), '\') \| set hls<CR>

nnoremap col :setl <C-R>=!empty(&cc) ? 'cc=' : 'cc<'<CR><CR>
nnoremap cov :setl <C-R>=&virtualedit =~# 'all' ? 'virtualedit=block' : 'virtualedit=all'<CR><CR>
nnoremap cuc :setl <C-R>=&cuc ? 'nocuc' : 'cuc'<CR><CR>
nnoremap cul :setl <C-R>=&cul ? 'nocul' : 'cul'<CR><CR>
nnoremap <Leader>sp :setl <C-R>=&spell ? 'nospell' : 'spell'<CR><CR>

command! -bar Hitest call s:MetaLess('silent runtime syntax/hitest.vim')

if has('vim_starting')
    if &t_Co == 256
        colorscheme luciusblack
    else
        colorscheme desert
    endif
endif


" Multiple Windows
" ----------------------------------------

set laststatus=2
set splitbelow
set splitright
set winheight=5

set statusline=
    \ statusline+=%n
    \ statusline+=\ %<%f
    \ statusline+=%(\ [%M%W%R]%)
    \ statusline+=%(\ %y%)
    \ statusline+=%=
    \ statusline+=0x%-3B
    \ statusline+=\ %-14(%l,%c%V%)
    \ statusline+=\ %P

nnoremap <silent> <C-J> <C-W>j
nnoremap <silent> <C-K> <C-W>k
nnoremap <silent> <C-H> <C-W>h
nnoremap <silent> <C-L> <C-W>l
nmap <silent> <BS> <C-H>

nnoremap <silent> c<C-J> :below sp<CR>
nnoremap <silent> c<C-K> :above sp<CR>
nnoremap <silent> c<C-H> :lefta vsp<CR>
nnoremap <silent> c<C-L> :rightb vsp<CR>
nmap c<BS> c<C-H>

nnoremap <silent> d<C-J> <C-W>j<C-W>c
nnoremap <silent> d<C-K> <C-W>k<C-W>c
nnoremap <silent> d<C-H> <C-W>h<C-W>c
nnoremap <silent> d<C-L> <C-W>l<C-W>c
nmap <silent> d<BS> d<C-H>

nnoremap <silent> <C-_> <C-W>_
nnoremap <silent> g<C-J> <C-W>j<C-W>_
nnoremap <silent> g<C-K> <C-W>k<C-W>_
nmap <silent> g<BS> g<C-H>

nnoremap <silent> _ :resize -5<CR>
nnoremap <silent> + :resize +5<CR>
nnoremap <silent> <C-W>, :vertical resize -5<CR>
nnoremap <silent> <C-W>. :vertical resize +5<CR>
nnoremap <silent> <Leader>q :close<CR>


" Multiple Tab Pages
" ----------------------------------------

set tabpagemax=50

nnoremap <silent> <M-h> gT
nnoremap <silent> <M-l> gt
nnoremap <silent> <M-1> 1gt
nnoremap <silent> <M-2> 2gt
nnoremap <silent> <M-3> 3gt
nnoremap <silent> <M-4> 4gt
nnoremap <silent> <M-5> 5gt
nnoremap <silent> <M-6> 6gt
nnoremap <silent> <M-7> 7gt
nnoremap <silent> <M-8> 8gt
nnoremap <silent> <M-9> 9gt
nnoremap <silent> <M-0> :tablast<CR>
nnoremap <silent> <M-n> :tabnew<CR>
nnoremap <silent> <M-H> :tabmove -1<CR>
nnoremap <silent> <M-L> :tabmove +1<CR>

" Closes current or last tab
command! -bar -bang QuitTab call utils#TryCatch('tabclose<bang>',
    \ empty(<q-bang>) ? 'silent qall' : 'cquit', ':E784:')
nnoremap <silent> QQ :QuitTab<CR>
nnoremap <silent> QA :QuitTab!<CR>


" Terminal
" ----------------------------------------

if !has('nvim')
    set nottybuiltin
    set t_ut=
    set ttyfast
else
    tnoremap <C-\> <C-\><C-n>
endif

set title


" Using the Mouse
" ----------------------------------------

set mouse=

noremap <MiddleMouse> <Nop>
noremap <2-MiddleMouse> <Nop>
noremap <3-MiddleMouse> <Nop>
noremap <4-MiddleMouse> <Nop>

inoremap <MiddleMouse> <Nop>
inoremap <2-MiddleMouse> <Nop>
inoremap <3-MiddleMouse> <Nop>
inoremap <4-MiddleMouse> <Nop>


" GUI
" ----------------------------------------

set guicursor+=a:blinkon0
set guifont=Monaco\ 12
set guioptions+=c
    \ guioptions+=e
    \ guioptions-=L
    \ guioptions-=T
    \ guioptions-=m
    \ guioptions-=r


" NVIM TUI
" ----------------------------------------

let $NVIM_TUI_ENABLE_CURSOR_SHAPE = 0


" Messages and Info
" ----------------------------------------

set ruler
set shortmess=aoOtTWI
set showcmd
set showmode


" Selecting Text
" ----------------------------------------

set clipboard=unnamed

" Yank from cursor to the line end (consistent with D, C)
nnoremap <silent> Y y$

" Select last yanked area (linewise)
nnoremap <silent> <expr> gp '`['.getregtype()[0].'`]'

" Select all
noremap <silent> <Leader>aa <Esc>:keepjumps normal! ggVG<CR>

function! s:Pipe2(cmd, bang) range abort
    if empty(a:bang)
        exec printf('%d,%dyank %s', a:firstline, a:lastline, v:register)
    endif
    call system(a:cmd, getreg())
endfunction

command! -bar -range -bang -nargs=1 Pipe2
    \ silent Preserve <line1>,<line2> call <SID>Pipe2(<q-args>, <q-bang>)
command! -bar -range -bang Pipe2Primary
    \ silent Preserve <line1>,<line2> call <SID>Pipe2('xclip -i', <q-bang>)
command! -bar -range -bang Pipe2Clipboard
    \ silent Preserve <line1>,<line2> call <SID>Pipe2('xclip -i -selection clipboard', <q-bang>)

" Piping to Primary selection directly
nnoremap <silent> <Leader>xxP :Pipe2Primary!<CR>
nnoremap <silent> <Leader>xxp yy:Pipe2Primary!<CR>
vnoremap <silent> <Leader>xxp y:Pipe2Primary!<CR>

" Piping to Clipboard selection directly
nnoremap <silent> <Leader>xxC :Pipe2Clipboard!<CR>
nnoremap <silent> <Leader>xxc yy:Pipe2Clipboard!<CR>
vnoremap <silent> <Leader>xxc y:Pipe2Clipboard!<CR>


" Editing Text
" ----------------------------------------

set backspace=indent,eol,start
set complete-=i
set completeopt=longest,menuone
set formatoptions=tcroqln21j
set matchpairs+=<:>
set nojs
set nrformats-=octal
set showmatch
set textwidth=78
set tildeop
set undofile

let &undodir = $VIMDIR.'/.undo'
call utils#mkdir(&undodir)

inoremap <C-B> <Home>
inoremap <C-E> <End>
inoremap <M-h> <Left>
inoremap <M-l> <Right>
inoremap <M-b> <C-Left>
inoremap <M-f> <C-Right>
inoremap <M-w> <C-Right>

inoremap <C-U> <C-G>u<C-U>
inoremap <C-K> <C-G>u<C-O>d$
inoremap <C-W> <C-G>u<C-W>
inoremap <M-d> <C-G>u<C-O>dw
inoremap <M-x> <Delete>

inoremap <M-j> <C-G>j
inoremap <M-k> <C-G>k

inoremap <C-L> <C-K>
inoremap <C-F>f <C-R>=expand('%:t')<CR>
inoremap <C-F>n <C-R>=expand('%:t:r')<CR>
inoremap <C-F>p <C-R>=expand('%:p')<CR>
inoremap <C-F>d <C-R>=expand('%:r')<CR>

"inoremap ( ()<C-G>U<Left>
"inoremap [ []<C-G>U<Left>
"inoremap { {}<C-G>U<Left>


" Tabs and Indenting
" ----------------------------------------

set autoindent
set copyindent
set expandtab
set preserveindent
set shiftround
set shiftwidth=4
set smartindent
set smarttab
set tabstop=4


" Folding
" ----------------------------------------

set foldopen-=block

nnoremap <Leader>ff :setl fdm=manual \| normal! zM<CR>
nnoremap <Leader>fi :setl fdm=indent fdn=2 \| normal! zM<CR>
nnoremap <Leader>fm :setl fdm=marker \| normal! zM<CR>
nnoremap <Leader>fs :setl fdm=syntax \| normal! zM<CR>


" Mapping
" ----------------------------------------

set ttimeout
set ttimeoutlen=10


" Reading and Writing Files
" ----------------------------------------

set autoread
set backup
set fileformats+=mac
set modeline

let &backupdir = $VIMDIR.'/.backup'
call utils#mkdir(&backupdir)


" The Swap File
" ----------------------------------------

set swapfile
set updatetime=1000 " also used for CursorHold

let &directory = $VIMDIR.'/.swap//'
call utils#mkdir(&directory)


" Command Line Editing
" ----------------------------------------

set history=1000
set wildmenu
set wildmode=longest,full

"<C-B> <Home>
"<C-E> <End>
cnoremap <M-h> <Left>
cnoremap <M-l> <Right>
cnoremap <M-b> <C-Left>
cnoremap <M-f> <C-Right>
cnoremap <M-w> <C-Right>

"<C-U> - backward kill line
cnoremap <C-K> <C-\>e strpart(getcmdline(), 0, getcmdpos()-1)<CR>
"<C-W> - backward kill word
cnoremap <M-d> <C-\>e utils#CmdlineEmacsKillWord()<CR>
cnoremap <M-x> <Delete>

cnoremap <C-L> <C-K>
cnoremap %% <C-R>=expand('%:h').'/'<CR>


" Executing External Commands
" ----------------------------------------

set shell=bashx
set shellredir=&>%s


" Running 'make' and Jumping To Errors
" ----------------------------------------

set grepformat=%f:%l:%m
set grepprg=grep\ -nH\ --exclude-dir='.svn'\ --exclude-dir='.git'\ --exclude='*.swp'\ --exclude='*~'\ $*

set grepformat=%f:%l:%c:%m
set grepprg=ag\ --vimgrep\ $*

set shellpipe=\|&\ tee

nnoremap <F9> :make!<CR>

nnoremap <Leader>cl :copen<CR>
nnoremap <Leader>ll :lopen<CR>

nnoremap <Leader>J :cnext<CR>
nnoremap <Leader>K :cNext<CR>

nnoremap <silent> <Leader>j :call utils#TryCatch('echo \| lnext', 'cnext', ':E776:')<CR>
nnoremap <silent> <Leader>k :call utils#TryCatch('echo \| lNext', 'cNext', ':E776:')<CR>


" Language Specific
" ----------------------------------------

set keymap=slovak

set iminsert=0
set imsearch=-1


" Multi-byte Characters
" ----------------------------------------

if has('vim_starting')
    set encoding=utf-8
endif


" Various
" ----------------------------------------

set sessionoptions-=blank sessionoptions-=options
set virtualedit=block

let &viewdir = $VIMDIR.'/.view'
let &viminfo = "!,'100,<50,s10,h,n".$VIMDIR.'/.viminfo'

" Disable Ex mode
nnoremap Q <Nop>

" Disable Man lookup
nnoremap K <Nop>

" Delete all
nnoremap <silent> <Leader>D :%d<CR>

" Open files faster
nmap <Leader>ew :e<Space>
nmap <Leader>es :sp<Space>
nmap <Leader>ev :vsp<Space>
nmap <Leader>et :tabe<Space>
nnoremap <silent> <Leader>ee :e<CR>
nnoremap <silent> <Leader>e0 :e ++binary<CR>
nnoremap <silent> <Leader>E :e!<CR>

" Read / Filter faster
nnoremap <Leader>% :%!
nnoremap <Leader>rr :r!

" Unload current buffer and delete if from buffer list
nnoremap <silent> <C-Q> :bd<CR>

" Readonly / Modifiable
nnoremap <Leader>ro :setl ro noma<CR>
nnoremap <Leader>ma :setl ma noro<CR>

" Scratch buffer
nnoremap <silent> <Leader>sc :new +setl\ bt=nofile\ bh=wipe\ noswf<CR>

" Reload filetype
nnoremap <silent> <Leader>ft :<C-R>=!empty(&ft) ? 'setf '.&ft : 'filetype detect'<CR><CR>

" Sorting
vnoremap <silent> <Leader>ss :sort<CR>
vnoremap <silent> <Leader>su :sort u<CR>
vnoremap <silent> <Leader>sd :sort!<CR>
vnoremap <silent> <Leader>sb :!sort-blocks<CR>

" Working with diffs
nnoremap <silent> <Leader>d; :,diffget<CR>
nnoremap <silent> <Leader>d: :,diffput<CR>
nnoremap <silent> <Leader>du :diffupdate<CR>
nnoremap <silent> <Leader>dc :only \| diffoff!<CR>

" Help in new tab page
nnoremap <Leader>h :tab help<Space>
nnoremap <Leader>H :tab lhelpgrep<Space>

" Edit / Reload 'vimrc'
nnoremap <silent> <Leader>rc :vs <C-R>=fnameescape(vimrc)<CR><CR>
nnoremap <silent> <Leader>so :source <C-R>=fnameescape(vimrc)<CR>
    \ \| call utils#EchoWarn('vimrc reloaded')<CR>

" Hex dump
vnoremap <silent> <Leader>xxd :!xxd<CR>
nnoremap <silent> <Leader>xxd :%!xxd<CR>
vnoremap <silent> <Leader>xxD :!xxd -r<CR>
nnoremap <silent> <Leader>xxD :%!xxd -r<CR>

" Format
vnoremap <silent> <Leader>fo :Format<CR>
nnoremap <silent> <Leader>fo :%Format<CR>

" XML prettify
vnoremap <silent> <Leader>px :Format xml<CR>
nnoremap <silent> <Leader>px :%Format xml<CR>

" Strip / Squash lines
vnoremap <silent> <Leader>ps :!striplns<CR>
nnoremap <silent> <Leader>ps :%!striplns<CR>
vnoremap <silent> <Leader>pS :!squashlns<CR>
nnoremap <silent> <Leader>pS :%!squashlns<CR>

" ----------------------------------------

" Formatting {{{

function! s:Format(...) range abort
    let ft = get(a:, '1', &ft)

    "let filename = shellescape(expand('%'), 1)
    "if a:firstline != 1 || a:lastline != v:lnum
    "    let firstline = a:firstline
    "    let lastline = a:lastline
    "endif
    "let shiftwidth = &shiftwidth
    "let textwidth = &textwidth

    exec join([a:firstline.','.a:lastline, '!format', ft])
endfunction

command! -bar -range -nargs=? Format silent Preserve <line1>,<line2> call <SID>Format(<f-args>)

" }}}

" Toggles diff mode of current buffer {{{

function! s:DiffToggle() abort
    exec &diff ? 'diffoff' : 'diffthis'
endfunction

command! -bar DiffToggle call s:DiffToggle()
nnoremap <silent> <Leader>dd :DiffToggle<CR>

" }}}

" Starts diff of current buffer with another file {{{

function! s:DiffTo(file) abort
    let file = fnamemodify(a:file, ':p')
    if isdirectory(file)
        call utils#EchoError(printf('"%s" is a directory', fnamemodify(file, ':h')))
        return
    endif
    if !filereadable(file)
        call utils#EchoError(printf('"%s" is not readable', file))
        return
    endif
    vnew
    exec 'read ++edit' fnameescape(file) | 0d_
    exec 'setl bt=nofile bh=wipe noswf nobl noma ft='.getbufvar('#', '&ft')
    exec 'silent file DiffTo:\ '.fnameescape(fnamemodify(file, ':~'))
    diffthis
    wincmd p
    diffthis
endfunction

command! -nargs=1 -complete=file DiffTo call s:DiffTo(<q-args>)
nnoremap <Leader>df :DiffTo <C-R>=expand('%')<CR>

" }}}

" Toggles translation of ASCII meta escape prefix encoding to 8 bit meta encoding {{{

function! s:MetaLess(cmd) abort
    call utils#TryCatch(a:cmd)
endfunction

if !has('nvim')

function! s:MetaSetup(enable) abort
    " Meta + [0-z]
    " don't include O and P because of conflicts in xterm
    let chars = '0123456789ABCDEFGHIJKLMNQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let i = 0
    let n = len(chars)
    while i < n
        let c = chars[i]
        if a:enable
            exec 'set <M-'.c.">=\e".c
        else
            exec 'set <M-'.c.'>='
        endif
        let i += 1
    endwhile
    " Meta + C-H, C-L
    if a:enable
        exec "set <M-C-H>=\e\x08"
        exec "set <M-C-L>=\e\x0c"
    else
        set <M-C-H>=
        set <M-C-L>=
    endif
    let g:meta_enabled = a:enable
    if !has('vim_starting')
        call utils#EchoWarn('meta '.(g:meta_enabled ? 'on' : 'off'))
    endif
endfunction

function! s:MetaLess(cmd) abort
    if g:meta_enabled
        silent call s:MetaSetup(0)
        call utils#TryCatch(a:cmd)
        silent call s:MetaSetup(1)
    else
        call utils#TryCatch(a:cmd)
    endif
endfunction

command! -bar MetaToggle call s:MetaSetup(!meta_enabled)
nnoremap <silent> <Leader>mm :MetaToggle<CR>
silent call s:MetaSetup(1)

endif

" }}}

" Preserve cursor / window position, last search pattern, and the others {{{

function! s:Preserve(cmd) abort
    let last_search = @/
    let cursor_pos = getcurpos()
    normal! H
    let window_pos = getpos('.')
    call setpos('.', cursor_pos)
    call utils#TryCatch('keepalt keepjumps keepmarks keeppatterns '.a:cmd)
    call setpos('.', window_pos)
    normal! zt
    call setpos('.', cursor_pos)
    let @/ = last_search
endfunction

command! -nargs=1 Preserve call s:Preserve(<q-args>)
nnoremap <silent> <Leader>pp :Preserve %s/\s\+$//e<CR>
vnoremap <silent> <Leader>pp :<C-U>Preserve '<,'>s/\s\+$//e<CR>
nnoremap <silent> <Leader>== :silent Preserve normal! gg=G<CR>
nnoremap <silent> <Leader>gq :silent Preserve normal! gggqG<CR>

" }}}

" Walks through list of colorschemes (q/C-C=quit, k=prev, default=next) {{{

function! s:Themes() abort
    let themes = ['luciusblack', 'hybrid', 'bclear']
    let l = len(themes)
    if !exists('s:themes_last_index')
        let s:themes_last_index = 0
    endif
    let i = s:themes_last_index
    while 1
        let theme = themes[i]
        exec 'colorscheme' theme
        redraw | echo theme
        let c = getchar()
        if c == 3 || c == 113
            break
        elseif c == 107
            let i = i > 0 ? i-1 : l-1
        else
            let i = i < l-1 ? i+1 : 0
        endif
    endwhile
    let s:themes_last_index = i
    redraw | echo
endfunction

command! Themes call s:Themes()
nnoremap <silent> <Leader>th :Themes<CR>

" }}}

" Write with elevated privileges {{{

function! s:Write(...) abort
    let filename = get(a:, '1', expand('%'))
    exec 'silent write !sudo tee >/dev/null' shellescape(filename, 1)
    edit!
endfunction

command! -nargs=? W call s:Write(<f-args>)

" }}}

" Zoom / Restore window {{{

function! s:ZoomToggle() abort
    if exists('t:zoomed') && t:zoomed
        exec t:zoom_winrestcmd
        let t:zoomed = 0
    else
        let t:zoom_winrestcmd = winrestcmd()
        resize
        vertical resize
        let t:zoomed = 1
    endif
endfunction

command! -bar ZoomToggle call s:ZoomToggle()
nnoremap <silent> <M-m> :ZoomToggle<CR>
nnoremap <silent> <M-z> :ZoomToggle<CR>

" }}}

" MoveToTab <http://vim.wikia.com/wiki/Move_current_window_between_tabs> {{{

function! s:MoveToTab(next) abort
    if tabpagenr('$') == 1 && winnr('$') == 1
        return
    endif
    let tab_nr = tabpagenr('$')
    let cur_buf = bufnr('%')
    if a:next ? tabpagenr() < tab_nr : tabpagenr() != 1
        close!
        if tab_nr == tabpagenr('$')
            exec a:next ? 'tabnext' : 'tabprev'
        endif
        botright vsplit
    else
        close!
        exec a:next ? 'tabnew' : '0tabnew'
    endif
    exec 'buffer' cur_buf
endfunction

command! -bar MoveToNextTab call s:MoveToTab(1)
command! -bar MoveToPrevTab call s:MoveToTab(0)
nnoremap <silent> <C-W><M-h> :MoveToPrevTab<CR>
nnoremap <silent> <C-W><M-l> :MoveToNextTab<CR>

" }}}

" Prev/NextClosedFold <https://stackoverflow.com/questions/9403098/is-it-possible-to-jump-to-closed-folds-in-vim> {{{

function! s:MoveToClosedFold(next) abort
    let cmd = 'normal! z'.(a:next ? 'j' : 'k')
    let view = winsaveview()
    let [lnum0, lnum, isopen] = [0, view.lnum, 1]
    while lnum != lnum0 && isopen
        exec cmd
        let [lnum0, lnum] = [lnum, line('.')]
        let isopen = foldclosed(lnum) < 0
    endwhile
    if isopen
        call winrestview(view)
    endif
endfunction

command! -bar NextClosedFold call s:MoveToClosedFold(1)
command! -bar PrevClosedFold call s:MoveToClosedFold(0)
nnoremap <silent> <Leader>zj :NextClosedFold<CR>
nnoremap <silent> <Leader>zk :PrevClosedFold<CR>

" }}}

" Displaying options {{{

function! s:Option(optname) abort
    if exists('&'.a:optname)
        exec 'echo printf("&g:%s=%s", a:optname, &g:'.a:optname.')'
        exec 'echo printf("&l:%s=%s", a:optname, &l:'.a:optname.')'
    else
        call utils#EchoError(printf('"%s" is not an option', a:optname))
    endif
endfunction

command! -nargs=1 -complete=option Option call s:Option(<q-args>)
nnoremap <Leader>oo :Option<Space>

" }}}

" Capture command's output {{{

function! s:Execute(cmd) abort
    new +setl\ bt=nofile\ bh=wipe\ noswf
    call utils#TryCatch(printf('put =execute(\"%s\") | 1,2d_',
        \ escape(escape(a:cmd, '"\'), '"|')))
endfunction

function! s:System(cmd) abort
    new +setl\ bt=nofile\ bh=wipe\ noswf
    silent put =system(a:cmd) | 1d_
endfunction

command! -nargs=1 -complete=command Execute call s:Execute(<q-args>)
command! -nargs=1 -complete=shellcmd System call s:System(<q-args>)
nnoremap <Leader>re :Execute<Space>
nnoremap <Leader>R :System<Space>

" }}}

" ----------------------------------------

filetype plugin indent on
if !exists('g:syntax_on')
    syntax enable
endif

" just get rid of these
let loaded_getscript = 1
let loaded_getscriptPlugin = 1
let loaded_logipat = 1
let loaded_netrw = 1
let loaded_netrwPlugin = 1
let loaded_rrhelper = 1
let loaded_vimball = 1
let loaded_vimballPlugin = 1

packadd enhanced-diff | PatienceDiff

packadd! ansiesc
packadd! colorschemes

if has('gui_running')
    colorscheme bclear
endif

augroup vimrc_base
    autocmd!

    autocmd BufEnter,BufWinEnter * match none | set titlestring=
    autocmd BufWritePre * let &backupext = substitute(expand('%:p:h'), '/', '%', 'g')
    autocmd CmdwinEnter * call utils#BufSpecial()

    autocmd BufReadPost *
        \  if line("'\"") >= 1 && line("'\"") <= line('$')
        \|     exec 'normal! g`"'
        \| endif

    if !has('nvim')
        autocmd TermChanged * silent call s:MetaSetup(meta_enabled)
    else
        autocmd TermOpen * call utils#BufSpecial()
    endif

    " tabpagecd <https://github.com/kana/vim-tabpagecd>
    autocmd TabEnter *
        \  if exists('t:cwd')
        \|     cd `=t:cwd`
        \| endif
    autocmd TabLeave *
        \ let t:cwd = getcwd()

    " Quickfix List / Location List
    autocmd BufEnter,BufWinEnter *
        \  if &ft == 'qf' && exists('w:quickfix_title')
        \|     let &titlestring = '%t '.w:quickfix_title
        \| endif
    autocmd QuickFixCmdPost [^l]* cwindow

    autocmd BufWritePost ~/.Xresources !xrdb -load ~/.Xresources

    autocmd FileType mail setl tw=72
    autocmd FileType make setl ts=4 sts=0 sw=4 noet
    autocmd FileType man call utils#BufSpecial() | setl noma ts=8 | unmap <buffer> q
    autocmd FileType tar call utils#BufSpecial()
    autocmd FileType zip call utils#BufSpecial()
    autocmd FileType {c,cpp}{,.*} let &l:path = '.,,**,/usr/include'
augroup END
