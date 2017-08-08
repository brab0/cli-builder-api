CLI Builder API
===============
This project is meant to be a helper to abstract some unecessary layers for CLIs development by providing a command schema creator and a single line executor.

## Instalation
    $ npm install cli-builder-api --save

## Usage
### Config
Because CLI Builder API does not need that much, all the informations are kept on your `package.json` node's project. This is an example of a minimum `package.json` file the package requires:

`package.json`
```json
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
Note that, except for `bin` and `cliBuilder`, all the others are ordinary fields gotten from a `npm init` command. The `bin` attribute informs how we gonna call(`my-project`) and where(`./bin/my-project.js`) npm is gonna find our *executable to symlink for global installs* [see more](https://docs.npmjs.com/files/package.json#bin). The `cliBuilder` tells to our package where our commands files will be with **wildcards** support(/path/command.*.js, /\**/my-command.js).

### Command Schema
Now the package knows where to find our command, let's specify our **greeting command**:

`./commands/print.js`
```node

/*
*  The main method is where you'll put your command's logic. 
*  Of course it can has any name, since the 'entry point' is
*  specified in the main field at the command schema.
*/

function main(options) {
    if(options.hello){
        console.log("Your CLI says Hello!");
    } else if(options.goodbye){
        console.log("Your CLI says Goodbye!");
    }
}

// our command's schema
require('cli-builder-api').command({
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

### Executable
We sayd in the `bin` field from our `package.json` how to call and where is our executable, but does not have it yet. So, let's do it:
`./bin/my-project.js`
```node
#!/usr/bin/env node

require('cli-builder-api').exec();
```
**OBS**: Note that our first line is a [shebang](https://www.in-ulm.de/~mascheck/various/shebang/). Unless you wanna do something before/after the require function, this file should be immutable. The shebang will tell to the system's interpreter what kind of code it has to expect(`node`) and read. The second one will execute the CLI Builder API, which is gonna call all the commands (according to the configuration).

### Default Options
This package has basically two default options: `--help`(or `-h`) and `--version`(or `-v`). There's no much to say here, but it's interesting to note that all the help's content comes from the command's schema.

### Let's try it?
Yep, **that's it**! You have built a simple CLI. So, now what?
There is basically two ways to run it. First, you can install it globally or second, create a bunch of *scripts* in the `package.json` file.
I prefer the second option while I'm testing my commands. Based on this project, I would do something like: 

`package.json`
```json
...
"scripts": {
    "version": "node . --version",
    "help": "node . --help",
    "print": "node . print",
    "print_help": "node . print --help",
    "print_hello": "node . print --hello",
    "print_hl": "node . print -hl",
    "print_goodbye": "node . print --goodbye",
    "print_bye": "node . print -bye"
  },
...
```

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
