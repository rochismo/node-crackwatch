const {
    findGames
} = require('./finder.js');

class Finder {
    constructor() {

    }

    init({
        game = "",
        games = "",
        pageStart = 0,
        pageEnd = 430,
        verbose = false,
        exact = false,
        stopOnFind = false
    }) {
        this.game = game;
        this.games = games.split(",");

        this.pageStart = pageStart;
        this.pageEnd = pageEnd;
        this.verbose = verbose;
        this.gamesFound = [];
        this.exact = exact;
        this.stopOnFind = stopOnFind;
    }

    async findGame(games) {
        let interval = null;    
        return new Promise((res, rej) => {
            const cb = findGames.bind(this)
            const accuracy = this.exact ? 0.85 : 0.55;
            interval = setInterval(cb, 1500, games, res, accuracy);
        }).then(games => {
            clearInterval(interval);
            return games;
        })
    }

    async findGames() {
        if (!this.games && this.game === "") return ["You didn't specify a game"]
        if (this.games.length == 0 || this.game !== "") this.games.push(this.game);
        console.log("Please be patient while I search");

        return await this.findGame(this.games);

    }
}
module.exports = new Finder();