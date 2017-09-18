# set disassembly intel
# source /home/alyptik/.gdbinit-gef.py

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
set print entry-values both

set tui border-kind acs
set tui border-mode normal
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
