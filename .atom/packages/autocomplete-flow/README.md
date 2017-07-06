# autocomplete-flow

An autocomplete provider based on flow for awesome javascript development experience in Atom.

## Why not nuclide?

Nuclide is big ide that includes many packages. As such it has many issues. This package does autocomplete powered by flow and nothing else. (see linter-flow for linting help.)

## Known Issues

1. The package will try to run in every javascript file, even if there isn't a `.flowconfig` file present.
2. Atom can often fail to find the installed version of flow on your path. If this happens to you, make sure you set the absolute path to the flow executable in the package settings
