# Contributing

## Bug Reports
When filing a bug report please ensure the following requirements are met:

* A back trace, in English, is included if possible, as unfortunately this is the only human language I speak. If you are reporting a bug using Atom's in-built reporting mechanism, this will be included in your report by default. If you are using Atom with a different language locale than English then you will need to launch Atom with (note: I do not mind if you use a different locale instead so long as it is an **English** one):

```bash
LANG="en_US.UTF-8" atom <FILEDIRPATH>
```

where `<FILEDIRPATH>` is to be replaced with the file/directory path you want to open Atom to.

* You describe the precise series of events that lead to this error.
* If you have attempted some debugging on your own, please describe your attempts in detail.
* Please reload your Atom window (warning: save your work before doing this!) with <kbd>Alt</kbd>+<kbd>R</kbd>.

## Improvements
If you wish to suggest extra features this package could have please keep in mind the following points that could influence whether or not your proposed improvement will be implemented:

* Do the command(s) being executed in the improvement suggestion require input other than the path of the PKGBUILD presently opened? If it does, it may be difficult for me to implement. But if you know how to implement the improvement feel free to open a new pull request.
* Is this improvement likely to benefit more people than just yourself? This is not intended to be rude, it is just if this is a personal preference-type improvement that isn't likely to be useful to anyone else I may not implement it.
