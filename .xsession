#!/bin/sh

# xrandr --dpi 216 &
xbindkeys &
xset s noblank &
xset s off -b -dpms &
setterm -blank 1 -powerdown 0 &
# xsetroot -cursor_name left_ptr
xrdb "/home/jp/.Xresources"
# compton -cCGfF -b -i .85
# compton -b
setxkbmap -option compose:caps
setxkbmap -option terminate:ctrl_alt_bksp
xmodmap "/home/jp/.Xmodmap"
stjerm &
# hilites &
transgui &
pavucontrol &
# udisksctl mount -b "$(findfs LABEL=vm)" &
(udisksctl mount -b "$(findfs LABEL=microSDXC)"; sleep 1; pcmanfm /media/microSDXC) &
(udisksctl mount -b "$(findfs LABEL=toshiba1TB)"; sleep 1; transmission-remote -tall -s) &
# /home/jp/bin/scpuled &
dbus-update-activation-environment --systemd DISPLAY
hsetroot -fill "/home/jp/wallpapers/calvinhobbes.png" -tint "#458588" -brightness .25 -gamma .5
# shellcheck disable=SC2046
eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets 2>/dev/null)
export GNOME_KEYRING_CONTROL GNOME_KEYRING_PID GPG_AGENT_INFO SSH_AUTH_SOCK
