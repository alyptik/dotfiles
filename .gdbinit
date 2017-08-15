# set disassembly intel
# source /home/alyptik/.gdbinit-gef.py

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
