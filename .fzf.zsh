# Setup fzf
# ---------
if [[ ! "$PATH" == */home/alyptik/.fzf/bin* ]]; then
  export PATH="$PATH:/home/alyptik/.fzf/bin"
fi

# Auto-completion
# ---------------
[[ $- == *i* ]] && source "/home/alyptik/.fzf/shell/completion.zsh" 2> /dev/null

# Key bindings
# ------------
source "/home/alyptik/.fzf/shell/key-bindings.zsh"

