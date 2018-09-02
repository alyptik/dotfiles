# sublime-purescript-syntax

PureScript syntax support for Sublime Text 3

Syntax is derived from `b123400/purescript-ide-sublime` (a6b0fe1b02385e8fc0bb6a7d0a8d51c38d8a00d9). License and copyright notice is in `LICENSE_THIRD_PARTY.md`.

## Installation

Install from package `PureScript Syntax` from *Package Control* or manually:

```bash
mkdir ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/PureScriptSyntax
cp ./purescript.sublime-syntax  ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/PureScriptSyntax/
cp ./comments.tmPreferences  ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/PureScriptSyntax/
```
Then switch syntax to `PureScript`.

## Testing

```bash
while fswatch -1 ./purescript.sublime-syntax; do rsync -a ./purescript.sublime-syntax ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/PureScriptSyntax/; done
```
