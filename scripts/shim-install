#!/bin/sh

disk=${1?Error: not enough arguments.}
partnum=${2?Error: not enough arguments.}
esp=${3}
#disk=/dev/sda
#partnum=1
#esp=/boot/efi

if [[ -z "$esp" ]]; then
	shimname=/EFI/arch/shim.efi
	echo "shimname=${shimname}"
else
	shimname=/EFI/arch/shimx64.efi
	echo "shimname=${shimname}"
	cp -i -t "${esp}/EFI/arch/" /usr/lib/shim/*
fi
efibootmgr -c -d "$disk" -p "$partnum" -l "$shimname" -L "Arch Shim"
