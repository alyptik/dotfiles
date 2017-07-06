# Brenton's (fusion809) Terminal
![](http://i.imgur.com/qYa5q9S.png)
A terminal package for Atom, complete with themes, API and more. My name in its title does not indicate that I did all the work, rather just indicates that it has some of my preferences applied to it. It has been forked from the [`platformio-ide-terminal`](https://github.com/platformio/platformio-atom-ide-terminal) package, and is designed specifically for **Linux platforms**. If you are using macOS or Windows NT I would recommend using the `platformio-ide-terminal` package instead.

## Purpose
Naturally, one may wonder why I bothered creating this package, the reason why is because I wanted to apply the bug fixes mentioned in [tensor5/arch-atom#12](https://github.com/tensor5/arch-atom/issues/12), that would unfortunately break `platformio-ide-terminal`'s compatibility with macOS and Windows NT. So I created this package, and as this fix made the package incompatible with macOS and Windows NT I decided to remove all parts of the package that were specific to these platforms, hence reducing its size a little. I also added my own custom theme to the package (the `linux` theme). This is an active fork, that is, I keep an eye on changes to the `platformio-ide-terminal` package and if relevant I bring them downstream to this package.

## Usage
`terminal-fusion` stays in the bottom of your editor while you work.

Click on a status icon to toggle that terminal (or ``ctrl-` ``). Right click the status icon for a list of available commands. From the right-click menu you can colour code the status icon as well as hide or close the terminal instance.

### Terminal
You can open the last active terminal with the `terminal-fusion:toggle` command (keymap:`` ctrl-` ``).  If no terminal instances are available, then a new one will be created. The same toggle command is used to hide the currently active terminal.

From there you can begin typing into the terminal. By default the terminal will change directory into the project folder if possible. The default working directory can be changed in the settings to the home directory or to the active file directory.

[See available commands below](#commands).

## Features

### Full Terminal
Every terminal is loaded with your system’s default initialization files. This ensures that you have access to the same commands and aliases as you would in your standard terminal.

### Themes
The terminal is preloaded with several themes that you can choose from. Not satisfied?  
Use the following template in your stylesheet:

```css
.terminal-fusion .xterm {
  background-color: ;
  color: ;

  ::selection {
    background-color: ;
  }

  .terminal-cursor {
    background-color: ;
  }
}
```

### Process Titles
By hovering over the terminal status icon, you can see which command process is currently running in the terminal.

![](https://github.com/fusion809/terminal-fusion/raw/master/resources/terminal_title.png)

### Terminal Naming
Need a faster way to figure out which terminal is which? Name your status icons!

![](https://github.com/fusion809/terminal-fusion/raw/master/resources/status-icon_rename.png)

Available via the status icon context menu.

![](https://github.com/fusion809/terminal-fusion/raw/master/resources/status-icon_rename-dialog.png)

### Colour coding
Colour code your status icons!

![](https://github.com/fusion809/terminal-fusion/raw/master/resources/status-icon_color_coding.png)

The colours are customizable in the settings, however the colour names remain the same in the context menu.

### Sorting
Organize your open terminal instances by dragging and dropping them.

![](https://github.com/fusion809/terminal-fusion/raw/master/resources/sorting.gif)

### Resizable
You can resize the view vertically, or just maximize it with the maximize button.

### Working Directory
You can set the default working directory for new terminals. By default this will be the project folder.

### File Dropping
Dropping a file on the terminal will insert the file path into the input. This works with external files, tabs from the Atom tab-view, and entries from the Atom tree-view.

### Insert Selected Text
Insert and run selected text from your text editor by running the `terminal-fusion:insert-selected-text` command (`ctrl-shift-E`).

![](https://github.com/fusion809/terminal-fusion/raw/master/resources/insert_selected_text.gif)

If you have text selected, it will insert your selected text into the active terminal and run it.  
If you don't have text selected it, will run the text on the line where your cursor is then proceed to the next line.

### Quick Command Insert
Quickly insert a command to your active terminal by executing the `terminal-fusion:insert-text` command.

![](https://github.com/fusion809/terminal-fusion/raw/master/resources/insert_text.png)

A dialog will pop up asking for the input to insert. If you have the `Run Inserted Text` option enabled in the settings (default is false), terminal-fusion will automatically run the command for you.

#### Support for Special Keys
Support for IME, dead keys and other key combinations via the `Insert Text` dialog box. Just click the keyboard button in the top left of the terminal or set up a keymap to the `terminal-fusion:insert-text` command.

![](https://github.com/fusion809/terminal-fusion/raw/master/resources/special_keys.gif)

Note: Make sure you have the `Run Inserted Command` toggle off otherwise it will run your inserted text.

### Map Terminal To
Map your terminals to each file or folder you are working on for automatic terminal switching.

#### File
![](https://github.com/fusion809/terminal-fusion/raw/master/resources/map_terminals_to_file.gif)

#### Folder
![](https://github.com/fusion809/terminal-fusion/raw/master/resources/map_terminals_to_folder.gif)

Toggling the `Auto Open a New Terminal (For Terminal Mapping)` option will have the mapping create a new terminal automatically for files and folders that don't have a terminal. The toggle is located right under the `Map Terminals To` option.

![](https://github.com/fusion809/terminal-fusion/raw/master/resources/map_terminals_to_auto_open.gif)

## Installation
Installation can be performed from the command-line with:

`$ apm install terminal-fusion`

Or navigate to the install tab in Atom’s settings view, and search for `terminal-fusion`. Per issue #5, it is important to note that `terminal-fusion` requires `g++` and `make` to be installed in order for it to be properly installed. `g++` and `make` can be installed via one's system package manager, such as APT for Debian-based distros (like deepin, elementary OS, Linux Mint, Ubuntu, Zorin OS, *etc.*), DNF for Fedora-based distros (like Chapeau and Korora), pacman for Arch Linux-based distros (like Antergos and Manjaro Linux), yum for older Red Hat-based distros (like CentOS, Oracle Linux, Scientific Linux and Red Hat Enterprise Linux) and ZYpp for openSUSE-based distros (like Gecko Linux and SUSE Linux Enterprise Server).

## Commands
| Command | Action | Default Keybind |
|---------|--------|:-----------------:|
| terminal-fusion:new | Create a new terminal instance. | `ctrl-shift-t`<br>or<br>`cmd-shift-t` |
| terminal-fusion:toggle | Toggle the last active terminal instance.<br>**Note:** This will create a new terminal if it needs to. | `` ctrl-` ``<br>(Control + Backtick) |
| terminal-fusion:prev | Switch to the terminal left of the last active terminal. | `ctrl-shift-j`<br>or<br>`cmd-shift-j` |
| terminal-fusion:next | Switch to the terminal right of the last active terminal. | `ctrl-shift-k`<br>or<br>`cmd-shift-k` |
| terminal-fusion:insert-selected-text | Run the selected text as a command in the active terminal. | `ctrl-shift-E` |
| terminal-fusion:insert-text | Bring up an input box for using IME and special keys. | –––––––––––– |
| terminal-fusion:fullscreen | Toggle full-screen for active terminal. | –––––––––––– |
| terminal-fusion:close | Close the active terminal. | `ctrl-shift-x`<br>or<br>`cmd-shift-x` |
| terminal-fusion:close-all | Close all terminals. | –––––––––––– |
| terminal-fusion:rename | Rename the active terminal. | –––––––––––– |

---
A fork of [platformio/platformio-atom-ide-terminal](https://github.com/platformio/platformio-atom-ide-terminal).
