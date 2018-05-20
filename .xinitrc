#!/bin/sh

## Default xinitrc section
userresources=$HOME/.Xresources
usermodmap=$HOME/.Xmodmap
sysresources=/etc/X11/xinit/.Xresources
sysmodmap=/etc/X11/xinit/.Xmodmap
## merge in defaults and keymaps
if [ -f $sysresources ]; then xrdb -merge $sysresources; fi
if [ -f $sysmodmap ]; then xmodmap $sysmodmap; fi
if [ -f "$userresources" ]; then xrdb -merge "$userresources"; fi
if [ -f "$usermodmap" ]; then xmodmap "$usermodmap"; fi
## start some nice programs
if [ -d /etc/X11/xinit/xinitrc.d ]; then
	for f in /etc/X11/xinit/xinitrc.d/?*.sh; do
		# shellcheck disable=SC1090
		test -x "$f" && . "$f"
	done
	unset f
fi

# feh --bg-scale "/home/alyptik/wallpapers/fifths.png"
# feh --bg-scale "/home/alyptik/wallpapers/modes.png"
# hsetroot -fill "/home/alyptik/wallpapers/calvinhobbes.png" -tint '#ebdbb2'
# hsetroot -fill "/home/alyptik/wallpapers/calvinhobbes.png" -tint '#b8a990'
# xsetroot -mod 16 16 -fg '#343d46' -bg '#2b303b'
# tail -f "${HOME}/.weechat/pipe" | dzen2 -sa c -w 2175 -dock -fn "xft:FuraCode Nerd Font-Light:pixelsize=18:antialias=true:hinting=true" &
# urxvt -kuake-hotkey F10 &
# urxvtcd -kuake-hotkey F10 &
# scpuled &

xbindkeys &
xset s noblank &
xset s off -b -dpms &
setterm -blank 1 -powerdown 0 &
xsetroot -cursor_name left_ptr
xrdb "/home/alyptik/.Xresources"
# compton -cCGfF -b -i .85
compton -b
hsetroot -fill "/home/alyptik/wallpapers/calvinhobbes.png" -tint "#458588" -brightness .25 -gamma .5
setxkbmap -option compose:caps
setxkbmap -option terminate:ctrl_alt_bksp
xmodmap "/home/alyptik/.Xmodmap"
stjerm &
transgui &
pavucontrol &
udisksctl mount -b "$(findfs LABEL=vm)" &
(udisksctl mount -b "$(findfs LABEL=microSDXC)"; sleep 1; pcmanfm /media/microSDXC) &
(udisksctl mount -b "$(findfs LABEL=toshiba1TB)"; sleep 1; transmission-remote -tall -s) &
xrandr --dpi 216 &
# eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets,ssh 2>/dev/null)
# shellcheck disable=SC2046
eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets 2>/dev/null)
export GNOME_KEYRING_CONTROL GNOME_KEYRING_PID GPG_AGENT_INFO SSH_AUTH_SOCK

default_session="i3";

if [ "$1" = xterm ] && [ -n "$2" ]; then
	session="$2";
elif [ "$1"x = x ]; then
	if [ -e ~/.WM.default ]; then
		session="$(cat ~/.WM.default)";
	else
		session="$default_session";
	fi;
else
	session="$1";
fi

printf '%s\n' "$session" > ~/.WM.last;

case $session in
(herbst|herbstluftwm)
	# /home/alyptik/bin/hilites &
	xscreensaver &
	exec herbstluftwm --locked;;
(awesome)
	xscreensaver &
	exec awesome;;

(bspwm)
	xscreensaver &
	exec bspwm;;

(budgie-desktop)
	gnome-screensaver &
	exec budgie-desktop;;

(catwm)
	xscreensaver &
	exec catwm;;

(cinnamon)
	xscreensaver &
	exec cinnamon-session;;

(dwm)
	xscreensaver &
	exec dwm;;

(ede)
	xscreensaver &
	exec startede;;

(enlightenment)
	xscreensaver &
	exec enlightenment_start;;

(fluxbox)
	xscreensaver &
	exec startfluxbox;;

(gnome)
	gnome-screensaver &
	exec gnome-session;;

(gnome-classic)
	gnome-screensaver &
	exec gnome-session --session=gnome-classic;;

(i3|i3wm)
	/home/alyptik/bin/i3-focus-last &
	/home/alyptik/bin/hilites &
	xscreensaver &
	exec i3;;

(icewm)
	xscreensaver &
	exec icewm-session;;

(jwm)
	xscreensaver &
	exec jwm;;

(kde)
	xscreensaver &
	exec startkde;;

(mate)
	xscreensaver &
	exec mate-session;;

(monster|monsterwm)
	xscreensaver &
	exec monsterwm;;

(notion)
	xscreensaver &
	exec notion;;

(openbox)
	xscreensaver &
	exec openbox-session;;

(unity)
	xscreensaver &
	exec unity;;

(xfce|xfce4)
	xscreensaver &
	exec startxfce4;;

(xmonad)
	xscreensaver &
	exec xmonad;;

# No known session, try to run it as command
(*)
	xscreensaver &
	exec "$session";;
esac
