if exists('b:current_syn')
  finish
endif
if exists('manpagename')
exe "syn match manPAGENAME /".manpagename."\ /"
exe "hi manPAGENAME ctermfg=14"
endif


syn case  ignore
syn match manReference       '\f\+(\%([0-8][a-z]\=\|n\))'
syn match manOptionDesc /-[[:alnum:]]\+/ 
syn match manOptionDesc /\.\.\./ 
syn match manOptionDesc /\ \|\[-[[:alnum:]]\+\(\ \+\|\)[[:alnum:]]\+/hs=s+1
syn match manOptionDesc /\[[[:alnum:]]\+\(\|\ \+\)[[:alnum:]]\+/hs=s+1
syn match manLongOptionDesc /--[[:alnum:]]\+/
syn match manLongOptionDesc /--[[:alnum:]]\+\ \|=[[:alnum:]]\+/
syn match manLongOptionDesc /--[[:alnum:]]\+\(\ \|-[[:alnum:]]\+\)/

 " prevent manSectionHeading from matching last line
exe 'syn match manSectionHeading  "^\%(\%>1l\%<'.line('$').'l\)\%(\S.*\)\=\S$"'

syn match manSubHeading      '^\s\{3\}\%(\S.*\)\=\S$'

hi String ctermfg=6
hi manTitle          cterm=none ctermbg=0 ctermfg=250
hi manSectionHeading cterm=none ctermbg=none ctermfg=15
hi manOptionDesc     cterm=none ctermbg=none ctermfg=5
hi manLongOptionDesc cterm=none ctermbg=none ctermfg=5
hi manOptionOption cterm=none ctermbg=none ctermfg=62
hi manReference      cterm=none ctermbg=none ctermfg=2
hi manSubHeading     cterm=none ctermbg=none ctermfg=31
hi manNameSectionHeading cterm=none ctermbg=none ctermfg=32
hi manNameSectionHeadingText cterm=none ctermbg=none ctermfg=32
hi manOptionDescRLSqBrkt cterm=none ctermbg=none ctermfg=32
hi manOptionDescRSqBrkt cterm=none ctermbg=none ctermfg=32
hi manOptionDescLSqBrkt cterm=none ctermbg=none ctermfg=32



if getline(1) =~ '^[a-zA-Z_]\+([23])'
  syn include @cCode /home/alyptik/.vim/syntax/calt.vim
  syn match manCFuncDefinition display '\<\h\w*\>\s*('me=e-1 contained
  syn region manSynopsis start="^SYNOPSIS"hs=s+8 end="^\u\+\s*$"me=e-12 keepend contains=manSectionHeading,@cCode,manCFuncDefinition
endif

let b:current_syn = 'man'
