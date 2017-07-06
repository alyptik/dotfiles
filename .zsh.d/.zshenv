#!/usr/bin/env zsh
#
# .zshenv
#
# Zsh environment

export ZSH="/usr/share/zsh"

## Source command-not-found files.
[[ ! -f "/etc/profile.d/cnf.sh" ]] || \
	emulate sh -c '. "/etc/profile.d/cnf.sh"'
[[ ! -f "${HOME}/.profile" ]] || \
	emulate sh -c '. "${HOME}/.profile"'
[[ ! -f "${HOME}/perl5/perlbrew/etc/bashrc" ]] || \
	. "${HOME}/perl5/perlbrew/etc/bashrc"

## Define ZLE widgets
[[ ! -f "${ZDOTDIR:-$HOME}/.zwidgets" ]] || \
	. "${ZDOTDIR:-$HOME}/.zwidgets"

## Enable gnome keyring for applications run through the terminal, such as SSH
# if [[ -n "$DESKTOP_SESSION" ]]; then
#         #pgrep -x gnome-keyring-daemon >/dev/null 2>&1 && eval "$(gnome-keyring-daemon -r -c secrets 2>/dev/null)"
#         eval "$(gnome-keyring-daemon -s -c secrets 2>/dev/null)"
#         export SSH_AUTH_SOCK
# fi
