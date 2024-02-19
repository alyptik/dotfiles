#!/bin/sh

# aliases.sh
#
# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
## Example aliases
alias zshconfig='gvim ~/.zshrc'
alias ohmyzsh='pushd ~/.oh-my-zsh'

## Custom aliases
# fix zsh annoying history behavior
function h() { if [[ -z $* ]]; then history | less; else history | egrep "$@"; fi; }
#function h() { if [ -z "$*" ]; then history 1; else history | egrep $@; fi; }
#alias h='history '

alias cmount='mount | column -t '
alias j='jobs -l '
alias path='echo -e ${PATH//:/\\n} '
alias now='date +"%T" '
alias nowtime=now
alias nowdate='date +"%d-%m-%Y" '

alias svi='vi "+set si" '
alias svim='vim "+syntax on" "+set si" '
alias k='kate '
alias sk='kdesu kate '

## Complicated SSLfunction
function sslpkeygen()
{
 echo -n '[input directory to store certificates:] ' ; read keydir
  #([~.]|${HOME})/*[^/]+ ) echo 'using "'"${keydir}"'/private".'  | sed -r 's@\/\/+@\/@g' ;;
  #([~.]|"${HOME}"|[^/)* ) echo 'using "'"${keydir}"'/private".' | sed -r 's@\/\/+@\/@g' ;;
  #[^/]* ) echo 'using "'"${keydir}"'/private".' ;;
  #"" ) echo 'nothing entered. Using "'"${keydir:="$PWD"/private}"'".' ;;
  #* ) echo 'please run "pushd '"${keydir}"'" first.'  ;;
 case "${keydir}" in
  "/"* ) printf '%s\n' 'please run '"'pushd ${keydir}'"' first.'  ;;
  ""|[\~\.]|${HOME}* ) echo 'using "'${keydir:="$PWD"}'/private".' | sed -r 's@\/\/+@\/@g' ;;
 esac
 [[ ${keydir} =~ ^[^\/].*  ]] || \
  { echo 'please run "pushd '"${keydir}"'" first.'; echo "$keydir"; return 1; }
 echo 'using "'"${keydir}"'/private".'

 pushd ${keydir}
 [[ -d private ]] || mkdir -m0700 private
 touch private/key.pem
 chmod 0600 private/key.pem

 sslvar="$(<<-'EOF'
	List of Available SSL Options:
	 [1] - 	Self-signed root certificate
		 $ openssl req -x509 -newkey rsa:2048 -keyout key.pem -out req.pem
	 [2] -  Create a private key and then generate a certificate request from it
		 $ openssl genrsa -out private/key.pem 2048
		 $ openssl req -new -key key.pem -out req.pem
	 	 $ openssl req -newkey rsa:2048 -keyout key.pem -out req.pem
		 $ openssl req -new -sha256 -key private/key.pem -out req.csr
		 $ openssl req -key private/key.pem -x509 -new -days 3650 -out cacert.pem
	 [3] - 	Remove password / encryption
		 $ openssl req -new -key server.key -out server.csr
		 cp server.key server.key.org
		 $ openssl rsa -in server.key.org -out server.key
	 	 $ openssl genpkey -aes-256-cbc -algorithm RSA \
			-out private/key.pem -pkeyopt rsa_keygen_bits:4096
	 [5] -  Examine and verify certificate request:
		 $ openssl req -in req.pem -text -verify -noout
		 $ openssl x509 -req -days 365 -in req.csr -signkey server.key -out server.crt
	 [6] -  Convert from PEM to DER for browsers
		 $ openssl x509 -in ca.pem -outform DER -out ca.der
	 [7] - 	Generate an RSA private key using default parameters:
		  $ openssl genpkey -algorithm RSA -out key.pem
		 Encrypt output private key using 128 bit AES and the passphrase "hello":
		  $ openssl genpkey -algorithm RSA -out key.pem -aes-128-cbc -pass pass:hello
		 Generate a 2048 bit RSA key using 3 as the public exponent:
		  $ openssl genpkey -algorithm RSA -out key.pem -pkeyopt rsa_keygen_bits:2048 \
                    	-pkeyopt rsa_keygen_pubexp:3
	 [8] - 	 Generate 1024 bit DH parameters:
		  $ openssl genpkey -genparam -algorithm DH -out dhp.pem \
                    	-pkeyopt dh_paramgen_prime_len:1024
		 Output RFC5114 2048 bit DH parameters with 224 bit subgroup:
		  $ openssl genpkey -genparam -algorithm DH -out dhp.pem -pkeyopt dh_rfc5114:2

		 Generate DH key from parameters:
		  $ openssl genpkey -paramfile dhp.pem -out dhkey.pe
 	 [9] - 	 Generate EC parameters:
		  $ openssl genpkey -genparam -algorithm EC -out ecp.pem \
		         -pkeyopt ec_paramgen_curve:secp384r1 \
        		 -pkeyopt ec_param_enc:named_curve
		 Generate EC key from parameters:
		  $ openssl genpkey -paramfile ecp.pem -out eckey.pem
		 Generate EC key directly:

	EOF
	)"
	#tee /dev/tty "${sslvar}"
	echo "${sslvar}"
       	echo -n '[enter option #:(1-9)] ' ; read choice
 case "${choice}" in
  1) echo 1 ;;
  2) echo 2 ;;
  3) echo 3 ;;
  4) echo 4 ;;
  5) echo 5 ;;
  6) echo 6 ;;
  7) echo 7 ;;
  8) echo 8 ;;
  9) echo 9 ;;
  "") echo 'no option number entered.' ;;
  *) echo 'Option "'${choice}'" not found.'  ;;
 esac
 ls -l "${keydir}"
 popd
}

function chud()
{
	#killall conky && sleep 2 && conky -c /home/alyptik/.conky/.clockconky && conky -c /home/alyptik/.conky/.netconky &&conky -c /home/alyptik/.conky/.mainconky && conky -c /home/alyptik/.conky/.conkyrc2 ;
	#[[ pidof -x $(basename $0) > /dev/null ]] && killall conky;
	[[ ! -z "$(pgrep conky)" ]] && killall conky;
	sleep 2;
	conky -c /home/alyptik/.conky/.clockconky;
	conky -c /home/alyptik/.conky/.netconky;
	conky -c /home/alyptik/.conky/.mainconky;
	conky -c /home/alyptik/.conky/.conkyrc2;

}

function vbinit()
{
	sudo modprobe vboxnetadp vboxnetflt vboxpci vboxdrv ;
	sudo vboxreload ;
	#VBoxManage hostonlyif create ;
	#VBoxManage natnetwork start --netname vbnat ;
}

function sz-expac()
{
	echo -n "$@" '[perform size-sorted search for:] ' ; read ans
	expac -s "%-30n %m" | sort -hk 2 | awk '{printf "%s %.0f MiB\n", $1, $2/1024/1024}' | column -t | grep "$ans" ;
	#case "$ans" in
         #*) return 1 ;;
         #) return 0 ;;
	#esac
}

function dt-expac()
{
	echo -n "$@" '[# of recently installed entries to list:] ' ; read ans
	expac --timefmt='%y-%m-%d %T' '%l\t%n' | sort | tail "-$ans" ;
	#expac --timefmt=%s '%l\t%n' | sort -n | tail -20 | grep "$ans" ;
}

function ab-expac()
{
	echo -n "$@" '[perform alphabetical search for:] ' ; read ans
	expac -s "%-25n %v" | grep "$ans" ;
}

function ds-genkey ()
{
        if [[ ! "${1}" > /dev/null ]] ; then
         printf '%s\n' 'No zone specified!' ;
        else
         pushd /etc/bind ;
         sudo dnssec-keygen -a NSEC3RSASHA1 -b 2048 \
         -K /etc/bind/private -n ZONE "$1" ;
         sudo dnssec-keygen -f KSK -a NSEC3RSASHA1 \
         -b 4096  -K /etc/bind/private -n ZONE "$1" ;
         for key in `ls /etc/bind/private/K"$1"*.key`; do
          sudo echo "\$INCLUDE /etc/bind/private/${key}">>/etc/bind/db."$1" ;
         done
         sudo dnssec-signzone -A -3 \
         $(head -c 1000 /dev/random | sha1sum | cut -b 1-16) \
         -N INCREMENT -K ./private -o "$1" -S -t db."$1" ;
         popd;
        fi
}

function ds-sign ()
{
	[[ ${PWD} != /etc/bind ]] && pushd . >/dev/null 2>&1
	cd "/etc/bind"
	if ! (( ${#} >= 1 )) ; then
         printf '%b' 'no zone specified!\nsign "alyptik.xyz"? (Y/n)' ; read ans
         case ${ans} in
          [Yy]*|+([ \t])[Yy]*|'' ) { popd >/dev/null 2>&1; ds-sign 'alyptik.xyz'; return 0; } ;;
          [Nn]*|+([ \t])[Nn]* ) echo -n "\r\nenter zone(s) to sign: " ; read ans2
		[[ -z ${ans2} ]] && { echo "exiting..."; return 2; } || \
		{ zarray=(`<<<$ans2`);
		popd >/dev/null 2>&1;
		ds-sign $zarray[@];
		return 0; } ;;
          * ) printf '%s\n' 'invalid choice.' ; return 1 ;;
	 esac
	else
 	  IFSold=${IFS}
	  IFS=$'\n' 
 	  printf '%b\n\t' \
	  	'signing zone(s): ' "${@}" '\rstarting script...'
 	  IFS=${IFSold}
	  #echo -en "\r"
	  printf '%b' "\r"
	fi
	 for i in "${@}" ; do
	  SERIAL=$(named-checkzone ${i} db.${i} |\
	  	egrep --color="never" -ho '[0-9]{10}')
	  	#sed 's/.*K\([[:digit:]]{10}\).*/\1/')
	  sudo sed -i 's/'${SERIAL}'/'$((${SERIAL}+1))'/' db.${i}
	  sudo dnssec-signzone -A -3 \
	  	$(head -c 1000 /dev/random | sha1sum | cut -b 1-16) \
	  	-N INCREMENT -K ./private -o ${i} -S -t db.${i}
	 done
	[[ ${PWD} != /etc/bind ]] || popd >/dev/null 2>&1
	return 0
}


function lpackages()
{
	#echo -n "$@" '[search all locally-installed packages for:] ' ; read ans
	printf '%s' '[search all locally-installed packages for:] ' ; read ans
	[[ ! -z "${ans}" ]] && /usr/local/bin/all-packages | grep "${ans}" || \
	/usr/local/bin/all-packages | less ;
	#case "${ans}" in
	 #*) /usr/local/bin/all-packages | grep "$ans" ;;
	 #\0) /usr/local/bin/all-packages | less -R ;;
	#esac
}

function snft ()
{
        if [[ ! -e "/tmp/nft" ]] ; then
         printf '%s\n' 'Writing nftables ruleset to /tmp/nft.' ;
         sudo printf '%s\n' "nft flush ruleset" >/tmp/nft ;
         sudo nft list ruleset -annn >>/tmp/nft ;
         sudo gvim /tmp/nft ;
        else
         printf '%s\n' '/tmp/nft exists!' ;
        fi
}

function csu()
{
	[[ ! -z ${*} && ${#} -eq 1 ]] && {
		echo -e " running: 'su -c \"${*}\"'";
		sudo su -c $1;
		return 10; }

	[[ ${#} -ge 2 ]] && printf '%b' ' command input too ambiguous!\n continuing script....\n'
	echo -ne " [please enter \";\" delimited commands to run as root:] (i.e.: \`cmd1; cmd2...\`) "; read -r
	## IFS safety net
	IFSbackup=${IFS}
	cstring=$(sed -r '
		:loop
		s_[; \t]*(;)[; \t]* _\1_g
		s_[ \t]*(;)[ \t]* _\1_g
		/$/!b loop' <<< ${REPLY})
	## Set temporary IFS and convert ${cstring} to ${carray[@]}
	IFS=; read -r -A carray <<< ${cstring}
	printf '%s\n' 'running the following commands as root:' \
		`tr ';' '\n' <<< ${carray[@]} | sed -r 's/^(..*)/ \1/'` \
		'starting "su -c" command execution...'
        { for i in $carray[@]; do sudo su -c ${i}; done; } && return 0 || return 1

	## Old commands
	if [ true ]; then return 2; else
	 while IFS=';' read -r cmd; do sudo su -c '"'${cmd}'"'; done <<< "${ans}"
	 carray=( printf '%s' "$*" )
	 for i in "${carray[@]}" ; do
          command='"'${i}'"'
          sudo su -c "${command}"
         done
	 carray=(`printf '%s' "${rcom}" | sed -r '
		:loop
		s_(;)[; \t]* _\1_g
		s_[ \t]*(;)[ \t]* _\1_g
		/$/!b loop' | tr ';' '\n'`)
	 for i in "${carray[@]}" ; do
	  command='"'${i}'"'
	  sudo su -c "${command}"
	 done
	 for i in ${carray[@]}; do
          scommand="sudo su -c \""${i}"\""
	  #scommand=${scommand}${i}
	  #scommand=${scommand}'"'
	  #[[ -x $(which bash) ]] && bash -c ${scommand} || sh -c ${scommand}
	 done
	 return 20
	fi
}

colortest() {
        local fgc bgc vals seq0

        printf "Color escapes are %s\n" '\e[${value};...;${value}m'
        printf "Values 30..37 are \e[33mforeground colors\e[m\n"
        printf "Values 40..47 are \e[43mbackground colors\e[m\n"
        printf "Value  1 gives a  \e[1mbold-faced look\e[m\n\n"

        # foreground colors
        for fgc in {30..37}; do
                # background colors
                for bgc in {40..47}; do
                        fgc=${fgc#37} # white
                        bgc=${bgc#40} # black

                        vals="${fgc:+$fgc;}${bgc}"
                        vals=${vals%%;}

                        seq0="${vals:+\e[${vals}m}"
                        printf "  %-9s" "${seq0:-(default)}"
                        printf " ${seq0}TEXT\e[m"
                        printf " \e[${vals:+${vals+$vals;}}1mBOLD\e[m"
                done
                echo; echo
        done
}

alias urxvtq='urxvt -kuake-hotkey F12 '
alias urxvtcq='urxvtc -kuake-hotkey F12 '

alias scodes='sudo showkey --scancodes '
alias c-du='cdu -idh '
alias dh='dirs -v '
alias _='sudo '

alias sfs1='sshfs 192.168.1.99:/home/alyptik /mnt/arch '
alias sfs2='sshfs 192.168.1.99:/mnt/windows /mnt/winserver '
#alias sfs2='sshfs 192.168.1.99:/mnt/windows/Users/Administrator/Desktop/stuff /mnt/winserver '
alias ufs='sudo umount /mnt/arch && sudo umount /mnt/winserver '

alias ltool='libtool --finish /usr/lib '
alias npacaur='pacaur --noconfirm --noedit -S '

alias scen='sudo systemctl enable --now '
alias scdn='sudo systemctl disable --now '
alias scdr='sudo systemctl daemon-reload && sudo systemctl restart '
alias scs='sudo systemctl status --full '
alias scf='sudo systemctl --failed '
alias scu='sudo systemctl list-units --full '
alias sce='sudo systemctl edit --full '
alias scr='sudo systemctl restart  '

alias ls='ls --color=auto '
#alias la='ls -al --color=auto '
alias la='ls -lahqiQFs  --color=auto '
alias lA='ls -lAhqiQFso  --color=auto '
alias lb='ls -lAhqiQFXrso  --color=auto '
alias lc='ls -lAhqiQFSrso  --color=auto '
alias ld='ls -lAhqiQFtrso  --color=auto '
alias ll='ls -CBhp --color=auto '
alias l.='ls -dCX --color=auto .* '
alias l..='ls -dCX --color=auto .*/ */ '
alias ..='cd .. '
alias ...='cd ../../ '
alias ....='cd ../../../ '
## Colorize the grep command output for ease of use (good for log files)
alias grep='grep --color=auto '
alias egrep='egrep --color=auto '
alias fgrep='fgrep --color=auto '
#alias bc='bc -l '
## Generate sha1 digest
alias sha1='openssl sha1 '
alias mkdir='mkdir -pv '
## install colordiff package :)
#alias vc-diff='colordiff -swBW 150 --suppress-blank-empty --suppress-common-lines '
#alias hc-diff='colordiff -swByW 150 --suppress-blank-empty --suppress-common-lines '
alias vcdiff='colordiff -swBW 150 '
alias hcdiff='colordiff -swByW 150 '
alias bvcdiff='colordiff -swBW 150 --suppress-blank-empty '
alias bhcdiff='colordiff -swByW 150 --suppress-blank-empty '
#alias defrag='sudo find / -xdev -type d -print -exec btrfs filesystem defragment {} \; '
alias defrag='find / -xdev -type d -print -exec sudo btrfs filesystem defragment {} \; '

## Stop after sending count ECHO_REQUEST packets
alias pong='ping -c 5 '
# Do not wait interval 1 second, go fast #
alias fastping='ping -c 100 -s1 '
alias ports='netstat -tulanp '

alias enft='sudo nano /etc/nftables.conf '
alias rnft='sudo nft -f /etc/nftables.conf '
alias lnft='sudo nft list ruleset -a '

alias start-wmin='sudo /etc/webmin/start '
alias stop-wmin='sudo /etc/webmin/stop '
alias rs-wmin='sudo /etc/webmin/restart '
alias rl-wmin='sudo /etc/webmin/reload '

alias sn-btrfs='sudo btrfs subvolume snapshot '

alias lsinitcpio='ls -lAXh --color=auto /usr/lib/initcpio '
alias cdinitcpio='cd /usr/lib/initcpio '
alias esp-hook='sudo gvim /usr/lib/initcpio/install/esp-update-linux '
alias lrepos='curl "https://wiki.archlinux.org/index.php/Unofficial_user_repositories" | grep "Server = " | sed "s/\$arch/$(uname -m)/g" | cut -f 3 -d" " '
alias rorphans='sudo pacman -Rns $(pacman -Qdtq) '
alias nmwifi='sudo nmcli dev wifi connect ' 
alias nmdwifi='sudo nmcli dev wifi disconnect '

alias zs-gen='sudo zonesigner -genkeys -keydirectory /etc/bind/private -usensec3 -dsdir /etc/bind/private -krfile /etc/bind/private/alyptik.xyz.krf -nosave -zone alyptik.xyz /etc/bind/db.alyptik.xyz /etc/bind/db.alyptik.xyz.signed'
alias zs-sign='sudo zonesigner -dsdir /etc/bind/private -krfile /etc/bind/private/alyptik.xyz.krf -nosave -zone alyptik.xyz /etc/bind/db.alyptik.xyz /etc/bind/db.alyptik.xyz.signed '

alias zedit='sudo nano /etc/bind/db.alyptik.xyz'
alias bedit='sudo nano /etc/named.conf'
alias odkms='for i in /var/lib/dkms/*/[^k]*/source; do [ -e "$i" ] || echo "$i";done'
alias arch-ssh='ssh -Y alyptik@alyptik.xyz -p 222 '
alias rarch-ssh='ssh -Y root@@alyptik.xyz -p 2222 '
alias surface-ssh='ssh -Y alyptik@192.168.1.98 '
alias rsurface-ssh='ssh -Y root@192.168.1.98 '

alias powns='sudo pacman -Qo '
alias sctl='sudo systemctl '
alias skonq='kdesudo konqueror '
alias df-btrfs='sudo btrfs filesystem df /'
alias sb-btrfs='sudo btrfs scrub start /'
alias ss-btrfs='sudo btrfs scrub status /'
alias bl-btrfs='sudo btrfs balance start /'
alias bs-btrfs='sudo btrfs balance status /'
#alias dg-btrfs='sudo btrfs filesystem defragment -v -clzo -r /'
alias dg-btrfs='sudo btrfs filesystem defragment -r -v /'

alias tdmesg='dmesg | tail '
alias jctlxe='journalctl -xe '
alias jftrimstatus='journalctl -u fstrim '
alias ftrimstatus='systemctl status fstrim.timer '
alias sudo='sudo '

alias kzshrc='kate ~/.zshrc'
alias kbashrc='kate ~/.bashrc'
alias kprofile='kate ~/.bash_profile'
alias vzshrc='vim ~/.zshrc'
alias vbashrc='vim ~/.bashrc'
alias vprofile='vim ~/.bash_profile'
alias gzshrc='gvim ~/.zshrc'
alias gbashrc='gvim ~/.bashrc'
alias gprofile='gvim ~/.bash_profile'
alias nzshrc='nano ~/.zshrc'
alias nbashrc='nano ~/.bashrc'
alias nprofile='nano ~/.bash_profile'
alias sbashrc='source ~/.bashrc'
alias sprofile='source ~/.bash_profile'
alias szshrc='source ~/.zshrc'

# SSH shortcuts
alias nputty='putty -ssh alyptik.ddns.net -l root -pw alpha01 -fn "client:Monospace 12" '
alias nssh='ssh netgear '
alias tssh='ssh root@alyptik.ddns.net -p 443 -D 8080 '

# Pacman shortcut aliases
alias spm='sudo apacman -S --noconfirm '
alias sspm='sudo apacman -Ss '
alias sipm='sudo apacman -Si '

alias nsmb='mount.cifs //192.168.1.1/opt /tmp/mnt/smbshare -o username=$(nvram get samba_user),password=$(nvram get samba_password) '
alias lsmb='mount.cifs //192.168.1.1/opt /tmp/mnt/smbshare -o username=$(nvram get samba_user),password=$(nvram get samba_password) '

alias nrefind='sudo nano /boot/EFI/refind/refind.conf'
alias listblackarch='sudo pacman -Sgg | grep blackarch | cut -d" " -f2 | sort -u | less'
alias catblackarch='sudo pacman -Sg | grep blackarch'
alias newvnc='x11vnc -forever -bg -rfbauth /etc/x11vnc.pass'
alias killvnc='killall x11vnc'
alias updategrub='sudo grub-mkconfig -o /boot/grub/grub.cfg'

## Shortcut  for iptables and pass it via sudo
alias ipt='sudo iptables --line-numbers -vnL'
alias iptin='sudo iptables --line-numbers -vnL INPUT '
alias iptout='sudo iptables --line-numbers -vnL OUTPUT '
alias iptfw='sudo iptables --line-numbers -vnL FORWARD '
alias iptnat='sudo iptables --line-numbers -t nat -vnL '
alias ip6t='sudo ip6tables --line-numbers -vnL '
alias ip6tin='sudo ip6tables --line-numbers -vnL INPUT '
alias ip6tout='sudo ip6tables --line-numbers -vnL OUTPUT '
alias ip6tfw='sudo ip6tables --line-numbers -vnL FORWARD '
alias ip6tnat='sudo ip6tables -t nat --line-numbers -vnL '

alias 4routes='route -A inet -e -n '
alias 4nroutes='route -A inet -e '
alias 4iproutes='ip -4 route show '
alias 6routes='route -A inet6 -e -n '
alias 6nroutes='route -A inet6 -e '
alias 6iproutes='ip -6 route show '

## Safety nets
# do not delete / or prompt if deleting more than 3 files at a time #
alias rm='rm -I --preserve-root '
# confirmation #
alias mv='mv -i '
alias cp='cp -i '
alias ln='ln -i '
# Parenting changing perms on / #
alias chown='chown --preserve-root '
alias chmod='chmod --preserve-root '
alias chgrp='chgrp --preserve-root '

## pass options to free ##
alias meminfo='free -m -l -t '
## get top process eating memory
alias psmem='ps auxf | sort -nr -k 4 '
alias psmem10='ps auxf | sort -nr -k 4 | head -10 '
## get top process eating cpu ##
alias pscpu='ps auxf | sort -nr -k 3 '
alias pscpu10='ps auxf | sort -nr -k 3 | head -10 '
## Get server cpu info ##
alias cpuinfo='lscpu '
## older system use /proc/cpuinfo ##
alias cpuinfo='less /proc/cpuinfo '
## get GPU ram on desktop / laptop##
alias gpumeminfo='grep -i --color memory /var/log/Xorg.0.log '

## this one saved by butt so many times ##
alias wget='wget -c '

