#!/bin/bash
#
# ~/.bashrc
#
# bash configuration

## Start the gpg-agent if not already running
# pgrep -x -u "${USER}" gpg-agent >/dev/null 2>&1 || \
#     gpg-connect-agent /bye >/dev/null 2>&1
# ## Set SSH to use gpg-agent
# unset SSH_AGENT_PID
# [[ "${gnupg_SSH_AUTH_SOCK_by:-0}" != "$$" ]] && \
#     export SSH_AUTH_SOCK="${HOME}/.gnupg/S.gpg-agent.ssh"
# ## Set GPG TTY
# export GPG_TTY=$(tty)
# ## Refresh gpg-agent tty in case user switches into an X session
# gpg-connect-agent updatestartuptty /bye >/dev/null

# Append new history items to .bash_history
shopt -s expand_aliases autocd hostcomplete histappend

## Menu completion
bind "set menu-complete-display-prefix on"
bind "TAB:menu-complete"; bind "set show-all-if-ambiguous on"
#bind "TAB:complete"; bind "set show-all-if-ambiguous off"

# shellcheck disable=SC1090 disable=SC1091
[[ -f /usr/share/doc/find-the-command/ftc.bash ]] && . /usr/share/doc/find-the-command/ftc.bash
# shellcheck disable=SC1090 disable=SC1091
[[ -f /usr/share/bash-completion/completions/dkms ]] && . /usr/share/bash-completion/completions/dkms
# shellcheck disable=SC1090 disable=SC1091
[[ -f /usr/share/bash-completion/bash_completion ]] && . /usr/share/bash-completion/bash_completion
# shellcheck disable=SC1090 disable=SC1091
[[ -f /etc/profile.d/cnf.sh ]] && . /etc/profile.d/cnf.sh
# shellcheck disable=SC1090 disable=SC1091
[[ -f "${HOME}/.profile" ]] && . "${HOME}/.profile"

# shellcheck disable=SC1090 disable=SC1091
[[ -f "${ZDOTDIR:-${HOME}/zsh.d}/plugins/z.sh" ]] && . "${ZDOTDIR:-${HOME}/zsh.d}/plugins/z.sh"
# shellcheck disable=SC1090 disable=SC1091
[[ -f "${ZDOTDIR:-${HOME}/zsh.d}/plugins/fz.bash" ]] && . "${ZDOTDIR:-${HOME}/zsh.d}/plugins/fz.bash"
# shellcheck disable=SC1090 disable=SC1091
[[ -f "${ZDOTDIR:-${HOME}/zsh.d}/plugins/ftc.bash" ]] && . "${ZDOTDIR:-${HOME}/zsh.d}/plugins/ftc.bash"

# shellcheck disable=SC1090 disable=SC1091
[[ -f "${HOME}/.fzf.bash" ]] && . "${HOME}/.fzf.bash"
# shellcheck disable=SC1090 disable=SC1091
[[ -f "${HOME}/.aliases" ]] && . "${HOME}/.aliases"
# shellcheck disable=SC1090 disable=SC1091
[[ -f "${HOME}/.bash_funcs" ]] && . "${HOME}/.bash_funcs"

type fasd >/dev/null 2>&1 && eval "$(fasd --init auto)"

# CTRL-X-1 - Invoke Readline functions by name
bind -x '"\C-x2": __fzf_readline'
bind '"\C-x1": "\C-x2\C-x3"'
#bind '"\C-r": "\C-a hh \C-j"'
bind -x '"\C-x1": __fzf_history'
bind '"\C-r": "\C-x1\e^\er"'
## History completion bound to arrow keys
bind '"\e[A": history-search-backward'
bind '"\e[B": history-search-forward'

# Last bash command as tab title
HISTIGNORE='history*'
# get more colors
HISTFILE="${HOME}/.bash_history"
HISTCONTROL='ignoreboth:erasedups'
# increase history file size (default is 500)
HISTSIZE=20000000

export __statstr='' tmp=''
export HTSTFILESIZE="$HISTSIZE"
export HH_CONFIG=hicolor
export PROMPT_COMMAND='__statstr="$( tmp=("${PIPESTATUS[@]}"); ((tmp)) && printf "|%d" "${tmp[@]}" || :)"; printf "\033[0m\033[38;5;2m"$(( `sed -n "s/MemFree:[\t ]\+\([0-9]\+\) kB/\1/p" /proc/meminfo`/1024))"\033[38;5;09m/"$((`sed -n "s/MemTotal:[\t ]\+\([0-9]\+\) kB/\1/Ip" /proc/meminfo`/1024 ))MB"\t\033[m\033[36;11m$(</proc/loadavg)	\033[0m"; history -a'

# If root, print the host in red. Otherwise, print the current user and host in green.
[[ "$EUID" -eq 0 ]] && \
	PS1='\[\e[0;93m\](\[\e[1;93m\]$?\[\e[0;93m\]${__statstr})\[\e[1;30m\] \[\e[m\n\e[1;30m\][$$:$PPID \j:\!\[\e[1;30m\]]\[\e[0;36m\] \T \d \[\e[1;30m\][\[\e[1;31m\]\u@\H\[\e[1;30m\]:\[\e[0;37m\]${SSH_TTY} \[\e[0;32m\]+${SHLVL}\[\e[1;30m\]] \[\e[1;37m\]\w\[\e[0;37m\] \n($SHLVL:\!) \[\e[1;91m\]#\[\e[0;91m\] ' || \
	PS1='\[\e[0;93m\](\[\e[1;93m\]$?\[\e[0;93m\]${__statstr})\[\e[1;30m\] \[\e[m\n\e[1;30m\][$$:$PPID \j:\!\[\e[1;30m\]]\[\e[0;36m\] \T \d \[\e[1;30m\][\[\e[1;34m\]\u@\H\[\e[1;30m\]:\[\e[0;37m\]${SSH_TTY} \[\e[0;32m\]+${SHLVL}\[\e[1;30m\]] \[\e[1;37m\]\w\[\e[0;37m\] \n($SHLVL:\!) \[\e[1;92m\]$\[\e[m\] '

if [[ -f /usr/lib/bash-git-prompt/gitprompt.sh ]]; then
# To only show the git prompt in or under a repository directory
	export GIT_PROMPT_ONLY_IN_REPO=1
	# To use upstream's default theme, modified by arch maintainer
	export GIT_PROMPT_THEME=Default_Arch
	# shellcheck disable=SC1090 disable=SC1091
	. /usr/lib/bash-git-prompt/gitprompt.sh
	# shellcheck disable=SC1090 disable=SC1091
	. /usr/lib/bash-git-prompt/git-prompt-help.sh
fi

## The following line may also be placed in bashrc to set the mode string
#bind "set vi-mode-str2 $(printf '1\033[37m\002+\001\033[0m\002')"
#bind "set vi-mode-str1 $(printf '\033[37m+\033[0m')"

## Custom which/fh for bash
unset -f fh 2>/dev/null
function which () { (alias; declare -f) | /usr/bin/which --tty-only --read-alias --read-functions --show-tilde --show-dot "$@"; }
function fh () { history | fzf +s --tac | sed -re 's/^\s*[0-9]+\s*//' | runcmd; }
export -f which fh

