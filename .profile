#!/bin/sh
#
# .profile
#
# Environment configuration

# conditionals
if [ x"$(hostname)" = x"fedora" ]; then
	TERM=screen-256color
fi
if [ x"$(hostname)" = x"compiler" ]; then
	TERM=screen-256color
fi
# Disable toggling XON/XOFF with ^S/^Q
if [ -t 0 ]; then
	stty -ixon
fi

# directory shortcut environment variables
export H="$HOME" h="$HOME"
export PROJECTS="/store/code/projects" P="$PROJECTS" p="$PROJECTS"
export LINUX="$PROJECTS/linux" L="$LINUX" l="$LINUX"
export CONFIG="/store/dotfiles" C="$CONFIG" c="$CONFIG"

# Environment variables
# Compilation flags
export ARCHFLAGS="-arch x86_64"
# export BROWSER=/usr/bin/firefox
# export BROWSER=/usr/bin/chromium
export BROWSER=/usr/bin/w3m
export CCACHE_DIR="$HOME/.ccache"
export CCACHE_DISABLE=1
# export CCACHE_PATH=/usr/bin
# export CCACHE_PREFIX="distcc"
export CCACHE_TEMPDIR="$CCACHE_DIR/tmp"
CF="-DCONFIG_SPARSE_RCU_POINTER -D__CHECK_ENDIAN__"
CF="$CF -Wdefault-bitfield-sign -Wparen-string"
CF="$CF -Wptr-subtraction-blows -Wshadow"
CF="$CF -Wsizeof-bool -Wtypesign -Wundef"
export CF
# export CORRECT_IGNORE="_?*"
export DISTCC_HOSTS="127.0.0.1,lzo,cpp 192.168.1.99,lzo,cpp"
# Audio plugins
export DSSI_PATH="/usr/lib/dssi:/usr/local/lib/dssi:${HOME}/dssi:/store/audio/dssi"
# Add vim as default editor
export EDITOR=/usr/bin/vim
export FCEDIT="$EDITOR" SUDO_EDITOR="$EDITOR" SYSTEMD_EDITOR="$EDITOR" VISUAL="$EDITOR"
export FREETYPE_PROPERTIES="truetype:interpreter-version=35"
# export FZF_DEFAULT_COMMAND="
#         (git ls-tree -r --name-only HEAD ||
#         find . -path '*/\\.*' -prune -o \\( -type f -o -type l \\) -print |
#         sed s/^..//) 2>/dev/null
# "
export FZF_DEFAULT_COMMAND='ag -g ""'
export FZF_DEFAULT_OPTS="
	--color fg:-1,bg:-1,hl:230,fg+:3,bg+:233,hl+:229
	--color info:150,prompt:110,spinner:150,pointer:167,marker:174
	--height 40%
"
export FZF_ALT_C_OPTS="--preview 'tree -C {} | head -200'"
export FZF_CTRL_R_OPTS="--preview 'echo {}' --preview-window down:3:hidden --bind '?:toggle-preview'"
# To apply the command to CTRL-T as well
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
# Using highlight (http://www.andre-simon.de/doku/highlight/en/highlight.html)
export FZF_CTRL_T_OPTS="
	--preview '(highlight -O ansi -l {} 2> /dev/null || cat {} || tree -C {}) 2> /dev/null | head -200'
"
# Color GCC
export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'
# export GDK_DPI_SCALE=0.4
# export GDK_SCALE=2.25
export GIT_PAGER="less -CMRins"
export GOPATH="${HOME}/.go"
export GROFF_NO_SGR=1 man
# Gtk themes
export GTK_DEBUG=1
export GTK_IM_MODULE="xim" QT_IM_MODULE="xim" XMODIFIERS="@im=none"
# export GTK_IM_MODULE="fcitx" QT_IM_MODULE="fcitx" XMODIFIERS="@im=fcitx"
# export GTK_IM_MODULE="ibus" QT_IM_MODULE="ibus" XMODIFIERS="@im=ibus"
export GTK2_RC_FILES="${HOME}/.gtkrc-2.0"
# get more colors
export HH_CONFIG=hicolor
# increase history size (default is 500)
export HISTSIZE=20000000 HISTFILESIZE="$HISTSIZE"
# export INFOPATH="/usr/local/texlive/2016/texmf-dist/doc/info:/usr/share/info:${HOME}/.linuxbrew/share/info:${HOME}/GNUstep/Library/Documentation/info:${INFOPATH}"
export INFOPATH="/usr/local/texlive/2016/texmf-dist/doc/info:/usr/share/info:/home/alyptik/.linuxbrew/share/info:/home/alyptik/GNUstep/Library/Documentation/info"
export _JAVA_AWT_WM_NONREPARENTING=1
# export _JAVA_OPTIONS='-Dsun.java2d.opengl=true -Dswing.aatext=true -Dawt.useSystemAAFontSettings=on'
export _JAVA_OPTIONS='-Dswing.aatext=true -Dawt.useSystemAAFontSettings=on'
# Configure KWin to use OpenGL ES
export KWIN_COMPOSE="O2ES"
export LADSPA_PATH="/usr/lib/ladspa:/usr/local/lib/ladspa:${HOME}/ladspa:/store/audio/ladspa"
export LANG="en_US.UTF-8"
export LANGUAGE="en_US.UTF-8"
# this overwrites the value of LANG and any other LC_ variable specifying a locale category
# export LC_ALL=en_US.UTF-8
unset LC_ALL
export LC=en_US.UTF-8
export LC_COLLATE=en_US.UTF-8
export LC_CTYPE=en_US.UTF-8
export LC_MESSAGES=en_US.UTF-8
export LC_NUMERIC=en_US.UTF-8
export LC_TIME=en_US.UTF-8
LD_LIBRARY_PATH="/usr/lib:/usr/lib64:/usr/lib32"
LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/home/alyptik/GNUstep/Library/Libraries"
export LD_LIBRARY_PATH
export LOCALE=C
export LV2_PATH="/usr/lib/lv2:/usr/local/lib/lv2:${HOME}/lv2:/store/audio/lv2"
export LXVST_PATH="/usr/lib/lxvst:/usr/local/lib/lxvst:${HOME}/lxvst:/store/audio/lxvst"
export LESS=CMNRis
# shellcheck disable=SC2039
export LESS_TERMCAP_se=$'\E[0m' LESS_TERMCAP_me=$'\E[0m' LESS_TERMCAP_us=$'\E[4;32;4;132m'
# shellcheck disable=SC2039
export LESS_TERMCAP_ue=$'\E[0m' LESS_TERMCAP_so=$'\E[30;43m' LESS_TERMCAP_md=$'\E[1;31m'
# Intel VA-API and VDPAU configuration
# export LIBVA_DRIVER_NAME=i965 VDPAU_DRIVER=va_gl
# export MAKEFLAGS="-j -l5"
export MAKEFLAGS="-j5"
export MANPAGER="less -CMRins"
MANPATH="/usr/lib/plan9/man:/usr/local/texlive/2016/texmf-dist/doc/man"
MANPATH="$MANPATH:/opt/intel/man/common:/usr/local/man:/usr/share/man:${C}/man"
export MANPATH
export MANSECT="1:2:3:9:0:7:5:4:n:l:8:6:3f"
export MESA_GL_VERSION_OVERRIDE="4.5COMPAT"
export npm_config_prefix="${HOME}/.node_modules"
# export PAGER=/usr/bin/vimpager
export PAGER=/usr/bin/less
# default PATH
PATH="/bin:/sbin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin"
PATH="/usr/lib/jvm/default/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:$PATH"
PATH="/usr/bin/core_perl:${HOME}/code/go/bin:/opt/TIS-100:/opt/cuda/bin:$PATH"
PATH="/store/local/bin:${HOME}/.linuxbrew/bin:${HOME}/GNUstep/Tools:$PATH"
PATH="/usr/lib/surfraw:/store/local/Wolfram/CDFPlayer/10.3/Executables:$PATH"
PATH="/opt/android-sdk/platform-tools:${HOME}/.gem/ruby/2.3.0/bin:$PATH"
PATH="${HOME}/.cargo/bin:/opt/intel/bin:/store/config/scripts:$PATH"
PATH="${HOME}/.node_modules/bin:${HOME}/.gem/ruby/2.4.0/bin:${HOME}/perl5/bin:$PATH"
PATH="${HOME}/.local/bin:/usr/local/texlive/2016/bin/x86_64-linux:$PATH"
PATH="${HOME}/bin:${HOME}/.zsh.d/plugins/zplug/bin:$PATH"
PATH="${HOME}/.zplug/bin:${HOME}/bin/asski:${LINUX}/scripts:$PATH"
PATH="$(ruby -rrubygems -e "puts Gem.user_dir")/bin:$PATH"
# PATH="/usr/lib/distcc/bin:$PATH"
PATH="/usr/lib/ccache/bin:$PATH"
# prepend cross compiler to PATH
PATH="/opt/cross/bin:$PATH"
export PATH
# shellcheck disable=SC2039
PERL5LIB="${HOME}/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB//:${HOME}\/perl5\/lib\/perl5}}"
# shellcheck disable=SC2039
PERL5LIB="${PERL5LIB:+${PERL5LIB//:${HOME}\/perl5\/lib\/perl5}}"
export PERL5LIB
# shellcheck disable=SC2039
PERL_LOCAL_LIB_ROOT="${HOME}/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT//:${HOME}\/perl5}}"
# shellcheck disable=SC2039
PERL_LOCAL_LIB_ROOT="${PERL_LOCAL_LIB_ROOT:+${PERL_LOCAL_LIB_ROOT//:${HOME}\/perl5}}"
export PERL_LOCAL_LIB_ROOT
export PERL_MB_OPT="--install_base \"${HOME}/perl5\""
export PERL_MM_OPT="INSTALL_BASE=${HOME}/perl5"
export PERLDOC="-i -oman"
# export PERLDOC_PAGER="most -+C -E"
# export PERLDOC_PAGER="less -+C -MRXs"
export PERLDOC_PAGER="less -CMRins"
# export PLAN9=/usr/lib/plan9 PATH="${PATH}:${PLAN9}/bin"
PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:/usr/lib/pkgconfig"
PKG_CONFIG_PATH="${HOME}/GNUstep/Library/Libraries/pkgconfig:$PKG_CONFIG_PATH"
PKG_CONFIG_PATH="${HOME}/.local/lib/pkgconfig:$PKG_CONFIG_PATH"
export PKG_CONFIG_PATH
# export PLAN9=/usr/lib/plan9 PATH="${PATH//:\/usr\/lib\/plan9\/bin}:${PLAN9}/bin"
# shellcheck disable=SC2039
export PLAN9=/opt/plan9 PATH="${PATH//:\/opt\/plan9\/bin}:$PLAN9/bin"
# shellcheck disable=SC2039
export p9="${PLAN9}" MANPATH="${MANPATH//:\/opt\/plan9\/share\/man}:${PLAN9}/share/man"
export PRE="${HOME}/.local" pre="$PRE"
# export PS_FORMAT="flags,uid,pid,ppid,tpgid,pgrp,session,pri,ni,utime,pcpu,addr,sz,wchan,stat,state,tname,time,comm"
export PS_FORMAT="flags,uid,pid,ppid,tpgid,pgrp,session,pri,ni,utime,pcpu,addr,sz,wchan,stat,state,tname,time,args"
# Python2 compatibility
# export PYTHON="/usr/bin/python2.7"
# export PYTHON='/store/config/scripts/python2'
export PYTHONSTARTUP="${HOME}/.pythonrc"
export READNULLCMD=less
export QEMU_AUDIO_DRV=pa
export QEMU_PA_SERVER=localhost
# Qt themes
export QT_AUTO_SCREEN_SCALE_FACTOR=1
export QT_PLUGIN_PATH="${HOME}/.kde4/lib/kde4/plugins:/usr/lib/kde4/plugins"
export QT_QPA_PLATFORMTHEME=qt5ct
export QT_SCALE_FACTOR=2.25
export QT_SCREEN_SCALE_FACTORS=2.25
export SAVEHIST="$HISTSIZE"
export SDL_AUDIODRIVER=alsa
export SSH_KEY_PATH="${HOME}/.ssh/id_gpg"
SURF_USERAGENT="Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5 Build/MOB3OD)"
SURF_USERAGENT="$SURF_USERAGENT AppleWebKit/537.36 (KHTML, like Gecko)"
SURF_USERAGENT="$SURF_USERAGENT Chrome/49.0.2623.105 Mobile Safari/537.36"
export SURF_USERAGENT
export SYSTEMD_LESS="CFKMRins" journalctl
export TERMINAL=st
export TZ=/usr/share/zoneinfo/posix/Pacific/Honolulu
export VST_PATH="/usr/lib/vst:/usr/local/lib/vst:${HOME}/vst:/store/audio/vst"
# Set X cursor theme
export XCURSOR_THEME=ArchCursorTheme
export XDG_CACHE_HOME="${HOME}/.cache"
export XDG_CONFIG_DIRS="/etc/xdg"
export XDG_CONFIG_HOME="${HOME}/.config"
export XDG_DATA_DIRS="/usr/local/share:/usr/share"
export XDG_DATA_HOME="${HOME}/.local/share"
export ZDOTDIR="${HOME}/.zsh.d"
export _Z_OWNER=alyptik
export _Z_NO_PROMPT_COMMAND=true
export _Z_NO_RESOLVE_SYMLINKS=true
