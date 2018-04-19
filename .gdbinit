

# set verbose off
# directory ./src
# directory ./t
# source ~/.gdbinit-gef.py

# set debug auto-load on
# set auto-load safe-path /
# set auto-load safe-path /usr/lib/libthread_db-1.0.so
add-auto-load-safe-path /usr/lib/libthread_db-1.0.so
add-auto-load-safe-path /store/code/projects/kernel/linux/scripts/gdb/vmlinux-gdb.py
set auto-load libthread-db on

# set disassembly intel
set history filename ~/.gdb_history
set history save on
set history size unlimited
set history remove-duplicates unlimited
set history expansion on

set print symbol-filename on
set print symbol on
set print array on
set print array-indexes on
set print frame-arguments all
set print entry-values if-needed
set print object on

# set tui border-kind ascii
set tui border-kind acs
# set tui border-mode normal
set tui border-mode bold
# set tui active-border-mode bold-standout
set tui active-border-mode reverse

define locals-up
	set $n    = ($arg0)
	set $upto = $n
	while $upto > 0
		info locals
		up-silently 1
		set $upto = $upto - 1
	end
	down-silently $n
end

document locals-up
	locals-up <n>: Lists local variables of n frames
end
