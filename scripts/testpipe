#!/bin/bash

echo hello

if test -t 1; then
    # Stdout is a terminal.
    exec >log
else
    # Stdout is not a terminal.
    npipe=/tmp/$$.tmp
    trap "rm -f $npipe" EXIT
    mknod $npipe p
    tee <$npipe log &
    exec 1>&-
    exec 1>$npipe
fi

echo goodbye

