#!/bin/bash
# Nearly all of this script was taken from stack-overflow
# Isn't that fast_chr something?
printf -v OFS "${OFS:-\t}"
printf -v ORS "${ORS:-\n}"

utf8decode () { 
    # TODO: function is a lie: it decodes based on locale
    #     printf '%x' \'c syntax in bash to print ordinal of char c.
    printf '0x04X\n' "${@/#/\'}" 
}

valid_codepoint () { 
    # NOTE: I additionally do not accept '\0'
    local -i x=$1  
    (( ( x < 0x01 || 0x110000 < x )
    || ( 0xffff  < x && x <  0x001000 )
    || ( 0xd800  <=  x && x <  0x00e000 )
    )) && return 1 ; return 0
}

_utf8encode_unsafe () {
    # Faster but unsafe (does not validate input)
    local o p c ;    (( c = ($1), p = 128, o = 63 ))
    local b='' s='' ; #  \ordinal  \accum   \maxval

    if (( c < 0x80 )) ; then 
        printf -v b \\%03o $(( t = c & 0x7f))
    else 
        while (( c > o )) ; do 
            printf -v b \\%03o $(( t = 0x80 | c & 0x3f ))
            s="${b}${s}" ; (( c >>= 6, p += o+1, o>>=1 ));
        done ; printf -v b \\%03o $(( t = p | c ))
    fi
    printf -v REPLY "${b}${s}"
}

utf8encode () {
    valid_codepoint $1 || {
        printf 'WARNING: skipping invalid codepoint U+%04X\n' "$1" >&2
        return 1
    }
    _utf8encode_unsafe "$1"
}

render_range () {
    local -i i i0=$1 iN=$2 iI=$3
    #IFS=: read -r -- i0 iN iI <<< "$1"   ;# start:end:incr 
      
    (( ${i0:-1} >= 0 )) && {
        (( iN = (iN > i0)? iN : i0 ))
        (( iI = (iI >  0)? iI : 1 )) 
        printf '\n%s is U+%04X to U+%04X incr 0x%X ' $1 $i0 $iN $iI >&2
        printf '  /  %- 7d to %-8d incr %d\n' $i0 $iN $iI >&2
        local table=''
        for (( i = i0; i < iN; i += iI )); do 
            (( i < 1 )) && { 
                printf '\nWARNING: skipped decimal: %d\n' $((i)) >&2
                continue
            }
            utf8encode $i
            printf "%s${OFS}" "${REPLY}"
        done
        printf "${ORS}"
    }
}

usage () { 
cat <<END_OF_USAGE
utf8table echos utf8 runes for each range of unicdoe codepoints.  Each rune is 
separated by the OFS environment variable while each record is separated by 
the ORS environment variable.

Usage:
     utf8table [-h] <range> [[range] ...]
                           <name> are mandatory.
                           [name] are optional.

Range Format:              Print UTF-8 codepoints from U+<u> until U+<U>
     @callback_func        ... printing the returned codepoint until \\0'
     <u>                   ... or from U+<u> 
     <u>:<U>                   ... until U+<U>
     <u>:<U>[:<i>]               ... incrementing by <i>
     <u>:<U>[/<n>]               ... or split into <n> records
     <u>:<U>[%<z>]               ... or split into <z> length

Examples: 
   The first two ranges are equivalent, printing lower and uppercase sets of 
   full-width.  The third interleaves the 33nd char of each 8-bit plane. 

     $ utf8table  0xff01:0xff60/2  0xff01:0xff60%26  0x0021:0xff22:0x100

END_OF_USAGE
exit 1
}

main () {
    [[ $# -lt 1 ]] && usage

    for range in "$@" ; do
        # TODO Convert/Sanitize Arguments Better
        [[ -z "$1" ]] && continue
        case ${range} in 
            @*) REPLY=INIT CB_FUNCTION=${range#@}
                while ${CB_FUNCTION} && [[ "$REPLY" != "NULL" ]] ; do
                    render_range ${REPLY//:/ } 
                done 
            ;;
            *:*/*) printf '\nUNIMPLEMENTED "/": ignoring %s\n' "${range}" >&2 
                
            ;;
            *:*%*) printf '\nUNIMPLEMENTED "%%": ignoring %s\n' "${range}" >&2 
            ;;
            *:*:*) render_range ${range//:/ } ;;
              *:*) render_range ${range//:/ } ;;
                *) render_range ${range//:/ } ;;
        esac
        exit 0
    done
}


demo_table () {
    # I must generate the whole table up front, since bash has no concept of 
    # generators and the such.  I will emulate Haskell's  x:xs  idiom.
    declare -g -a __demo_table 
    [[ "$REPLY" = "INIT" ]] || [[ ${#__demo_table[@]} -lt 1 ]] \
        && __demo_table=( $(
            for (( u = 0x1d400 ; u < 0x1d6A0 ;  )) ; do 
                printf "0x%04x:0x%04x " $((u)) $((u += 26))
            done 
        ) 
        NULL 
    )
    REPLY="${__demo_table[@]:0:1}"
    __demo_table=( "${__demo_table[@]:1}" )
}

main "$@"

# vim: set sw=4 ts=4 sts=0 tw=78 ai et:
