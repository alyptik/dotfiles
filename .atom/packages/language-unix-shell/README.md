# Shell script language support in Atom

<img src="http://i.imgur.com/lM2L75I.png"><caption><b>Figure 1: A PKGBUILD being syntax-highlighted with version v0.32.0 of this package, along with the dark-bint-syntax theme.</b></caption></img>

Adds syntax highlighting and snippets to shell scripts in Atom, originally forked from the official [`language-shellscript`](https://atom.io/packages/language-shellscript) package on 2 June 2016. As such it conflicts with this package so it is necessary to add this to your `config.cson` if the core `language-shellscript` package is installed:

```coffee
  disabledPackages: [
  "language-shellscript"
  ]
```

in order to use it. It has a number of improvements over the original, namely:

* It has syntax-highlighting for common Unix commands, along with syntax-highlighting for several popular &#42;nix package managers like APT, DNF, pacman, Portage, *etc.*
* Syntax-highlighting for variable definitions

If you use this package it is recommended you use the [`dark-bint-syntax`](https://github.com/Murriouz/dark-bint-syntax) theme of Murriouz.

Contributions are greatly appreciated. Please fork this repository and open a pull request to add snippets, make grammar tweaks, *etc.*
