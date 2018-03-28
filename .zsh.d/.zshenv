#!/usr/bin/env zsh
#
# .zshenv
#
# zsh environment

if ((!$+ETC_ZSH_ZSHRC)); then
	export ZSH="/usr/share/zsh"
	# source personal dotfiles
	[[ -f "${HOME}/.profile" ]] && emulate sh -c '. "${HOME}/.profile"'
	# source command-not-found files.
	[[ -f /etc/profile.d/cnf.sh ]] && emulate sh -c '. /etc/profile.d/cnf.sh'
	# plan9port setup
	[[ -f /etc/profile.d/plan9.sh ]] && emulate sh -c '. /etc/profile.d/plan9.sh'
	# source perlbrew completions
	[[ -f "${HOME}/perl5/perlbrew/etc/bashrc" ]] && emulate bash -c '. "${HOME}/perl5/perlbrew/etc/bashrc"'
	# setup python-virtualenvwrapper
	[[ -f /usr/bin/virtualenvwrapper.sh ]] && emulate bash -c '. /usr/bin/virtualenvwrapper.sh'
	# [[ -f /usr/bin/virtualenvwrapper_lazy.sh ]] && emulate bash -c '. /usr/bin/virtualenvwrapper_lazy.sh'
	# define ZLE widgets
	[[ -f "${ZDOTDIR:-$HOME}/.zwidgets" ]] && emulate zsh -c '. "${ZDOTDIR:-$HOME}/.zwidgets"'
fi

ETC_ZSH_ZSHRC=1
