#!/usr/bin/env zsh
#
# .zshrc - zsh stuff and thingys

# cleanup traps
trap '{ cleanup; trap -; }' USR1 ERR EXIT
trap '{ cleanup; trap -; kill -INT $$; }' INT

# redirect errors to a temporary fd, and then append them to a log file
_zsh_error="$(mktemp)"
exec {_stderr}>&2
exec 2<>"$_zsh_error"
rm -f -- "$_zsh_error"

# setopt arrays
() {
	local -a unset_arr set_arr
	unset_arr+=(alwaystoend autolist automenu caseglob casematch checkjobs)
	unset_arr+=(correctall extendedhistory flowcontrol histfcntllock)
	unset_arr+=(globalexport globcomplete globsubst histfcntllock histignorespace)
	unset_arr+=(histsavebycopy histverify multios nomatch printexitvalue)
	unset_arr+=(sharehistory verbose)
	set_arr+=(appendhistory autocd autopushd bareglobqual beep casematch)
	set_arr+=(cbases chaselinks clobber completeinword correct cprecedences)
	set_arr+=(equals extendedglob globdots globstarshort hashlistall)
	set_arr+=(histexpiredupsfirst histignorealldups histignoredups)
	set_arr+=(histreduceblanks hup incappendhistory interactivecomments)
	set_arr+=(kshoptionprint listambiguous listpacked longlistjobs magicequalsubst)
	set_arr+=(octalzeroes markdirs menucomplete monitor multibyte notify)
	set_arr+=(pathdirs pipefail promptsubst pushdignoredups pushdminus)
	set_arr+=(pushdtohome rematchpcre transientrprompt)
	() for 1 { unsetopt "$1"; }  $unset_arr
	() for 1 { setopt "$1"; } $set_arr
}

# emacs mang...
[[ "$EMACS" == t ]] && unsetopt zle
() for 1 { zle -N "$1"; } zle-keymap-select zle-line-init zle-line-finish
KEYTIMEOUT=15
bindkey -v
# initialize _km for zle widgets and set initial cursor color
_km=vi _emacs= _vi=main
setescapes
case "$_km" in
vi)
	printf "$cblock"
	printf "$cgrey"
	;;
emacs)
	printf "$cblock"
	printf "$cyellow"
	;;
esac

# vi motion stuff
() for 1 {
	autoload -Uz $1
	zle -N $1
} select-bracketed select-quoted

# lol
() for 1 {
	() for 1 2 { bindkey -M $1 $2 select-bracketed; } ${(s: :)^:-$1 {a,i}${(s..)^:-'()[]{}<>bB'}}
	() for 1 2 { bindkey -M $1 $2 select-quoted; } ${(s: :)^:-$1 {a,i}${(s..)^:-\'\"\`\|,./:;-=+@}}
} visual viopp
# above is equivalent to this:
# for m in visual viopp; do
#         for c in {a,i}${(s..)^:-'()[]{}<>bB'}; do
#                 bindkey -M $m $c select-bracketed
#         done
#         for c in {a,i}${(s..)^:-\'\"\`\|,./:;-=+@}; do
#                 bindkey -M $m $c select-quoted
#         done
# done

# ^b: history expansion ^f: quick history substitution #: comment character
# histchars=$'\2\6#'
histchars='!^#'
HISTFILE="$HOME/.zsh_history"
ZSH_CACHE_DIR="$ZDOTDIR/cache"
[[ ! -d "$ZSH_CACHE_DIR" ]] && mkdir "$ZSH_CACHE_DIR"
type zshreadhist &>/dev/null && precmd_functions=(zshreadhist $precmd_functions)
zstyle ':completion:*'			use-cache yes
zstyle ':completion::complete:*'	cache-path "$ZSH_CACHE_DIR"
zstyle ':completion::complete:*'	rehash true
zstyle ':history-search-multi-word'	page-size 5
autoload -Uz colors && colors
eval "$(dircolors -b)"
typeset -gx ZLS_COLORS

# modules
() {
	local -a au_arr zle_arr zmod_arr zle_cust
	au_arr+=(edit-command-line expand-absolute-path)
	au_arr+=(down-line-or-beginning-search filter-select)
	au_arr+=(insert-composed-char insert-unicode-char)
	au_arr+=(regexp-replace run-help tetriscurses tetris)
	au_arr+=(up-line-or-beginning-search which-command)
	au_arr+=(zargs zed zkbd zmv zrecompile)
	# zle_arr+=(bracketed-paste bracketed-paste-magic)
	zle_arr+=(edit-command-line expand-absolute-path)
	zle_arr+=(down-line-or-beginning-search execute-named-command)
	zle_arr+=(insert-composed-char insert-unicode-char tetris)
	zle_arr+=(up-line-or-beginning-search which-command)
	zle_arr+=(zmv znt-history-widget znt-cd-widget znt-kill-widget)
	zmod_arr+=(zsh/clone zsh/complist zsh/curses zsh/datetime zsh/db/gdbm)
	zmod_arr+=(zsh/deltochar zsh/mapfile zsh/mathfunc zsh/net/socket)
	zmod_arr+=(zsh/net/tcp zsh/pcre zsh/regex zsh/stat zsh/terminfo)
	zmod_arr+=(zsh/system zsh/zftp zsh/zprof zsh/zpty zsh/zselect)
	zle_cust+=(fzf-locate-widget insert-composed-char)
	zle_cust+=(append-clip-selection insert-clip-selection yank-clip-selection)
	zle_cust+=(append-x-selection insert-x-selection yank-x-selection)
	zle_cust+=(zle-backwards-delete-to-char zle-backwards-zap-to-char)
	zle_cust+=(zle-compdef zle-emacs-keymap zle-fh zle-fman zle-less)
	zle_cust+=(zle-list-binds zle-locate-widget zle-refresh-keymap)
	zle_cust+=(zle-run-help zle-toggle-keymap zle-vi-keymap zle-vim)
	zle_cust+=(zle-youtube-helper zle-zaw-help)
	() for 1 { zle -N "$1"; } $zle_arr $zle_cust
	() for 1 { zmodload "$1"; } $zmod_arr
	() for 1 { autoload -Uz "$1"; } $au_arr
	# equiv of bash's "help"
	unalias help run-help which-command 2>/dev/null
	alias help='run-help'
}

# uncomment to avoid git parsing
# unfunction git_prompt_string
# function git_prompt_string () {}
# check_vcs=false

RPS1='$(check_last_exit_code)%(?,%F{green},%F{red} ┐❨ツ❩┌ )%f$(git_prompt_string)'

# load VCS module
autoload -Uz vcs_info
if type vcs_info &>/dev/null; then
	zstyle ':vcs_info:*' enable git
	zstyle ':vcs_info:*' disable bzr cdv cvs darcs mtn svk svn tla
	zstyle ':vcs_info:*' check-for-changes ${check_vcs:-true}
	zstyle ':vcs_info:*:prompt:*' check-for-changes ${check_vcs:-true}
	zstyle ':vcs_info:*:prompt:*' stagedstr "%F{blue}*%f"
	zstyle ':vcs_info:*:prompt:*' unstagedstr "%F{red}*%f"
	zstyle ':vcs_info:*:prompt:*' branchformat "%r"
	zstyle ':vcs_info:*:prompt:*' formats "%u%c%F{green}[%b]%f"
	zstyle ':vcs_info:*:prompt:*' nvcsformats ""
	zstyle ':vcs_info:*' actionformats \
		'%F{5}(%f%s%F{5})%F{3}-%F{5}[%F{2}%b%F{3}|%F{1}%a%F{5}]%f '
	zstyle ':vcs_info:*' formats \
		'%F{5}(%f%s%F{5})%F{3}-%F{5}[%F{2}%b%F{5}]%f '
	zstyle ':vcs_info:(sv[nk]|bzr):*' branchformat '%b%F{1}:%F{3}%r'
	zstyle ':vcs_info:git:*' actionformats \
		'%F{3}-%F{5}(%F{7}%r/%S%F{2}[%F{2}%m%F{9}%u%F{6}%c%F{2}]%F{5})%f '
	zstyle ':vcs_info:git:*' formats \
		'%F{3}-%F{5}(%F{7}%r/%S%F{2}[%F{2}%m%F{9}%u%F{6}%c%F{2}]%F{5})%f '
	precmd_functions=(vcs_info $precmd_functions)
	RPS1+='${vcs_info_msg_0_}'
fi

# prepend zcompiled functions/completions to fpath
fpath[1,0]="$HOME/.local/share/zsh/site-functions"
fpath[1,0]="$ZDOTDIR/zcomps.zwc"
fpath[1,0]="$ZDOTDIR/zfuncs.zwc"
autoload -Uz promptinit && promptinit
autoload -Uz +X compinit && compinit -u
# autoload functions/completions in *.zwc files
() for 1 2 { autoload -Uwz "$1"; autoload -Uwz +X "$2"; } "${(@Mz)fpath%%*.zwc}"
# autoload completion for systemctl subcommand compdefs
[[ "$(type _git)" =~ "autoload" ]] && autoload -Uz +X _git
[[ "$(type _pacman)" =~ "autoload" ]] && autoload -Uz +X _pacman
[[ "$(type _systemctl)" =~ "autoload" ]] && autoload -Uz +X _systemctl

# common PS1 section
PS1='$prompt_newline$(print -n "%{$reset_color%}%{$bold_color%}%{$fg[grey]%}['
# avoid errors if proc isn't mounted
if [[ -d /proc ]]; then
	PS1+='%{$reset_color%}%{$fg[green]%}$((('
	PS1+='$(sed -nr "s/MemTotal:\s+([0-9]+) kB/\1/Ip" /proc/meminfo) - '
	PS1+='$(sed -nr "s/MemAvailable:\s+([0-9]+) kB/\1/Ip" /proc/meminfo))/1024))'
	PS1+='%{$reset_color%}%{$bold_color%}%{$fg[grey]%}/'
	PS1+='%{$reset_color%}%{$fg[yellow]%}$(('
	PS1+='$(sed -nr "s/MemTotal:\s+([0-9]+) kB/\1/Ip" /proc/meminfo)/1024))MB'
	PS1+='%{$bold_color%}%{$fg[grey]%}] [%{$fg[magenta]%}$(</proc/loadavg)"'
else
	PS1+='%{$fg[magenta]%}wat where is /proc"'
fi
PS1+='%{$bold_color%}%{$fg[grey]%}]) '
PS1+='%{$bold_color%}%{$fg[grey]%}[%{$reset_color%}%{$fg[white]%}j'
PS1+='%{$bold_color%}%{$fg[grey]%}:%{$reset_color%}%{$fg[white]%}%j %l'
PS1+='%{$bold_color%}%{$fg[grey]%}]%{$reset_color%}%{$fg[cyan]%} '
# prompt char is cyan for normal users
if ((EUID)); then
	PS1+='%{$bold_color%}%{$fg[grey]%}[%{$bold_color%}%{$fg[green]%}%n@%m'
	PS1+='%{$bold_color%}%{$fg[grey]%}:%{$reset_color%}%{$fg[white]%}$SSH_TTY '
	PS1+='%{$bold_color%}%{$fg[red]%}+$SHLVL'
	PS1+='%{$bold_color%}%{$fg[grey]%}] '
	PS1+='%{$bold_color%}%{$fg[yellow]%}%~$prompt_newline'
	PS1+='%{$bold_color%}%{$fg[grey]%}(%{$reset_color%}%{$fg[white]%}!!'
	PS1+='%{$bold_color%}%{$fg[grey]%}:%{$reset_color%}%{$fg[white]%}%!'
	PS1+='%{$bold_color%}%{$fg[grey]%})%{$reset_color%}%{$fg[cyan]%} '
	PS1+='%(!.#.$) %{$reset_color%}'
else
	# prompt char is red for root
	PS1+='%{$bold_color%}%{$fg[grey]%}[%{$bold_color%}%{$fg[red]%}%n@%m'
	PS1+='%{$bold_color%}%{$fg[grey]%}:%{$reset_color%}%{$fg[white]%}$SSH_TTY '
	PS1+='%{$bold_color%}%{$fg[green]%}+$SHLVL'
	PS1+='%{$bold_color%}%{$fg[grey]%}] '
	PS1+='%{$bold_color%}%{$fg[yellow]%}%~$prompt_newline'
	PS1+='%{$bold_color%}%{$fg[grey]%}(%{$reset_color%}%{$fg[white]%}!!'
	PS1+='%{$bold_color%}%{$fg[grey]%}:%{$reset_color%}%{$fg[white]%}%!'
	PS1+='%{$bold_color%}%{$fg[grey]%})'
	PS1+='%{$bold_color%}%{$fg[red]%} '
	PS1+='%(!.#.$) %{$reset_color%}'
fi

# hurry up and source stuff so we can get cow news
() for 1 { . "$1"; } "$ZDOTDIR"/plugins/enabled/*.zsh(N)
if type fasd &>/dev/null; then eval "$(fasd --init auto)"; fi
if type filter-select &>/dev/null; then filter-select -i; bindkey -M filterselect "\C-e" accept-search; fi
if [[ -f "$HOME/.aliases" ]]; then . "$HOME/.aliases"; fi

# add function reserved word alias
aliases[fun]='function'

# add noglob aliases
aliases[=]='noglob ='
aliases[g]='noglob g'
aliases[o]='noglob o'
aliases[cb]='noglob cb'
aliases[pe]='noglob perl -pe'
aliases[yt]='noglob youtube-dl -f bestaudio --write-all-thumbnails --write-description'
aliases[ampv]='noglob mpv --no-video --load-unsafe-playlists --ytdl-format=bestaudio/best'

# archlinux news
# news_short
# news_long

# woo cow
() {
	local -a cmdline dig host muhcows
	host=(host -W 1 -t)
	dig=(dig +short +timeout=1)
	cmdline=($host txt istheinternetonfire.com)
	muhcows=(${:-/usr/share/cowsay/cows/*.cow(.)})
	$cmdline | cut -f2 -d'"' | cowsay -W 50 -f ${muhcows[RANDOM % $#muhcows + 1]}
	# add an extra newline
	print
}
safetytoggle -n

# fzf
FZF_COMPLETION_TRIGGER="**"
fzf_default_completion="complete-word"
# zsh syntax highlighting
typeset -ga ZSH_HIGHLIGHT_HIGHLIGHTERS
ZSH_HIGHLIGHT_PATTERNS+=('rm -rf' 'fg=white,bold,bg=red')
ZSH_HIGHLIGHT_HIGHLIGHTERS=(brackets line main pattern regexp)
# git prompt
GIT_PROMPT_SYMBOL="%F{blue}±%f"
GIT_PROMPT_PREFIX="%F{green}[%f"
GIT_PROMPT_SUFFIX="%F{green}]%f"
GIT_PROMPT_AHEAD="%F{red}ANUM%f"
GIT_PROMPT_BEHIND="%F{cyan}BNUM%f"
GIT_PROMPT_MERGING="%F{magenta}%{⚡%G%}%f"
GIT_PROMPT_UNTRACKED="%F{red}●%f"
GIT_PROMPT_MODIFIED="%F{white}●%f"
GIT_PROMPT_STAGED="%F{blue}●%f"
# zsh autosuggestions
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=8'
ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE=20
ZSH_AUTOSUGGEST_USE_ASYNC=1
ZSH_AUTOSUGGEST_ORIGINAL_WIDGET_PREFIX=autosuggest-orig-
ZSH_AUTOSUGGEST_STRATEGY=default
ZSH_AUTOSUGGEST_CLEAR_WIDGETS+=(which-command)
ZSH_AUTOSUGGEST_CLEAR_WIDGETS+=(append-clip-selection insert-clip-selection)
ZSH_AUTOSUGGEST_CLEAR_WIDGETS+=(append-x-selection insert-x-selection)
ZSH_AUTOSUGGEST_CLEAR_WIDGETS+=(yank-clip-selection yank-x-selection)
ZSH_AUTOSUGGEST_CLEAR_WIDGETS+=(fzf-locate-widget insert-composed-char)
ZSH_AUTOSUGGEST_CLEAR_WIDGETS+=(zle-backwards-delete-to-char)
ZSH_AUTOSUGGEST_CLEAR_WIDGETS+=(zle-backwards-zap-to-char)
ZSH_AUTOSUGGEST_CLEAR_WIDGETS+=(zle-compdef zle-emacs-keymap zle-fh zle-fman)
ZSH_AUTOSUGGEST_CLEAR_WIDGETS+=(zle-less zle-list-binds zle-locate-widget)
ZSH_AUTOSUGGEST_CLEAR_WIDGETS+=(zle-refresh-keymap zle-run-help zle-toggle-keymap)
ZSH_AUTOSUGGEST_CLEAR_WIDGETS+=(zle-vi-keymap zle-vim zle-youtube-helper zle-zaw-help)
ZSH_AUTOSUGGEST_EXECUTE_WIDGETS+=()
ZSH_AUTOSUGGEST_IGNORE_WIDGETS+=()
ZSH_AUTOSUGGEST_PARTIAL_ACCEPT_WIDGETS+=()

# custom bindkey commands
bindkey -M emacs "\C-p" history-substring-search-up
bindkey -M emacs "\C-n" history-substring-search-down
bindkey -M emacs "\e[1~" beginning-of-line
bindkey -M emacs "\e\e[A" beginning-of-line
bindkey -M emacs "\e[4~" end-of-line
bindkey -M emacs "\e\e[B" end-of-line
bindkey -M emacs "\C-k" kill-whole-line
bindkey -M vicmd "k" history-substring-search-up
bindkey -M vicmd "j" history-substring-search-down
# bindkey -M vicmd "k" up-line-or-beginning-search
# bindkey -M vicmd "j" down-line-or-beginning-search
bindkey -M vicmd "u" undo
# bindkey -M vicmd "u" vi-undo-change
bindkey -M vicmd "Y" vi-yank-eol
bindkey -M vicmd "p" vi-put-after
bindkey -M vicmd "P" vi-put-before
bindkey -M viins "\C-p" history-substring-search-up
bindkey -M viins "\C-n" history-substring-search-down
bindkey -M viins "jj" vi-cmd-mode

() for 1 {
	bindkey -M "$1" -s "\ea" " | awk "
	# alias gr='grep --color=auto'
	bindkey -M "$1" -s "\eg" " | gr "
	# alias l='env LESS= less -CMNRis'
	bindkey -M "$1" -s "\el" " | l "
	bindkey -M "$1" -s "\es" " | sed "

	# f8: insert composed character
	# bindkey -M "$1" "\e[19~" insert-composed-char

	bindkey -M "$1" "\e[1~" beginning-of-line
	bindkey -M "$1" "\e[4~" end-of-line
	bindkey -M "$1" "\ec" yank-x-selection
	bindkey -M "$1" "\ev" insert-x-selection
	bindkey -M "$1" "\eC" yank-clip-selection
	bindkey -M "$1" "\eV" insert-clip-selection
	bindkey -M "$1" "\e[17~" yank-x-selection
	bindkey -M "$1" "\e[18~" insert-x-selection
	bindkey -M "$1" "\e[19~" insert-clip-selection
	bindkey -M "$1" "\e[" yank-x-selection
	bindkey -M "$1" "\e]" insert-x-selection
	bindkey -M "$1" "\e{" yank-clip-selection
	bindkey -M "$1" "\e}" insert-clip-selection
	bindkey -M "$1" "\eF" zle-fh
	bindkey -M "$1" "\C-w" backward-kill-word
	bindkey -M "$1" "\e\C-m" self-insert-unmeta
	bindkey -M "$1" "\eh" zle-run-help
	bindkey -M "$1" "\eu" undo
	bindkey -M "$1" "\eU" redo
	bindkey -M "$1" "\ey" yank-pop
	bindkey -M "$1" "\C-y" yank
	bindkey -M "$1" "\C-q" push-line
	bindkey -M "$1" "\C-u" kill-whole-line
	bindkey -M "$1" "\C-k" kill-whole-line
	bindkey -M "$1" "\ed" kill-word
	bindkey -M "$1" "\e[3~" delete-char
	bindkey -M "$1" "\C-?" backward-delete-char
	bindkey -M "$1" "\C-h" backward-delete-char
	bindkey -M "$1" "\e\C-h" backward-kill-word
	bindkey -M "$1" "\e\C-?" backward-kill-word
	bindkey -M "$1" "\C-o" accept-line-and-down-history
	bindkey -M "$1" "\e[23~" zle-list-binds
	bindkey -M "$1" "\C-z" fancy-ctrl-z
	bindkey -M "$1" "\ep" expand-absolute-path
	bindkey -M "$1" "\eo" zle-less
	# insert the last word from the previous
	# history event at the cursor position
	bindkey -M "$1" "\e\\" insert-last-word
	bindkey -M "$1" "\e[2~" insert-last-word
	bindkey -M "$1" "\eE" tetris
	bindkey -M "$1" "\e\er" znt-history-widget
	bindkey -M "$1" "\e\et" znt-cd-widget
	bindkey -M "$1" "\e\ek" znt-kill-widget
	# Ctrl+x h will show the completion context
	bindkey -M "$1" "\C-x\C-h" _complete_help
	bindkey -M "$1" "\C-xh" _complete_help
	bindkey -M "$1" "\C-x\C-x" execute-named-command
	bindkey -M "$1" "\C-xx" execute-named-command

	# self insert \2 and \6 for history expansion
	# bindkey -M "$1" "\C-b" self-insert
	# bindkey -M "$1" "\C-f" self-insert
	# otherwise use emacs bindings
	bindkey -M "$1" "\C-b" emacs-backward-word
	bindkey -M "$1" "\C-f" emacs-forward-word

	bindkey -M "$1" "\eOA" up-line-or-beginning-search
	bindkey -M "$1" "\e[A" up-line-or-beginning-search
	bindkey -M "$1" "\eOB" down-line-or-beginning-search
	bindkey -M "$1" "\e[B" down-line-or-beginning-search
	bindkey -M "$1" "\e\e[D" emacs-backward-word
	bindkey -M "$1" "\e[1;5D" emacs-backward-word
	bindkey -M "$1" "\e[1;3D" emacs-backward-word
	bindkey -M "$1" "\e[1;2D" emacs-backward-word
	bindkey -M "$1" "\eb" emacs-backward-word
	bindkey -M "$1" "\e\e[C" emacs-forward-word
	bindkey -M "$1" "\e[1;5C" emacs-forward-word
	bindkey -M "$1" "\e[1;3C" emacs-forward-word
	bindkey -M "$1" "\e[1;2C" emacs-forward-word
	bindkey -M "$1" "\ef" emacs-forward-word
	bindkey -M "$1" "\e[7~" beginning-of-line
	bindkey -M "$1" "\e[1;5B" beginning-of-line
	bindkey -M "$1" "\e[1;3B" beginning-of-line
	bindkey -M "$1" "\e[1;2B" beginning-of-line
	bindkey -M "$1" "\C-a" beginning-of-line
	bindkey -M "$1" "\e[8~" end-of-line
	bindkey -M "$1" "\e[1;5A" end-of-line
	bindkey -M "$1" "\e[1;3A" end-of-line
	bindkey -M "$1" "\e[1;2A" end-of-line
	bindkey -M "$1" "\C-e" end-of-line
	bindkey -M "$1" "$terminfo[kcud1]" emacs-backward-word
	bindkey -M "$1" "$terminfo[kcuu1]" emacs-forward-word
	bindkey -M "$1" "\e[6~" emacs-backward-word
	bindkey -M "$1" "\e[5~" emacs-forward-word
	bindkey -M "$1" "\e-" emacs-backward-word
	bindkey -M "$1" "\e=" emacs-forward-word
	bindkey -M "$1" "$(echotc kl)" backward-char
	bindkey -M "$1" "$(echotc kr)" forward-char
	bindkey -M "$1" "$(echotc ku)" up-line-or-beginning-search
	bindkey -M "$1" "$(echotc kd)" down-line-or-beginning-search

	bindkey -M "$1" "\e[3~" delete-char
	bindkey -M "$1" "\ek" describe-key-briefly
	bindkey -M "$1" "\C-xe" edit-command-line
	bindkey -M "$1" "\C-x\C-e" edit-command-line
	bindkey -M "$1" "\e\ey" zle-youtube-helper
	bindkey -M "$1" "\e," spell-word
	bindkey -M "$1" "\ez" zaw
	bindkey -M "$1" "\e<" zle-zaw-help
	bindkey -M "$1" "\ew" which-command
	bindkey -M "$1" "\ee" delete-to-char
	bindkey -M "$1" "\eOP" zle-less
	bindkey -M "$1" "\eOQ" zle-vim
	bindkey -M "$1" "\eOR" insert-unicode-char
	bindkey -M "$1" "\eOS" zle-compdef
	bindkey -M "$1" "\e[P" delete-char
	bindkey -M "$1" "\C-r" history-incremental-search-backward
	bindkey -M "$1" "\C-xr" history-incremental-search-backward
	bindkey -M "$1" "\C-x\C-r" history-incremental-search-backward
	bindkey -M "$1" "\C-s" history-incremental-search-forward
	bindkey -M "$1" "\C-xs" history-incremental-search-forward
	bindkey -M "$1" "\C-x\C-s" history-incremental-search-forward
	# call fman() on current cmdline after word-splitting
	bindkey -M "$1" "\e/" zle-fman
	bindkey -M "$1" "\e?" where-is
	bindkey -M "$1" "^Xi" insert-unicode-char
	bindkey -M "$1" "\C-x\C-i" insert-unicode-char
	bindkey -M "$1" "\e>" autosuggest-clear
	# f5: toggle keymap
	bindkey -M "$1" "\e[15~" zle-toggle-keymap
	bindkey -M "$1" "\e;" fzf-completion
	bindkey -M "$1" "\e\C-i" fasd-complete
	bindkey -M "$1" "\e[Z" reverse-menu-complete
	bindkey -M "$1" "\C-i" "$fzf_default_completion"
	bindkey -M "$1" "\ei" zle-locate-widget
	bindkey -M "$1" "\er" fzf-history-widget
	bindkey -M "$1" "\C-t" transpose-words
	bindkey -M "$1" "\et" fzf-file-widget
	bindkey -M "$1" "\eC" fzf-cd-widget

	# move the cursor anywhere (will blow your mind)
	local _km=$1
	function _move_cursor { print -rn - $'\e['$WIDGET[-1] }
	() for 1 { zle -N "move-cursor-$1" _move_cursor; bindkey -M "$_km" "\e[1;6$1" move-cursor-$1 } {A..D}
} emacs vicmd viins

# compdefs
() {
	local cgasm_str dgpg_str hi_str high_str reptyr_str modprobe_str sched_str lgpg_str fpath_str
	local -a gnu_generic_cmds asmcmds dbpkgs kmods pubkeys seckeys allkeys nacl_cmds schedulers fpath_comps

	fpath_comps=(${:-$^fpath/**(.:t)})
	schedulers+=(${${(s. .)$(</sys/block/sda/queue/scheduler)}//[\[\]]/})
	gnu_generic_cmds+=(${:-"$HOME"/lind_project/lind/repy/sdk/toolchain/linux_x86_glibc/bin/*(.:t)})
	gnu_generic_cmds+=(as auracle autopep8 autopep8-python2 basename bash bnf)
	gnu_generic_cmds+=(bsdtar canto-curses canto-daemon canto-remote calcc catdoc catman)
	gnu_generic_cmds+=(ccache cd2raw cdcd cdr2raw cdrdao cd-read cdu cgasm checkpatch.pl)
	gnu_generic_cmds+=(chromium ci clang-tidy co col colordiff compton configure conky)
	gnu_generic_cmds+=(cower cpanm cppcheck cpulimit crontab ctags curl db2x_manxml)
	gnu_generic_cmds+=(db2x_texixml db2x_xsltproc docbook2man docbook2texi define)
	gnu_generic_cmds+=(dmidecode dumpasn1 emacs expac eza fasd file flac2all)
	gnu_generic_cmds+=(fusermount-glusterf sfusermount3 elftoc free fzf gnome-keyring-daemon)
	gnu_generic_cmds+=(gpg-agent help2man highlight hping hsetroot hwclock icdiff install)
	gnu_generic_cmds+=(keyring kid3-cli kid3-qt ld lighttpd2 ln lrz lspci lua lz4 maim)
	gnu_generic_cmds+=(mkchromecast more mountpoint mpd muttprint mv named ncat ncdu)
	gnu_generic_cmds+=(neomutt netstat newsbeuter newsboat node nohup objconv objdump)
	gnu_generic_cmds+=(oomox-cli openvpn optipng pacconf pactree pandoc paste pisg pstree)
	gnu_generic_cmds+=(qemu-img qemu-nbd reptyr resolvconf rfc rg rlwrap rmdir rmlint)
	gnu_generic_cmds+=(rst2man rst2man2 saldl scan-build seq shellcheck shred sox split)
	gnu_generic_cmds+=(stat st stjerm strings supybot swapon sysctl systool tdrop)
	gnu_generic_cmds+=(termite test tic tiv tload transmission-cli transmission-create)
	gnu_generic_cmds+=(transmission-daemon transmission-edit transmission-get)
	gnu_generic_cmds+=(transmission-gtk transmission-qt transmission-remote)
	gnu_generic_cmds+=(transmission-remote-cli transmission-remote-cli)
	gnu_generic_cmds+=(transmission-remote-gtk transmission-show transset-df)
	gnu_generic_cmds+=(updatedb urxvtc urxvtcdurxvtd vanitygen vimpager)
	gnu_generic_cmds+=(x11vnc xbacklight xbindkeys xsel youtube-dl)

	if type cgasm &>/dev/null; then
		asmcmds+=(${(o)$(cgasm -f '.*' \
			| perl -alne '
				BEGIN{ my @cmds; }
				push @cmds, split(/ /, lc $F[0] =~ y|/| |r);
				END{ print join " ", @cmds; }
			' 2>/dev/null)})
	fi
	if type pacman &>/dev/null; then
		dbpkgs+=(${(fo@)$(pacman -Qq 2>/dev/null)})
	fi
	if type find &>/dev/null; then
		kmods+=(${${(f0@)$(find /usr/lib/modules/$(uname -r) \
			-type f -name '*.ko*' 2>/dev/null)%.ko*}##*/})
	fi
	if type gpg &>/dev/null; then
		pubkeys+=(${${(Mo)$(gpg2 -k --no-default-keyring \
			--list-options no-show-photos 2>/dev/null):%<*>}//(<|>)/})
		seckeys+=(${${(Mo)$(gpg2 -K --no-default-keyring \
			--list-options no-show-photos  2>/dev/null):%<*>}//(<|>)/})
		allkeys+=($pubkeys $seckeys)
		allkeys=(${(u)allkeys})
	fi

	cgasm_str+=$'_arguments "*:arg:_default" ":assembly instruction:('
	cgasm_str+="${asmcmds[*]}"
	cgasm_str+=')" -- '
	lgpg_str+=$'_arguments "*:arg:_default" ":public key:('
	lgpg_str+="${allkeys[*]}"
	lgpg_str+=$')" -- '
	dgpg_str+=$'_arguments "*:arg:_default" ":secret keys:('
	dgpg_str+="${seckeys[*]}"
	dgpg_str+=$')" -- '
	hi_str+=$'_arguments '
	hi_str+=$'":syntax:_files '
	hi_str+=$'-W \'/usr/share/highlight/langDefs/\' '
	hi_str+=$'-g \'*.lang(:r)\'" '
	hi_str+=$'"*:file:_files" -- '
	high_str+=$'_arguments '
	high_str+=$'":theme:_files '
	high_str+=$'-W \'/usr/share/highlight/themes\' '
	high_str+=$'-g \'*.theme(:r)\'" '
	high_str+=$'":syntax:_files '
	high_str+=$'-W \'/usr/share/highlight/langDefs\' '
	high_str+=$'-g \'*.lang(:r)\'" '
	high_str+=$'":out format:( '
	high_str+=$'html xhtml latex tex rtf odt ansi xterm256 truecolor bbcode pango svg '
	high_str+=$')" "*:file:_files" -- '
	qpc_str+=$'_arguments "*:packages:('
	qpc_str+="${dbpkgs[*]}"
	qpc_str+=$')" -- '
	reptyr_str+=$'_arguments "*:arg:_default" ":processe:_pids" -- '
	modprobe_str+=$'_arguments "*:arg:_default" ":modules:('
	modprobe_str+="${kmods[*]}"
	modprobe_str+=$')" -- '
	sched_str+=$'_arguments "*:arg:_default" ":schedulers:('
	sched_str+="${schedulers[*]}"
	sched_str+=$')" -- '
	fpath_str+=$'_arguments "*:arg:_default" ":autoload functions:('
	fpath_str+="${fpath_comps[*]}"
	fpath_str+=$')" -- '

	() for 1 {
		if ! type -f _${1##*-} &>/dev/null; then
			compdef _gnu_generic ${1##*-}
		fi
		compdef $1=${1##*-}
	} $nacl_cmds
	() for 1 {
		if ! type -f _$1 &>/dev/null; then
			compdef _gnu_generic $1
		fi
	} $gnu_generic_cmds

	compdef "$cgasm_str" cgasm
	compdef "$lgpg_str" lgpg
	compdef "$dgpg_str" dgpg
	compdef "$hi_str" hi
	compdef "$high_str" high
	compdef "$modprobe_str" modprobe
	compdef "$qpc_str" qpc
	compdef "$reptyr_str" reptyr
	compdef "$sched_str" setsched
	compdef "$fpath_str" fcomp
}

compdef _bat b
compdef _bat bat
compdef _cpuled cpuled
compdef _ee ee
compdef _man fman
compdef _man man
compdef _gem gem
compdef _git fshow
compdef _herbstclient hc
compdef _man cppman
compdef _man tldr
compdef _pacaur apacman
compdef _pacaur pml
compdef _pacaur pspc
compdef _scrs scrs
compdef _scrs pscrs
compdef _uscrs uscrs
compdef _uscrs puscrs
compdef _sce sce
compdef _usce usce
compdef _texinfo info
compdef _vim v
compdef _pip pip
compdef _au au
compdef _au wa
compdef _pwns pwns
compdef _ykman ykman
compdef azle=autoload
compdef cg=cgasm
compdef e=vim
compdef g=git
compdef gnpm=npm
compdef oomox=oomox-cli
compdef pkgconf=pkg-config
compdef run=gcc
compdef xs=xsel
compdef _=sudo
compdef meminfo=free
compdef run-qemu=qemu-system-x86_64

# named directories
hash -d a="$HOME/code/aur"
hash -d b="$HOME/bin/"
hash -d c=/store/dotfiles
hash -d cepl="/store/projects/cepl"
hash -d code="$HOME/code"
hash -d crash="/store/projects/secure-systems-lab/CrashSimulator"
hash -d d="/store/projects/linux/Documentation"
hash -d djzomg="/store/music/djzomg"
hash -d efi="/boot/EFI"
hash -d euler="$HOME/code/euler"
hash -d f="/store/projects/fastly"
hash -d fsm="/store/projects/fastly/libfsm"
hash -d g="$HOME/lind_project/lind/lind_glibc"
hash -d git="$HOME/git"
hash -d inc="/usr/include"
hash -d k="/store/projects/kernel"
hash -d l="$HOME/lind_project"
hash -d linux="/store/projects/linux"
hash -d magnets="/store/dotfiles/magnets"
hash -d man="/store/dotfiles/man"
hash -d music="/store/music"
hash -d n="$HOME/lind_project/native_client"
hash -d nginx="/etc/nginx"
hash -d p="/store/projects"
hash -d paper="/sdxc/papers"
hash -d patches="/store/patches"
hash -d prose="/store/writing"
hash -d r="/store/projects/secure-systems-lab/rrapper"
hash -d rr="/store/projects/secure-systems-lab/rr"
hash -d repos="/store/repos"
hash -d rfc="/usr/share/doc/rfc"
hash -d s="/store/projects/secure-systems-lab"
hash -d src="/usr/src/linux"
hash -d surfraw="/usr/lib/surfraw"
hash -d stuff="/store/stuff"
hash -d systemd="/etc/systemd/system"
hash -d tuf="/store/projects/secure-systems-lab/tuf"
hash -d vim="$HOME/.vim"
hash -d vm="$HOME/code/vm"
hash -d w="/sdxc/work"
hash -d words="/store/dotfiles/unixstories"
hash -d www="/srv/http"
hash -d z="$ZDOTDIR"
hash -d zc="$ZDOTDIR/completions"
hash -d zf="$ZDOTDIR/zfunctions"
hash -d znc="/var/lib/znc/.znc/moddata/log/alyptik/freenode/"
hash -d zp="$ZDOTDIR/plugins"
hash -d zsh="$ZSH"

# parse ssh configuration
() {
	local -a _ssh_hosts
	_ssh_hosts=(${${(f@)$(cat $HOME/.ssh/{config,known_hosts}(N) /dev/null)}%%,*})
	_ssh_hosts=(${${(Mu)${${_ssh_hosts##*/}##*@}##*.*}%%:*})
	zstyle ':completion:*:(ssh|scp|sftp|rsync):*'	hosts $_ssh_hosts
}
# run rehash on completion so new installed program are found automatically:
function _force_rehash() {
	((CURRENT == 1)) && rehash
	return 1
}
# only show single character options with '-'
zstyle -e ':completion:*:options'			ignored-patterns '
	if [[ $PREFIX == - ]]; then
		reply=("--*");
	fi'
# try to be smart about when to use what completer...
zstyle -e ':completion:*'				completer '
	if [[ $_last_try != "$HISTNO$BUFFER$CURSOR" ]]; then
		_last_try="$HISTNO$BUFFER$CURSOR"
		reply=(_complete _expand _match _prefix _correct _approximate)
	else
		reply=(_force_rehash _oldlist _ignored _files)
	fi'
# allow one error for every two characters typed in approximate completer
zstyle -e ':completion:*:approximate:*'			max-errors '
	reply=("$((($#PREFIX+$#SUFFIX)/2))" numeric)'
# zstyle ':completion:*:approximate:*'			max-errors 5 numeric
zstyle ':completion:*:correct:*'			original true
zstyle ':completion:*:correct:*'			insert-unambiguous true

# completion tweaks
zstyle ':acceptline'					nocompwarn true
zstyle ':completion:*:corrections'			format $'%{\e[0;31m%}%d (errors: %e)%{\e[0m%}'
zstyle ':completion:*:default'				list-colors "${(s.:.)LS_COLORS}"
zstyle ':completion:*:descriptions'			format $'%{\e[0;31m%}completing %B%d%b%{\e[0m%}'
zstyle ':completion:*:*:cd:*:directory-stack'		menu yes select
zstyle ':completion:*:expand:*'				tag-order all-expansions
zstyle ':completion:*:history-words'			list true
zstyle ':completion:*:history-words'			menu yes select
zstyle ':completion:*:history-words'			remove-all-dups yes
zstyle ':completion:*:history-words'			stop yes
zstyle ':completion:*:matches'				group 'yes'
zstyle ':completion:*'					group-name ''
zstyle ':completion:*'					menu select
zstyle ':completion:*:messages'				format '%d'
zstyle ':completion:*:options'				description 'yes'
zstyle ':completion:*:options'				auto-description '%d'
zstyle ':completion:*:processes'			command 'ps -au $USER'
zstyle ':completion:*:*:-subscript-:*'			tag-order indexes parameters
zstyle ':completion:*:-command-:*:'			verbose true
zstyle ':completion:*'					verbose true
zstyle ':completion:*:warnings'				format $'%{\e[0;31m%}no matches for:%{\e[0m%} %d'
zstyle ':completion:*:*:zcompile:*'			ignored-patterns '(*~|*.sw[a-p])'
zstyle ':completion:correct:'				prompt 'correct to: %e'
zstyle ':completion:*:processes-names'			command 'ps c -u $USER -o command | uniq'
zstyle ':completion:*:killall:*'			command 'ps -u $USER -o cmd'
zstyle ':completion:*:manuals*'				separate-sections true
zstyle ':completion:*:manuals*'				insert-sections   true
zstyle ':completion:*:man*'				menu yes select
zstyle ':completion:*:urls'				local 'www' 'public_html'
zstyle ':filter-select:highlight'			matched fg=yellow,standout
zstyle ':filter-select'					max-lines 10
zstyle ':filter-select'					rotate-list yes
zstyle ':filter-select'					case-insensitive yes
zstyle ':filter-select'					extended-search yes

# for the which-command zle widget
if type -f wa &>/dev/null; then
	whence_cmd=(wa)
else
	whence_cmd=(whence -fv --)
fi
zstyle ':zle:which-command'				whence $whence_cmd

# some kind of crazy ass matcher shit for flex comepletions
zstyle ':completion:*'					matcher-list \
	'm:{a-z\-}={A-Z\_}' \
	'r:[^[:alpha:]]||[[:alpha:]]=** r:|=* m:{a-z\-}={A-Z\_}' \
	'r:|?=** m:{a-z\-}={A-Z\_}'

# run cleanup trap
kill -USR1 $$
