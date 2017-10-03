#!/usr/bin/env zsh
#
# .zshrc
#
# Zsh configuration file

# Catch EXIT, SIGINT, SIGQUIT, SIGTERM, and SIGTRAP signals for clean up
trap '{ cleanup; trap -; }' TRAP EXIT
trap '{ cleanup; trap -; kill -INT $$; }' INT
trap '{ cleanup; trap -; kill -QUIT $$; }' QUIT
trap '{ cleanup; trap -; kill -TERM $$; }' TERM

# Redirect errors to a temporary fd, and then append them to a log file
ZSH_ERROR="$(mktemp)"
exec 9>&2
exec 2<>"$ZSH_ERROR"
[[ -f "$ZSH_ERROR" ]] && rm -f "$ZSH_ERROR" || cleanup

## Set/unset options
unsetopt alwaystoend autolist automenu caseglob casematch checkjobs \
	correctall extendedhistory flowcontrol histfcntllock globalexport \
	globcomplete globsubst histignorespace histsavebycopy \
	histverify multios nomatch printexitvalue sharehistory verbose
setopt appendhistory autocd autopushd bareglobqual beep casematch cbases \
	chaselinks clobber completeinword correct cprecedences equals \
	extendedglob globassign globdots globstarshort histexpiredupsfirst \
	histignorealldups histignoredups histlexwords histreduceblanks \
	hup incappendhistory interactivecomments kshglob kshoptionprint \
	listambiguous longlistjobs magicequalsubst octalzeroes \
	markdirs menucomplete monitor multibyte notify pathdirs pipefail \
	promptsubst pushdignoredups pushdminus pushdtohome rematchpcre

# Emacs 19.29 or thereabouts stopped using a terminal type of "emacs" in
# shell buffers, and instead sets it to "dumb". Zsh only kicks in its special
# I'm-inside-emacs initialization when the terminal type is "emacs".
[[ "$EMACS" == t ]] && unsetopt zle

## Set emacs or vi as default
bindkey -e
zle -N zle-keymap-select
zle -N zle-line-init
zle -N zle-line-finish

# theme: 0 = clint / 1 = custom PS1 / * = wtf are u doing
_theme=1
# Initialize _km for ZLE widgets and set initial cursor color
_km=emacs
_emacs=main
_vi=
setescapes
case "$_km" in
vi)
	printf "$cblock"; printf "$cgrey" ;;
emacs)
	printf "$cblock"; printf "$cyellow" ;;
esac

# Cache setup
ZSH_CACHE_DIR="${ZDOTDIR:-$HOME/.zsh.d}/cache"
[[ -d "$ZSH_CACHE_DIR" ]] || mkdir "$ZSH_CACHE_DIR"
zstyle ':completion:*' use-cache yes
zstyle ':completion::complete:*' cache-path "$ZSH_CACHE_DIR"
zstyle ':completion:*' rehash true
zstyle ':history-search-multi-word' page-size 5
# Enable colors in prompt
autoload -U colors && colors
eval "$(dircolors -b)"
export CLICOLOR=1
export REPORTTIME=5

## History stuff
[[ -f "${CONF:-/store/config}/.zsh_history" ]] && \
	HISTFILE="${CONF:-/store/config}/.zsh_history" || \
	HISTFILE="${HOME}/.zsh_history"
type zshreadhist >/dev/null 2>&1 && \
	precmd_functions=( zshreadhist $precmd_functions )

# History search
() {
	local -a au_arr zle_arr zmod_arr
	au_arr+=(expand-absolute-path up-line-or-beginning-search)
	au_arr+=(down-line-or-beginning-search run-help regexp-replace)
	au_arr+=(edit-command-line nsert-unicode-char insert-composed-char)
	au_arr+=(tetriscurses tetris zargs zed zmv)
	# zle_arr+=(bracketed-paste bracketed-paste-magic)
	zle_arr+=(edit-command-line expand-absolute-path)
	zle_arr+=(up-line-or-beginning-search down-line-or-beginning-search)
	zle_arr+=(znt-history-widget znt-cd-widget znt-kill-widget insert-unicode-char)
	zle_arr+=(tetris zmv)
	zmod_arr+=(zsh/datetime zsh/mapfile zsh/mathfunc)
	zmod_arr+=(zsh/terminfo zsh/deltochar zsh/curses)
	zmod_arr+=(zsh/net/socket zsh/system zsh/net/tcp)
	zmod_arr+=(zsh/zftp zsh/zprof zsh/zpty zsh/zselect)
	zmod_arr+=(zsh/pcre zsh/db/gdbm zsh/deltochar)
	() for 1 { autoload -Uz "$1"; } $au_arr
	() for 1 { zle -N "$1"; } $zle_arr
	() for 1 { zmodload "$1"; } $zmod_arr
}

# equiv of bash's "help"
unalias run-help help 2>/dev/null
alias help='run-help'

#AUTOPAIR_INHIBIT_INIT=${AUTOPAIR_INHIBIT_INIT:-}
#AUTOPAIR_BETWEEN_WHITESPACE=${AUTOPAIR_BETWEEN_WHITESPACE:-}
typeset -gA AUTOPAIR_PAIRS
#AUTOPAIR_PAIRS=('`' '`' "'" "'" '"' '"' '{' '}' '[' ']' '(' ')' '<' '>')
AUTOPAIR_PAIRS=('`' '`' "'" "'" '"' '"' '{' '}' '[' ']' '(' ')')
## For example, if $AUTOPAIR_LBOUNDS[braces]="[a-zA-Z]", then braces
## {([) won't be autopaired if the cursor follows an alphabetical character.
## Individual delimiters can be used too. Setting
## $AUTOPAIR_RBOUNDS['{']="[0-9]" will cause { specifically to not be
#H,# autopaired when the cursor precedes a number.
typeset -gA AUTOPAIR_LBOUNDS
AUTOPAIR_LBOUNDS=('`' '`')
AUTOPAIR_LBOUNDS[all]='[.:/\!]'
AUTOPAIR_LBOUNDS[quotes]='[]})a-zA-Z0-9]'
AUTOPAIR_LBOUNDS[braces]=''
AUTOPAIR_LBOUNDS["'"]="'"
typeset -gA AUTOPAIR_RBOUNDS
AUTOPAIR_RBOUNDS[all]='[[{(<,.:?/%$!a-zA-Z0-9]'
AUTOPAIR_RBOUNDS[quotes]='[a-zA-Z0-9]'
AUTOPAIR_RBOUNDS[braces]=''
## Array declaring active highlighters names.
typeset -ga ZSH_HIGHLIGHT_HIGHLIGHTERS
ZSH_HIGHLIGHT_HIGHLIGHTERS=(main brackets line pattern root)
ZSH_HIGHLIGHT_HIGHLIGHTERS_DIR="${ZDOTDIR:-${HOME}/.zsh.d}/plugins/highlighters"
## Zsh autosuggest defaults
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=8'
## Prefix to use when saving original versions of bound widgets
ZSH_AUTOSUGGEST_ORIGINAL_WIDGET_PREFIX=autosuggest-orig-
ZSH_AUTOSUGGEST_STRATEGY=default
ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE=25

# Adapted from code found at <https://gist.github.com/1712320>.
# Modify the colors and symbols in these variables as desired.
GIT_PROMPT_SYMBOL="%{$fg[blue]%}±"
GIT_PROMPT_PREFIX="%{$fg[green]%}[%{$reset_color%}"
GIT_PROMPT_SUFFIX="%{$fg[green]%}]%{$reset_color%}"
GIT_PROMPT_AHEAD="%{$fg[red]%}ANUM%{$reset_color%}"
GIT_PROMPT_BEHIND="%{$fg[cyan]%}BNUM%{$reset_color%}"
GIT_PROMPT_MERGING="%{$fg[magenta]%}⚡︎%{$reset_color%}"
GIT_PROMPT_UNTRACKED="%{$fg[red]%}●%{$reset_color%}"
GIT_PROMPT_MODIFIED="%{$fg[yello w]%}●%{$reset_color%}"
GIT_PROMPT_STAGED="%{$fg[green]%}●%{$reset_color%}"

# Autoloadable functions and completions
fpath=( ${ZDOTDIR:-$HOME/.zsh.d}/zcomps.zwc $fpath )
fpath=( ${ZDOTDIR:-$HOME/.zsh.d}/zfuncs.zwc $fpath )

case "$_theme" in
(0)
	type prompt_clint_setup >/dev/null 2>&1 && \
		prompt_clint_setup || \
		_theme=1
	;| # continue scanning

(1)
	# common PS1 section
	PS1='$prompt_newline%{$(echo -en "$reset_color$fg[green]"$(($(:
		)$(sed -n "s/MemFree:[[:space:]]\+\([0-9]\+\) kB/\1/Ip" /proc/meminfo)/1024))"$(:
		)$reset_color$fg[yellow]/"$(($(:
		)$(sed -n "s/MemTotal:[[:space:]]\+\([0-9]\+\) kB/\1/Ip" /proc/meminfo)/1024))MB$(:
		)"		$reset_color$fg[magenta]$(</proc/loadavg)")$(:
		)$prompt_newline$bold_color$fg[grey]%}[%{$(:
		)$reset_color$fg[white]%}$$:$PPID %j:%l%{$(:
		)$bold_color$fg[grey]%}]%{$reset_color$fg[cyan]%}	%D{%a %d %b %I:%M:%S%P}'
	# fallback theme if no /proc
	if [[ ! -d /proc ]]; then
		type prompt_clint_setup >/dev/null 2>&1 && \
			prompt_clint_setup
		break
	elif (( EUID != 0 )); then
		# normal colors
		PS1="$PS1"'$bold_color$fg[grey]%}[%{$bold_color$fg[green]%}%n@%m%{$bold_color$fg[grey]%}:%{$(:
			)$reset_color$fg[white]%}${SSH_TTY} %{$bold_color$fg[red]%}+${SHLVL}%{$(:
			)$bold_color$fg[grey]%}] %{$bold_color$fg[yellow]%}%~%{$(:
			)$reset_color$fg[yellow]%} $prompt_newline($SHLVL:%!)%{$(:
			)$reset_color$fg[cyan]%} %(!.#.$) %{$reset_color%}'
	else
		# If root, print the prompt character in red. Otherwise, print the prompt in cyan.
		PS1="$PS1"'$bold_color$fg[grey]%}[%{$bold_color$fg[red]%}%n@%m%{$bold_color$fg[grey]%}:%{$(:
			)$reset_color$fg[white]%}${SSH_TTY} %{$bold_color$fg[green]%}+${SHLVL}%{$(:
			)$bold_color$fg[grey]%}] %{$bold_color$fg[yellow]%}%~%{$(:
			)$reset_color$fg[yellow]%} $prompt_newline($SHLVL:%!)%{$(:
			)$bold_color$fg[red]%} %(!.#.$) %{$reset_color%}'
	fi
	;;

(*)
	# ??????????
	type prompt_clint_setup >/dev/null 2>&1 && \
		prompt_clint_setup
	;;
esac

## load VCS module
autoload -Uz vcs_info
if type vcs_info >/dev/null 2>&1; then
	zstyle ':vcs_info:*' enable git cvs svn
	zstyle ':vcs_info:*' disable bzr cdv darcs mtn svk tla
	zstyle ':vcs_info:*' check-for-changes true
	zstyle ':vcs_info:*:prompt:*'     check-for-changes true
	zstyle ':vcs_info:*:prompt:*'     stagedstr         "%{$fg[green]%}*%{$reset_color%}"
	zstyle ':vcs_info:*:prompt:*'     unstagedstr       "%{$fg[red]%}*%{$reset_color%}"
	zstyle ':vcs_info:*:prompt:*'     branchformat      "%r"
	zstyle ':vcs_info:*:prompt:*'     formats           "%u%c%{$fg[green]%}[%b]%{$reset_color%}"
	zstyle ':vcs_info:*:prompt:*'     nvcsformats       ""
	zstyle ':vcs_info:*' actionformats \
		'%F{5}(%f%s%F{5})%F{3}-%F{5}[%F{2}%b%F{3}|%F{1}%a%F{5}]%f '
	zstyle ':vcs_info:*' formats \
		'%F{5}(%f%s%F{5})%F{3}-%F{5}[%F{2}%b%F{5}]%f '
	zstyle ':vcs_info:(sv[nk]|bzr):*' branchformat '%b%F{1}:%F{3}%r'
	zstyle ':vcs_info:git:*' actionformats \
		'%F{3}-%F{5}(%F{7}%r/%S%F{2}[%F{2}%m%F{9}%u%F{6}%c%F{2}]%F{5})%f '
	zstyle ':vcs_info:git:*' formats \
		'%F{3}-%F{5}(%F{7}%r/%S%F{2}[%F{2}%m%F{9}%u%F{6}%c%F{2}]%F{5})%f '
	precmd_functions=( vcs_info $precmd_functions )
	RPS1='$(check_last_exit_code)%(?,%F{green},%F{red} ┐❨ツ❩┌ )%f$(git_prompt_string)${vcs_info_msg_0_}'
else
	RPS1='$(check_last_exit_code)%(?,%F{green},%F{red} ┐❨ツ❩┌ )%f$(git_prompt_string)'
fi

autoload -U promptinit && promptinit
autoload -U +X compinit && compinit -u
autoload -U +X bashcompinit && bashcompinit -u

# bash specific
[[ -f /etc/profile.d/cnf.sh ]] && \
	. /etc/profile.d/cnf.sh
[[ -f /usr/share/bash-completion/completions/dkms ]] && \
	. /usr/share/bash-completion/completions/dkms
# [[ -d /usr/share/bash-completion/completions ]] && \
#         { for i in /usr/share/bash-completion/completions/*; do . "$i"; done; }

# zsh specific
[[ -d "${ZDOTDIR:-$HOME/.zsh.d}/plugins" ]] && \
	{ for i in "${ZDOTDIR:-$HOME/.zsh.d}/plugins/enabled"/*.zsh; do . "$i"; done; }
[[ -f "${HOME}/perl5/perlbrew/etc/perlbrew-completion.bash" ]] && \
	. "${HOME}/perl5/perlbrew/etc/perlbrew-completion.bash"
[[ -f "${HOME}/.aliases" ]] && \
	. "${HOME}/.aliases"
[[ -n "${${(M@z)fpath[@]%%*.zwc}[1]:t}" ]] && \
	autoload -Uz "${(f@)${(f@)$(zcompile -t "${${(M@z)fpath[@]%%*.zwc}[1]}")}[2,-1]}"
[[ -n "${${(M@z)fpath[@]%%*.zwc}[2]:t}" ]] && \
	autoload -Uz "${(f@)${(f@)$(zcompile -t "${${(M@z)fpath[@]%%*.zwc}[2]}")}[2,-1]}"

news_short
safetytoggle -n
# "Is the internet on fire?" status reports
host -t txt istheinternetonfire.com | cut -f 2 -d '"' | \
	cowsay -f "$(print -l -- /usr/share/cows/*(.:r:t) | sort -R | head -1)" -W 50
# muhcow="$(print -l -- /usr/share/cows/*(.:r:t) | sort -R | head -1)"
# host -t txt istheinternetonfire.com | cut -f 2 -d '"' | cowsay -f "$muhcow" -W 50

if type fasd >/dev/null 2>&1; then
	eval "$(fasd --init auto)"
fi

if type zplug >/dev/null 2>&1; then
	# zplug "hlissner/zsh-autopair"
	# zplug "kennethreitz/autoenv"
	# zplug "jocelynmallon/zshmarks"
	# zplug "StackExchange/blackbox"
	# zplug "aeruder/zirc"
	# zplug "tj/git-extras"
	zplug "oknowton/zsh-dwim"
	zplug "zsh-users/zsh-autosuggestions"
	zplug "zsh-users/zsh-syntax-highlighting"
	zplug "zsh-users/zsh-history-substring-search"
	if ! zplug check --verbose; then
		print -- "Install? [y/N]: "
		if read -sq; then zplug install; fi
	fi
	zplug load --verbose
fi

# autoload completion for systemctl subcommand compdefs
if [[ "$(type _systemctl)" =~ "autoload" ]]; then
	autoload -Uz +X _systemctl
fi

zle -N zle-youtube-helper
zle -N zle-fman
zle -N zle-compdef
zle -N zle-toggle-keymap
zle -N zle-emacs-keymap
zle -N zle-vi-keymap
zle -N append-x-selection
zle -N insert-x-selection
zle -N yank-x-selection
zle -N fzf-locate-widget
zle -N insert-composed-char
zle -N zle-backwards-delete-to-char
zle -N zle-backwards-zap-to-char
zle -N zle-zaw-help
zle -N zle-less
zle -N zle-vim
zle -N zle-fh

# FZF fuzzy completion
export fzf_default_completion="expand-or-complete-prefix"
# 'literal trigger' & fzf-completion keybind to start fuzzy completion
export FZF_COMPLETION_TRIGGER='//'
# export FZF_COMPLETION_TRIGGER='**'

# bind P and N for EMACS mode
bindkey -M emacs '^P' history-substring-search-up
bindkey -M emacs '^N' history-substring-search-down
# for inside tmux
bindkey -M emacs "\e[1~" beginning-of-line
bindkey -M emacs "\e\e[A" beginning-of-line
bindkey -M emacs "\e[4~" end-of-line
bindkey -M emacs "\e\e[B" end-of-line
bindkey -M emacs "\C-k" kill-whole-line
bindkey -M emacs "\eu" undo
bindkey -M vicmd "u" vi-undo-change
bindkey -M viins "\eu" vi-undo-change
bindkey -M vicmd "\eu" undo
## bind k and j for VI mode
#bindkey -M vicmd 'k' history-substring-search-up
#bindkey -M vicmd 'j' history-substring-search-down
bindkey -M vicmd 'k' up-line-or-beginning-search
bindkey -M vicmd 'j' down-line-or-beginning-search
bindkey -M vicmd "\e[3~" delete-char
bindkey -M viins "\e[3~" delete-char

# oh god prepare yourself
#
# custom bindkey commands
() for 1 {
	# F11 inserts a literal '*'
	bindkey -sM "$1" "\e[23~" "*"

	bindkey -M "$1" "\ep" expand-absolute-path
	bindkey -M "$1" "\eo" zle-less
	# insert the last word from the previous history event at the cursor position
	bindkey -M "$1" "\e\\" insert-last-word
	bindkey -M "$1" "\eE" tetris
	bindkey -M "$1" "\e\er" znt-history-widget
	bindkey -M "$1" "\e\et" znt-cd-widget
	bindkey -M "$1" "\e\ek" znt-kill-widget
	## Ctrl+x h will show the completion context
	bindkey -M "$1" "\C-x\C-h" _complete_help
	bindkey -M "$1" "\C-xh" _complete_help

	# movement
	bindkey -M "$1" "\eOA" up-line-or-beginning-search
	bindkey -M "$1" "\e[A" up-line-or-beginning-search
	bindkey -M "$1" "\eOB" down-line-or-beginning-search
	bindkey -M "$1" "\e[B" down-line-or-beginning-search
	bindkey -M "$1" '^[[A' up-line-or-beginning-search
	bindkey -M "$1" '^[[B' down-line-or-beginning-search
	bindkey -M "$1" "\eOD" backward-word
	bindkey -M "$1" "\e\e[D" backward-word
	bindkey -M "$1" "\e[1;5D" backward-word
	bindkey -M "$1" "\e[1;3D" backward-word
	bindkey -M "$1" "\e[1;2D" backward-word
	bindkey -M "$1" "\eOC" forward-word
	bindkey -M "$1" "\e\e[C" forward-word
	bindkey -M "$1" "\e[1;5C" forward-word
	bindkey -M "$1" "\e[1;3C" forward-word
	bindkey -M "$1" "\e[1;2C" forward-word
	bindkey -M "$1" "\e[7~" beginning-of-line
	bindkey -M "$1" "\e[1;5B" beginning-of-line
	bindkey -M "$1" "\e[1;3B" beginning-of-line
	bindkey -M "$1" "\e[8~" end-of-line
	bindkey -M "$1" "\e[1;5A" end-of-line
	bindkey -M "$1" "\e[1;3A" end-of-line
	bindkey -M "$1" "\e[1;2B" beginning-of-line
	bindkey -M "$1" "\e[1;2A" end-of-line
	# bind UP and DOWN arrow keys (compatibility fallback
	# for Ubuntu 12.04, Fedora 21, and MacOSX 10.9 users)
	bindkey -M "$1" "$terminfo[kcuu1]" history-substring-search-up
	bindkey -M "$1" "$terminfo[kcud1]" history-substring-search-down
	bindkey -M "$1" "\e[5~" history-substring-search-up
	bindkey -M "$1" "\e[6~" history-substring-search-down
	bindkey -M "$1" "\e-" history-substring-search-up
	bindkey -M "$1" "\e=" history-substring-search-down
	# Fixes from http://zsh.sourceforge.net/FAQ/zshfaq03.html#l25
	bindkey -M "$1" "$(echotc kl)" backward-char
	bindkey -M "$1" "$(echotc kr)" forward-char
	bindkey -M "$1" "$(echotc ku)" up-line-or-beginning-search
	bindkey -M "$1" "$(echotc kd)" down-line-or-beginning-search

	bindkey -M "$1" "\e[3~" delete-char
	bindkey -M "$1" "\ek" describe-key-briefly
	bindkey -M "$1" "\C-xe" edit-command-line
	bindkey -M "$1" "\C-x\C-e" edit-command-line
	bindkey -M "$1" "\e\ey" zle-youtube-helper
	bindkey -M "$1" "\eU" up-case-word
	bindkey -M "$1" "\e\e\e" _history-complete-newer
	bindkey -M "$1" "\e," zaw
	bindkey -M "$1" "\e<" zle-zaw-help
	bindkey -M "$1" "\ew" zle-backwards-delete-to-char
	bindkey -M "$1" "\ee" delete-to-char
	bindkey -M "$1" "\eOP" zle-less
	bindkey -M "$1" "\eOQ" zle-vim
	bindkey -M "$1" "\eOR" insert-unicode-char
	bindkey -M "$1" "\eOS" zle-compdef
	bindkey -M "$1" "\e[P" delete-char
	bindkey -M "$1" "\C-r" redo
	## Call fman() on current cmdline after word-splitting
	bindkey -M "$1" "\e/" zle-fman
	bindkey -M "$1" "\e?" where-is
	bindkey -M "$1" "^Xi" insert-unicode-char
	bindkey -M "$1" "\C-x\C-i" insert-unicode-char
	bindkey -M "$1" "\e>" autosuggest-clear
	## F5: Toggle keymap
	# bindkey -M "$1" "\ek" zle-toggle-keymap
	bindkey -M "$1" "\e[15~" zle-toggle-keymap
	bindkey -M "$1" "\e[17~" yank-x-selection
	bindkey -M "$1" "\e[18~" insert-x-selection
	bindkey -M "$1" "\e[" yank-x-selection
	bindkey -M "$1" "\e]" insert-x-selection
	# bindkey -M "$1" "\e[18~" append-x-selection
	# F9: Insert composed character
	# bindkey -M emacs "\e[19~" insert-composed-char

	bindkey -M "$1" "\e;" fzf-completion
	bindkey -M "$1" "\e\C-i" fasd-complete
	# bindkey -M "$1" "\e[Z" fzf-complete-f
	bindkey -M "$1" "\e[Z" fasd-complete-d
	bindkey -M "$1" "\C-i" "$fzf_default_completion"
	bindkey -M "$1" "\ei" fzf-locate-widget
	bindkey -M "$1" "\er" fzf-history-widget
	bindkey -M "$1" "\C-t" transpose-words
	bindkey -M "$1" "\et" fzf-file-widget

	## A Zsh Do What I Mean key. Attempts to predict what you will want to do next.
	## Usage: Type a command and hit control-u and zsh-dwim will attempt to transform your command.
	if zle -la | grep -q dwim; then
		bindkey -M "$1" "\C-u" dwim
		bindkey -M "$1" "\e[19~" dwim
	fi
} emacs vicmd viins

# more uglyness soz
#
# custom compdefs with generated and hardcoded arrays
() {
	local -a defargcmds asmcmds dbpkgs kmods pubkeys seckeys

	defargcmds+=(as auracle autopep8 autopep8-python2 basename bash bsdtar)
	defargcmds+=(calcc canto-curses canto-daemon canto-remote catdoc cd2raw)
	defargcmds+=(cdcd cdr2raw cdrdao cd-read cdu cepl cgasm chromium)
	defargcmds+=(col colordiff compton configure conky cower cpanm cppcheck)
	defargcmds+=(cpulimit crontab ctags curl define dmidecode elftoc)
	defargcmds+=(expac fasd file flac2all fusermount-glusterfs fusermount3)
	defargcmds+=(fzf gnome-keyring-daemon gpg-agent help2man highlight)
	defargcmds+=(highlight hping hsetroot install keyring kid3-cli)
	defargcmds+=(kid3-qt ld lighttpd2 ln lrz lua lz4 maim more mpd muttprint)
	defargcmds+=(mv named netstat netstat newsbeuter node nohup)
	defargcmds+=(objconv objdump optipng pacconf pactree paste pstree)
	defargcmds+=(qemu-img qemu-nbd reptyr resolvconf rfc rg rmdir)
	defargcmds+=(rmlint rst2man rst2man2 saldl scan-build seq shred)
	defargcmds+=(sox split stat st stjerm strings supybot swapon)
	defargcmds+=(systool termite test tic tload transmission-cli)
	defargcmds+=(transmission-create transmission-daemon transmission-edit)
	defargcmds+=(transmission-get transmission-gtk transmission-qt)
	defargcmds+=(transmission-remote transmission-remote-cli transmission-remote-cli)
	defargcmds+=(transmission-remote-gtk transmission-show transset-df)
	defargcmds+=(updatedb urxvtc urxvtcd urxvtd vanitygen vimpager x11vnc)
	defargcmds+=(xbindkeys xsel youtube-dl)

	asmcmds+=(${(o)$(cgasm -f '.*' | perl -alne '
			BEGIN{ my @cmds; }
			push @cmds, split(/ /, lc $F[0] =~ y|/| |r);
			END{ print join " ", @cmds;}'
		)})
	dbpkgs+=(${(fo@)$(pacman -Qq)})
	kmods+=(${${(f0@)$(find /usr/lib/modules/$(uname -r) -type f -name '*.ko.gz' 2>/dev/null)%.ko.gz}##*/})
	pubkeys+=(${${(Mo)$(gpg2 -k --no-default-keyring --list-options no-show-photos):%<*>}//(<|>)/})
	seckeys+=(${${(Mo)$(gpg2 -K --no-default-keyring --list-options no-show-photos):%<*>}//(<|>)/})

	cgasm_str+=$'_arguments "*:arg:_default" ":assembly instruction:('
	cgasm_str+="${asmcmds[*]}"
	cgasm_str+=')" -- '
	dgpg_str+=$'_arguments "*:arg:_default" ":secret keys:('
	# dgpg_str+=$'_arguments "*:arg:_default" ":public key:('
	dgpg_str+="${seckeys[*]}"
	# dgpg_str+="${pubkeys[*]}"
	dgpg_str+=$')" -- '
	hi_str+=$'_arguments "*:file:_files" ":syntax:_files '
	hi_str+=$'-W \'/usr/share/highlight/langDefs/\' '
	hi_str+=$'-g \'*.lang(:r)\'" -- '
	high_str+=$'_arguments "*:file:_files" ":theme:_files '
	high_str+=$'-W \'/usr/share/highlight/themes\''
	high_str+=$'-g \'*.theme(:r)\'" ":syntax:_files'
	high_str+=$'-W \'/usr/share/highlight/langDefs\''
	high_str+=$'-g \'*.lang(:r)\'" ":out format:'
	high_str+=$'(html xhtml latex tex rtf odt ansi xterm256 truecolor bbcode pango svg)" -- '
	pinfo_str+=$'_arguments "*:arg:_default" ":info page:_texinfo" -- '
	qpc_str+=$'_arguments "*:packages:('
	qpc_str+="${dbpkgs[*]}"
	qpc_str+=$')" -- '
	reptyr_str+=$'_arguments "*:arg:_default" ":processe:_pids" -- '
	modprobe_str+=$'_arguments "*:arg:_default" ":modules:('
	modprobe_str+="${kmods[*]}"
	modprobe_str+=$')" -- '

	for i in "${defargcmds[@]}"; do compdef _gnu_generic "$i"; done

	compdef "$cgasm_str" cgasm
	compdef "$dgpg_str" dgpg
	compdef "$hi_str" hi
	compdef "$high_str" high
	compdef "$modprobe_str" modprobe
	compdef "$pinfo_str" pinfo
	compdef "$qpc_str" qpc
	compdef "$reptyr_str" reptyr

}

compdef _fman fman
compdef _git fshow
compdef _man cppman
compdef _man tldr
compdef _pacaur apacman
compdef _pacaur pml
compdef _pacaur pspc
compdef _systemctl_status scrs
compdef _systemctl_status pscrs
compdef _systemctl_status uscrs
compdef _systemctl_status puscrs
compdef _texinfo info
compdef _uscrs uscrs
compdef _vim v
compdef _pip pip
compdef _au au
compdef _au wau
compdef _pwns pwns

compdef azle=autoload
compdef gnpm=npm
compdef p=perl
compdef run=gcc
compdef xs=xsel

# named directories
hash -d audio="/run/media/alyptik/microSDXC/audio"
hash -d aur="${HOME}/code/aur"
hash -d calibre="/media/microSDXC/calibre"
hash -d code="${HOME}/code"
hash -d comp="${HOME}/bin/completions"
hash -d conf="${CONF:-/store/config}"
hash -d djzomg="/media/microSDXC/Music/djzomg"
hash -d d="/store/config/docs"
hash -d efi="/boot/efi/EFI"
hash -d euler="${HOME}/code/euler"
hash -d g="${HOME}/git"
hash -d inc="/usr/include"
hash -d initcpio="/usr/lib/initcpio/install"
hash -d magnets="/store/config/magnets"
hash -d man="/store/config/man"
hash -d music="/store/music"
hash -d nginx="/etc/nginx"
hash -d omz="/usr/share/oh-my-zsh"
hash -d plugins="/usr/share/oh-my-zsh/plugins"
hash -d p="${HOME}/code/projects"
hash -d prose="/store/writing"
hash -d repos="/store/repos"
hash -d rfc="/usr/share/doc/rfc"
hash -d school="/run/media/alyptik/microSDXC/school"
hash -d scripts="/store/config/scripts"
hash -d sr="/usr/lib/surfraw"
hash -d stuff="/run/media/alyptik/toshiba1TB"
hash -d systemd="/etc/systemd/system"
hash -d t="/store/torrents"
hash -d tt="/run/media/alyptik/toshiba1TB/torrents"
hash -d vim="${HOME}/.vim"
hash -d wanderlust="/hdd/wanderlust"
hash -d words="/store/config/unixstories"
hash -d www="/srv/http"
hash -d z="${ZDOTDIR:-$HOME/.zsh.d}"
hash -d zf="${ZDOTDIR:-$HOME/.zsh.d}/zfunctions"
hash -d zc="${ZDOTDIR:-$HOME/.zsh.d}/completions"
hash -d zp="${ZDOTDIR:-$HOME/.zsh.d}/plugins"
hash -d znc="/var/lib/znc/.znc/moddata/log/alyptik/freenode/"
hash -d zsh="$ZSH"

# Define word separators (for stuff like backward-word, forward-word, backward-kill-word,..)
WORDCHARS=
# WORDCHARS='.'
# WORDCHARS='*?_[]~=&;!#$%^ (){}'
# WORDCHARS='*?_[]~=&;!#$%^ (){}<>'
# WORDCHARS='*?_-.[]~=/&;!#$%^ (){}<>'
# WORDCHARS='${WORDCHARS:s@/@}'
# WORDCHARS='_-*~'

# Completion tweaks
zstyle ':completion:*:(ssh|scp|sftp|rsync):*' hosts "${(z@)${${(f@)$(<${HOME}/.ssh/known_hosts)}%%\ *}%%,*}"
# zstyle ':completion:*:(ssh|scp|sftp|rsync):*' hosts "${(z@)${${${(f@)$(<${HOME}/.ssh/known_hosts)}:#[0-9]*}%%\ *}%%,*}"
zstyle ':acceptline'			nocompwarn true
# allow one error for every two characters typed in approximate completer
zstyle ':completion:*:approximate:'	max-errors 'reply=( $(( ($#PREFIX+$#SUFFIX)/2 )) numeric )'
# zstyle ':completion:*:approximate:'	max-errors 5 numeric
# don't complete backup files as executables
zstyle ':completion:*:complete:-command-::commands' ignored-patterns '(aptitude-*|*\~)'
# start menu completion only if it could find no unambiguous initial string
zstyle ':completion:*:correct:*'	insert-unambiguous true
zstyle ':completion:*:corrections'	format $'%{\e[0;31m%}%d (errors: %e)%{\e[0m%}'
zstyle ':completion:*:correct:*'	original true
# activate color-completion
zstyle ':completion:*:default'		list-colors "${(s.:.)LS_COLORS}"
# format on completion
zstyle ':completion:*:descriptions'	format $'%{\e[0;31m%}completing %B%d%b%{\e[0m%}'
# complete 'cd -<tab>' with menu
zstyle ':completion:*:*:cd:*:directory-stack' menu yes select
# insert all expansions for expand completer
zstyle ':completion:*:expand:*'		tag-order all-expansions
zstyle ':completion:*:history-words'	list true
# activate menu
zstyle ':completion:*:history-words'	menu yes select
# ignore duplicate entries
zstyle ':completion:*:history-words'	remove-all-dups yes
zstyle ':completion:*:history-words'	stop yes
# 0 -- vanilla completion (abc => abc)
# 1 -- smart case completion (abc => Abc)
# 2 -- word flex completion (abc => A-big-Car)
# 3 -- full flex completion (abc => ABraCadabra)
zstyle ':completion:*' matcher-list '' \
	'm:{a-z\-}={A-Z\_}' \
	'r:[^[:alpha:]]||[[:alpha:]]=** r:|=* m:{a-z\-}={A-Z\_}' \
	'r:|?=** m:{a-z\-}={A-Z\_}'
# match uppercase from lowercase
# zstyle ':completion:*'			matcher-list 'm:{a-zA-Z}={A-Za-z}'
# zstyle ':completion:*'			matcher-list 'm:{a-z}={A-Z}'
# separate matches into groups
zstyle ':completion:*:matches'		group 'yes'
zstyle ':completion:*'			group-name ''
zstyle ':completion:*'			menu select
zstyle ':completion:*:messages'		format '%d'
zstyle ':completion:*:options'		auto-description '%d'
# describe options in full
zstyle ':completion:*:options'		description 'yes'
# on processes completion complete all user processes
zstyle ':completion:*:processes'	command 'ps -au$USER'
# offer indexes before parameters in subscripts
zstyle ':completion:*:*:-subscript-:*'	tag-order indexes parameters
# provide verbose completion information
zstyle ':completion:*'			verbose true
# recent (as of Dec 2007) zsh versions are able to provide descriptions
# for commands (read: 1st word in the line) that it will list for the user
# to choose from. The following disables that, because it's not exactly fast.
zstyle ':completion:*:-command-:*:'	verbose true
# set format for warnings
zstyle ':completion:*:warnings'		format $'%{\e[0;31m%}No matches for:%{\e[0m%} %d'
# define files to ignore for zcompile
zstyle ':completion:*:*:zcompile:*'	ignored-patterns '(*~|*.sw[a-p])'
# zstyle ':completion:*:*:zcompile:*'	ignored-patterns '(*~|*.zwc)'
zstyle ':completion:correct:'		prompt 'correct to: %e'
# Ignore completion functions for commands you don't have:
# zstyle ':completion::(^approximate*):*:functions' ignored-patterns '_*'
# Provide more processes in completion of programs like killall:
zstyle ':completion:*:processes-names'  command 'ps c -u ${USER} -o command | uniq'
zstyle ':completion:*:killall:*'	command 'ps -u ${USER} -o cmd'
# complete manual by their section
zstyle ':completion:*:manuals'		separate-sections true
zstyle ':completion:*:manuals*'		insert-sections   true
zstyle ':completion:*:man*'		menu yes select
# provide .. as a completion
# zstyle ':completion:*'			special-dirs ..

# run rehash on completion so new installed program are found automatically:
_force_rehash() {
	(( CURRENT == 1 )) && rehash
	return 1
}

# correction
# try to be smart about when to use what completer...
zstyle -e ':completion:*' completer '
	if [[ $_last_try != "$HISTNO$BUFFER$CURSOR" ]] ; then
		_last_try="$HISTNO$BUFFER$CURSOR"
		reply=(_complete _correct _approximate _expand _match _ignored _prefix _files)
	else
		if [[ $words[1] == (rm|mv|cp) ]] ; then
			reply=(_complete _files)
		else
			reply=(_oldlist _expand _force_rehash _complete _ignored _correct _approximate _files)
		fi
	fi'

# command for process lists, the local web server details and host completion
zstyle ':completion:*:urls' local 'www' 'public_html'
zstyle ':filter-select:highlight' matched fg=yellow,standout
# use 10 lines for filter-select
zstyle ':filter-select' max-lines 10
# use $LINES - 10 for filter-select
zstyle ':filter-select' max-lines -10
# enable rotation for filter-select
zstyle ':filter-select' rotate-list yes
# enable case-insensitive search
zstyle ':filter-select' case-insensitive yes
# see below
zstyle ':filter-select' extended-search yes
# ignore duplicates in history source
zstyle ':filter-select' hist-find-no-dups yes
# display literal newlines, not \n, etc
zstyle ':filter-select' escape-descriptions no

# cleanup
kill -TRAP $$

# end of .zshrc config
#
# all dankness must come to an end :(
