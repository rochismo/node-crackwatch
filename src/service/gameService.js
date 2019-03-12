const GameFinder = require('./gameFinder.js');

class Finder {
    constructor({
        game = "",
        games = "",
        pageStart = 0,
        pageEnd = 430,
        verbose = false,
        exact = false,
        stopOnFind = false
    }) {
        this.game = game;
        this.games = games === "" ? [] : games.split(",");

        this.pageStart = pageStart;
        this.pageEnd = pageEnd;
        this.verbose = verbose;
        this.gamesFound = [];
        this.exact = exact;
        this.stopOnFind = stopOnFind;
        this.accuracy = 0;
        this.init();
    }

    init() {
        this.finder = new GameFinder();
        this.accuracy = this.exact ? 0.85 : 0.5
    }


    findGames() {
        // Check if user provided any games
        if (!this.games && this.game === "") {
            return ["You didn't specify a game"]
        }

        // Check if we have a game or that the list of games doesn't include the game 
        if (this.game || !this.games.includes(this.game)) {
            this.games.push(this.game);
        }
        this.finder.setRequiredValues(this);
        console.log("Please be patient while I search");
        
        // We'll always filter through an array even if it's length of one
        return this.finder.find();

    }
}
module.exports = Finder;