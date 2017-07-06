#!/bin/bash

[[ "$PWD" == ${HOME}/git ]] && GVAR=1 || pushd ${HOME}/git &>/dev/null
[[ ! -d ./mwifiex-firmware ]] || rm -rf ./mwifiex-firmware
git clone git://git.marvell.com/mwifiex-firmware.git || {
	printf "\n \033[31m %s \n\033[0m" "Error downloading from git!"; (($GVAR)) || popd; exit 1; }
[[ -d /lib/firmware/mrvl/ ]] || sudo mkdir -p /lib/firmware/mrvl/
sudo cp ./mwifiex-firmware/mrvl/* /lib/firmware/mrvl/
(($GVAR)) || popd
