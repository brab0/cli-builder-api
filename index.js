const CommandList = require('./lib/CommandsList');
const Command = require('./lib/Command');

let commands = new CommandList();

const config = require('./config');

function command(schema){    
    commands.add(new Command(schema));
}

function exec(){    
    const CLI = require('./lib/CLI');    

    process.bin = process.title = config.name;
    
    require('require-files').only(config.path.schemas);

    new CLI(commands).exec();
}

module.exports = {
    exec : exec,
    command : command,
    config : config,
    utils: require('./utils')
}
