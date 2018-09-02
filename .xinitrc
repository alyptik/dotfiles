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

# xrandr --dpi 216 &
# xrandr --output LVDS-1 --brightness 1.5 &
xbindkeys
xset s noblank
xset s off -b -dpms
setterm -blank 1 -powerdown 0
xrdb "/home/jp/.Xresources"
setxkbmap -option compose:caps
setxkbmap -option terminate:ctrl_alt_bksp
xmodmap "/home/jp/.Xmodmap"
stjerm &
transgui &
pavucontrol &
# udisksctl mount -b "$(findfs LABEL=vm)" &
(udisksctl mount -b "$(findfs LABEL=microSDXC)"; sleep 2; pcmanfm /sdxc /sdxc/papers) &
(udisksctl mount -b "$(findfs LABEL=toshiba1TB)"; sleep 1; transmission-remote -tall -s) &
dbus-update-activation-environment --systemd DISPLAY
# xsetroot -cursor_name left_ptr
hsetroot -fill "/home/jp/wallpapers/calvinhobbes.png" -tint "#458588" -brightness .25 -gamma .5
# shellcheck disable=SC2046
eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets 2>/dev/null)
export GNOME_KEYRING_CONTROL GNOME_KEYRING_PID GPG_AGENT_INFO SSH_AUTH_SOCK

default_session="herbstluftwm";

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
	# compton -b
	xscreensaver &
	exec herbstluftwm --locked;;

(awesome)
	# compton -b
	xscreensaver &
	exec awesome;;

(bspwm)
	# compton -b
	xscreensaver &
	exec bspwm;;

(budgie-desktop)
	# compton -b
	gnome-screensaver &
	exec budgie-desktop;;

(catwm)
	compton -b
	xscreensaver &
	exec catwm;;

(cinnamon)
	compton -b
	xscreensaver &
	exec cinnamon-session;;

(dwm)
	# compton -b
	xscreensaver &
	exec dwm;;

(ede)
	# compton -b
	xscreensaver &
	exec startede;;

(enlightenment)
	# compton -b
	xscreensaver &
	exec enlightenment_start;;

(fluxbox)
	# compton -b
	xscreensaver &
	exec startfluxbox;;

(gnome)
	# compton -b
	gnome-screensaver &
	exec gnome-session;;

(gnome-classic)
	# compton -b
	gnome-screensaver &
	exec gnome-session --session=gnome-classic;;

(i3|i3wm)
	# compton -b
	/home/jp/bin/i3-focus-last &
	/home/jp/bin/hilites &
	xscreensaver &
	exec i3;;

(icewm)
	# compton -b
	xscreensaver &
	exec icewm-session;;

(jwm)
	# compton -b
	xscreensaver &
	exec jwm;;

(kde)
	# compton -b
	xscreensaver &
	exec startkde;;

(mate)
	# compton -b
	xscreensaver &
	exec mate-session;;

(monster|monsterwm)
	# compton -b
	xscreensaver &
	exec monsterwm;;

(notion)
	# compton -b
	xscreensaver &
	exec notion;;

(openbox)
	# compton -b
	xscreensaver &
	exec openbox-session;;

(unity)
	# compton -b
	xscreensaver &
	exec unity;;

(xfce|xfce4)
	# compton -b
	xscreensaver &
	exec startxfce4;;

(xmonad)
	# compton -b
	xscreensaver &
	exec xmonad;;

# No known session, try to run it as command
(*)
	# compton -b
	xscreensaver &
	exec "$session";;
esac
