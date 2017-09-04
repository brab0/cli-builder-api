const Option = require('./Option');
const config = require('../config');
const pad = require('pad');
const chalk = require('chalk');

module.exports = class Command {
    constructor(command){
        this.name = command.name;
        this.abbrev = command.abbrev;
        this.main = command.main;
        this.description = command.description;
        this.options = this.getOptions(command.options);        
    }

    getOptions(options){        
        if(options){
            let opt = options.map(option => new Option(option));
            opt.push(new Option({
                name : "help",
                abbrev: 'h',
                type: Boolean
            }));

            return opt;
        } else {
            return [new Option({
                name : "help",
                abbrev: 'h',
                type: Boolean
            })];
        }
    }

    exec(options){
        this.main(options);
    }

    help(){
        console.log(pad(chalk.bold(pad(4, this.abbrev) + ", " + this.name), 70, '.') + this.description + "\n");
        
        if(this.options){
            this.options.forEach(opt => {
                if(opt.name !== 'help') {
                    console.log(pad(pad(8, "-" + opt.abbrev) + ", --" + opt.name, 61) + opt.description);                    
                }
            });
        }
        
        console.log();
    }
}