" Description: CMake bootstrap plugin
" Maintainer:  Richard Quirk richard.quirk at gmail.com
" License:     Apache License 2.0
"
" To install cmake completion, copy the contents of this file to
"   $HOME/.vim/plugin/cmakecomplete.vim
" And the associated autoload file to:
"   $HOME/.vim/autoload/cmakecomplete.vim
"
" The CMakeHelp command shows full help, or can be filtered by command

"""
" Copyright 2009 Richard Quirk
"
" Licensed under the Apache License, Version 2.0 (the "License"); you may not
" use this file except in compliance with the License. You may obtain a copy of
" the License at http://www.apache.org/licenses/LICENSE-2.0
"
" Unless required by applicable law or agreed to in writing, software
" distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
" WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
" License for the specific language governing permissions and limitations under
" the License.
"""
if exists('did_cmakecomplete') || &cp || version < 700
    finish
endif
let did_cmakecomplete = 1
command! -nargs=* -complete=customlist,cmakecomplete#HelpComplete  CMakeHelp call cmakecomplete#Help(<f-args>)
autocmd FileType cmake set omnifunc=cmakecomplete#Complete
autocmd FileType cmake setlocal completeopt+=preview

if !exists('g:cmake_map_keys')
    let g:cmake_map_keys = 1
endif

if g:cmake_map_keys
    autocmd FileType cmake nnoremap <silent> <buffer> K :call cmakecomplete#Help(expand("<cword>"))<CR>
endif
