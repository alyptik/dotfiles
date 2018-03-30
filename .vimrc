" All system-wide defaults are set in $VIMRUNTIME/archlinux.vim (usually just
" /usr/share/vim/vimfiles/archlinux.vim) and sourced by the call to :runtime
" properly set to work with the Vim-related packages.
" If you prefer the old-style vim functionalty, add 'runtime! vimrc_example.vim'
" Or better yet, read /usr/share/vim/vim74/vimrc_example.vim or the vim manual
" and configure vim to your own liking!
runtime! archlinux.vim
"runtime! vimrc_example.vim
set encoding=utf-8
scriptencoding utf-8

if (has("nvim") && empty(glob('~/.config/nvim/autoload/plug.vim')))
	silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
		\ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
	augroup init
		autocmd VimEnter * PlugInstall
	augroup END
elseif (!has("nvim") && empty(glob('~/.vim/autoload/plug.vim')))
	silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
		\ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
	augroup init
		autocmd VimEnter * PlugInstall
	augroup END
endif

function! BuildYCM(info)
	" info is a dictionary with 3 fields
	" - name:   name of the plugin
	" - status: 'installed', 'updated', or 'unchanged'
	" - force:  set on PlugInstall! or PlugUpdate!
	if (a:info.status== 'installed' || a:info.force)
		silent !./install.py
	endif
endfunction

if has("nvim") | let g:plugdir='~/.config/nvim/plugged' | else | let g:plugdir='~/.vim/plugged' | endif

call plug#begin(g:plugdir)
" Neo-vim plugin handling
	if has("nvim")
		function! DoRemote(arg)
			UpdateRemotePlugins
		endfunction
		Plug 'Shougo/deoplete.nvim', {'do': function('DoRemote')}
		Plug 'carlitux/deoplete-ternjs'
	endif

	Plug 'hdima/python-syntax'
	Plug 'jungomi/vim-mdnquery'
	Plug 'osfameron/perl-tags-vim'
	" Plug 'osfameron/perl-tags'
	Plug 'c9s/perlomni.vim'
	Plug 'brookhong/cscope.vim'
	Plug 'xtal8/traces.vim'
	" Plug 'SidOfc/mkdx', {'for': 'markdown'}
	" Plug 'junegunn/goyo.vim', {'for': 'markdown'}
	Plug 'xolox/vim-easytags' | Plug 'xolox/vim-misc'
	Plug 'xolox/vim-misc'
	Plug 'kien/rainbow_parentheses.vim'
	Plug 'edkolev/promptline.vim'
	" Plug 'sudar/vim-arduino-syntax'
	" Plug 'jplaut/vim-arduino-ino'
	" Plug 'stevearc/vim-arduino'
	Plug 'eagletmt/ghcmod-vim'
	Plug 'eagletmt/neco-ghc'
	" Plug 'lervag/vimtex'
	Plug 'sheerun/vim-polyglot'
	Plug 'xuhdev/vim-latex-live-preview'
	" Plug 'justmao945/vim-clang'
	Plug 'Rip-Rip/clang_complete'
	Plug 'mikelue/vim-maven-plugin'
	" Plug 'vim-scripts/maven-ide'
	Plug 'chaoren/vim-wordmotion'
	" Plug 'easymotion/vim-easymotion'
	Plug 'matze/vim-move'
	Plug 'rhysd/conflict-marker.vim'
	" Plug 'vim-voom/VOoM'
	Plug 'thinca/vim-visualstar'
	Plug 'wincent/command-t', {'do': 'cd ruby/command-t/ext/command-t && ruby extconf.rb && make'}
	Plug 'airblade/vim-gitgutter'
	Plug 'editorconfig/editorconfig-vim'
	" Plug 'junegunn/fzf', {'dir': '~/.fzf', 'do': 'yes \| ./install -no-update-rc'}
	Plug 'junegunn/fzf', {'dir': '~/.fzf', 'do': './install --bin'}
	Plug 'junegunn/fzf.vim'
	" Plug 'junegunn/limelight.vim'
	Plug 'maksimr/vim-jsbeautify'
	Plug 'mileszs/ack.vim'
	Plug 'morhetz/gruvbox'
	Plug 'ryanoasis/vim-devicons'
	Plug 'scrooloose/nerdtree', {'on': 'NERDTreeToggle'}
	Plug 'subosito/nginx.vim'
	Plug 'tiagofumo/vim-nerdtree-syntax-highlight'
	Plug 'ternjs/tern_for_vim', {'do': 'npm install && npm install -g tern'}
	Plug 'terryma/vim-expand-region'
	Plug 'tpope/vim-abolish'
	Plug 'tpope/vim-commentary'
	Plug 'tpope/vim-fugitive'
	Plug 'tpope/vim-repeat'
	Plug 'tpope/vim-surround'
	Plug 'tpope/vim-unimpaired'
	Plug 'vim-airline/vim-airline'
	Plug 'vim-airline/vim-airline-themes'
	Plug 'w0rp/ale'
	Plug 'Xuyuanp/nerdtree-git-plugin'
	Plug 'Terryma/vim-multiple-cursors'
	" Plug 'xolox/vim-notes'
	" Group dependencies, vim-snippets depends on ultisnips
	" Plug 'SirVer/ultisnips'
	Plug 'SirVer/ultisnips' | Plug 'honza/vim-snippets'
	" Plug 'drmingdrmer/xptemplate'
	" Plug 'Valloric/YouCompleteMe', {'do': './install.py'}
	" Plug 'Valloric/YouCompleteMe', {'do': function('BuildYCM')}
	" Plug 'ervandew/supertab'
	Plug 'Shougo/vimproc.vim', {'do': 'make'}
	Plug 'maralla/completor.vim'
	" Plug 'FredKSchott/CoVim'
	Plug 'ctrlpvim/ctrlp.vim'
	Plug 'Rykka/riv.vim'
	Plug 'Rykka/InstantRst'
	Plug 'scrooloose/nerdcommenter'
	Plug 'jreybert/vimagit'
	" Plug 'vim-ctrlspace/vim-ctrlspace'
	Plug 'jungomi/vim-mdnquery'
	Plug 'powerman/vim-plugin-AnsiEsc'
	Plug 'tpope/vim-rhubarb'
	Plug 'mhinz/vim-signify'
	Plug 'jpalardy/vim-slime', {'for': ['clojure', 'scheme']}
	" Plug 'tpope/vim-vinegar'
	Plug 'junegunn/seoul256.vim'
	" Plug 'junegunn/vim-easy-align'
	Plug 'tpope/vim-fireplace', {'for': 'clojure'}
	" Plug 'https://github.com/junegunn/vim-github-dashboard.git'
	Plug 'nsf/gocode', {'tag': 'v.20150303', 'rtp': 'vim'}
	Plug 'fatih/vim-go', {'do': ':GoInstallBinaries'}
	Plug 'junegunn/vim-github-dashboard', {'on': ['GHDashboard', 'GHActivity']}
	Plug 'tpope/vim-fireplace', {'for': 'clojure'}
	Plug 'kovisoft/paredit', {'for': ['clojure', 'scheme']}
	Plug 'junegunn/vader.vim',  {'on': 'Vader', 'for': 'vader'}
	" Unmanaged plugin (manually installed and updated)
	" Plug '~/my-prototype-plugin'
call plug#end()

" Make Vim recognize XTerm escape sequences for Page and Arrow
" keys combined with modifiers such as Shift, Control, and Alt.
" See http://www.reddit.com/r/vim/comments/1a29vk/_/c8tze8p
set nottybuiltin term=$TERM
if &term =~ '^\(xterm\|st\|rxvt\|tmux\)'
	" let &t_SI .= "\<Esc>[5 q"
	" let &t_EI .= "\<Esc>[1 q"
	" " use an orange cursor in insert mode
	" let &t_SI ^= "\<Esc>]12;Orange"
	let &t_SI .= "\<Esc>[5 q\<Esc>]12;#b58900\x7"
	" " use a red cursor otherwise
	let &t_EI .= "\<Esc>[1 q\<Esc>]12;Red\x7"
	silent !echo -ne "\033]12;Red\007"
	" autocmd VimLeave * silent !echo -ne "\033]112\007"
elseif &term =~ '^screen'
	" let &t_SI .= "\<Esc>P\<Esc>[5 q\<Esc>\\"
	" let &t_EI .= "\<Esc>P\<Esc>[1 q\<Esc>\\"
	" let &t_SI .= "\<Esc>]12;Orange\<Esc>\\"
	let &t_SI .= "\<Esc>P\<Esc>[5 q\<Esc>\\\<Esc>P\<Esc>]12;#b58900\x7\<Esc>\\"
	let &t_EI .= "\<Esc>P\<Esc>[1 q\<Esc>\\\<Esc>P\<Esc>]12;Red\x7\<Esc>\\"
	silent !echo -ne "\033P\033]12;Red\007\033\\"
	" autocmd VimLeave * silent !echo -ne "\033P\033]112\007\033\\"
endif

" disable Background Color Erase (BCE) so that color schemes
" render properly when inside 256-color tmux and GNU screen.
" see also http://sunaku.github.io/vim-256color-bce.html
if &term =~ '256color'
	set t_ut=
	set t_Co=256
	let g:gruvbox_termcolors=256
else
	set t_Co=16
	let g:gruvbox_termcolors=16
endif

" Page keys http://sourceforge.net/p/tmux/tmux-code/ci/master/tree/FAQ
execute 'set t_kP=[5;*~'
execute 'set t_kN=[6;*~'
" Arrow keys http://unix.stackexchange.com/a/34723
execute 'set <xUp>=[1;*A'
execute 'set <xDown>=[1;*B'
execute 'set <xRight>=[1;*C'
execute 'set <xLeft>=[1;*D'

if has('gui_running')
	set guioptions=aAeigmrLT
	let g:solarized_termcolors=16
	let g:solarized_degrade=0
	let g:solarized_termtrans=0
	let g:solarized_contrast='low'
	let g:solarized_visibility='normal'
	set lines=30 columns=75 linespace=0
	set guifont=Fira\ Code\ Light\ 9
	" set guifont=Fira\ Code\ Retina\ 9
	" set lines=40 columns=120 linespace=0
	" set guifont=Inconsolata\ g\ Light\ 22
	" set guifont=Source\ Code\ Pro\ Light\ 16
	map » <Esc>;
	map § <Esc>'
else
	set guioptions=aAeaigmrLT
	let g:solarized_termcolors=256
	let g:solarized_degrade=0
	let g:solarized_termtrans=1
	let g:solarized_contrast='high'
	let g:solarized_visibility='normal'
endif

" colorscheme solarized
" colorscheme seoul256
" colorscheme pablo
colorscheme gruvbox
syntax on
syntax enable
filetype on
filetype plugin on
filetype indent on
set grepprg=grep\ -nH\ $*
let g:tex_flavor='latex'
" highlight Comment term=italic cterm=italic
highlight Comment cterm=italic
let &colorcolumn=join(range(81,250), ',')
" gruvbox's dark0, so it just looks like cursorline stops at 80
highlight ColorColumn guibg=#282828
" so listchars are only visible on the current line
highlight SpecialKey guifg=#282828
" my own indentation for C using the coding styles
set smartindent cindent
" set cino=:0,+0,(2,J0,{1,}0,>4,)1,m2
set foldmethod=marker
set shell=/bin/zsh
set background=dark
set keywordprg=man\ -s
" set keywordprg=man\ -Pmost
set nopaste noshowcmd
set clipboard=unnamedplus,autoselectplus
" set clipboard=unnamed,autoselect
" set ofu=syntaxcomplete#Complete
set ofu=syntaxcomplete#Complete
set magic nostartofline
" set termguicolors
set t_8f=[38;2;%lu;%lu;%lum
set t_8b=[48;2;%lu;%lu;%lum
setglobal tags-=~/.vimtags,./tags tags-=~/.vimtags;./tags; tags^=~/.vimtags,./tags
set tags-=~/.vimtags,./tags tags-=~/.vimtags tags-=./tags tags^=~/.vimtags,./tags
" set rtp=~/.vim/vimfiles,~/.vim,$VIM/vimfiles,$VIMRUNTIME,$VIM/vimfiles/after,~/.vim/after
set rtp-=~/.vim/vimfiles rtp^=~/.vim/vimfiles,~/.vim,$VIM/vimfiles,$VIM/vimfiles/after,~/.vim/after
set diffopt=filler,context:5,iwhite,vertical
set omnifunc=syntaxcomplete#Complete
" conceal in insert (i), normal (n) and visual (v) modes
set concealcursor=inv
" hide concealed text completely unless replacement character is defined
set conceallevel=2
set completeopt=menuone,noinsert,noselect
set nocp cpoptions+=d
set verbose=0
set updatetime=1000
set helpheight=0
set mouse=a
set noexpandtab tabstop=8 softtabstop=8 shiftwidth=8
set display=lastline
set pastetoggle=<Leader>P
set spell spl=en_us spf=~/.vim/spell/en.utf-8.add
set tsr=~/.vim/spell/th_en_US_v2.dat
set cpt-=d,t,k,s,u cpt-=d cpt-=t cpt-=k cpt-=s cpt-=u cpt+=d,t,k,s,u
set notimeout
" set timeout timeoutlen=2500 ttimeoutlen=10
" set notimeout ttimeoutlen=10
set number
"set relativenumber
set wildmenu showfulltag lbr ruler magic hidden
set incsearch ignorecase smartcase autoread
" Turn off alternate screen
" set t_ti= t_te=
" Turn on alternate screen
" set t_ti=7[?47h t_te=[2J[?47l8
set matchpairs=(:),{:},[:],<:>,=:;
"au FileType c,cpp,java set mps+==:;
set backspace=indent,eol,start
set formatoptions+=j
set list lcs=trail:-,extends:>,precedes:<,nbsp:+
set lcs^=tab:>\  " render tabs as '>    '
" set lcs^=eol:$
set tabpagemax=50
set sessionoptions-=options
set nrformats-=octal
set cursorline showtabline=2 laststatus=2 statusline+=%{ALEGetStatusLine()}
set encoding=utf8
set balloondelay=100
set sidescrolloff=5
"set sidescrolloff=999
set scrolloff=5 sidescroll=5
set wildignore=*.sw[a-p]
set wildignore+=*.so,*.o,*.pyc,*.class,*.sln,*.Master,*.csproj,*.csproj.user,*.cache,*.dll,*.pdb,*.min.*
set wildignore+=*/.git/**/*,*/.hg/**/*,*/.svn/**/*
set wildignore+=tags
set wildignore+=*.tar.*,*.zip
set path=.,**
set cscopetag
"set nowrap
set wrap
set showbreak=++++
" let &showbreak="        "
set history=10000
set nohlsearch

" '10  :  marks will be remembered for up to 10 previously edited files
"  <100 :  will save up to 100 lines for each register
"  /100 : Maximum number of items in the search pattern history to be saved.
"  :20  :  up to 20 lines of command-line history will be remembered
"  %    :  saves and restores the buffer list
"  n... :  where to save the viminfo files
set viminfo='1000000,s1000000,!,%,c,h,n~/.viminfo
" set viminfo='1000000,<1000000,/1000000,:1000000,@1000000,f1000000,s1000000,!,%,c,n~/.viminfo

silent !mkdir -p $HOME/.cache/vim/{backup,swap,undo}
set backup
set backupdir=$HOME/.cache/vim/backup
set swapfile
set directory=$HOME/.cache/vim/swap
set undofile
set undodir=$HOME/.cache/vim/undo

au QuickFixCmdPost *grep* cwindow

"formal: au BufNewFile,BufRead * setf {filetype}
au BufNewFile,BufRead *.h set filetype=c
au BufNewFile,BufRead *.c set filetype=c
au BufNewFile,BufRead *.jq setf javascript
au BufNewFile,BufRead *tmux.conf set filetype=tmux
au BufNewFile,BufRead *nanorc setf nanorc
au BufNewFile,BufRead *vimpagerrc setf vim
au BufNewFile,BufRead *.\(service\|socket\|target\|timer\)* set filetype=sysctl
"au BufNewFile,BufRead *\(nftables.conf\|.nft\)* setf nftables
au BufNewFile,BufRead *\(nftables.conf\|.nft\)* set filetype=nftables
au BufNewFile,BufRead *toxic.conf* set filetype=cfg
"au BufNewFile,BufRead *conf setf config
"au BufNewFile,BufRead *conf setf conf
au BufNewFile,BufRead db.* set filetype=bindzone
au BufNewFile,BufRead *grub* set filetype=grub
au BufNewFile,BufRead *.\(cc\|cpp\) set filetype=cpp
au BufNewFile,BufRead proftpd.\(con\|conf\) set filetype=cterm
au BufNewFile,BufRead i3.conf set filetype=i3
au BufNewFile,BufRead *.md set filetype=markdown
"au BufNewFile,BufRead {/etc/udev/rules.d/,/store/config/}*.rules set filetype=udevrules
au BufNewFile,BufRead *.txt setf erlang
au BufNewFile,BufRead *.log setf irc
au BufNewFile,BufRead /etc/X11/xorg.conf.d/* setf xf86conf
au BufNewFile,BufRead *named.conf* set filetype=named
au BufNewFile,BufRead *.log setf irc
" au BufNewFile,BufRead *conf set filetype=cfg
au BufNewFile,BufRead *torrc* setf cfg
au BufNewFile,BufRead /usr/share/highlight/themes/* set filetype=lua
au BufNewFile,BufRead */.zsh.d/zfunctions/* setf zsh
au BufNewFile,BufRead /tmp/mutt-* set filetype=mail tw=0 wrapmargin=72
au BufNewFile,BufRead nsswitch.conf* set filetype=nsis
au BufNewFile,BufRead makepkg.conf* set filetype=sh
au BufNewFile,BufRead *.conf* setf cfg
au BufNewFile,BufRead /etc/* setf cfg
au BufNewFile,BufRead *.\(pde\|ino\) set filetype=arduino
au BufNewFile,BufRead *.vala setf cs
au BufNewFile,BufRead *.vapi setf cs
au BufNewFile,BufRead *.gtkaml setf cs
au BufNewFile,BufRead *.gtkon setf cs

" Fallback
" au BufNewFile,BufRead * setf erlang

"au BufWritePost *.c,*.cc,*.cpp,*.h :silent! !ctags -R &
au FileType cpp set keywordprg=cppman
au FileType cpp setl ofu=completor#action#completefunc cfu=completor#action#completefunc
au FileType c setl ofu=completor#action#completefunc cfu=completor#action#completefunc
au FileType h setl ofu=completor#action#completefunc cfu=completor#action#completefunc
" au FileType cpp setl ofu=ClangComplete cfu=ClangComplete
" au FileType c setl ofu=ClangComplete cfu=ClangComplete
" au FileType h setl ofu=ClangComplete cfu=ClangComplete
" au FileType cpp setl ofu=ClangComplete
" au FileType c setl ofu=ccomplete#CompleteCpp
" au FileType h setl ofu=ccomplete#CompleteCpp
" au FileType cpp nnoremap <silent><buffer> K <Esc>:Cppman <cword><CR>
au FileType php setl ofu=phpcomplete#CompletePHP
au FileType ruby,eruby setl ofu=rubycomplete#Complete
au FileType html,xhtml setl ofu=htmlcomplete#CompleteTags
au FileType css setl ofu=csscomplete#CompleteCSS
au FileType udev set filetype=udevrules
au FileType pandoc set filetype=markdown
" Disable haskell-vim omnifunc
let g:haskellmode_completion_ghc = 0
au FileType haskell setl omnifunc=necoghc#omnifunc
" filetype marks
augroup VIMRC
	autocmd!
	autocmd BufLeave *.c    normal! mC
	autocmd BufLeave *.h    normal! mH
	" autocmd BufLeave *.css  normal! mC
	" autocmd BufLeave *.html normal! mH
	autocmd BufLeave *.js   normal! mJ
	autocmd BufLeave *.php  normal! mP
augroup END
autocmd BufEnter PKGBUILD,.env let b:ale_sh_shellcheck_exclusions='SC2034,SC2154,SC2164'

" let g:easytags_opts=['--fields=+l --c-kinds=-p']

" airline
let g:airline#extensions#whitespace#enabled=1
" useful to call for particular file types (e.g., in "ftplugin/*")
" silent! call airline#extensions#whitespace#disable()

" must be all spaces or all tabs before the first non-whitespace character
" let g:airline#extensions#whitespace#mixed_indent_algo=0 (default)
" certain number of spaces are allowed after tabs, but not in between
" this algorithm works well for /** */ style comments in a tab-indented file
let g:airline#extensions#whitespace#mixed_indent_algo=1
" spaces are allowed after tabs, but not in between
" this algorithm works well with programming styles that use tabs for
" indentation and spaces for alignment
" let g:airline#extensions#whitespace#mixed_indent_algo=2

" let g:airline#extensions#whitespace#symbol='!'

" indent: mixed indent within a line
" long:   overlong lines
" trailing: trailing whitespace
" mixed-indent-file: different indentation in different lines
let g:airline#extensions#whitespace#checks=[ 'indent', 'trailing', 'mixed-indent-file' ]
" this can also be configured for an individual buffer
" let b:airline_whitespace_checks=[ 'indent', 'trailing', 'long', 'mixed-indent-file' ]
"
" let g:airline#extensions#whitespace#max_lines=20000
let g:airline#extensions#whitespace#show_message=1
let g:airline#extensions#whitespace#trailing_format='trailing[%s]'
let g:airline#extensions#whitespace#mixed_indent_format='mixed-indent[%s]'
let g:airline#extensions#whitespace#long_format='long[%s]'
let g:airline#extensions#whitespace#mixed_indent_file_format='mix-indent-file[%s]'
let g:airline#extensions#whitespace#trailing_regexp='\s$'
" configure, which filetypes have special treatment of /* */ comments,
" matters for mix-indent-file algorithm: >
let airline#extensions#c_like_langs=['c', 'cpp', 'cuda', 'go', 'java', 'javascript', 'lex', 'ld', 'php', 'yacc']

" Checking is enabled by default because b:airline_whitespace_disabled
" is by default not defined:
" unlet b:airline_whitespace_disabled
" If b:airline_whitespace_disabled is defined and is non-zero for a buffer,
" then whitespace checking will be disabled for that buffer; for example:
" let b:airline_whitespace_disabled=1
let g:airline#extensions#tabline#enabled=1
" let g:airline_theme='zenburn'
let g:airline_theme='gruvbox'
" let g:airline_theme='hybrid'
" let g:airline_theme='base16_chalk'
" let g:airline_theme='base16_eighties'
let g:airline#extensions#ale#enabled=1
let airline#extensions#ale#error_symbol='E:'
let airline#extensions#ale#warning_symbol='W:'
if !exists('g:airline_symbols')
	let g:airline_symbols={}
endif
" unicode symbols
let g:airline_left_sep='»'
let g:airline_left_sep='▶'
let g:airline_right_sep='«'
let g:airline_right_sep='◀'
let g:airline_symbols.crypt='🔒'
let g:airline_symbols.linenr='☰'
let g:airline_symbols.linenr='␊'
let g:airline_symbols.linenr='␤'
let g:airline_symbols.linenr='¶'
let g:airline_symbols.maxlinenr=''
let g:airline_symbols.maxlinenr='㏑'
let g:airline_symbols.branch='⎇'
let g:airline_symbols.paste='ρ'
let g:airline_symbols.paste='Þ'
let g:airline_symbols.paste='∥'
let g:airline_symbols.spell='Ꞩ'
let g:airline_symbols.notexists='∄'
let g:airline_symbols.whitespace='Ξ'
" powerline symbols
let g:airline_left_sep=''
let g:airline_left_alt_sep=''
let g:airline_right_sep=''
let g:airline_right_alt_sep=''
let g:airline_symbols.branch=''
let g:airline_symbols.readonly=''
let g:airline_symbols.linenr='☰'
let g:airline_symbols.maxlinenr=''
" old vim-powerline symbols
let g:airline_left_sep='⮀'
let g:airline_left_alt_sep='⮁'
let g:airline_right_sep='⮂'
let g:airline_right_alt_sep='⮃'
let g:airline_symbols.branch='⭠'
let g:airline_symbols.readonly='⭤'
let g:airline_symbols.linenr='⭡'

" arduino commands
let g:arduino_cmd='/usr/share/arduino/arduino'
let g:arduino_dir='/usr/share/arduino'
let g:arduino_run_headless=1
let g:arduino_args='--verbose-upload'
let g:arduino_board='archlinux-arduino:avr:mega'
" let g:arduino_board='archlinux-arduino:avr:atmegang:atmega168'
let g:arduino_serial_port_globs=[
			\ '/dev/ttyACM*',
			\ '/dev/ttyUSB*',
			\ '/dev/tty.usbmodem*',
			\ '/dev/tty.usbserial*'
			\ ]


" mark-colors mark-highlight-color
let g:mwDefaultHighlightingPalette='maximum'
"let g:mwDefaultHighlightingPalette='extended'
let g:mwAutoLoadMarks=1
"let g:mwDefaultHighlightingNum=9
let g:mwIgnoreCase=0
"If you need more / less groups, this can be configured via: >
let g:mwDirectGroupJumpMappingNum=50
highlight link SearchSpecialSearchType MoreMsg

let g:mwDefaultHighlightingPalette='maximum'
let g:solarized_diffmode='high'
let g:solarized_hitrail=1
"let g:gruvbox_contrast_dark='hard'
"let g:gruvbox_contrast_dark='medium'
"let g:gruvbox_contrast_light='medium'
"let g:gruvbox_contrast_light='soft'
let g:gruvbox_contrast_dark=0
let g:gruvbox_contrast_light=1
let g:gruvbox_improved_strings=0
let g:gruvbox_improved_warnings=0
let g:gruvbox_bold=1
let g:gruvbox_undercurl=1
let g:gruvbox_underline=1
let g:gruvbox_inverse=1
let g:gruvbox_italic=1
" let g:gruvbox_termcolors=256
let g:gruvbox_invert_indent_guides=1

let g:python_highlight_all=1
let g:OmniCpp_MayCompleteDot=1
let g:OmniCpp_MayCompleteArrow=1
let g:OmniCpp_MayCompleteScope=1
let g:easytags_on_cursorhold=1
let g:easytags_always_enabled=0
let g:easytags_async=1
let g:easytags_auto_highlight=0
" let g:easytags_syntax_keyword='always'
let g:easytags_syntax_keyword='auto'
let g:easytags_python_enabled=1
let g:easytags_dynamic_files=0
let g:easytags_resolve_links=1
let g:easytags_include_members=1
let g:easytags_autorecurse=0
let g:easytags_by_filetype='~/.vim/tags'
"let g:easytags_events=['BufWritePost', 'CursorHold']
"let g:easytags_events=['BufWritePost', 'CursorHold', 'CursorHoldI']
"let g:easytags_events=['BufWritePost', 'CursorHoldI']
let g:netrw_silent=1
let g:pdf_convert_on_edit=1
let g:pdf_convert_on_read=1
"let g:syntastic_stl_format="[%E{Err: %fe #%e}%B{, }%W{Warn: %fw #%w}]"
"let g:syntastic_always_populate_loc_list=1
"let g:syntastic_auto_loc_list=1
"let g:syntastic_check_on_open=0
"let g:syntastic_check_on_wq=0
"let g:syntastic_auto_jump=3
"let g:syntastic_loc_list_height=5
let g:vimpager={}
let g:less={}
let g:less.hlsearch=1
let g:less.enabled=1
let g:less.scrolloff=5
let g:vimpager.passthrough=0
let g:vimpager.gvim=0
let g:vimpager.X11=1
let g:ale_statusline_format=['⨉ %d', '⚠ %d', '⬥ ok']
let g:ale_echo_msg_error_str='E'
let g:ale_echo_msg_warning_str='W'
let g:ale_echo_msg_format='[%linter%] %s [%severity%]'
let g:ale_sign_column_always=1
let g:ale_set_loclist=1
let g:ale_set_quickfix=1
let g:ale_open_list=0
let g:ale_keep_list_window_open=0
" Write this in your vimrc file
let g:ale_lint_on_save=1
let g:ale_lint_on_text_changed=0
" You can disable this option too if you don't want linters to run
" on opening a file
let g:ale_lint_on_enter=1

if @% =~ 'PKGBUILD$' || &ft ==? 'PKGBUILD'
	let g:ale_sh_shellcheck_options='-e SC2034,SC2154,SC2164'
	let b:syntastic_sh_shellcheck_post_args='-e SC2034,SC2154,SC2164'
endif

" <C-_> is the same key as <C-/>
let g:clang_jumpto_declaration_key='<C-_>'
let g:clang_jumpto_declaration_in_preview_key='<C-w><C-_>'
let g:clang_complete_macros=1
let g:clang_complete_patterns=1
let g:clang_snippet=1
let g:clang_conceal_snippets=1
let g:clang_snippets_engine='clang_complete'
" let g:clang_snippets_engine='utilsnips'
let g:clang_trailing_placeholder=1
let g:clang_complete_optional_args_in_snippets=1
let g:clang_omnicppcomplete_compliance=0
" let g:clang_complete_auto=1
let g:clang_auto_select=1
let g:clang_complete_loaded=0
let g:ale_completion_enabled=1

" UltiSnips setup
let g:UltiSnipsSnippetsDir=g:plugdir.'/vim-snippets/UltiSnips'
let g:UltiSnipsSnippetDirectories=['UltiSnips']
let g:clang_library_path='/usr/lib/libclang.so'
" let g:clang_library_path='/usr/lib64/libclang.so.6.0'
let g:livepreview_previewer = 'evince2'

" silent! iunmap <Tab>
imap <Tab> <Plug>CompletorCppJumpToPlaceholder
" alternate key bindings for UltiSnipsExpandTrigger
let g:UltiSnipsExpandTrigger = '<S-Tab>'
" let g:UltiSnipsJumpForwardTrigger = '<Tab>'
" let g:UltiSnipsJumpBackwardTrigger = '<S-Tab>'
let g:UltiSnipsJumpForwardTrigger = '<Right>'
let g:UltiSnipsJumpBackwardTrigger = '<Left>'
let g:UltiSnipsListSnippets='<C-l>'
" let g:UltiSnipsExpandTrigger='<C-h>'
" let g:UltiSnipsJumpForwardTrigger='<C-j>'
" let g:UltiSnipsJumpBackwardTrigger='<C-k>'
" let g:UltiSnipsListSnippets='<C-l>'
" inoremap <C-x><C-k> <C-x><C-k>
" inoremap <C-H> <C-h>

let g:ale_c_flawfinder_error_severity=6
let g:ale_c_cppcheck_options='--enable=style --std=gnu11 --std=posix'
let g:clang_cpp_options=''
	\ . '-std=gnu++14 -stdlib=libc++'
	\ . '-I./include -Wall -Wextra'
	\ . '-Wno-gnu-statement-expression '
	\ . '-Wno-missing-braces -Wno-missing-field-initializers '
	\ . '-Wno-unused-function -Wno-unused-parameter '
	\ . '-Wno-unused-const-variable -Wfloat-equal -Wrestrict '
	\ . '-Wshadow -Wstrict-overflow '
let g:ale_c_clang_options=''
	\ . '-std=gnu11 '
	\ . '-I./include -Wall -Wextra '
	\ . '-Wno-gnu-statement-expression '
	\ . '-Wno-missing-braces -Wno-missing-field-initializers '
	\ . '-Wno-unused-function -Wno-unused-parameter '
	\ . '-Wno-unused-const-variable -Wfloat-equal -Wrestrict '
	\ . '-Wshadow -Wstrict-overflow '
let g:ale_c_clangtidy_options=g:ale_c_clang_options
let g:ale_c_gcc_options=g:ale_c_clang_options
let g:clang_c_options=g:ale_c_clang_options
let g:ale_linters = {'c': ['clang', 'clangtidy', 'gcc']}
" let g:ale_linters = {'c': ['clang', 'clangtidy', 'cppcheck', 'gcc']}
let g:ale_fixers={'c': ['clang-format']}
let g:ale_c_clangtidy_checks=[
	\ 'bugprone-integer-division',
	\ 'bugprone-suspicious-memset-usage',
	\ 'bugprone-undefined-memory-manipulation',
	\ 'cert-dcl03-c',
	\ 'cert-env33-c',
	\ 'cert-err34-c',
	\ 'cert-fio38-c',
	\ 'cert-flp30-c',
	\ 'cert-msc30-c',
	\ 'clang-analyzer-apiModeling.google.GTest',
	\ 'clang-analyzer-core.CallAndMessage',
	\ 'clang-analyzer-core.DivideZero',
	\ 'clang-analyzer-core.DynamicTypePropagation',
	\ 'clang-analyzer-core.NonNullParamChecker',
	\ 'clang-analyzer-core.NullDereference',
	\ 'clang-analyzer-core.StackAddressEscape',
	\ 'clang-analyzer-core.UndefinedBinaryOperatorResult',
	\ 'clang-analyzer-core.VLASize',
	\ 'clang-analyzer-core.builtin.BuiltinFunctions',
	\ 'clang-analyzer-core.builtin.NoReturnFunctions',
	\ 'clang-analyzer-core.uninitialized.ArraySubscript',
	\ 'clang-analyzer-core.uninitialized.Assign',
	\ 'clang-analyzer-core.uninitialized.Branch',
	\ 'clang-analyzer-core.uninitialized.CapturedBlockVariable',
	\ 'clang-analyzer-core.uninitialized.UndefReturn',
	\ 'clang-analyzer-deadcode.DeadStores',
	\ 'clang-analyzer-llvm.Conventions',
	\ 'clang-analyzer-nullability.NullPassedToNonnull',
	\ 'clang-analyzer-nullability.NullReturnedFromNonnull',
	\ 'clang-analyzer-nullability.NullableDereferenced',
	\ 'clang-analyzer-nullability.NullablePassedToNonnull',
	\ 'clang-analyzer-nullability.NullableReturnedFromNonnull',
	\ 'clang-analyzer-optin.cplusplus.VirtualCall',
	\ 'clang-analyzer-optin.mpi.MPI-Checker',
	\ 'clang-analyzer-optin.performance.Padding',
	\ 'clang-analyzer-optin.portability.UnixAPI',
	\ 'clang-analyzer-security.FloatLoopCounter',
	\ 'clang-analyzer-security.insecureAPI.UncheckedReturn',
	\ 'clang-analyzer-security.insecureAPI.getpw',
	\ 'clang-analyzer-security.insecureAPI.gets',
	\ 'clang-analyzer-security.insecureAPI.mkstemp',
	\ 'clang-analyzer-security.insecureAPI.mktemp',
	\ 'clang-analyzer-security.insecureAPI.rand',
	\ 'clang-analyzer-security.insecureAPI.strcpy',
	\ 'clang-analyzer-security.insecureAPI.vfork',
	\ 'clang-analyzer-unix.API',
	\ 'clang-analyzer-unix.Malloc',
	\ 'clang-analyzer-unix.MallocSizeof',
	\ 'clang-analyzer-unix.MismatchedDeallocator',
	\ 'clang-analyzer-unix.StdCLibraryFunctions',
	\ 'clang-analyzer-unix.Vfork',
	\ 'clang-analyzer-unix.cstring.BadSizeArg',
	\ 'clang-analyzer-unix.cstring.NullArg',
	\ 'clang-analyzer-valist.CopyToSelf',
	\ 'clang-analyzer-valist.Uninitialized',
	\ 'clang-analyzer-valist.Unterminated',
	\ 'cppcoreguidelines-c-copy-assignment-signature',
	\ 'cppcoreguidelines-interfaces-global-init',
	\ 'cppcoreguidelines-no-malloc',
	\ 'cppcoreguidelines-owning-memory',
	\ 'cppcoreguidelines-pro-bounds-array-to-pointer-decay',
	\ 'cppcoreguidelines-pro-bounds-constant-array-index',
	\ 'cppcoreguidelines-pro-bounds-pointer-arithmetic',
	\ 'cppcoreguidelines-pro-type-const-cast',
	\ 'cppcoreguidelines-pro-type-cstyle-cast',
	\ 'cppcoreguidelines-pro-type-member-init',
	\ 'cppcoreguidelines-pro-type-reinterpret-cast',
	\ 'cppcoreguidelines-pro-type-static-cast-downcast',
	\ 'cppcoreguidelines-pro-type-union-access',
	\ 'cppcoreguidelines-pro-type-vararg',
	\ 'cppcoreguidelines-slicing',
	\ 'cppcoreguidelines-special-member-functions',
	\ 'google-build-explicit-make-pair',
	\ 'google-build-namespaces',
	\ 'google-build-using-namespace',
	\ 'google-default-arguments',
	\ 'google-explicit-constructor',
	\ 'google-global-names-in-headers',
	\ 'google-readability-casting',
	\ 'google-readability-function-size',
	\ 'google-readability-namespace-comments',
	\ 'google-readability-redundant-smartptr-get',
	\ 'google-runtime-int',
	\ 'google-runtime-member-string-references',
	\ 'google-runtime-operator',
	\ 'google-runtime-references',
	\ 'hicpp-deprecated-headers',
	\ 'hicpp-exception-baseclass',
	\ 'hicpp-explicit-conversions',
	\ 'hicpp-function-size',
	\ 'hicpp-invalid-access-moved',
	\ 'hicpp-member-init',
	\ 'hicpp-move-const-arg',
	\ 'hicpp-named-parameter',
	\ 'hicpp-new-delete-operators',
	\ 'hicpp-no-array-decay',
	\ 'hicpp-no-assembler',
	\ 'hicpp-no-malloc',
	\ 'hicpp-noexcept-move',
	\ 'hicpp-special-member-functions',
	\ 'hicpp-static-assert',
	\ 'hicpp-undelegated-constructor',
	\ 'hicpp-use-auto',
	\ 'hicpp-use-emplace',
	\ 'hicpp-use-equals-default',
	\ 'hicpp-use-equals-delete',
	\ 'hicpp-use-noexcept',
	\ 'hicpp-use-nullptr',
	\ 'hicpp-use-override',
	\ 'hicpp-vararg',
	\ 'llvm-include-order',
	\ 'llvm-namespace-comment',
	\ 'llvm-twine-local',
	\ 'misc-argument-comment',
	\ 'misc-assert-side-effect',
	\ 'misc-bool-pointer-implicit-conversion',
	\ 'misc-dangling-handle',
	\ 'misc-definitions-in-headers',
	\ 'misc-fold-init-type',
	\ 'misc-forward-declaration-namespace',
	\ 'misc-forwarding-reference-overload',
	\ 'misc-inaccurate-erase',
	\ 'misc-incorrect-roundings',
	\ 'misc-inefficient-algorithm',
	\ 'misc-lambda-function-name',
	\ 'misc-macro-parentheses',
	\ 'misc-macro-repeated-side-effects',
	\ 'misc-misplaced-const',
	\ 'misc-misplaced-widening-cast',
	\ 'misc-move-const-arg',
	\ 'misc-move-constructor-init',
	\ 'misc-move-forwarding-reference',
	\ 'misc-multiple-statement-macro',
	\ 'misc-new-delete-overloads',
	\ 'misc-noexcept-move-constructor',
	\ 'misc-non-copyable-objects',
	\ 'misc-redundant-expression',
	\ 'misc-sizeof-container',
	\ 'misc-sizeof-expression',
	\ 'misc-static-assert',
	\ 'misc-string-compare',
	\ 'misc-string-constructor',
	\ 'misc-string-integer-assignment',
	\ 'misc-string-literal-with-embedded-nul',
	\ 'misc-suspicious-enum-usage',
	\ 'misc-suspicious-missing-comma',
	\ 'misc-suspicious-semicolon',
	\ 'misc-swapped-arguments',
	\ 'misc-throw-by-value-catch-by-reference',
	\ 'misc-unconventional-assign-operator',
	\ 'misc-undelegated-constructor',
	\ 'misc-uniqueptr-reset-release',
	\ 'misc-unused-alias-decls',
	\ 'misc-unused-raii',
	\ 'misc-unused-using-decls',
	\ 'misc-use-after-move',
	\ 'misc-virtual-near-miss',
	\ 'modernize-avoid-bind',
	\ 'modernize-deprecated-headers',
	\ 'modernize-loop-convert',
	\ 'modernize-make-shared',
	\ 'modernize-make-unique',
	\ 'modernize-pass-by-value',
	\ 'modernize-raw-string-literal',
	\ 'modernize-redundant-void-arg',
	\ 'modernize-replace-auto-ptr',
	\ 'modernize-replace-random-shuffle',
	\ 'modernize-return-braced-init-list',
	\ 'modernize-shrink-to-fit',
	\ 'modernize-unary-static-assert',
	\ 'modernize-use-auto',
	\ 'modernize-use-bool-literals',
	\ 'modernize-use-default-member-init',
	\ 'modernize-use-emplace',
	\ 'modernize-use-equals-default',
	\ 'modernize-use-equals-delete',
	\ 'modernize-use-noexcept',
	\ 'modernize-use-nullptr',
	\ 'modernize-use-override',
	\ 'modernize-use-transparent-functors',
	\ 'modernize-use-using',
	\ 'mpi-buffer-deref',
	\ 'mpi-type-mismatch',
	\ 'performance-faster-string-find',
	\ 'performance-for-range-copy',
	\ 'performance-implicit-conversion-in-loop',
	\ 'performance-inefficient-string-concatenation',
	\ 'performance-inefficient-vector-operation',
	\ 'performance-type-promotion-in-math-fn',
	\ 'performance-unnecessary-copy-initialization',
	\ 'performance-unnecessary-value-param',
	\ 'readability-avoid-const-params-in-decls',
	\ 'readability-container-size-empty',
	\ 'readability-delete-null-pointer',
	\ 'readability-deleted-default',
	\ 'readability-else-after-return',
	\ 'readability-function-size',
	\ 'readability-identifier-naming',
	\ 'readability-implicit-bool-conversion',
	\ 'readability-inconsistent-declaration-parameter-name',
	\ 'readability-misleading-indentation',
	\ 'readability-misplaced-array-index',
	\ 'readability-named-parameter',
	\ 'readability-non-const-parameter',
	\ 'readability-redundant-control-flow',
	\ 'readability-redundant-function-ptr-dereference',
	\ 'readability-redundant-member-init',
	\ 'readability-redundant-smartptr-get',
	\ 'readability-redundant-string-cstr',
	\ 'readability-redundant-string-init',
	\ 'readability-simplify-boolean-expr',
	\ 'readability-static-accessed-through-instance',
	\ 'readability-static-definition-in-anonymous-namespace',
	\ 'readability-uniqueptr-delete-release',
	\ ]
let g:ale_c_clangtidy_checks=[
	\ 'clang-analyzer-apiModeling.google.GTest',
	\ 'clang-analyzer-core.CallAndMessage',
	\ 'clang-analyzer-core.DivideZero',
	\ 'clang-analyzer-core.DynamicTypePropagation',
	\ 'clang-analyzer-core.NonNullParamChecker',
	\ 'clang-analyzer-core.NonnilStringConstants',
	\ 'clang-analyzer-core.NullDereference',
	\ 'clang-analyzer-core.StackAddressEscape',
	\ 'clang-analyzer-core.UndefinedBinaryOperatorResult',
	\ 'clang-analyzer-core.VLASize',
	\ 'clang-analyzer-core.builtin.BuiltinFunctions',
	\ 'clang-analyzer-core.builtin.NoReturnFunctions',
	\ 'clang-analyzer-core.uninitialized.ArraySubscript',
	\ 'clang-analyzer-core.uninitialized.Assign',
	\ 'clang-analyzer-core.uninitialized.Branch',
	\ 'clang-analyzer-core.uninitialized.CapturedBlockVariable',
	\ 'clang-analyzer-core.uninitialized.UndefReturn',
	\ 'clang-analyzer-cplusplus.NewDelete',
	\ 'clang-analyzer-cplusplus.NewDeleteLeaks',
	\ 'clang-analyzer-cplusplus.SelfAssignment',
	\ 'clang-analyzer-deadcode.DeadStores',
	\ 'clang-analyzer-llvm.Conventions',
	\ 'clang-analyzer-nullability.NullPassedToNonnull',
	\ 'clang-analyzer-nullability.NullReturnedFromNonnull',
	\ 'clang-analyzer-nullability.NullableDereferenced',
	\ 'clang-analyzer-nullability.NullablePassedToNonnull',
	\ 'clang-analyzer-nullability.NullableReturnedFromNonnull',
	\ 'clang-analyzer-optin.cplusplus.VirtualCall',
	\ 'clang-analyzer-optin.mpi.MPI-Checker',
	\ 'clang-analyzer-optin.osx.cocoa.localizability.EmptyLocalizationContextChecker',
	\ 'clang-analyzer-optin.osx.cocoa.localizability.NonLocalizedStringChecker',
	\ 'clang-analyzer-optin.performance.Padding',
	\ 'clang-analyzer-optin.portability.UnixAPI',
	\ 'clang-analyzer-osx.API',
	\ 'clang-analyzer-osx.NumberObjectConversion',
	\ 'clang-analyzer-osx.ObjCProperty',
	\ 'clang-analyzer-osx.SecKeychainAPI',
	\ 'clang-analyzer-osx.cocoa.AtSync',
	\ 'clang-analyzer-osx.cocoa.ClassRelease',
	\ 'clang-analyzer-osx.cocoa.Dealloc',
	\ 'clang-analyzer-osx.cocoa.IncompatibleMethodTypes',
	\ 'clang-analyzer-osx.cocoa.Loops',
	\ 'clang-analyzer-osx.cocoa.MissingSuperCall',
	\ 'clang-analyzer-osx.cocoa.NSAutoreleasePool',
	\ 'clang-analyzer-osx.cocoa.NSError',
	\ 'clang-analyzer-osx.cocoa.NilArg',
	\ 'clang-analyzer-osx.cocoa.NonNilReturnValue',
	\ 'clang-analyzer-osx.cocoa.ObjCGenerics',
	\ 'clang-analyzer-osx.cocoa.RetainCount',
	\ 'clang-analyzer-osx.cocoa.SelfInit',
	\ 'clang-analyzer-osx.cocoa.SuperDealloc',
	\ 'clang-analyzer-osx.cocoa.UnusedIvars',
	\ 'clang-analyzer-osx.cocoa.VariadicMethodTypes',
	\ 'clang-analyzer-osx.coreFoundation.CFError',
	\ 'clang-analyzer-osx.coreFoundation.CFNumber',
	\ 'clang-analyzer-osx.coreFoundation.CFRetainRelease',
	\ 'clang-analyzer-osx.coreFoundation.containers.OutOfBounds',
	\ 'clang-analyzer-osx.coreFoundation.containers.PointerSizedValues',
	\ 'clang-analyzer-security.FloatLoopCounter',
	\ 'clang-analyzer-security.insecureAPI.UncheckedReturn',
	\ 'clang-analyzer-security.insecureAPI.getpw',
	\ 'clang-analyzer-security.insecureAPI.gets',
	\ 'clang-analyzer-security.insecureAPI.mkstemp',
	\ 'clang-analyzer-security.insecureAPI.mktemp',
	\ 'clang-analyzer-security.insecureAPI.rand',
	\ 'clang-analyzer-security.insecureAPI.strcpy',
	\ 'clang-analyzer-security.insecureAPI.vfork',
	\ 'clang-analyzer-unix.API',
	\ 'clang-analyzer-unix.Malloc',
	\ 'clang-analyzer-unix.MallocSizeof',
	\ 'clang-analyzer-unix.MismatchedDeallocator',
	\ 'clang-analyzer-unix.StdCLibraryFunctions',
	\ 'clang-analyzer-unix.Vfork',
	\ 'clang-analyzer-unix.cstring.BadSizeArg',
	\ 'clang-analyzer-unix.cstring.NullArg',
	\ 'clang-analyzer-valist.CopyToSelf',
	\ 'clang-analyzer-valist.Uninitialized',
	\ 'clang-analyzer-valist.Unterminated',
	\ ]

let g:powerline_fonts=1
let g:airline_powerline_fonts=1
let g:expand_region_use_select_mode=1
" you can add these colors to your .vimrc to help customizing
let s:brown="905532"
let s:aqua= "3AFFDB"
let s:blue="689FB6"
let s:darkBlue="44788E"
let s:purple="834F79"
let s:lightPurple="834F79"
let s:red="AE403F"
let s:beige="F5C06F"
let s:yellow="F09F17"
let s:orange="D4843E"
let s:darkOrange="F16529"
let s:pink="CB6F6F"
let s:salmon="EE6E73"
let s:green="8FAA54"
let s:lightGreen="31B53E"
let s:white="FFFFFF"
let s:rspec_red='FE405F'
let s:git_orange='F54D27'
let g:completor_python_binary='/usr/bin/python2'
let g:completor_racer_binary='~/.cargo/bin/racer'
let g:completor_node_binary='/usr/bin/node'
let g:completor_clang_binary='/usr/bin/clang'
let g:completor_gocode_binary='/usr/bin/gocode'
let g:completor_css_omni_trigger='([\w-]+|@[\w-]*|[\w-]+:\s*[\w-]*)$'
let g:completor_disable_ultisnips=1
let g:completor_auto_trigger=1
inoremap <expr> <Tab> (pumvisible() ? "\<C-n>" : "\<Tab>")
if (!g:completor_auto_trigger)
	inoremap <expr> <Tab> (pumvisible() ? "\<C-n>" : "\<C-x>\<C-u>\<C-p>")
endif
inoremap <expr> <CR> (pumvisible() ? "\<C-y>" : "\<CR>")
inoremap <expr> <S-Tab> (pumvisible() ? "\<C-p>" : "\<S-Tab>")
"let g:slime_paste_file=tempname()
let g:slime_paste_file='~/.slime_paste'
let g:ale_python_mypy_options='ignore-missing-imports,mypy_suppress_stub_warnings'
let g:ale_python_pylint_executable='python2'
" let g:ale_python_pylint_executable='python3'
let g:instant_markdown_autostart=0
let g:instant_markdown_slow=1
nnoremap <Leader>im :InstantMarkdownPreview<CR>
" This option  affects visual-block mode commenting. If this option is turned
" on, lines that begin outside the right boundary of the selection block will be
" ignored.
let g:NERDBlockComIgnoreEmpty=1
" Add spaces after comment delimiters by default
let g:NERDSpaceDelims=1
" Use compact syntax for prettified multi-line comments
let g:NERDCompactSexyComs=0
" Align line-wise comment delimiters flush left instead of following code indentation
let g:NERDDefaultAlign='left'
" let g:NERDDefaultAlign='start'
" Allow commenting ad inverting empty lines (useful when commenting a region)
let g:NERDCommentEmptyLines=1
" Enable trimming of trailing whitespace when uncommenting
let g:NERDTrimTrailingWhitespace=1
" Allows multipart alternative delimiters to be used when commenting in visual/visual-block mode.
let g:NERDAllowAnyVisualDelims=1
" Set a language to use its alternate delimiters by default
let g:NERDAltDelims_asm=1
let g:NERDAltDelims_java=1
let g:NERDAltDelims_c=0
let g:NERDAltDelims_cpp=0
" Add your own custom formats or override the defaults
let g:NERDCustomDelimiters={
	\ 'xcb': {'left': '#', 'right': ''},
	\ 'nftables': {'left': '#', 'right': ''},
	\ }
inoremap <C-c> <plug>NERDCommenterInsert
let g:xptemplate_minimal_prefix=1
let g:ycm_complete_in_comments=1
let g:ycm_seed_identifiers_with_syntax=1
let g:ycm_collect_identifiers_from_comments_and_strings=1
let g:gitgutter_highlight_lines=0
let g:gitgutter_max_signs=5000
noremap <Leader>u :GitGutterLineHighlightsToggle<CR>
let g:CoVim_default_name="covim"
let g:CoVim_default_port="999"
let g:instant_rst_browser="chromium"
let g:multicursor_insert_maps={}
let g:multicursor_normal_maps={
	\ '!':1, '@':1, '=':1, 'q':1, 'r':1,
	\ 't':1, 'T':1, 'y':1, '[':1, ']':1,
	\ '\':1, 'd':1, 'f':1, 'F':1, 'g':1,
	\ '"':1, 'z':1, 'c':1, 'm':1, '<':1,
	\ '>':1
	\ }
let g:multi_cursor_visual_maps={'i':1, 'a':1, 'f':1, 'F':1, 't':1, 'T':1}
" Default highlighting (see help :highlight and help :highlight-link)
highlight multiple_cursors_cursor term=reverse cterm=reverse gui=reverse
highlight link multiple_cursors_visual Visual
let g:github_dashboard= {'username': 'alyptik'}

let g:move_key_modifier = 'M'
nmap <C-j> <Plug>MoveLineDown
nmap <C-k> <Plug>MoveLineUp
xmap <C-j> <Plug>MoveBlockDown
xmap <C-k> <Plug>MoveBlockUp
" Move visual block <http://vimrcfu.com/snippet/77>
xnoremap J :m '>+1<CR>gv
xnoremap K :m '<-2<CR>gv

" inoremap <silent> <Esc> <C-O>:stopinsert<CR>
" inoremap <silent> <Esc> <Esc>`^
" au InsertLeave * call cursor([getpos('.')[1], getpos('.')[2]+1])

" let CursorColumnI= 0
" autocmd InsertEnter * let CursorColumnI= col('.')
" autocmd CursorMovedI * let CursorColumnI= col('.')
" autocmd InsertLeave * if col('.') != CursorColumnI | call cursor(0, col('.')+1) | endif

" Have ctrlp trigger on Ctrl-Space instead
" let g:ctrlp_map='<C-@>'
let g:ctrlp_working_path_mode='ra'
let g:ctrlp_switch_buffer='et'
let g:ctrlp_custom_ignore= '\v[\/]\.(git|hg|svn)$'
let g:ctrlp_custom_ignore= {
	\ 'dir':  '\v[\/]\.(git|hg|svn)$',
	\ 'file': '\v\.(exe|so|dll)$',
	\ 'link': 'some_bad_symbolic_links',
	\ }
let g:ctrlp_user_command=['.git', 'cd %s && git ls-files -co --exclude-standard']

let g:mdnquery_show_on_invoke=1
let g:mdnquery_auto_focus=1
let g:mdnquery_size=10
" If you prefer to only focus the buffer when a search is finished,
" you can use the following autocommand instead of setting g:mdnquery_auto_focus:
"au User MdnQueryContentChange call mdnquery#focus()
" Search in JS and CSS topics
let g:mdnquery_topics=['js', 'css']
" Search only for HTML in the current buffer
let b:mdnquery_topics=['html']
" Automatically set the topics for HTML files
au FileType html setlocal keywordprg=:MdnQueryFirstMatch
au FileType html let b:mdnquery_topics= ['css', 'html']
"call mdnquery#search('link', ['css', 'html'])
"call mdnquery#firstMatch('flex align', ['css'])

let g:CtrlSpaceSearchTiming=500
if executable('ag')
	let g:CtrlSpaceGlobCommand='ag -l --nocolor -g ""'
endif

" This is the default extra key bindings
let g:fzf_command_prefix='Fzf'
let g:fzf_action={
	\ 'ctrl-t': 'tab split',
	\ 'ctrl-x': 'split',
	\ 'ctrl-v': 'vsplit' }
" Default fzf layout
" - down / up / left / right
let g:fzf_layout={ 'down': '~40%' }
" In Neovim, you can set up fzf window using a Vim command
let g:fzf_layout={ 'window': 'enew' }
let g:fzf_layout={ 'window': '-tabnew' }
" Customize fzf colors to match your color scheme
let g:fzf_colors={
	\ 'fg':      ['fg', 'Normal'],
	\ 'bg':      ['bg', 'Normal'],
	\ 'hl':      ['fg', 'Comment'],
	\ 'fg+':     ['fg', 'CursorLine', 'CursorColumn', 'Normal'],
	\ 'bg+':     ['bg', 'CursorLine', 'CursorColumn'],
	\ 'hl+':     ['fg', 'Statement'],
	\ 'info':    ['fg', 'PreProc'],
	\ 'prompt':  ['fg', 'Conditional'],
	\ 'pointer': ['fg', 'Exception'],
	\ 'marker':  ['fg', 'Keyword'],
	\ 'spinner': ['fg', 'Label'],
	\ 'header':  ['fg', 'Comment']
	\ }
" Enable per-command history.
" CTRL-N and CTRL-P will be automatically bound to next-history and
" previous-history instead of down and up. If you don't like the change,
" explicitly bind the keys to down and up in your $FZF_DEFAULT_OPTS.
let g:fzf_history_dir='~/.local/share/fzf-history'
" [Files] Extra options for fzf
"   e.g. File preview using Highlight
"        (http://www.andre-simon.de/doku/highlight/en/highlight.html)
let g:fzf_files_options='--preview "(highlight -O ansi {} || cat {}) 2> /dev/null | head -'.&lines.'"'
" [Buffers] Jump to the existing window if possible
let g:fzf_buffers_jump=1
" [[B]Commits] Customize the options used by 'git log':
let g:fzf_commits_log_options='--graph --color=always --format="%C(auto)%h%d %s %C(black)%C(bold)%cr"'
" [Tags] Command to generate tags file
let g:fzf_tags_command='ctags -R'
" [Commands] --expect expression for directly executing the command
let g:fzf_commands_expect='alt-enter,ctrl-x'
" Mapping selecting mappings
nmap <Leader><Tab> <Plug>(fzf-maps-n)
xmap <Leader><Tab> <Plug>(fzf-maps-x)
omap <Leader><Tab> <Plug>(fzf-maps-o)
" Insert mode completion
imap <C-x><C-k> <Plug>(fzf-complete-word)
imap <C-x><C-f> <Plug>(fzf-complete-path)
imap <C-x><C-j> <Plug>(fzf-complete-file-ag)
imap <C-x><C-l> <Plug>(fzf-complete-line)
" Advanced customization using autoload functions
" inoremap <expr> <C-x><C-k> fzf#vim#complete#word({'left': '15%'})
" Replace the default dictionary completion with fzf-based fuzzy completion
inoremap <expr> <C-x><C-k> fzf#complete('cat /usr/share/dict/words')
function! s:make_sentence(lines)
	return substitute(join(a:lines), '^.', '\=toupper(submatch(0))', '').'.'
endfunction
inoremap <expr> <C-x><C-s> fzf#complete({
	\ 'source':  'cat /usr/share/dict/words',
	\ 'reducer': function('<sid>make_sentence'),
	\ 'options': '--multi --reverse --margin 15%,0',
	\ 'left':    20
	\ })
function! s:fzf_statusline()
	" Override statusline as you like
	highlight fzf1 ctermfg=161 ctermbg=251
	highlight fzf2 ctermfg=23 ctermbg=251
	highlight fzf3 ctermfg=237 ctermbg=251
	setlocal statusline=%#fzf1#\ >\ %#fzf2#fz%#fzf3#f
endfunction
au! User FzfStatusLine call <SID>fzf_statusline()

let g:expand_region_text_objects= {
	\ 'iw'  :0,
	\ 'iW'  :0,
	\ 'i"'  :0,
	\ 'i''' :0,
	\ 'i]'  :1,
	\ 'ib'  :1,
	\ 'iB'  :1,
	\ 'il'  :0,
	\ 'ip'  :0,
	\ 'ie'  :0,
	\ }
" Use the following setting for ruby. (NOTE: Remove comments in dictionary  before sourcing)
let g:expand_region_text_objects_ruby= {
	\ 'im' :0,
	\ 'am' :0,
	\ }
" Extend the global default (NOTE: Remove comments in dictionary before sourcing)
call expand_region#custom_text_objects({
	\ "\/\\n\\n\<CR>": 1,
	\ 'a]' :1,
	\ 'ab' :1,
	\ 'aB' :1,
	\ 'ii' :0,
	\ 'ai' :0,
	\ })
" Use the global default + the following for ruby
call expand_region#custom_text_objects('ruby', {
	\ 'im' :0,
	\ 'am' :0,
	\ })
map <Leader>h <Plug>(expand_region_expand)
map <Leader>g <Plug>(expand_region_shrink)

" NERDTree ---------------------------------------------------------------------
"map <silent> <leader>D :execute 'NERDTreeToggle ' . getcwd()<CR>
map <silent> <Leader>N :execute 'NERDTreeToggle ' . getcwd()<CR>
autocmd StdinReadPre * let s:std_in=1
let g:NERDTreeExtensionHighlightColor={} " this line is needed to avoid error
let g:NERDTreeExtensionHighlightColor['css']=s:blue " sets the color of css files to blue
let g:NERDTreeExactMatchHighlightColor={} " this line is needed to avoid error
let g:NERDTreeExactMatchHighlightColor['.gitignore']=s:git_orange " sets the color for .gitignore files
let g:NERDTreePatternMatchHighlightColor={} " this line is needed to avoid error
let g:NERDTreePatternMatchHighlightColor['.*_spec\.rb$']=s:rspec_red " sets the color for files ending with _spec.rb
let g:NERDTreeHighlightFolders=1 " enables folder icon highlighting using exact match
let g:NERDTreeHighlightFoldersFullName=1 " highlights the folder name
let g:NERDTreeFileExtensionHighlightFullName=0
let g:NERDTreeExactMatchHighlightFullName=0
let g:NERDTreePatternMatchHighlightFullName=0
let g:NERDTreeShowHidden=1
let g:NERDTreeIgnore=['\.DS_Store$']
let g:NERDTreeWinSize=45
let g:NERDTreeAutoDeleteBuffer=1
" NERDTress File highlighting
function! NERDTreeHighlightFile(extension, fg, bg, guifg, guibg)
exec 'autocmd FileType nerdtree highlight ' . a:extension .' ctermbg='. a:bg .' ctermfg='. a:fg .' guibg='. a:guibg .' guifg='. a:guifg
exec 'autocmd FileType nerdtree syn match ' . a:extension .' #^\s\+.*'. a:extension .'$#'
endfunction
call NERDTreeHighlightFile('jade', 'green', 'none', 'green', '#151515')
call NERDTreeHighlightFile('ini', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('md', 'blue', 'none', '#3366FF', '#151515')
call NERDTreeHighlightFile('yml', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('config', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('conf', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('json', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('html', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('styl', 'cyan', 'none', 'cyan', '#151515')
call NERDTreeHighlightFile('css', 'cyan', 'none', 'cyan', '#151515')
call NERDTreeHighlightFile('coffee', 'Red', 'none', 'red', '#151515')
call NERDTreeHighlightFile('js', 'Red', 'none', '#ffa500', '#151515')
call NERDTreeHighlightFile('php', 'Magenta', 'none', '#ff00ff', '#151515')
let g:NERDTreeIndicatorMapCustom={
	\ "Modified"  : "✹",
	\ "Staged"    : "✚",
	\ "Untracked" : "✭",
	\ "Renamed"   : "➜",
	\ "Unmerged"  : "═",
	\ "Deleted"   : "✖",
	\ "Dirty"     : "✗",
	\ "Clean"     : "✔︎",
	\ "Unknown"   : "?"
	\ }

function! Hashbang(portable, permission, remove_extension)
let shells={
	\    'awk': "awk",
	\     'sh': "bash",
	\     'hs': "runhaskell",
	\     'jl': "julia",
	\    'lua': "lua",
	\    'mak': "make",
	\     'js': "node",
	\      'm': "octave",
	\     'pl': "perl",
	\    'php': "php",
	\     'py': "python",
	\      'r': "Rscript",
	\     'rb': "ruby",
	\  'scala': "scala",
	\    'tcl': "tclsh",
	\     'tk': "wish"
	\ }

let extension=expand("%:e")
if has_key(shells, extension)
	let fileshell=shells[extension]
	if a:portable
		let line= "#!/usr/bin/env " . fileshell . "\n"
	else
		let line="#!" . system("which " . fileshell) . "\n"
	endif
	0put= line | $
	if a:permission && a:remove_extension
		:autocmd! BufWritePost * :autocmd! VimLeave * :!chmod +x % && mv % "%:p:r"
	elseif a:permission
		:autocmd! BufWritePost * :autocmd! VimLeave * :!chmod +x %
	elseif a:remove_extension
		:autocmd! BufWritePost * :autocmd! VimLeave * :!mv % "%:p:r"
	endif
endif
endfunction
autocmd! BufNewFile *.* call Hashbang(0,1,1)

function! ResCur()
	if line("'\"") <= line("$")
		normal! g`"
		return 1
	endif
endfunction
if has("folding")
	function! UnfoldCur()
		if !&foldenable
			return
		endif
		let cl=line(".")
		if cl <= 1
			return
		endif
		let cf=foldlevel(cl)
		let uf=foldlevel(cl - 1)
		let min=(cf > uf ? uf : cf)
		if min
			execute "normal!" min . "zo"
			return 1
		endif
	endfunction
endif
augroup resCur
	autocmd!
	if has("folding")
		au VimEnter * if ResCur() | call UnfoldCur() | endif
		au BufWinEnter * if ResCur() | call UnfoldCur() | endif
	else
"  au VimEnter * silent loadview
	au VimEnter * loadview
"  au BufWinEnter * silent loadview
	au BufWinEnter * loadview
	au BufWinEnter * call ResCur()
"  au BufReadPost * call setpos(".", getpos("'\""))
	au BufWinLeave * mkview
	endif
	au BufWinEnter * silent! 0,$foldo!
	au VimEnter * silent! 0,$foldo!
augroup END

" vim -b : edit binary using xxd-format!
augroup Binary
	au!
	au BufReadPre  *.bin let &bin=1
	au BufReadPost *.bin if &bin | %!xxd
	au BufReadPost *.bin set ft=xxd | endiF
	au BufWritePre *.bin if &bin | %!xxd -r
	au BufWritePre *.bin endif
	au BufWritePost *.bin if &bin | %!xxd
	au BufWritePost *.bin set nomod | endif
augroup END
"augroup myvimrc
"    au!
"    au BufWritePost .vimrc,_vimrc,vimrc,.gvimrc,_gvimrc,gvimrc so /etc/vimrc | if has('gui_running') | so /etc/gvimrc | endif
"augroup END

let g:rbpt_max=16
let g:rbpt_loadcmd_toggle=0
au VimEnter * RainbowParenthesesActivate
au Syntax * RainbowParenthesesLoadRound
au Syntax * RainbowParenthesesLoadSquare
au Syntax * RainbowParenthesesLoadBraces
":RainbowParenthesesToggle       " Toggle it on/off
":RainbowParenthesesLoadRound    " (), the default when toggling
":RainbowParenthesesLoadSquare   " []
":RainbowParenthesesLoadBraces   " {}
":RainbowParenthesesLoadChevrons " <>

" Set this. Airline will handle the rest. (ALE)
let g:airline#extensions#ale#enabled=1

"let g:promptline_preset='clear'
" or
let g:promptline_preset='full'
" other presets available in autoload/promptline/presets/*
"let g:promptline_theme='airline'
" or
let g:promptline_theme='jelly'
" other themes available in autoload/promptline/themes/*
let g:promptline_preset={
	\'a'	: [ promptline#slices#host() ],
	\'b'    : [ promptline#slices#cwd() ],
	\'c'	: [ promptline#slices#vcs_branch(), '$(git rev-parse --short HEAD 2>/dev/null)'],
	\'warn' : [ promptline#slices#last_exit_code() ],
	\'z'    : [ promptline#slices#host() ]
	\}

" let g:ascii= [
"   \ '        __',
"   \ '.--.--.|__|.--------.',
"   \ '|  |  ||  ||        |',
"   \ ' \___/ |__||__|__|__|',
"   \ ''
"   \]
" let g:startify_custom_header= g:ascii + startify#fortune#boxed()

let g:startify_custom_header=
	\ map(split(system('fortune archlinux | cowsay | perl -lpe "s/[[:space:]]*$//"'), '\n'), '"	". v:val')

autocmd User Startified setlocal cursorline

let g:startify_enable_special       =1
let g:startify_files_number         =8
let g:startify_relative_path        =1
let g:startify_change_to_dir        =1
let g:startify_update_oldfiles      =1
let g:startify_session_autoload     =1
let g:startify_session_persistence  =1
let g:startify_session_delete_buffers=1

let g:startify_list_order=[
	\ ['   Sessions:'],
	\ 'sessions',
	\ ['   Bookmarks:'],
	\ 'bookmarks',
	\ ['   LRU:'],
	\ 'files',
	\ ['   LRU within this dir:'],
	\ 'dir',
	\ ]

let g:startify_skiplist=[
	\ 'COMMIT_EDITMSG',
	\ 'bundle/.*/doc',
	\ '/data/repo/neovim/runtime/doc',
	\ '/Users/mhi/local/vim/share/vim/vim74/doc',
	\ ]

let g:startify_bookmarks=[
	\ { 'c': '~/.vimrc' },
	\ { 'z': '~/.zshrc' },
	\ { 'e': '~/.zshenv' },
	\ { 'a': '~/.aliases' },
	\ { 'c': '~/.profile' },
	\ ]

let g:startify_custom_footer= [
	\ '',
	\ "   Vim is charityware. Please read ':help uganda'.",
	\ ''
	\ ]

hi StartifyBracket ctermfg=240
hi StartifyFile    ctermfg=147
hi StartifyFooter  ctermfg=240
hi StartifyHeader  ctermfg=114
hi StartifyNumber  ctermfg=215
hi StartifyPath    ctermfg=245
hi StartifySlash   ctermfg=240
hi StartifySpecial ctermfg=240

let g:BufferListWidth=25
let g:BufferListMaxWidth=50
hi BufferSelected term=reverse ctermfg=white ctermbg=red cterm=bold
hi BufferNormal term=NONE ctermfg=black ctermbg=darkcyan cterm=NONE

" Custom mappings

" format json
nnoremap <Leader>J :%! python -m json.tool<CR>

" Search for visually selected text
" vnoremap // y/<C-r>"<CR>
" Search pattern with 'very no-magic' mode:
vnoremap // y/\V<C-r>"<CR>
" Handles backslashes but breaks on spaces
" vnoremap <expr> // 'y/\V'.escape(@",'\').'<CR>'

" Search for selected text, forwards or backwards.
" Press * to search forwards for selected text, or # to search backwards.
" As normal, press n for next search, or N for previous.
" Handles multiline selection and search.
" Whitespace in the selection matches any whitespace when searching
" (searching for 'hello world' will also find 'hello' at the end of a line,
" with 'world' at the start of the next line).
" Each search is placed in the search history allowing you to easily repeat
" previous searches.  No registers are changed.
vnoremap <silent> * :<C-U>
	\ let old_reg=getreg('"')<Bar>let old_regtype=getregtype('"')<CR>
	\ gvy/<C-r><C-r>=substitute(
	\ escape(@", '/\.*$^~['), '\_s\+', '\\_s\\+', 'g')<CR><CR>
	\ gV:call setreg('"', old_reg, old_regtype)<CR>
vnoremap <silent> # :<C-U>
	\ let old_reg=getreg('"')<Bar>let old_regtype=getregtype('"')<CR>
	\ gvy?<C-r><C-r>=substitute(
	\ escape(@", '?\.*$^~['), '\_s\+', '\\_s\\+', 'g')<CR><CR>
	\ gV:call setreg('"', old_reg, old_regtype)<CR>

" When using ^r/ in INSERT mode what one most of the time wants is to paste the
" matched text not the regex used to search the text.
function! Del_word_delims()
	let reg = getreg('/')
	" After * i^r/ will give me pattern instead of \<pattern\>
	let res = substitute(reg, '^\\<\(.*\)\\>$', '\1', '' )
	if res != reg
		return res
	endif
	" After * on a selection i^r/ will give me pattern instead of \Vpattern
	let res = substitute(reg, '^\\V'          , ''  , '' )
	let res = substitute(res, '\\\\'          , '\\', 'g')
	let res = substitute(res, '\\n'           , '\n', 'g')
	return res
endfunction
inoremap <silent> <C-r>/ <C-r>=Del_word_delims()<CR>
cnoremap <C-r>/ <C-r>=Del_word_delims()<CR>

" Quickly select the text that was just pasted. This allows you to, e.g.,
" indent it after pasting.
noremap gV `[v`]
" Stay in visual mode when indenting. You will never have to run gv after
" performing an indentation.
vnoremap < <gv
vnoremap > >gv
" Make Y yank everything from the cursor to the end of the line. This makes Y
" act more like C or D because by default, Y yanks the current line (i.e. the
" same as yy).
noremap Y y$

" Make Ctrl-e jump to the end of the current line in the insert mode. This is
" handy when you are in the middle of a line and would like to go to its end
" without switching the normal mode; add other readline shortcuts as well
" except <M-d> is mapped to <C-d>.
inoremap <C-e> <C-o>$
inoremap <C-a> <C-o>^
inoremap <C-w> <C-o>db
inoremap <C-d> <C-o>dw
" inoremap <C-k> <C-o>dd

inoremap jj <Esc>

" remove space when joining lines
" nnoremap J Jvd

" Allows you to easily replace the current word and all its occurrences.
nnoremap <Leader>rc :%s/\<<C-r><C-w>\>/
vnoremap <Leader>rc y:%s/<C-r>"/
" Allows you to easily change the current word and all occurrences to something
" else. The difference between this and the previous mapping is that the mapping
" below pre-fills the current word for you to change.
nnoremap <Leader>cc :%s/\<<C-r><C-w>\>/<C-r><C-w>
vnoremap <Leader>cc y:%s/<C-r>"/<C-r>"
" Replace tabs with four spaces. Make sure that there is a tab character between
" the first pair of slashes when you copy this mapping into your .vimrc!
nnoremap <Leader>rts :%s/	/    /g
nnoremap <Leader>r4t :%s/ \{4\}/	/g
nnoremap <Leader>r2t :%s/ \{2\}/	/g

" Remove ANSI color escape codes for the edited file. This is handy when
" piping colored text into Vim.
nnoremap <Leader>rac :%s/<C-v><Esc>\[\(\d\{1,2}\(;\d\{1,2}\)\{0,2\}\)\?[m\|K]//g
noremap <silent> <expr> j (v:count ? 'j' : 'gj')
noremap <silent> <expr> k (v:count ? 'k' : 'gk')
noremap <Leader>ew :e <C-r>=expand("%:p:h")."/"<CR>
noremap <Leader>et :tabe <C-r>=expand("%:p:h")."/"<CR>
noremap <Leader>het :tabe <C-r>=expand("~")."/"<CR>
noremap <Leader>eb :e <C-r>=expand("%:p:h")."/"<CR>
noremap <Leader>heb :e <C-r>=expand("~")."/"<CR>
noremap <Leader>[ :bdel<CR>
noremap <Leader>] :w<CR>
"noremap <Leader>; :bdel<CR>
" noremap <Leader>" mzI# `z
" nnoremap <Leader>" :reg<CR>
nnoremap <Leader>" :%s/ by / - /
" nnoremap <Leader>, mzI# `z
" nnoremap <Leader>. mzI" `z
" nnoremap <Leader>/ mzI// `z

" Toggle <Tab> lcs
nnoremap <expr> <Leader>, ':'.(execute('set lcs?')=~'tab' ? 'set lcs-=tab:>\ ' : 'set lcs^=tab:>\ ').'<CR>'
nnoremap <Leader>. :reg<CR>
" nnoremap <Leader>/ :s/
" nnoremap <Leader>, :s/ [^[:space:]]*:[0-9][0-9]//
" nnoremap <Leader>. :%s/[0-9]*\. //
" nnoremap <Leader>/ :%s/\(.*[^[:space:]]\)by\([^[:space:]].*\)/\2 - \1/
" nnoremap <Leader>" mzI" <Esc>`z
"nnoremap <Leader>/ i<C-r>=system('')

nnoremap <Leader>dw :wincmd p<CR>
nnoremap <Leader>a :A<CR>
" nnoremap <Leader>Q <Esc>:bdel<CR>
" vnoremap <Leader>Q :bdel<CR>
" noremap <Leader>Q <Esc>:q!<CR>
" nnoremap <Leader>C <Esc>:!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q .<CR>

" Allow saving of files as sudo when I forgot to start vim using sudo.
"nnoremap <Leader>u <Esc>:silent w! !sudo tee % >/dev/null<CR>
"nnoremap <Leader>s <Esc>:silent w! !sudo tee % >/dev/null<CR>
"cnoremap W w
"cnoremap Q q
command! W w
command! Q q
command! Wq wq
command! WQ wq
command! Qall qall
command! Qall qall
command! Wqall wqall
command! WQall wqall
"cabbrev wQ <C-r>=(getcmdtype()==':' && getcmdpos()==1 ? 'wq' : 'wQ')<CR>
"cnoremap w!! silent w !sudo dd of=%
" command! SudoWrite silent w !sudo sponge %
command! SudoWrite silent w !sudo sponge %
cabbrev w!! <C-r>=(getcmdtype()==':' && getcmdpos()==1 ? 'SudoWrite' : 'w!!')<CR>
cabbrev W! w!
cabbrev Q! q!
cabbrev wQ! wq!
cabbrev Wq! wq!
cabbrev WQ! wq!
cabbrev QAll! qall!
cabbrev QAll! qall!
cabbrev Wqall! wqall!
cabbrev wQall! wqall!
cabbrev WQall! wqall!

command! P PlugUpdate
cabbrev pu PlugUpdate

"<C-b> <Home>
"<C-e> <End>
cnoremap <C-a> <Home>
cnoremap <Esc>h <Left>
cnoremap <Esc>l <Right>
cnoremap <Esc>b <C-Left>
cnoremap <Esc>f <C-Right>
cnoremap <Esc>w <C-Right>
"<C-U> - backward kill line
cnoremap <C-k> <C-\>e strpart(getcmdline(), 0, getcmdpos()-1)<CR>
"<C-W> - backward kill word
cnoremap <Esc>d <C-\>e utils#CmdlineEmacsKillWord()<CR>
cnoremap <Esc>x <Delete>
cnoremap <C-l> <C-k>
cnoremap %% <C-r>=expand('%:h').'/'<CR>

"map [[ (
"map ]] )
"map ][ %
"map [] %
" map [[ ?{<CR>w99[{
" map ][ /}<CR>b99]}
" map ]] j0[[%/{<CR>
" map [] k$][%?}<CR>
map ; ^
map ' $
map ,, %

nnoremap gb :ls!<CR>:b<Space>
" nnoremap gb :call BufferList()<CR>
nnoremap <leader>f :find *
nnoremap <leader>s :sfind *
nnoremap <leader>v :vert sfind *
" nnoremap <leader>t :tabfind *
nnoremap <leader>F :find <C-R>=expand('%:h').'/*'<CR>
nnoremap <leader>S :sfind <C-R>=expand('%:h').'/*'<CR>
nnoremap <leader>V :vert sfind <C-R>=expand('%:h').'/*'<CR>
" nnoremap <leader>T :tabfind <C-R>=expand('%:h').'/*'<CR>
nnoremap <leader>T :tabfind *

nnoremap <F1> <Esc>:help <C-r>=(expand('<cword>').' ')<CR>
vnoremap <F1> <Esc>:help <C-r>=(getreg().' ')<CR>

noremap <Leader>; <Esc>:cclose<CR>
noremap <Leader>' <Esc>:copen<CR>
nnoremap <C-\|> :SCCompileRun<CR>

" nnoremap <C-]> g<C-]>
" vnoremap <C-]> g<C-]>
nnoremap <C-]> <Esc>:cstag <C-r>=(expand('<cword>'))<CR><CR>
vnoremap <C-]> <Esc>:cstag <C-r>=(expand('<cword>'))<CR><CR>
nnoremap g<C-]> <C-]>
vnoremap g<C-]> <C-]>

" nmap <silent> <C-j> k<Plug>(ale_previous_wrap)
" nmap <silent> <C-k> j<Plug>(ale_next_wrap)
" nmap <silent> <Leader>J k<Plug>(ale_previous_wrap)
" nmap <silent> <Leader>K j<Plug>(ale_next_wrap)
nmap <silent> <Esc>j k<Plug>(ale_previous)
nmap <silent> <Esc>k j<Plug>(ale_next)
nmap <silent> <Leader>J k<Plug>(ale_previous)
nmap <silent> <Leader>K j<Plug>(ale_next)
xmap <silent> <Esc>j k<Plug>(ale_previous)
xmap <silent> <Esc>k j<Plug>(ale_next)
xmap <silent> <Leader>J k<Plug>(ale_previous)
xmap <silent> <Leader>K j<Plug>(ale_next)

" vnoremap <Esc>[ :call comfortable_motion#flick(-75)<CR>|  nnoremap <Esc>[ :call comfortable_motion#flick(-75)<CR>
" inoremap <Esc>[ <Esc>:call comfortable_motion#flick(-75)<CR>li
" vnoremap <Esc>] :call comfortable_motion#flick(75)<CR>
" nnoremap <Esc>] :call comfortable_motion#flick(75)<CR>
" inoremap <Esc>] <Esc>:call comfortable_motion#flick(75)<CR>li

nnoremap <Esc>u <C-u>
nnoremap <Esc>d <C-d>
vnoremap <Esc>u <C-u>
vnoremap <Esc>d <C-d>
nnoremap <Esc>; :call comfortable_motion#flick(-75)<CR>
nnoremap <Esc>' :call comfortable_motion#flick(75)<CR>
vnoremap <Esc>; :call comfortable_motion#flick(-75)<CR>
vnoremap <Esc>' :call comfortable_motion#flick(75)<CR>
" inoremap <Esc>; <Esc>:call comfortable_motion#flick(-75)<CR>li
" inoremap <Esc>' <Esc>:call comfortable_motion#flick(75)<CR>li

" vnoremap <Esc>; <C-u>
" nnoremap <Esc>; <C-u>
" nnoremap <Esc>' <C-d>
" vnoremap <Esc>' <C-d>
"
" inoremap <Esc>c <Esc>"+yy<Esc>:call system("xsel -ib", getreg("\""))<CR>:call system("xsel -i", getreg("\""))<CR>li
" inoremap <Esc>v <Esc>:call setreg("\"",system("xsel -ob 2>/dev/null"))<CR>"+pli

" Open a Quickfix window for the last search.
nnoremap <silent> ,/ :execute 'vimgrep /'.@/.'/g %'<CR>:copen<CR>
nnoremap <Esc>- :vsplit<CR>:wincmd w<CR>:exec("tag ".expand("<cword>"))<CR>
vnoremap <Esc>- :vsplit<CR>:wincmd w<CR>:exec("tag ".expand("<cword>"))<CR>
nnoremap <Esc>= :tab split<CR>:exec("tag ".expand("<cword>"))<CR>
vnoremap <Esc>= :tab split<CR>:exec("tag ".expand("<cword>"))<CR>

noremap <Leader>q :s/^\(>*\) */\1> /<CR>
noremap <Leader>Q :s/^> *//<CR>

function! MoveToPrevTab()
	"there is only one window
	if tabpagenr('$')== 1 && winnr('$')== 1
		return
	endif
	"preparing new window
	let l:tab_nr=tabpagenr('$')
	let l:cur_buf=bufnr('%')
	if tabpagenr() != 1
		close!
		if l:tab_nr== tabpagenr('$')
			tabprev
		endif
		vert topleft split
	else
		close!
		exe "0tabnew"
	endif
	"opening current buffer in new window
	exe "b".l:cur_buf
endfunc
function! MoveToNextTab()
	"there is only one window
	if tabpagenr('$')== 1 && winnr('$')== 1
		return
	endif
	"preparing new window
	let l:tab_nr=tabpagenr('$')
	let l:cur_buf=bufnr('%')
	if tabpagenr() < tab_nr
		close!
		if l:tab_nr== tabpagenr('$')
			tabnext
		endif
		vert topleft split
	else
		close!
		tabnew
	endif
	"opening current buffer in new window
	exe "b".l:cur_buf
endfunc
nnoremap <Leader>mt <Esc>:call MoveToNextTab()<CR>
nnoremap <Leader>mT <Esc>:call MoveToPrevTab()<CR>

" Correctly parse F-keys in tmux
map [1;5Q <C-F2>
map [1;5R <C-F3>
map [1;5S <C-F4>
map [15;5~ <C-F5>
map [17;5~ <C-F6>
map [18;5~ <C-F7>
map [19;5~ <C-F8>
map [20;5~ <C-F9>
map [24;5~ <C-F12>
map [12^ <C-F2>
map [13^ <C-F3>
map [14^ <C-F4>
map [15^ <C-F5>
map [17^ <C-F6>
map [18^ <C-F7>
map [19^ <C-F8>
map [20^ <C-F9>
map [24^ <C-F12>
map <F6> <M-F6>
map <F7> <M-F7>
map <F8> <M-F8>
map <F9> <M-F9>
map <F12> <M-F12>

" nnoremap <F2> <Esc>:tabp<CR>
nnoremap <F2> <Esc>:bprev<CR>
nnoremap <C-F2> 0dw
" nnoremap <F3> <Esc>:tabn<CR>
nnoremap <F3> <Esc>:bnext<CR>
nnoremap <C-F3> :A<CR>

nnoremap <Leader>o :diffget<CR>]c
nnoremap <Leader>p :diffput<CR>]c
vnoremap <Leader>o :'<,'>diffget<CR>]c
vnoremap <Leader>p :'<,'>diffput<CR>]c
noremap <Leader>- <Esc>[c
noremap <Leader>= <Esc>]c
nnoremap -- [c
nnoremap == ]c
nnoremap =- :diffget<CR>]c
nnoremap -= :diffput<CR>]c
" nnoremap <F4> :diffget<CR>]c
" nnoremap <F5> :diffput<CR>]c
" vnoremap <F4> :'<,'>diffget<CR>]c
" vnoremap <F5> :'<,'>diffput<CR>]c
nnoremap <F4> :cprevious<CR>
vnoremap <F4> :cprevious<CR>
nnoremap <F5> :cnext<CR>
vnoremap <F5> :cnext<CR>
" nnoremap <C-F10> <C-w>=
" vnoremap <C-F10> <C-w>=

" pancake's exposee for vim:
let g:fs=0
function! Exposee()
	if (g:fs == 0)
		res 1000
		vertical res 1000
		let g:fs=1
	else
		exe "normal \<C-w>="
		let g:fs=0
	endif
endfun
nnoremap <F11> :call Exposee()<CR>
vnoremap <F11> :call Exposee()<CR>
nnoremap <C-F11> :make<CR>
vnoremap <C-F11> :make<CR>

noremap <Esc><F4> [c
noremap <Esc><F5> ]c
" nnoremap <F4> :ls<CR>
" nnoremap <Esc><F4> :set scrollbind<CR>
" " <F5> used by Ctrl-P
" nnoremap <Esc><F5> :set noscb<CR>

" Clipboard mappings
vmap <F6> "+y<Esc>:call system("xsel -ib", getreg("\""))<CR>:call system("xsel -i", getreg("\""))<CR>
vmap <C-F6> <F6>v`>"+x
vmap <Esc><F6> <F6>v`>
nmap <F7> :call setreg("\"",system("xsel -op 2>/dev/null"))<CR>"+p
nmap <C-F7> :set paste<CR>i<CR><CR><Esc>k:.!xsel -op<CR>JxkJx:set nopaste<CR>
"nmap <C-F7> mz:call setreg("\"",system("xsel -op 2>/dev/null"))<CR>"+gP
nmap <Esc><F7> mz:-1r !xsel -op 2>/dev/null<CR>`z
nmap <F8> <Esc>:<C-r>=('verbose map' . ' ')<CR>

" Fix for Backspace with Caps Lock on
function! Backspace()
	if col('.') == 1
		if line('.')  != 1
			return  "\<ESC>kA\<Del>"
		else
			return ""
		endif
	else
		return "\<Left>\<Del>"
	endif
endfunction
inoremap  <c-r>=Backspace()<CR>

let g:tfold=1
function! ToggleFold()
	if g:tfold
		silent! 0,$foldc!
		let g:tfold=0
	else
		silent! 0,$foldo!
		let g:tfold=1
	endif
endfunction
nnoremap <C-F8> :call ToggleFold()<CR>
" let g:tverbose=0
" function! ToggleVerbose()
"     if g:tverbose
"         set verbose=0
"         let g:tverbose=0
"     else
"         set verbose=9
"         let g:tverbose=1
"     endif
" endfunction
" nnoremap <C-F8> :call ToggleVerbose()<CR>
" let g:thex=0
" function! ToggleHex()
"     if g:thex== 0
"         set display=uhex,lastline
"         let g:thex=1
"     elseif g:thex== 1
"         set display=
"         let g:thex=2
"    else
"         set display=lastline
"         let g:thex=0
"     endif
" endfunction
" nnoremap <Esc><F8> :call ToggleHex()<CR>
let g:tindent=0
function! ToggleIndent()
	if g:tindent== 0
		set shiftwidth=4
		let g:tindent=1
	elseif g:tindent== 1
		set shiftwidth=1
		let g:tindent=2
	else
		set shiftwidth=8
		let g:tindent=0
	endif
endfunction
nnoremap <C-F9> :call ToggleIndent()<CR>
let g:txxd=0
function! ToggleXXD()
	if g:txxd
		edit!
		let g:txxd=0
	else
		% !xxd
		let g:txxd=1
	endi
endfunction
nnoremap <Esc><F9> :call ToggleXXD()<CR>
let g:m32=0
" 32-bit assembly
function! ToggleASM()
	if g:m32
		let g:ale_asm_gcc_options=''
		echo g:ale_asm_gcc_options
		:call ale#Queue(0)
		let g:m32=0
	else
		let g:ale_asm_gcc_options='-m32'
		echo g:ale_asm_gcc_options
		:call ale#Queue(0)
		let g:m32=1
	endi
endfunction
nnoremap <Leader>A :call ToggleASM()<CR>

"There are no default mappings for toggling all marks and for the |:MarkClear|
"command, but you can define some yourself: >
		nmap <Leader>M <Plug>MarkToggle
		"nmap <Leader>N <Plug>MarkAllClear
"As the latter is irreverible, there's also an alternative with an additional
"confirmation: >
		nmap <silent> <Leader>N <Plug>MarkConfirmAllClear
"To remove the default overriding of * and #, use: >
		nmap <Plug>IgnoreMarkSearchNext <Plug>MarkSearchNext
		nmap <Plug>IgnoreMarkSearchPrev <Plug>MarkSearchPrev
"If you don't want the * and # mappings remember the last search type and
"instead always search for the next occurrence of the current mark, with a
"fallback to Vim's original * command, use: >
		nmap * <Plug>MarkSearchOrCurNext
		nmap # <Plug>MarkSearchOrCurPrev
"The search mappings (*, #, etc.) interpret [count] as the number of
"occurrences to jump over. If you don't want to use the separate
"|mark-keypad-searching| mappings, and rather want [count] select the highlight
"group to target (and you can live with jumps restricted to the very next
"match), (re-)define to these mapping targets: >
		"nmap * <Plug>MarkSearchGroupNext
		"nmap # <Plug>MarkSearchGroupPrev
"You can remap the direct group searches (by default via the keypad 1-9 keys): >
		nmap <Leader>1  <Plug>MarkSearchGroup1Next
		nmap <Leader>!  <Plug>MarkSearchGroup1Prev
		nmap <Leader>2  <Plug>MarkSearchGroup2Next
		nmap <Leader>3  <Plug>MarkSearchGroup2Next
		nmap <Leader>4  <Plug>MarkSearchGroup2Next
		nmap <Leader>5  <Plug>MarkSearchGroup2Next
		nmap <Leader>6  <Plug>MarkSearchGroup2Next
		nmap <Leader>7  <Plug>MarkSearchGroup2Next
		nmap <Leader>8  <Plug>MarkSearchGroup2Next
		nmap <Leader>9  <Plug>MarkSearchGroup2Next
"+g:mwDirectGroupJumpMappingNum*
" *mark-whitespace-indifferent*
"Some people like to create a mark based on the visual selection, like
"|v_<Leader>m|, but have whitespace in the selection match any whitespace when
"/gsearching (searching for 'hello world' will also find 'hello<Tab>world' as
"/gwell as 'hello' at the end of a line, with 'world' at the start of the next
"line). The Vim Tips Wiki describes such a setup for the built-in search at
"    http://vim.wikia.com/wiki/Search_for_visually_selected_text
"You can achieve ye with the Mark plugin through the <Plug>MarkIWhiteSet
"mapping target: Using this, you can assign a new visual mode mapping <Leader>* >
		" xmap <Leader>* <Plug>MarkIWhiteSet
"or override the default |v_<Leader>m| mapping, in case you always want this
"behavior: >
		vmap <Plug>IgnoreMarkSet <Plug>MarkSet
		xmap <Leader>m <Plug>MarkIWhiteSet
