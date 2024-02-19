if [[ $commands[fasd] ]]; then # check if fasd is installed
  fasd_cache="$ZSH_CACHE_DIR/fasd-init-cache"
  if [[ ! -e "$fasd_cache" ]]; then
    mkdir -p "$fasd_cache"
  fi
  if test "$(command -v fasd)" -nt "$fasd_cache" -o ! -s "$fasd_cache"; then
    fasd --init auto >| "$fasd_cache"
  fi
  source "$fasd_cache"
  unset fasd_cache
  alias v="f -e $EDITOR"
  alias o='a -e open_command'
fi
