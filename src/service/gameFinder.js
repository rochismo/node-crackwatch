const _ = require("string-similarity");
const {
    GAMES
} = require('./../constants.js');
const request = require('./requester.js');
const Game = require('./../model/game');
const readline = require('readline');
const Debugger = require('./../utils/debugger.js');

class GameFinder {
    constructor(games, resolve, value) {
        this.games = games;
        this.accuracy = value;
        this.gamesFound = [];
        this.stopped = false;
        this.verbose = false;
        this.logger = new Debugger(this.verbose);
        this.pageStart = 0;
        this.pageEnd = 0;
        this.stopOnFind = false;
        this.init();
    }

    getLength() {
        let length = 0;
        this.gamesFound.map(_ => length += _.length);
        return length;
    }

    init() {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        // Add a key listener
        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                this.logger.log("Detected manual stop", "red");
                this.stopped = true;
            }
        });

        this.logger.setVerbose(this.verbose);
    }


    async find() {
        let interval = null;

        // We return a promise because we don't want the interval to stop until it's told to do so
        const games = await new Promise((res, rej) => {
            interval = setInterval(async _ => {
                // If manual stop is detected, we resolve and exit
                if (this.stopped) {
                    res(this.gamesFound);
                }
                this.logger.log(`Searching at page: ${this.pageStart}`, "red");
                
                // We get the games of the current page to build them
                const json = await request(`${GAMES}?page=${this.pageStart}`);
                const mapped = json.map(game => new Game(game));
                
                // We filter the games if there's any game that we've found
                this.getGames(mapped, this.games, this.accuracy)
                
                
                if (this.stopOnFind) {
                    res(this.gamesFound);
                }

                // Check if we reached the end
                if (this.pageStart == this.pageEnd) {
                    res(this.gamesFound);
                }
                this.pageStart++;
            }, 1500, res);
        });
        clearInterval(interval);
        return games;
    }

    getGames(games, titles, accuracy) {

        // Map the titles
        const found = titles.map(ttl => {

            // Filter the games by title
            const gamesFound = games.filter(({
                title
            }) => _.compareTwoStrings(ttl, title ? title : '') >= accuracy);
            return gamesFound.length === 0 ? null : gamesFound;
        });

        if (!found.includes(null)) {
            this.gamesFound.push(found)
            this.logger.log(`${this.getLength()} games found`, "green");
        }
    }

    setRequiredValues({
        verbose,
        games,
        accuracy,
        pageStart,
        pageEnd,
        stopOnFind
    }) {
        this.verbose = verbose;
        this.games = games;
        this.accuracy = accuracy;
        this.pageStart = pageStart;
        this.pageEnd = pageEnd;
        this.stopOnFind = stopOnFind;
        this.logger.setVerbose(verbose);
    }
}

module.exports = GameFinder;