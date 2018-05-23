export PERIOD=10
integer -gx ZPLUG_LOCK_TIMEOUT=0

__zplug::job::polling::periodic()
{
    if [[ -f $_zplug_lock[job] ]]; then
	case $ZPLUG_LOCK_TIMEOUT in
	1)
	    ZPLUG_LOCK_TIMEOUT=0
	    setopt monitor
	    ;;
        *)
	    ZPLUG_LOCK_TIMEOUT=1
	    setopt nomonitor
	    ;;
	esac
    else
        if [[ -o monitor ]]; then
            return 0
        fi
        if setopt monitor; then
            __zplug::log::write::info "turn monitor on"
        fi
    fi
}

add-zsh-hook periodic __zplug::job::polling::periodic
