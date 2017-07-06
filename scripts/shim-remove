#!/usr/bin/env bash

disk=/dev/sda
partnum=1
esp=/boot/efi

text='

Shim was installed with:
	sudo cp -i /usr/lib/shim/* '"$esp"'/EFI/arch/
	sudo efibootmgr -c -d "'"$disk"'" -p "'"$partnum"'" -l /EFI/arch/shimx64.efi -L "Arch Shim"

To fully remove shim, do:
	rm -f '"$esp"'/EFI/arch/shimx64.efi '"$esp"'/EFI/arch/fallback.efi.signed '"$esp"'/EFI/arch/MokManager.efi.signed
	efibootmgr -B -b '"$(efibootmgr -v | sed -n '/refind\\shim/{s/^Boot\([0-9]*\)\*.*/\1/p}')"

echo "$text"
