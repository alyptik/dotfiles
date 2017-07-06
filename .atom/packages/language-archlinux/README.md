# The Arch Linux Development Package [![build-status](https://travis-ci.org/fusion809/language-archlinux.svg?branch=master)](https://travis-ci.org/fusion809/language-archlinux)

<img src="http://i.imgur.com/B5McvKv.png" alt="visual-studio-code-oss PKGBUILD">
  <caption><b>Figure 1: My visual-studio-code-oss PKGBUILD being syntax-highlighted by this package and language-unix-shell and with the dark-bint-syntax theme enabled.</b></caption>
</img><br/>

This package is essentially the Arch Linux equivalent to the [`language-gentoo`](https://github.com/aegypius/language-gentoo) package of Nicolas Laurent. It provides Atom commands for running a variety of different PKGBUILD commands. It previously provided syntax-highlighting for PKGBUILDs (with the help of the [`language-unix-shell`](https://github.com/fusion809/language-shellscript) package) although as of v0.3.0 this feature is now entirely provided by `language-unix-shell`.

## Table of Contents
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Commands](#commands)
- [Configuration](#configuration)
- [Contributors](#contributors)
- [License](#license)

## Dependencies
Beware that you will need to have the following Linux packages installed in order for this package to have its full functionalities:

* `git`
* `namcap`
* `pacman` &mdash; which, of course, means you should be operating on Arch Linux or another platform that uses the pacman package manager.

It also requires the `language-unix-shell` package to be installed, if you have only the [`language-shellscript`](https://github.com/atom/language-shellscript) package installed (which comes bundled with Atom) you may find some of its syntax-highlighting features will be missing. I would also recommend you install the [`dark-bint-syntax`](https://github.com/Murriouz/dark-bint-syntax) theme, as it complements its syntax-highlighting.

## Installation
To install all the Linux dependencies of this package (i.e., those installed using your Linux package manager, which should be pacman), along with its Atom dependencies/optional dependencies run (as standard non-root user):

```bash
sudo pacman -S namcap --noconfirm
apm install language-unix-shell language-archlinux dark-bint-syntax --no-confirm
```

this is assuming, of course, that Atom is already installed. `language-unix-shell` does conflict with the core package, `language-shellscript`, so to use it I recommend adding:

```coffee
    disabledPackages: [
    "language-shellscript"
    ]
```

to your `config.cson` file. If you do not already have Atom installed on your Arch Linux machine, you can install Atom, these pacman dependencies and these packages via running (assuming, of course, that `yaourt` is installed):

```bash
yaourt -S atom-editor-arch --noconfirm
```

Alternatively you can install `atom-bleeding` from my `pkgbuild-current` repository, along with additional Atom packages/themes I recommend, by running:

```bash
/bin/bash -c "$(curl -sL https://git.io/vKvn1)"
```

## Commands
This package provides the following Atom commands (each can be accessed via the command pallette, which is opened by pressing <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>):

* `pkgbuild:aurup` (default keyboard shortcut: <kbd>F7</kbd>) &mdash; runs `updpkgsums` and `mksrcinfo` to make the local repository copy suitable for committing, then it sends (via git) your changes to the AUR.
* `pkgbuild:docs` (default keyboard shortcut: <kbd>F6</kbd>) &mdash; opens the PKGBUILD article at the *ArchWiki*.
* `pkgbuild:makepkg` (default keyboard shortcut: <kbd>F5</kbd>) &mdash; builds a package using the PKGBUILD presently opened. If dependencies (including build dependencies) are missing it will fail, as it does not have the necessary root permissions to install missing dependencies.
* `pkgbuild:mksrcinfo` (shortcut: <kbd>F10</kbd>) &mdash; generates a .SRCINFO file from the presently-opened PKGBUILD.
* `pkgbuild:namcap` (shortcut: <kbd>F8</kbd>) &mdash; runs `namcap` on the PKGBUILD (*not* on any built packages) to check for any errors.
* `pkgbuild:newpkg` (shortcut: <kbd>F4</kbd>) &mdash; runs `git clone ssh+git://aur@aur.archlinux.org/<PACKAGE> <DIRECTORY>/<PACKAGE>` where `<DIRECTORY>` is the current working directory and `<PACKAGE>` is an input provided by the user in the command pallette box that pops up. This command requires that you have a registered SSH key (that is, added to your AUR account) for the AUR that has been authenticated on your current system. For further information please refer to [*The ArchWiki*](https://wiki.archlinux.org/index.php/Arch_User_Repository#Sharing_and_maintaining_packages). If the package in question is not present in the AUR, it will create a blank AUR based on a template similar to the snippet provided by this package. This template's header is filled out using the user-provided `username` and `email` fields set in the configuration settings of this package. See the [Configuration](#configuration) section for further details.
* `pkgbuild:updpkgsums` (shortcut: <kbd>F9</kbd>) &mdash; runs `updpkgsums` on the PKGBUILD to update checksums listed in it.

## Configuration
If you intend on creating new AUR packages with this package I would recommend you set your username and email in the configuration settings of this package. To do this go to <code>Edit&rarr;Preferences</code> and open the packages pane. Then find (scroll down if necessary) and click the `language-archlinux` package's `settings` button. Likewise in the configuration settings you can set some of these commands to run automatically upon you saving a PKGBUILD file.

## Contributors
A special mention goes to [@bil-elmoussaoui](https://github.com/bil-elmoussaoui), [@DamnedScholar](https://github.com/DamnedScholar), [@Lee-Dohm](https://github.com/Lee-Dohm) and others for their contributions to this package. With the exception of @bil-elmoussaoui all these contributors helped me via answering my questions at discuss.atom.io. Without them this package would be nowhere as mature as it is now.

## License
This package is licensed under the GNU General Public License v3 (GPLv3), for a copy of this license see the [LICENSE.md](/LICENSE.md) file in the top level of this repository.
