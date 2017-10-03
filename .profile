#
# .profile
#
# Environment configuration

# conditionals
if [ "$(hostname)" == "fedora" ]; then
	TERM=screen-256color
fi
# Disable toggling XON/XOFF with ^S/^Q
if [ -t 0 ]; then
	stty -ixon
fi

# Environment variables
# Compilation flags
export ARCHFLAGS="-arch x86_64"
# export BROWSER=firefox
# export BROWSER=chromium
# Tell ccache to only use these compilers
# export CCACHE_PATH=/usr/bin
# export CCACHE_PATH=/usr/lib/distcc/bin:/usr/bin
# export CCACHE_PREFIX="distcc"
export C="/store/dotfiles" c="$C"
# export CORRECT_IGNORE="_?*"
export DISTCC_HOSTS="127.0.0.1,lzo,cpp 192.168.1.99,lzo,cpp"
# Audio plugins
export DSSI_PATH="/usr/lib/dssi:/usr/local/lib/dssi:${HOME}/dssi:/store/audio/dssi"
# Add vim as default editor
export EDITOR=vim
export FCEDIT="$EDITOR" VISUAL="$EDITOR" SUDO_EDITOR="$EDITOR" SYSTEMD_EDITOR="$EDITOR"
# Setting ag as the default source for fzf
export FZF_DEFAULT_COMMAND='ag -g ""'
# export FZF_DEFAULT_COMMAND='(git ls-tree -r --name-only HEAD || \
#         find . -path "*/\.*" -prune -o -type f -print -o -type l -print | \
#         sed s/^..//) 2> /dev/null'
export FZF_DEFAULT_OPTS='
	--color fg:-1,bg:-1,hl:230,fg+:3,bg+:233,hl+:229
	--color info:150,prompt:110,spinner:150,pointer:167,marker:174
	--height 40%
'
export FZF_ALT_C_OPTS="--preview 'tree -C {} | head -200'"
export FZF_CTRL_R_OPTS="--preview 'echo {}' --preview-window down:3:hidden --bind '?:toggle-preview'"
# To apply the command to CTRL-T as well
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
# Using highlight (http://www.andre-simon.de/doku/highlight/en/highlight.html)
export FZF_CTRL_T_OPTS="--preview '(highlight -O ansi -l {} 2> /dev/null || cat {} || tree -C {}) 2> /dev/null | head -200'"
# Color GCC
export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'
# export GDK_DPI_SCALE=0.4
# export GDK_SCALE=2.25
export GIT_PAGER=less
export GOPATH="${HOME}/code/go"
# Gtk themes
export GTK2_RC_FILES="${HOME}/.gtkrc-2.0"
export GTK_DEBUG=1
export H="$HOME" h="$H"
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
export LD_LIBRARY_PATH="/usr/lib64:/usr/lib:/usr/lib32:/home/alyptik/GNUstep/Library/Libraries"
export LOCALE=C
export LV2_PATH="/usr/lib/lv2:/usr/local/lib/lv2:${HOME}/lv2:/store/audio/lv2"
export LXVST_PATH="/usr/lib/lxvst:/usr/local/lib/lxvst:${HOME}/lxvst:/store/audio/lxvst"
export GROFF_NO_SGR=1 LESS='CMRis' LESS='CMRXis' man man git
export LESS_TERMCAP_se=$'\E[0m' LESS_TERMCAP_me=$'\E[0m' LESS_TERMCAP_us=$'\E[4;32;4;132m'
# export LESS_TERMCAP_ue=$'\E[0m' LESS_TERMCAP_so=$'\E[30;43;5m' LESS_TERMCAP_md=$'\E[1;31m'
export LESS_TERMCAP_ue=$'\E[0m' LESS_TERMCAP_so=$'\E[30;43m' LESS_TERMCAP_md=$'\E[1;31m'
# Intel VA-API and VDPAU configuration
# export LIBVA_DRIVER_NAME="i965"
# export VDPAU_DRIVER="va_gl"
export MAKEFLAGS="-j -l5"
export MANPATH="${C}/man:/usr/local/texlive/2016/texmf-dist/doc/man:/opt/intel/man/common:/usr/local/man:/usr/share/man"
export MANSECT="3:2:0:9:7:5:4:1:n:l:8:6:3f"
export npm_config_prefix="${HOME}/.node_modules"
export PAGER=less
# export PAGER=vimpager
export PATH="${HOME}/.zsh.d/plugins/zplug/bin:${HOME}/.zplug/bin:${HOME}/bin/asski:${HOME}/.local/bin:/usr/local/texlive/2016/bin/x86_64-linux:${HOME}/.node_modules/bin:${HOME}/bin:${HOME}/.gem/ruby/2.4.0/bin:${HOME}/perl5/bin:${HOME}/.cargo/bin:/usr/lib/distcc/bin:/opt/intel/bin:/store/config/scripts:/opt/android-sdk/platform-tools:${HOME}/.gem/ruby/2.3.0/bin:/usr/lib/surfraw:/store/local/Wolfram/CDFPlayer/10.3/Executables:/store/local/bin:${HOME}/.linuxbrew/bin:${HOME}/GNUstep/Tools:/bin:/sbin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/usr/lib/jvm/default/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl:${HOME}/code/go/bin:/opt/TIS-100"
export PATH="${HOME}/.zsh.d/plugins/zplug/bin:${HOME}/.zplug/bin:${HOME}/bin/asski:${HOME}/.local/bin:/usr/local/texlive/2016/bin/x86_64-linux:${HOME}/.node_modules/bin:${HOME}/bin:${HOME}/.gem/ruby/2.4.0/bin:${HOME}/perl5/bin:${HOME}/.cargo/bin:/usr/lib/colorgcc/bin:/opt/intel/bin:/store/config/scripts:/opt/android-sdk/platform-tools:${HOME}/.gem/ruby/2.3.0/bin:/usr/lib/surfraw:/store/local/Wolfram/CDFPlayer/10.3/Executables:/store/local/bin:${HOME}/.linuxbrew/bin:${HOME}/GNUstep/Tools:/bin:/sbin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/usr/lib/jvm/default/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl:${HOME}/code/go/bin:/opt/TIS-100"
# default PATH
# export PATH="/usr/local/sbin:/usr/local/bin:/bin:/sbin:/usr/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl"
# prepend cross compiler to PATH
export PATH="/opt/cross/bin:$PATH"
export PERL5LIB="${HOME}/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB//:${HOME}\/perl5\/lib\/perl5}}"
export PERL5LIB="${PERL5LIB:+${PERL5LIB//:${HOME}\/perl5\/lib\/perl5}}"
export PERL_LOCAL_LIB_ROOT="${HOME}/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT//:${HOME}\/perl5}}"
export PERL_LOCAL_LIB_ROOT="${PERL_LOCAL_LIB_ROOT:+${PERL_LOCAL_LIB_ROOT//:${HOME}\/perl5}}"
export PERL_MB_OPT="--install_base \"${HOME}/perl5\""
export PERL_MM_OPT="INSTALL_BASE=${HOME}/perl5"
export PERLDOC="-i -oman"
# export PERLDOC_PAGER="less -+C -MRXs"
export PERLDOC_PAGER="less -CMRis"
# export PERLDOC_PAGER="most -+C -E"
# export PLAN9=/usr/lib/plan9 PATH="${PATH}:${PLAN9}/bin"
export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:${HOME}/GNUstep/Library/Libraries/pkgconfig:/usr/lib/pkgconfig"
# export PLAN9=/usr/lib/plan9 PATH="${PATH//:\/usr\/lib\/plan9\/bin}:${PLAN9}/bin"
export PLAN9=/opt/plan9 PATH="${PATH//:\/opt\/plan9\/bin}:$PLAN9/bin" MANPATH="${MANPATH//:\/opt\/plan9\/share\/man}:${PLAN9}/share/man" p9="${PLAN9}"
export P="/store/code/projects" p="$P"
export PRE="${HOME}/.local" pre="$PRE"
# Python2 compatibility
# export PYTHON="/usr/bin/python2.7"
# export PYTHON='/store/config/scripts/python2'
# export PYTHONSTARTUP="${HOME}/.pyrc"
export PYTHONSTARTUP="${HOME}/.pythonrc"
export READNULLCMD=less
export QEMU_AUDIO_DRV=pa
export QEMU_PA_SERVER=localhost
# Qt themes
export QT_AUTO_SCREEN_SCALE_FACTOR=1
export QT_PLUGIN_PATH="${HOME}/.kde4/lib/kde4/plugins:/usr/lib/kde4/plugins"
export QT_QPA_PLATFORMTHEME=qt5ct
# export QT_SCALE_FACTOR=2.25
# export QT_SCREEN_SCALE_FACTORS=2.25
export SAVEHIST="$HISTSIZE"
export SDL_AUDIODRIVER=alsa
export SSH_KEY_PATH="${HOME}/.ssh/id_gpg"
export SURF_USERAGENT="Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5 Build/MOB3OD) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.105 Mobile Safari/537.36"
export SYSTEMD_LESS="CFKMRiX" journalctl
export TERMINAL=st
export VST_PATH="/usr/lib/vst:/usr/local/lib/vst:${HOME}/vst:/store/audio/vst"
# Set X cursor theme
export XCURSOR_THEME=ArchCursorTheme
export XDG_CACHE_HOME="${HOME}/.cache"
export XDG_CONFIG_DIRS="/etc/xdg"
export XDG_CONFIG_HOME="${HOME}/.config"
export XDG_DATA_DIRS="/usr/local/share:/usr/share"
export XDG_DATA_HOME="${HOME}/.local/share"
export ZDOTDIR="${HOME}/.zsh.d"
# export _Z_OWNER=alyptik
# export _Z_NO_PROMPT_COMMAND=true
# export _Z_NO_RESOLVE_SYMLINKS=true
