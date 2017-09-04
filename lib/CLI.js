const mout = require('mout');
const nopt = require('nopt');
const chalk = require('chalk');
const config = require('../config');
const CommandList = require('./CommandsList');

module.exports = class CLI {
    constructor(commands){
        this.commands = commands;
        this.args = process.argv;
        this.command = commands.get(0, this.args);
        this.options = {};
        
        if(this.command){            
            this.setValidOptions();
        }
    }    

    setValidOptions(){         
        if(this.command.options){
            var types = {};

            this.command.options.forEach(option => {                
                types[option.name] = option.type;
            });

            // by now we won't work with shorthands(2° param)
            var noptOptions = nopt(types, [], this.args, 2);        

            mout.object.forOwn(noptOptions, (value, key) => {            
                this.command.options.forEach(opt => {
                    if((opt.name == key) || (opt.abbrev == key)){
                        this.options[mout.string.camelCase(opt.name)] = value;
                    }
                });
            });
        }
    }

    help(cmds = null){        
        cmds = cmds || this.commands;

        console.log(chalk.bold(config.name +" v"+config.version));
        
        if(config.description && config.description !== ""){
            console.log(config.description);
        }

        console.log(`\n${chalk.bold('Usage:')} ${config.name} <command> [<option>]\n`);
        
        cmds.items.forEach(cmd => {
            cmd.help();
        });

        if(config.homepage && config.homepage !== ""){
            console.log(`${chalk.bold('See more at:')} ${config.homepage}\n`);
        }
    }

    version(){
        console.log(`v${config.version}`)
    }

    exec(){
        if(!this.command){
            if(this.args.some(arg => arg == '--version' || arg == '-v')){
                this.version();
            } else {
                console.log(chalk.yellow('We could not find any valid command. Take a look to the helper below or any time you want type') + chalk.yellow.bold(' schemium --help:\n'))
                this.help();
            }            
        } else if(this.options.help){            
            this.help(new CommandList([this.command]));
        } else {
            this.command.exec(this.options);
        } 
    }
}