CLI Builder API
===============
CLI Builder API is meant to be a helper to abstract some unecessary layers on global CLIs development, by providing a command schema creator and a single line executor.

## Instalation
    $ npm install cli-builder-api --save

## Usage
After start a new node project (`npm init new-project`), sync it with a git repo (strongly recommended) and install this package locally, you should see a `package.json` file as shown below:

```json
{
  "name": "new-project",
  "version": "0.0.1",
  "description": "A CLI for console something.",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/brab0/new-project.git"
  },
  "author": "Rodrigo Brabo <brabo.rodrigo@gmail.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/brab0/new-project/issues"
  },
  "homepage": "https://github.com/brab0/new-project#readme",
  "dependencies": {
    "cli-builder-api": "^0.0.1"
  }
}
```
It is very important to fill and keep this file updated with useful informations 'cause `cli-builder-api` use them (in --help, for example). Plus, we're gonna need to add some attributes, such as:

```json
...
  "bin": {
    "my-project": "./bin/my-project.js"
  },
  "cliBuilder": {
    "commands": {
      "path": "commands/*.js",
      "default": "help"
    }
  }
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
