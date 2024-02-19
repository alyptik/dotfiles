#!/bin/bash
#
# Unicode releases include "UnicodeData.txt", in which there is a line for 
# every unicode codepoint with fields separated by semicolosn (;).  I have 
# been told that this link contains the latest:
#
#     http://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt
#
# (I have omitted the above in my distribution for legal and size reasons)
#
#
# A sample line from "UnicodeData-9.0.0.txt" follows:
#
#     0027;APOSTROPHE;Po;0;ON;;;;;N;APOSTROPHE-QUOTE;;;;
#
# For now, I only care about the following fields.
#
#      1) codepoint   (formated like %04X)
#      2) description (deprecated)
#     11) description (canonical)
#
# I can either cache or calculate the remaining columns I would need,
# in order to have same columns that the `ascii` command can do.  
#
# UTF-8 Encoding Details
# ======================
# 0x00000000 - 0x0000007f: 0xxxxxxx  -->--->--->--->--->--->--->--->--->---v (from)
# 0x00000080 - 0x000007ff: 110xxxxx 10xxxxxx            0xFF & (a - 0x20)  | ====
# 0x00000800 - 0x0000ffff: 1110xxxx 10xxxxxx 10xxxxxx  <---<---<---<---<---< (to)
# 0x00010000 - 0x001fffff: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
# 0x00200000 - 0x03ffffff: 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
# 0x04000000 - 0x7fffffff: 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
#
# The "x" bits are filled right to left with the bits of the character code
# number in binary representation.  Only the shortest possible multibyte
# sequence which can represent the code number of the character can be used.
#

#shopt -s extglob 
#valid_utf8byte () { local -i x=$1 ; not yet, no need for this ; }

valid_codepoint () { 
	local -i x=$1
	(( ! ( 0x00 <= x && x <= 0x10ffff )  `# Unicode 9.0 Boundaries`
	|| ( 0xfffd <= x && x <= 0x00ffff )  `# UCS non-characters`
	|| ( 0xd800 <= x && x <= 0x00dfff )  `# UTF-16 surrogates`
	)) && return 1 ; return 0
}

utf8chr () { 
	# NOTE: if you already have utf8oct result, inline instead
	printf "$(utf8oct $1)"
}

unicod () { 
	# return the codepoint of a unicode charater
	printf '%04X' \'$1
}

localechr () { 
	# print character using locale, one way to convert character
	# to a codepoint, though I suspect this is dangerous.
	local a
	printf -v a '%04X' $(($1))
	if [[ ${#a} -gt 4 ]]
	then printf \\U$a
	else printf \\u$a
	fi
}

byte2bin () {
	local s=""
	local -i n
	for (( n = ($1) ; n > 0 ; n >>= 1 )) ; do 
		s="$((n & 1))$s"
	done
	# fix width at 8 bits
	while [[ ${#s} -lt 8 ]] ; do 
		s="0$s" 
	done
	printf -v REPLY '%08s' "$s"
}


utf8bin () {
	# TODO: clever way to return all utf8[base] at once
        # utf8 byte calc:  ordinal, nchar, maxval, accumulator
	local -i c l o p  ; (( c = $1, l = 0, o = 63, p = 128 ))

	# ASCII Characters
	(( c < 0x80 )) && { 
		byte2bin "$c"
		printf '%08s' "$REPLY"
		return 0
	}

	# Build UTF-8 bytes right-to-left
	local s=""
	while (( c > o )); do 
		byte2bin $(( t = 0x80 | (c & 0x3f) ))
    		printf -v s ' %08s%s' "$REPLY" "$s"
		(( c >>= 6, l++, p += o+1, o>>=1 ))
	done
	byte2bin $(( t = p | c)) 
	printf '%08s%s' "$REPLY" "$s"
}

utf8hex () {
	# TODO: clever way to return all utf8[base] at once
        # utf8 byte calc:  ordinal, nchar, maxval, accumulator
	local -i c l o p  ; (( c = $1, l = 0, o = 63, p = 128 ))

	# ASCII Characters
	(( c < 0x80 )) && { 
		printf '0x%02X' $(( t = 0x7f & c ))
		return 0
	}

	# Build UTF-8 bytes right-to-left
	local s=''
	while (( c > o )); do 
		printf -v s ',0x%02X%s' $(( t = 0x80 | (c & 0x3f) )) $s
		(( c >>= 6, l++, p += o+1, o>>=1 ))
	done
	printf '0x%02X%s' $(( t = p | c )) $s
}

utf8oct () {
	# TODO: clever way to return all utf8[base] at once
        # utf8 byte calc:  ordinal, nchar, maxval, accumulator
	local -i c l o p  ; (( c = $1, l = 0, o = 63, p = 128 ))

	# ASCII Characters
	(( c < 0x80 )) && { 
		printf '\\%03o' $(( t = 0x7f & c ))
		return 0
	}

	# Build UTF-8 bytes right-to-left
	local s=''
	while (( c > o )); do 
		printf -v s '\\%03o%s' $(( t = 0x80 | (c & 0x3f) )) $s
		(( c >>= 6, l++, p += o+1, o>>=1 ))
	done
	printf '\\%03o%s' $(( t = p | c )) $s
}

utf8bytes () {
	# return string of bytes that make an utf8 rune
        # utf8 byte calc:  ordinal, index, maxval, accumulator
	local -i c l o p  ; (( c = $1, l = 0, o = 0x3f, p = 0x80 ))

	# ASCII Characters
	(( c < 0x80 )) && { 
		printf '0x%02X' $(( t = 0x7f & c ))
		return 0
	}

	# Build UTF-8 bytes right-to-left
	local s=''
	while (( c > o )); do 
		printf -v s ' 0x%02X%s' $(( t = 0x80 | (c & 0x3f) )) "$s"
		(( c >>= 6, l++, p += o+1, o>>=1 ))
	done
	printf '0x%02X%s' $(( t = p | c )) "$s"
}


utf8_line () { 
	# print line describing utf8 character
	local codepoint utf8chr localechr utf8oct __4 __5
	printf -v codepoint '%04X' "$1"
	printf -v utf8bytes '%s'   "$(utf8bytes $1)"
	printf -v utf8oct   '%s'   "$(utf8oct $1)"
	printf -v utf8hex   '%s'   "$(utf8hex $1)"
	printf -v utf8bin   '%s'   "$(utf8bin $1)"
	printf -v localechr '%s'   "$(localechr $1)"
	printf -v utf8chr   "${utf8oct}"
	if [[ "$localechr" = "$utf8chr" ]] 
	then printf -v glyph '%s'  "${localechr}"
	else printf -v glyph '%s'  "${utf8chr}"
	fi

	printf '%6s'    "${codepoint}" 
	printf '\t%-7s'  " ${glyph} " 
	printf '\t%-20s' "${utf8bytes}" 
	printf '\t%-20s' "${utf8oct}" 
	printf '\t%-25s' "${utf8hex}" 
	printf '\t%-25s' "${utf8bin}" 
}

utf8_arg () {
	# this supports various ways of supplying a unicode codepoint
	# via a char, 0xXXXX, XXXX, octal?, int?
	local a="$1"
	local c="${1/[Uu]+/0x}" ; c="${c/\\[Uu]/0x}"
	local -i u ; { (( u = c )) || u=0 ; } 2>/dev/null

	# literal char
	if [[ ${#a} = 1 ]] ; then
		#echo "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
		# TODO: I cannot accept the above is true for all chars
		printf -v a '%04X' \'$a
		(( u = $((0x$a)) )) || return 1

	# hex number (string with 0x prefix) (c= expressions above make this)
	elif [[ ${c:0:2} = "0x" ]] ; then
		#echo "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
		printf -v a \\u${c#0x}
		printf -v a '%04X' \'$a
		(( u = (0x${c#0x}) )) || return 1

	# number (as integer, unknown base)
	elif valid_codepoint $u ; then
		#echo "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"
		printf -v a \\u$c
		printf -v a '%04X' \'$a
		if [[ ${a} = ${c^^?} ]] ; 
		then (( u = $((0x$a)) )) || return 1
		else (( u = $(($c)) ))   || return 1
		fi
	
	# horribly inacurate duck-typing, assuming a string of hex chars
	elif [[ ${#c} -ge 4 && ${#c} -lt 9 ]] ; then
		#echo "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"
		# TODO: length of $c is unreliable check
		if [[ ${#c} -eq 4 ]]
		then printf -v a \\u$c
		else printf -v a \\U$c
		fi
		printf -v a '%04X' \'$a
		# TODO: The above is an embarassing attempt that likely fails
		if [[ ${a} = ${c^^?} ]]
		then (( u = $((0x$a)) )) || return 1
		else (( u = $(($c)) ))   || return 1
		fi
	else
		echo "TODO: handle  _utf8_arg '$1'"
		exit 2
	fi

	utf8_line $u
	return $?
}

for i in $* ; do
	#set -x
	utf8_arg $i || {
		printf %s ' ! ERROR ! '
	}
	printf '\n'
done

