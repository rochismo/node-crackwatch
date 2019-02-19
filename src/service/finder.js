const _ = require("string-similarity");
const {
    GAMES,
    CRACK,
    PAGE_LIMIT
} = require('./../constants.js');
const request = require('./requester.js');
const Game = require('./../model/game');
const chalk = require("chalk");
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
let stopped = false;
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        console.log(chalk.red("Detected manual stop"));
        stopped = true;
    }
});

function getGames(games, titles, value) {
    const found = [];
    titles.map((game) => {
        const f = games.filter(({
            title
        }) => _.compareTwoStrings(game, title) >= value);
        if (f.length != 0) {
            found.push(f);
        }
    });
    return found;
}
module.exports = {
    findGames: async function (games, res, value) {
        if (stopped) {
            res(this.gamesFound);
        }
        if (this.verbose) {
            console.log(chalk.red(`Searching at page: ${this.pageStart}`));
        }

        const json = await request(`${GAMES}?page=${this.pageStart}`);
        const mapped = json.map(game => new Game(game));

        const found = getGames(mapped, games, value)

        if (found.length != 0) {
            this.gamesFound.push(found)
            console.log(chalk.green(`${this.gamesFound.length} games found`));
            if (this.stopOnFind) {
                res(this.gamesFound);
            }
        }
        if (this.pageStart == this.pageEnd) {
            res(this.gamesFound);
        }
        this.pageStart++;

    }
}