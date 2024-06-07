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

xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
xrandr --dpi 320
xbindkeys
xset s noblank
xset s off -b -dpms
setterm -blank 1 -powerdown 0
xrdb "$HOME/.Xresources"
setxkbmap -option compose:caps
setxkbmap -option terminate:ctrl_alt_bksp
xmodmap "$HOME/.Xmodmap"
# udisksctl mount -b "$(findfs LABEL=backups)" &
udisksctl mount -b "$(findfs LABEL=sdxc)" &
udisksctl mount -b "$(findfs LABEL=toshiba1TB)" &
# (udisksctl mount -b "$(findfs LABEL=toshiba1TB)"; sleep 10; transmission-remote -tall -s) &
# pan &
# sleep 2
# pulseaudio &
# pipewire-pulse &
pavucontrol &
sleep 2
uxterm &
pcmanfm /run/media/$USER/sdxc /run/media/$USER/toshiba1TB /store/stuff $HOME/Downloads &
firefox &
# transgui &
# compton -b
picom -b
# i3-focus-last &
env GDK_SCALE=0.25 /usr/lib/notify-osd/notify-osd &
hsetroot -fill "$HOME/wallpapers/calvinhobbes.png" -tint "#458588" -brightness .25 -gamma .5
dbus-update-activation-environment --systemd DISPLAY
# shellcheck disable=SC2046
eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets 2>/dev/null)
export GNOME_KEYRING_CONTROL GNOME_KEYRING_PID GPG_AGENT_INFO SSH_AUTH_SOCK
# setup zswap
# echo y | sudo tee /sys/module/zswap/parameters/enabled
# echo zstd | sudo tee /sys/module/zswap/parameters/compressor
# echo zsmalloc | sudo tee /sys/module/zswap/parameters/zpool
# xscreensaver &

default_session="i3";

if [ "$1" = xterm ] && [ -n "$2" ]; then
	session="$2";
elif [ -z "$1" ]; then
	if [ -e ~/.WM.default ]; then
		session="$(<"$HOME/.WM.default")";
	else
		session="$default_session";
	fi;
else
	session="$1";
fi

printf '%s\n' "$session" > "$HOME/.WM.last";

case $session in
herbst|herbstluftwm)
	exec herbstluftwm --locked;;

awesome)
	exec awesome;;

bspwm)
	exec bspwm;;

budgie-desktop)
	gnome-screensaver &
	exec budgie-desktop;;

catwm)
	exec catwm;;

cinnamon)
	exec cinnamon-session;;

dwm)
	exec dwm;;

ede)
	exec startede;;

enlightenment)
	exec enlightenment_start;;

fluxbox)
	exec startfluxbox;;

gnome|gnome-session)
	gnome-screensaver &
	exec gnome-session;;

gnome-classic)
	exec gnome-session --session=gnome-classic;;

i3|i3wm)
	# $HOME/bin/hilites &
	# eval $(dbus-launch --sh-syntax --exit-with-session i3);;
	exec i3;;

icewm)
	exec icewm-session;;

jwm)
	exec jwm;;

kde|plasma)
	exec startplasma-x11;;

mate)
	exec mate-session;;

monster|monsterwm)
	exec monsterwm;;

notion)
	exec notion;;

openbox)
	exec openbox-session;;

plasma)
	exec startplasma-x11;;

unity)
	exec unity;;

xfce|xfce4)
	exec startxfce4;;

xmonad)
	exec xmonad;;

# No known session, try to run it as command
*)
	exec "$session";;
esac
