#!/bin/sh
#
# .profile - environment configuration

# set command being passed as READNULLCMD
if command -v bat >/dev/null 2>&1; then
	if command -v b >/dev/null 2>&1; then
		dump_cmd="b"
	else
		dump_cmd="bat"
	fi
elif command -v less >/dev/null 2>&1; then
	dump_cmd="less"
else
	dump_cmd="cat"
fi

# set ruby gems path
if command -v ruby >/dev/null 2>&1; then
	rubies="$(ruby -e "puts Gem.user_dir")/bin"
else
	rubies=""
fi

# force TERM over ssh
if [ -d "$HOME/.terminfo" ]; then
	case "$TERM" in
	linux*|xterm*)
		TERM=xterm-256color;;
	screen*)
		TERM=screen-256color;;
	*)
		if [ -n "$STY" ] || [ -n "$SSH_CONNECTION" ]; then
			TERM=screen-256color
		fi;;
	esac
fi

# set locale
if command -v hostname >/dev/null 2>&1; then
	case "$(hostname)" in
	localhost|fedora*)
		locale="C";;
	*)
		locale="en_US.UTF-8";;
	esac
fi

# query number of cores
if command -v nproc >/dev/null 2>&1; then
	NPROC="$(nproc)"
else
	NPROC=4
fi
export NPROC

# configure pinentry to use the correct tty
if [ -t 0 ]; then
	stty -ixon
	if command -v tty >/dev/null 2>&1 && command -v gpgconf >/dev/null 2>&1 && command -v gpg-connect-agent >/dev/null 2>&1; then
		unset SSH_AGENT_PID
		if [ "${gnupg_SSH_AUTH_SOCK_by:-0}" -ne "$$" ]; then
		  SSH_AUTH_SOCK="$(gpgconf --list-dirs agent-ssh-socket)"
		fi
		GPG_TTY="$(tty)"
		export GPG_TTY SSH_AUTH_SOCK
		# gpgconf --launch gpg-agent
		gpg-connect-agent updatestartuptty /bye >/dev/null
	fi
fi

# compiler environment
unset CARCH CCACHE_DISABLE COMMON_FLAGS CFLAGS
unset CCFLAGS CHOST C_INCLUDE_PATH CPATH CPPFLAGS
unset CXXFLAGS LDFLAGS LIBRARY_PATH MAKEFLAGS
unset CARGO_TERM_VERBOSE RUSTFLAGS
# export CARCH="x86_64"
# export CCACHE_DIR="/var/cache/ccache"
export CCACHE_DISABLE=1
# export CCACHE_NODISABLE=true
# export CCACHE_PATH=/usr/bin
# export CCACHE_PREFIX="distcc"
# export CCACHE_TEMPDIR="$CCACHE_DIR/tmp"
# sparse configuraiton
CF="-DCONFIG_SPARSE_RCU_POINTER -D__CHECK_ENDIAN__"
CF="$CF -fmax-warnings=unlimited"
CF="$CF -Wdefault-bitfield-sign -Wdo-while"
CF="$CF -Wparen-string -Wptr-subtraction-blows"
CF="$CF -Wtypesign"
CF="$CF -Wno-undef -Wno-unknown-attribute"
CF="$CF -Wno-pointer-arith -Wno-shadow -Wno-sizeof-bool"
CF="$CF -Wno-non-pointer-null"
export CF
export DISTCC_HOSTS="127.0.0.1,lzo,cpp 192.168.1.99,lzo,cpp"
GCC_COLORS="error=01;31:warning=01;35:note=01;36:range1=32:range2=34"
GCC_COLORS="$GCC_COLORS:caret=01;32:locus=01:quote=01:fixit-insert=32:fixit-delete=31"
GCC_COLORS="$GCC_COLORS:diff-filename=01:diff-hunk=32:diff-delete=31:diff-insert=32"
GCC_COLORS="$GCC_COLORS:type-diff=01;32"
export GCC_COLORS
COMMON_FLAGS="-falign-functions=32 -fstack-clash-protection"
COMMON_FLAGS="$COMMON_FLAGS -fstack-protector-strong -fdiagnostics-color=always"
COMMON_FLAGS="$COMMON_FLAGS -g3 -O3 -march=native -mtune=skylake -pipe"
# compiler flags
# CFLAGS="-Wno-error -Wno-format-truncation -Wno-implicit-fallthrough"
# CFLAGS="$CFLAGS -flto"
# CFLAGS="$CFLAGS -fno-common"
# CFLAGS="$CFLAGS -fvar-tracking -fvar-tracking-assignments"
# CFLAGS="$CFLAGS -fdiagnostics-color=always"
# CFLAGS="$CFLAGS -fdiagnostics-generate-patch"
# CFLAGS="$CFLAGS -fPIC -fstack-protector-strong"
# CFLAGS="$CFLAGS -fPIC -fno-plt"
# CFLAGS="$CFLAGS -fuse-ld=gold -fuse-linker-plugin"
# CFLAGS="$CFLAGS -fno-plt -fno-strict-aliasing"
# CFLAGS="$CFLAGS -march=native -gdwarf-4 -g3 -O3"
# CFLAGS="$CFLAGS -march=x86-64 -mtune=intel -g3 -O3"
# CFLAGS="$CFLAGS -march=x86-64 -mtune=generic -g -O3"
# CFLAGS="$CFLAGS -pipe -march=x86-64 -mtune=skylake -g -O3"
CFLAGS="$COMMON_FLAGS"
export CFLAGS
# export CHOST="x86_64-unknown-linux-gnu"
# export CPATH=":$HOME/.local/include"
# export C_INCLUDE_PATH=":$HOME/.local/include"
# export CPPFLAGS="-D_FORTIFY_SOURCE=2"
CXXFLAGS="$COMMON_FLAGS"
export CXXFLAGS
FCFLAGS="$COMMON_FLAGS"
export FCFLAGS
FFLAGS="$COMMON_FLAGS"
export FFLAGS
# LDFLAGS="$CFLAGS"
# LDFLAGS="$LDFLAGS -Wl,-O2"
# LDFLAGS="$LDFLAGS -Wl,--warn-unresolved-symbols"
# LDFLAGS="$LDFLAGS -Wl,-O2,-z,now,-z,relro,-z,noexecstack"
# LDFLAGS="$LDFLAGS -Wl,--as-needed,--sort-common,--warn-common"
LDFLAGS="-Wl,-O1 -Wl,--as-needed -Wl,-z,now -Wl,-z,pack-relative-relocs"
LDFLAGS="$LDFLAGS -Wl,--defsym=__gentoo_check_ldflags__=0"
export LDFLAGS
# export LIBRARY_PATH="$HOME/.local/lib"
# export MAKEFLAGS="-j -l$NPROC"
export MAKEFLAGS="-j$((NPROC + 2)) -l$NPROC"
export CARGO_TERM_VERBOSE="false"
export RUSTFLAGS="-C opt-level=3 -C debuginfo=0"

# Environment variables
export ANDROID_HOME="$HOME/Android/Sdk"
export ARCHFLAGS="-arch x86-64"
# export BROWSER=firefox
# export BROWSER=chromium
# export BROWSER=w3m
# export BROWSER=lynx
# export BROWSER=netsurf
export CLICOLOR=1
export COGL_ATLAS_DEFAULT_BLIT_MODE=framebuffer
export CORRECT_IGNORE='_?*'
# Audio plugins
DSSI_PATH="/usr/local/lib/dssi:/usr/lib/dssi"
DSSI_PATH="$HOME/dssi:/store/audio/dssi:$DSSI_PATH"
export DSSI_PATH
# Add vim as default editor
export EDITOR=vim
export FCEDIT="$EDITOR" SUDO_EDITOR="$EDITOR" SYSTEMD_EDITOR="$EDITOR" VISUAL="$EDITOR"
export FORCE_UNSAFE_CONFIGURE=1
export FREETYPE_PROPERTIES="truetype:interpreter-version=35"
# FZF_DEFAULT_COMMAND="(git ls-tree -r --name-only HEAD"
# FZF_DEFAULT_COMMAND="$FZF_DEFAULT_COMMAND || find . -path '*/\\.*' -prune -o"
# FZF_DEFAULT_COMMAND="$FZF_DEFAULT_COMMAND \\( -type f -o -type l \\) -print"
# FZF_DEFAULT_COMMAND="$FZF_DEFAULT_COMMAND | sed s/^..//) 2>/dev/null"
# shellcheck disable=SC2089
FZF_DEFAULT_COMMAND="ag -g ''"
FZF_DEFAULT_OPTS="--color fg:-1,bg:-1,hl:230,fg+:3,bg+:233,hl+:229"
FZF_DEFAULT_OPTS="$FZF_DEFAULT_OPTS --color info:150,prompt:110,spinner:150,pointer:167,marker:174"
FZF_DEFAULT_OPTS="$FZF_DEFAULT_OPTS --height 40%"
FZF_DEFAULT_OPTS="$FZF_DEFAULT_OPTS --reverse"
# shellcheck disable=SC2089
FZF_ALT_C_OPTS="$FZF_DEFAULT_OPTS --preview 'tree -C {} | head -200'"
# shellcheck disable=SC2089
FZF_CTRL_R_OPTS="$FZF_DEFAULT_OPTS --preview 'echo {}'"
FZF_CTRL_R_OPTS="$FZF_CTRL_R_OPTS --preview-window down:3:hidden"
FZF_CTRL_R_OPTS="$FZF_CTRL_R_OPTS --bind '?:toggle-preview'"
FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
# Using highlight (http://www.andre-simon.de/doku/highlight/en/highlight.html)
# shellcheck disable=SC2089
FZF_CTRL_T_OPTS="$FZF_DEFAULT_OPTS --preview '(highlight -O ansi -l {}"
FZF_CTRL_T_OPTS="$FZF_CTRL_T_OPTS || cat {} || tree -C {}) 2>/dev/null | head -200'"
# shellcheck disable=SC2090
export FZF_ALT_C_OPTS FZF_CTRL_R_OPTS FZF_CTRL_T_OPTS
# shellcheck disable=SC2090
export FZF_DEFAULT_OPTS FZF_CTRL_T_COMMAND FZF_DEFAULT_COMMAND
# export GDK_DPI_SCALE=0.4
# export GDK_SCALE=2.25
export GEM_HOME="$HOME/.gem"
export GIT_PAGER="less -MRins"
export GOPATH="$HOME/.go"
# Use  the GROFF_NO_SGR environment variable to revert to the old
# behaviour, printing a bold character c with the sequence `c BACKSPACE c' and
# an italic character c by the sequence `_ BACKSPACE c'.  At the same time,
# color output is disabled.
# unset GROFF_NO_SGR
export GROFF_NO_SGR=1
# Gtk themes
# export GTK_DEBUG=all
# export GTK_IM_MODULE="xim" QT_IM_MODULE="xim" XMODIFIERS="@im=none"
# export GTK_IM_MODULE="fcitx" QT_IM_MODULE="fcitx" XMODIFIERS="@im=fcitx"
# export GTK_IM_MODULE="ibus" QT_IM_MODULE="ibus" XMODIFIERS="@im=ibus"
export GTK2_RC_FILES="$HOME/.gtkrc-2.0"
# get more colors
export HH_CONFIG=hicolor
INFOPATH="/usr/local/texlive/2016/texmf-dist/doc/info:/usr/share/info"
INFOPATH="$HOME/GNUstep/Library/Documentation/info:$INFOPATH"
INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"
INFOPATH="$HOME/.local/share/.info:$INFOPATH"
INFOPATH="/usr/share/binutils-data/x86_64-pc-linux-gnu/2.42/info:$INFOPATH"
INFOPATH="/usr/share/gcc-data/x86_64-pc-linux-gnu/14/info:$INFOPATH"
INFOPATH="/usr/share/autoconf-2.72/info:$INFOPATH"
INFOPATH="/usr/share/automake-1.16.5/info:$INFOPATH"
export INFOPATH
export _JAVA_AWT_WM_NONREPARENTING=1
_JAVA_OPTIONS="-Dswing.aatext=true -Dawt.useSystemAAFontSettings=on"
_JAVA_OPTIONS="$_JAVA_OPTIONS -Dsun.java2d.opengl=true"
export _JAVA_OPTIONS
# export JAVA_HOME=/usr/lib/jvm/java-8-openjdk
# export JAVA_HOME=/usr/lib/jvm/java-10-openjdk
export JAVA_HOME=/usr/lib64/openjdk-21
# export JAVA_HOME=/usr/lib/jvm/java-9-jdk
# export JAVA_HOME=/usr/lib/jvm/java-10-jdk
# export JAVA_HOME=/usr/lib/jvm/java-11-jdk
# Configure KWin to use OpenGL ES
export KWIN_COMPOSE="O2ES"
export LADSPA_PATH="/usr/lib/ladspa:/usr/local/lib/ladspa:$HOME/ladspa:/store/audio/ladspa"
export LANG="$locale"
export LANGUAGE="$locale"
unset LC_ALL
# export LC_ALL="$locale"
export LC_COLLATE="C"
# export LC_COLLATE="$locale"
export LC_CTYPE="$locale"
export LC_NUMERIC="$locale"
export LC_TIME="$locale"
export LC_MONETARY="$locale"
export LC_MESSAGES="$locale"
export LC_PAPER="$locale"
export LC_NAME="$locale"
export LC_ADDRESS="$locale"
export LC_TELEPHONE="$locale"
export LC_MEASUREMENT="$locale"
export LC_IDENTIFICATION="$locale"
export LIBVA_DRIVER_NAME=vdpau
export LOCALE="C"
export LV2_PATH="/usr/lib/lv2:/usr/local/lib/lv2:$HOME/lv2:/store/audio/lv2"
export LXVST_PATH="/usr/lib/lxvst:/usr/local/lib/lxvst:$HOME/lxvst:/store/audio/lxvst"
# export LESS=MNRXis
export LESS="FMRXins"
# shellcheck disable=SC2039
export LESS_TERMCAP_se=$'\E[0m' LESS_TERMCAP_me=$'\E[0m' LESS_TERMCAP_us=$'\E[4;32;4;132m'
# shellcheck disable=SC2039
export LESS_TERMCAP_ue=$'\E[0m' LESS_TERMCAP_so=$'\E[30;43m' LESS_TERMCAP_md=$'\E[1;31m'
unset LIBGL_DRI3_DISABLE
# export LIBGL_DRI3_DISABLE=1
export MANPAGER="env -u LESS less -MRins"
MANPATH="/usr/local/man:/usr/share/man:$MANPATH"
MANPATH="/usr/lib/plan9/man:$MANPATH"
MANPATH="/opt/intel/man/common:$MANPATH"
MANPATH="$HOME/perl5/man:$MANPATH"
MANPATH="$HOME/.local/share/man:$MANPATH"
MANPATH="$CONFIG/man:$MANPATH"
MANPATH="$CONFIG/local/man:$MANPATH"
MANPATH="/usr/share/gcc-data/x86_64-pc-linux-gnu/14/man:$MANPATH"
MANPATH="/usr/share/binutils-data/x86_64-pc-linux-gnu/2.42/man:$MANPATH"
MANPATH="/usr/lib/llvm/18/share/man:$MANPATH"
MANPATH="/usr/share/wine-staging-9.9/man:$MANPATH"
MANPATH="/usr/lib64/openjdk-21/man:$MANPATH"
MANPATH="/usr/lib/rust/1.77.1/share/man:$MANPATH"
export MANPATH
export MANSECT="1:2:3:9:0:7:5:4:n:l:8:6:1p:3f:3pm"
export MESA_GL_VERSION_OVERRIDE="4.5COMPAT"
export npm_config_prefix="$HOME/.node_modules"
# export PAGER=vimpager
export PAGER=less
# default PATH
PATH="/bin:/sbin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:$PATH"
PATH="/usr/bin/core_perl:/usr/bin/site_perl:/usr/bin/vendor_perl:$PATH"
PATH="/usr/lib/surfraw:/usr/lib/jvm/default/bin:$PATH"
# PATH="/usr/lib/distcc/bin:$PATH"
PATH="/usr/lib/ccache/bin:$PATH"
PATH="/opt/android-sdk/platform-tool:$PATH"
PATH="/opt/TIS-100:/opt/cuda/bin:$PATH"
PATH="/opt/cross/bin:/opt/intel/bin:$PATH"
PATH="$ANDROID_HOME/platform-tools:$PATH"
PATH="$HOME/.node_modules/bin:$PATH"
PATH="$ANDROID_HOME/tools:$PATH"
PATH="$HOME/.cargo/bin:$PATH"
PATH="$HOME/perl5/bin:$PATH"
PATH="$JAVA_HOME/bin:$PATH"
PATH="$rubies:$PATH"
PATH="$LINUX/scripts:$PATH"
PATH="$HOME/.local/bin:$HOME/bin:$PATH"
PATH="$HOME/lind_project/lind/repy/bin:$PATH"
PATH="$HOME/lind_project/lind/repy/sdk/toolchain/linux_x86_glibc/bin:$PATH"
PATH="$PATH:/usr/lib/llvm/18/bin"
PATH="/usr/lib64/openjdk-21/bin:$PATH"
PATH="/etc/eselect/wine/bin:$PATH"
PATH="/opt/bin:$PATH"
PATH="$HOME/.cargo/bin:$PATH"
PATH="/var/lib/snapd/snap/bin:$PATH"
# shellcheck disable=SC2039
# elide empty PATH components
PATH="${PATH//::/:}"
PATH="${PATH#:}"
PATH="${PATH%:}"
export PATH
# shellcheck disable=SC2039
# PERL5LIB="$HOME/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB//:$HOME\/perl5\/lib\/perl5}}"
# shellcheck disable=SC2039
# PERL5LIB="${PERL5LIB:+${PERL5LIB//:$HOME\/perl5\/lib\/perl5}}"
# export PERL5LIB
# shellcheck disable=SC2039
# PERL_LOCAL_LIB_ROOT="$HOME/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT//:$HOME\/perl5}}"
# shellcheck disable=SC2039
# PERL_LOCAL_LIB_ROOT="${PERL_LOCAL_LIB_ROOT:+${PERL_LOCAL_LIB_ROOT//:$HOME\/perl5}}"
# export PERL_LOCAL_LIB_ROOT
# export PERL_MB_OPT="--install_base \"$HOME/perl5\""
# export PERL_MM_OPT="INSTALL_BASE=\"$HOME/perl5\""
# export PERLDOC="-i -oman"
# export PERLDOC_PAGER="most -+C -E"
# export PERLDOC_PAGER="less -+C -MRXs"
# export PERLDOC_PAGER="less -MRins"
# export PLAN9=/usr/lib/plan9 PATH="$PATH:$PLAN9/bin"
PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:/usr/lib/pkgconfig"
PKG_CONFIG_PATH="$HOME/.local/lib/pkgconfig:$PKG_CONFIG_PATH"
export PKG_CONFIG_PATH
# export PLAN9=/usr/lib/plan9 PATH="${PATH//:\/usr\/lib\/plan9\/bin}:$PLAN9/bin"
export PLAN9=/opt/plan9
# shellcheck disable=SC2039
export PATH="${PATH//:$PLAN9\/bin}:$PLAN9/bin" MANPATH="${MANPATH//:$PLAN9\/man}:$PLAN9/share/man"
export PRE="$HOME/.local" pre="$PRE"
export PRIMUS_SYNC=1
export PS_FORMAT="flags,uid,pid,ppid,tpgid,pgrp,session,pri,ni,pcpu,sz,wchan,stat,state,tname,time,args"
# Python2 compatibility
# export PYTHON="/usr/bin/python2"
export PYTHON_COLORS=1
export PYTHON_HISTORY="$HOME/.python_history"
# export PYTHONSTARTUP="$HOME/.pythonrc"
export READNULLCMD="$dump_cmd"
export REPORTTIME=5
export RLWRAP_EDITOR="vim '+call cursor(%L,%C)'"
export QEMU_AUDIO_DRV=pa
# export QEMU_PA_SERVER=localhost
export QT_AUTO_SCREEN_SCALE_FACTOR=1
export QT_PLUGIN_PATH="$HOME/.kde4/lib/kde4/plugins:/usr/lib/kde4/plugins"
export QT_QPA_PLATFORMTHEME=qt5ct
# export QT_SCALE_FACTOR=2.25
# increase history size (default is 500)
export HISTSIZE=1000000
export HISTFILESIZE="$HISTSIZE" SAVEHIST="$HISTSIZE"
# export QT_SCREEN_SCALE_FACTORS=2.25
export SDL_AUDIODRIVER=alsa
SURF_USERAGENT="Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5 Build/MOB3OD)"
SURF_USERAGENT="$SURF_USERAGENT AppleWebKit/537.36 (KHTML, like Gecko)"
SURF_USERAGENT="$SURF_USERAGENT Chrome/49.0.2623.105 Mobile Safari/537.36"
export SURF_USERAGENT
export SYSTEMD_LESS="FKMRins"
export TERMINAL=st
TIME="%J
[system: %S] [elapsed: %E] [cpu: %P]
[swaps: %W] ([major: %F]+[minor: %R] pagefaults)
[input: %I]+[output: %O] ([text: %Xk]+[data: %Dk] [max: %Mk] memory)
[exit: %W] ([voluntary: %w]+[involuntary: %c] context-switches)"
TIMEFMT="$TIME"
export TiME TIMEFMT
# export TZ=/usr/share/zoneinfo/posix/Pacific/Honolulu
export VDPAU_DRIVER=nvidia
export VST_PATH="$HOME/vst:/store/audio/vst:/usr/lib/vst:/usr/local/lib/vst"
# export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python2
# export VIRTUALENVWRAPPER_VIRTUALENV=/usr/bin/virtualenv
export VIRTUALENVWRAPPER_VIRTUALENV=/usr/bin/virtualenv2
# define word separators (for stuff like backward-word, forward-word, backward-kill-word,..)
export WORDCHARS=''
# export WORDCHARS='_-*~'
# export WORDCHARS='*?_-.[]~=/&;!#$%^ (){}<>'
export WORKON_HOME="$HOME/.virtualenvs"
# Set X cursor theme
export XCURSOR_THEME="Oxygen_Blue"
# export XCURSOR_THEME=ArchCursorTheme
export XDG_CACHE_HOME="$HOME/.cache"
export XDG_CONFIG_DIRS="$HOME/.config:/etc/xdg"
# export XDG_CONFIG_HOME="$HOME/.config"
export XDG_CONFIG_HOME="$HOME/.local/etc"
export XDG_DATA_DIRS="/usr/local/share:/usr/share"
export XDG_DATA_HOME="$HOME/.local/share"
export ZDOTDIR="$HOME/.zsh.d"

# z environment
#
# maintains a jump-list of the directories you actually use
#
# INSTALL:
#     * put something like this in your .bashrc/.zshrc:
#         . /path/to/z.sh
#     * cd around for a while to build up the db
#     * PROFIT!!
#     * optionally:
#         set $_Z_CMD in .bashrc/.zshrc to change the command (default z).
#         set $_Z_DATA in .bashrc/.zshrc to change the datafile (default ~/.z).
#         set $_Z_NO_RESOLVE_SYMLINKS to prevent symlink resolution.
#         set $_Z_NO_PROMPT_COMMAND if you're handling PROMPT_COMMAND yourself.
#         set $_Z_EXCLUDE_DIRS to an array of directories to exclude.
#         set $_Z_OWNER to your username if you want use z while sudo with $HOME kept
#
# USE:
#     * z foo     # cd to most frecent dir matching foo
#     * z foo bar # cd to most frecent dir matching foo and bar
#     * z -r foo  # cd to highest ranked dir matching foo
#     * z -t foo  # cd to most recently accessed dir matching foo
#     * z -l foo  # list matches instead of cd
#     * z -c foo  # restrict matches to subdirs of $PWD
unset _Z_CMD _Z_DATA _Z_NO_RESOLVE_SYMLINKS
unset _Z_NO_PROMPT_COMMAND _Z_EXCLUDE_DIRS
unset _Z_OWNER _FASD_SINK _last_z_args
export _Z_NO_RESOLVE_SYMLINKS=true
# export _Z_NO_PROMPT_COMMAND=true
# export _Z_OWNER=alyptik
# export _FASD_SINK="/store/.fasd.log"
# used to track arguments of last `z` command
export _last_z_args

# vi:ft=sh:
