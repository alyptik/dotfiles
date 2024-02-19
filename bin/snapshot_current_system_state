#!/bin/sh

# example call: # bash /usr/local/bin/snapshot_current_system_state.sh '/run/btrfs' 'rootfs' '__snapshot/__state_at_last_successful_boot'

if [ $# -ne 3 ]; then
	printf '%b' "This script requires three parameters:\n1st parameter: The path of the btrfs filesystem root. e. g. '/btrfs'\n2nd parameter: The name of the btrfs root volume as specified in /etc/fstab. E. g. '__active/rootfs'\n3rd parameter: The path where the newly created snapshots will reside without its 1st parameter portion. E. g. '__snapshot'\nCAUTION: This script will delete all snapshots of the same name as the regular volume names in the path parameter 3 is pointing to.\n"
	exit 1
fi

btrfs_root="${1}" # example: '/run/btrfs'
path_to_root_volume="${2}" # example: '__current/rootfs'
path_to_snapshots="${3}" # example: '__snapshot/__state_at_last_successful_boot'

# take no snapshots when booted into a snapshot
if [ -e '/SNAPSHOT-TIMESTAMP' ]
then
  exit 2
fi

# anti recursive snapshots
for subvolume in $(/usr/bin/btrfs subvolume list '/' | /usr/bin/awk '{print $NF}') # scan
do
  [[ "${subvolume}" != *machines* ]] || continue
  path_to_snapshot="${btrfs_root}/${path_to_snapshots}/${subvolume}"

  if [ -d "${path_to_snapshot}" ]
  then
    /usr/bin/btrfs subvolume delete "${path_to_snapshot}"
  fi
done

subvolumes="$(/usr/bin/btrfs subvolume list '/' | /usr/bin/awk '{print $NF}')" # rescan
for subvolume in $subvolumes
do
  [[ "${subvolume}" != *machines* ]] || continue
  snapshot_directory="${btrfs_root}/${path_to_snapshots}/$(/usr/bin/dirname ${subvolume})"

  if [ ! -d "${snapshot_directory}" ]
  then
    /usr/bin/mkdir -p "${snapshot_directory}"
  fi

  /usr/bin/btrfs subvolume snapshot "${btrfs_root}/${subvolume}" "${btrfs_root}/${path_to_snapshots}/${subvolume}"

  if [ "${subvolume}" = "${path_to_root_volume}" ]
  then
    timestamp="$(/usr/bin/date +%d.%m.%Y-%H:%M:%S)"

    /usr/bin/echo -e "Arch Linux --- state at last successful boot (nonpersistent) [${timestamp}]\n" > "${btrfs_root}/${path_to_snapshots}/${path_to_root_volume}/etc/issue"

    /usr/bin/echo "${timestamp}" > "${btrfs_root}/${path_to_snapshots}/${path_to_root_volume}/SNAPSHOT-TIMESTAMP"

    sed_path_to_snapshots="$(/usr/bin/echo ${path_to_snapshots} | /usr/bin/sed --posix --regexp-extended 's/\//\\\//g')"

    for subvolumeX in $(echo $subvolumes | /usr/bin/sed --posix --regexp-extended 's/\//\\\//g')
    do
      /usr/bin/sed --posix --regexp-extended "s/subvol=${subvolumeX}/subvol=${sed_path_to_snapshots}\/${subvolumeX}/g" --in-place "${btrfs_root}/${path_to_snapshots}/${path_to_root_volume}/etc/fstab"
    done
  fi
done

/usr/bin/btrfs filesystem sync "/"
/usr/bin/btrfs filesystem sync "/home"
/usr/bin/btrfs filesystem sync "/store"
/usr/bin/btrfs filesystem sync "/btrfs"
/usr/bin/sync

exit 0

