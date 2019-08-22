# coc-flow

Flow language server extension for [`coc.nvim`](https://github.com/neoclide/coc.nvim).

## Install

1. Inside (neo)vim run this command:

```
:CocInstall coc-flow
```

Note: for coc installation instructions visit [`coc.nvim`](https://github.com/neoclide/coc.nvim/wiki/Install-coc.nvim) repo

## Setup
* Make sure you have `.flowconfig` inside your project root.
* By default coc-flow looks for flow binary inside your node_modules (as flow [recommends](https://flow.org/en/docs/install) it), as fallback it uses `flow.pathToFlow`, you can toggle this behavior using `flow.useNPMPackagedFlow` option.
* If you're suing [coc-tsserver](https://github.com/neoclide/coc-tsserver), set `javascript.validate.enable` option to `false`.

## Features
* Code completion
* Go to definition
* Diagnostics
* Hover for type info

## Configuration

* `flow.enable` (default: `true`) Enable flow extension
* `flow.pathToFlow` (default: `flow`) Absolute path to flow binary
* `flow.useNPMPackagedFlow` (default: `true`) Use flow binary which exists in node_modules (recommended)
* `flow.stopFlowOnExit` (default: `true`) Stop flow server on exit
* `flow.lazyMode` (default: `''`) Which lazy mode to use, empty string will use lazy mode set in .flowconfig and any other value override that

## License

MIT

