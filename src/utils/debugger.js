const chalk = require("chalk");

module.exports = class Debugger {
    constructor(verbose) {
        this.verbose = verbose;
        this.levels = {
            red: chalk.red,
            green: chalk.green,

        }
    }

    log(msg, level) {
        if (!this.verbose) return;
        console.log(this.levels[level](msg));
    }

    setVerbose(verbose) {
        this.verbose = verbose;
    }


}