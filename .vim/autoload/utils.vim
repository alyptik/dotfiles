" vim: ft=vim fdm=marker

function! utils#EchoWarn(msg) abort
    if !empty(a:msg)
        redraw
        echohl WarningMsg | echomsg a:msg | echohl None
    endif
endfunction

function! utils#EchoError(msg) abort
    if !empty(a:msg)
        redraw
        echohl ErrorMsg | echomsg a:msg | echohl None
    endif
endfunction

function! utils#EchoException() abort
    call utils#EchoError(substitute(v:exception, '^Vim(.*):', '', 'g'))
endfunction

" ----------------------------------------

function! utils#BufSpecial() abort
    setl nonu nornu nowrap nolist nobl cc=0 fdc=0
endfunction

function! utils#CmdlineEmacsKillWord() abort
    let buf = getcmdline()
    let pos = getcmdpos()-1
    let idx = match(buf, '\>', pos)
    return strpart(buf, 0, pos).(idx < 0 ? '' : strpart(buf, idx))
endfunction

function! utils#CmdlineKillWord() abort
    let buf = getcmdline()
    let pos = getcmdpos()-1
    let idx = match(buf, '^\@<!\<', pos)
    return strpart(buf, 0, pos).(idx < 0 ? '' : strpart(buf, idx))
endfunction

function! utils#TryCatch(cmd, ...) abort
    try
        if exists('a:1')
            exec printf('try | exec "%s" | catch /%s/ | exec "%s" | endtry',
                \ escape(a:cmd, '"\'), get(a:, '2', '.*'), escape(a:1, '"\'))
        else
            exec a:cmd
        endif
    catch /.*/
        call utils#EchoException()
    endtry
endfunction

function! utils#mkdir(path) abort
    if !isdirectory(a:path)
        call mkdir(a:path, 'p')
    endif
endfunction
