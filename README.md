CLI Builder API
===============
This project is meant to be a helper to abstract some unecessary layers for global CLIs development, by providing a command schema creator and a single line executor.

## Instalation
    $ npm install cli-builder-api --save

## Usage
### Config
Because CLI Builder API does not need that much, all the informations are kept on your `package.json` node's project:

```package.json
{
  "name": "new-project",
  "version": "0.0.1",
  "description": "A CLI for console something.",
  "author": "You Name <your@email.com>",
  "homepage": "https://github.com/brab0/new-project#readme",
  "bin": {
    "my-project": "./bin/my-project.js"
  },
  "cliBuilder": {
    "commands": {
      "path": "commands/*.js"
    }
  }
}
```

Note that, except for `bin` and `cliBuilder`, all the others are ordinary fields gotten from a `npm init` command. The extra attribute `bin`, informs how we gonna call(`my-project`) and where(`./bin/my-project.js`) npm is gonna find our executable to symlink for global installs [see more](https://docs.npmjs.com/files/package.json#bin). The `cliBuilder` tells to our package where our commands files will be.

### Commands Schema
Now our package knows where to find the commands, lets create them. CLI Builder API supplys a command's schema creator, then we can specify our commands:

```node
// ./commands/print.js

let cli = require('cli-builder-api');

function main(options) {
    console.log("exporting with: ", options);
}

cli.command({
    name: 'print',
    abbrev: 'p',
    main : main,
    description : "prints a greeting message",
    options :[{
        name : "hello",
        abbrev : "hl",
        type: Boolean,
        description: "tells to program printing hello"
    }, {
        name : "goodbye",
        abbrev : "bye",
        type: Boolean,
        description: "tells to program printing goodbye"
    }]
});
```

### Glueing the PArts

### Executing

## License
```
MIT License

Copyright (c) 2017 Rodrigo Brabo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
