#!/usr/bin/env node

const program = require('commander');
const service = require('./src/service/gameService.js');
program
    .version('0.0.1')
    .option('-g, --game [optional]', 'Game name (must be between quotes) <String>')
    .option('-G, --games [optional]', 'Games, split by comma <ArrayString>')
    .option('-e, --exact', 'Match the exact title <Boolean>')
    .option('-p, --page-start [optional]', 'Page start (default 0) <Integer>')
    .option('-P, --page-end [optional]', 'Page end (default 100) <Integer>')
    .option('-v, --verbose', 'Display more information <Boolean>')
    .action(async function () {
        if (program.args.length == 0) {
            program.help();
            return;
        }
        service.init(program);
        const data = await service.findGames();
        const games = await Promise.all(data);
        games.map(game => console.log(game.toString()));
    })
    .parse(process.argv); // end with parse to parse through the input