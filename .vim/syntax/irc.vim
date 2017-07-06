let b:names = []

function! Hash(str)
  let num = 0
  for chr in split(a:str, '\zs')
    let num = (num+19+char2nr(chr)) % 216
  endfor
  return num+16
endfunction

function! DoName(name)
  if index(b:names, a:name) >= 0 | return | endif
  call add(b:names, a:name)
  let key  = substitute(a:name, '[^a-zA-Z0-9_@. ]', '',       'g')
  let ptrn = substitute(a:name, '[^a-zA-Z0-9_@. ]', '\\S\\?', 'g')
  let clr  = Hash(key)

  exec 'syn match c'.clr.' "\<'.ptrn.'\>"'
  exec 'syn cluster ircNames add=c' . clr
  exec 'hi def c'.clr.' ctermfg=' . clr
endfunction

function! DoNames()
  for line in getline(0, '$')
    let name = matchstr(line, '\v([\(\[]?[0-9-]* *\d\d:\d\d(:\d\d)? *[APM]*[)\]]?|^)\s*(\<[-+*@ ]?)?#?\zs[a-zA-Z0-9#|_@. \\]+\ze[:>]\s', '\1', '')
    if name != ''
      call DoName(name)
    endif
  endfor
endfunction

syn match ircSpeaker "\v(\<[-+*@ ]*)?[a-zA-Z0-9#\[\]\{\}|_@. ]+[:>]\s"            contained contains=@ircNames skipwhite nextgroup=ircName
syn match ircName    "\v[a-zA-Z0-9#-|_@.]+:\s"                                    contained contains=@ircNames skipwhite nextgroup=ircName
syn match ircMsg    "\v(.+)$"                                                     contained contains=ircName   skipwhite nextgroup=ircName
syn match ircError  "\v(error)"
syn match ircDate    "\v([\(\[]?[0-9-]* *\d\d:\d\d(:\d\d)?[APMapm]*[)\]]?|^)"     contained                    skipwhite nextgroup=ircSys,ircSpeaker
syn match ircDo     "\v\&.+"                                                      contains=@ircDate
syn match ircSys     "\v^Conversation.*"                                          contained
syn match ircSys     "\v(\w|\>|-)+[^:<]\s.*"                                      contained contains=@ircNames
syn match ircFile    "\v(\d{4}-\d{2}-\d{2}\.\d{6}([-+]\d{4}\u{3})?.txt:|^)"                                              nextgroup=ircDate
syn match ircURL     "\v(http://|wwww.)\S+"
syn match comment    "^#.*"

"let r_ircSpeaker = "\v(\<[-+*@ ]*)?[a-zA-Z0-9#\[\]\{\}|_@. ]+[:>]\s"
"execute 'syn match ircSpeaker /' .  r_ircSpeaker . '/ contained contains=@ircNames skipwhite nextgroup=ircName'


syn cluster ircNames contains=NONE
call DoNames()
syn match ircIncr    "\w\+++" contains=@ircNames
syn match ircDecr    "\w\+--" contains=@ircNames

syn cluster ircColors contains=ircDecr,ircIncr

hi def comment Comment

if &t_Co > 255
  hi ircDo      ctermfg=197 ctermbg=000 cterm=bold
  hi ircMsg     ctermfg=250 ctermbg=000 cterm=none
  hi ircError   ctermfg=196 ctermbg=000 cterm=bold
  hi ircFile    ctermfg=220 ctermbg=000 cterm=bold

  hi ircSys     ctermfg=241 ctermbg=000 cterm=none
  hi ircDate    ctermfg=245 ctermbg=235 cterm=bold
  hi ircURL     ctermfg=027 ctermbg=000 cterm=bold
  hi ircIncr    ctermfg=034 ctermbg=000 cterm=bold
  hi ircDecr    ctermfg=196 ctermbg=000 cterm=bold
  hi ircName    ctermfg=172 ctermbg=000 cterm=bold
  hi ircSpeaker ctermfg=137 ctermbg=233 cterm=bold

else
  hi ircDo      ctermfg=002 ctermbg=000 cterm=bold
  hi ircMsg     ctermfg=003 ctermbg=000 cterm=none
  hi ircError   ctermfg=004 ctermbg=000 cterm=bold
  hi ircFile    ctermfg=005 ctermbg=000 cterm=bold

  hi ircSys     ctermfg=006 ctermbg=000 cterm=none
  hi ircDate    ctermfg=007 ctermbg=235 cterm=bold
  hi ircURL     ctermfg=010 ctermbg=000 cterm=bold
  hi ircIncr    ctermfg=009 ctermbg=000 cterm=bold
  hi ircDecr    ctermfg=010 ctermbg=000 cterm=bold
  hi ircName    ctermfg=011 ctermbg=000 cterm=bold
  hi ircSpeaker ctermfg=012 ctermbg=233 cterm=bold
endif

let b:current_syntax = "irc"
