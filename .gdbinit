# configuration
#
# ~/.gdbinit

add-auto-load-safe-path /usr/lib/libthread_db-1.0.so
add-auto-load-safe-path /store/code/projects/kernel/linux/scripts/gdb/vmlinux-gdb.py
set auto-load libthread-db on

# set auto-load safe-path /
# set auto-load safe-path /usr/lib/libthread_db-1.0.so
# set debug auto-load on
# set verbose off

# directory ./src
# directory ./t
# source ~/.gdbinit-gef.py

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

# functions
#
define locals-up
	set $n = ($arg0)
	set $upto = $n
	while $upto > 0
		info locals
		up-silently 1
		set $upto = $upto - 1
	end
	down-silently $n
end
document locals-up
	locals-up <n>: Lists local variables of <n> frames
end

define run-lind
	if $argc > 1
		run -a -- /lib/glibc/runnable-ld.so --library-path /lib/glibc /test_case/jp/$arg1.nexe
		thread $arg0 attach
	else
		run -a -- /lib/glibc/runnable-ld.so --library-path /lib/glibc /test_case/jp/fork.nexe
		if $argc > 0
			thread $arg0 attach
		end
	end
end
document run-lind
	run-lind <thread> [prog]: Runs /test_case/jp/[prog].nexe attached to [thread].
end

define segfault-address
	print $_siginfo._sifields._sigfault.si_addr
end
document segfault-address
	segfault-address: print last fault address (from the $_siginfo structure).
end

define examine-instructions
	if $argc > 0
		x/20i $arg0
	else
		x/20i $_siginfo._sifields._sigfault.si_addr
	end
end
document examine-instructions
	examine-instructions: Examine the twenty instructions at [address] (defaults to last fault address).
end

define print-representations
	printf "[f] float: "
	print/f $arg0
	printf "[d] decimal: "
	print/d $arg0
	printf "[u] unsigned decimal: "
	print/u $arg0
	printf "[c] char: "
	print/c $arg0
	printf "[s] string: "
	print/s $arg0
	printf "[a] address: "
	print/a $arg0
	printf "[z] hex, zero padded on the left: "
	print/z $arg0
	printf "[t] binary: "
	print/t $arg0
	printf "[i] instruction: "
	print/i $arg0
end
document print-representations
	print-hex: Print some common representations of <value>.
end

# aliases
#
alias -- asm = disassemble
alias -- dasm = disassemble
alias -- dnext = set disassemble-next-line
alias -- rlind = run-lind
alias -- iargs = info args
alias -- iregisters = info registers
alias -- ilocals = info locals
alias -- ithreads = info threads
alias -- tenable = tui enable
alias -- tdisable = tui disable
alias -- fault-address = segfault-address
alias -- ss = segfault-address
alias -- xi = examine-instructions
alias -- pr = print-representations

# vi:ft=gdb:
