#!/bin/sh

xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
xrandr --dpi 260
xbindkeys
xset s noblank
xset s off -b -dpms
setterm -blank 1 -powerdown 0
# setxkbmap -option compose:caps
# setxkbmap -option terminate:ctrl_alt_bksp
# xmodmap "$HOME/.Xmodmap"
# udisksctl mount -b "$(findfs LABEL=backups)" &
udisksctl mount -b "$(findfs LABEL=sdxc)" &
udisksctl mount -b "$(findfs LABEL=toshiba1TB)" &
# (udisksctl mount -b "$(findfs LABEL=toshiba1TB)"; sleep 10; transmission-remote -tall -s) &
# pan &
sleep 2
pulseaudio &
pavucontrol &
sleep 1
uxterm &
pcmanfm /run/media/$USER/sdxc /run/media/$USER/toshiba1TB /store/stuff &
firefox &
xrdb "$HOME/.Xresources"
setxkbmap -option compose:caps
setxkbmap -option terminate:ctrl_alt_bksp
xmodmap "$HOME/.Xmodmap"
# transgui &
# compton -b
picom -b
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
