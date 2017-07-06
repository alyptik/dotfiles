#!/bin/bash


LOCKFILE=/tmp/myscreencast.pid

get_default_source() {
    pactl info | awk -F': ' '$1 == "Default Sink" { print $2  }'
}

get_default_source_monitor() {
    DEFAULT_SOURCE=$(get_default_source)
    echo "$DEFAULT_SOURCE".monitor
}

get_screen_resolution() {
    xdpyinfo | \
    awk -F$':' '$1 == "  dimensions" { print $2 }'| \
    grep -oE '[0-9]+x[0-9]+' | \
    head -n1
}

start() {

    if [[ -e $LOCKFILE ]]; then
        echo "Lock file $LOCKFILE exists."  >&2
        echo "Screen grab already running?" >&2
        exit 1
    fi

    local TMPDIR=$(mktemp -d screengrab.XXXX --tmpdir)
    local OUTNAME="$TMPDIR"/grab.webm
    local MONITOR=$(get_default_source_monitor)
    local RESOLUTION=$(get_screen_resolution)

    ffmpeg \
        -video_size "$RESOLUTION" \
        -framerate 25 \
        -f x11grab -i :0.0 \
        -f pulse -ac 1 -i "$MONITOR" \
        -b:v 1M \
        "$OUTNAME"  \
        &>/dev/null &

    local PID=$!
    echo "$PID" > "$LOCKFILE"
    echo "$OUTNAME" >> "$LOCKFILE"
}

stop() {

    local PID OUTNAME

    if ! [[ -e "$LOCKFILE" ]]; then
        echo "No lock file found." >&2
        exit 1
    fi

    { read PID; read OUTNAME; } < "$LOCKFILE"

    if ! kill -INT "$PID"; then
        echo "Could not kill process $PID." >&2
        exit 1
    fi

    rm "$LOCKFILE"
    preview "$OUTNAME"
}

preview() {
    OUTNAME=$1

    mpv "$OUTNAME" &> /dev/null

    CHOICE=$(dmenu <<EOF
preview
delete
EOF
)

    case "$CHOICE" in
         delete) rm -v "$OUTNAME"   ;;
        preview) preview "$OUTNAME" ;;
              *) :                  pactl;;
    esac

}


CMD=$1
case $CMD in
    start) start  ;;
    stop)  stop   ;;
    *)     exit 1 ;;
esac
