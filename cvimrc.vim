set smoothscroll
set hud
set completeonopen
set localconfig
"set showtabindices
set incsearch
set typelinkhints
set numerichints
set dimhintcharacters
set linkanimations
set scalehints
set noautofocus

let scrollduration=1250
let homedirectory = $HOME
let barposition = 'top'
" let barposition = 'bottom'
let mapleader = '\\'
let configpath = '~/cvimrc.vim'
let vimport = '8001'
" let vimcommand = 'gvim -f --servername VIM'
let vimcommand = 'gvim -f'
let completionengines = ['google', 'wikipedia', 'youtube', 'imdb', 'amazon', 'google-maps', 'wolframalpha', 'google-image', 'webster', 'wictionary', 'urbandictionary', 'duckduckgo', 'google-trends', 'bing']
"let completionengines = ['google', 'wikipedia', 'youtube', 'imdb', 'amazon', 'google-maps', 'wolframalpha', 'google-image', 'ebay', 'webster', 'wictionary', 'urbandictionary', 'duckduckgo', 'answers', 'google-trends', 'google-finance', 'yahoo', 'bing', 'themoviedb']

imap <A-;> beginningOfLine
imap <A-'> endOfLine
imap <A-\> deleteToBeginning
imap <A-]> deleteForwardWord
imap <A-[> deleteWord

map <Leader>c clearSearchHighlight
map <Leader>d :duplicate<CR>
map <Leader>s :settings<CR>
map <Leader>h :history!<Space>
" map <Leader>g :open! google<CR>
map <Leader>p openPasteTab
map <Leader>, :tabattach<Space>
map <Leader>. :tabdetach<CR>
map <Leader>/ :source ~/cvimrc.vim<CR>
map <Leader>? :open! https://github.com/1995eaton/chromium-vim<CR>

map b :bookmarks!<Space>
map <A-w> closeTab
map R reloadAllTabs
map ` percentScroll
map <A-a> reloadTab
map <A-,> goToInput
map <A-.> :source ~/cvimrc.vim<CR>
" map <A-.> :execute<Space><Esc><CR>
" map <A-.> openLinkSearchBar
" map <A-.> toggleVisualMode
map gb :buffer<Space>
map <A-/> lastUsedTab
map vv toggleVisualMode
map vy yankHighlight
map vu clearSearchHighlight
map = zoomPageIn
map - zoomPageOut
map <A--> scrollFullPageUp
map <A-=> scrollFullPageDown
map <Space> scrollPageDown
map ' scrollPageDown
map ; scrollPageUp
map <A-'> nextTab
map <A-;> previousTab
