const chalk = require("chalk");

module.exports = class Game {
    constructor({_id, isAAA, protections, title, releaseDate, image, steamPrice, groups}) {
        this.id = _id;
        this.tripleA = isAAA;
        this.protections = protections;
        this.title = title;
        this.releaseDate = releaseDate;
        this.image = image;
        this.steamPrice = steamPrice;
        this.groups = groups;
    }
    toString() {
        const isAAA = this.tripleA ? ` is triple A` : ` is not triple A`;
        const cracked = this.groups.length == 0 ? chalk.red('Not cracked') :
         `Cracked by ${chalk.green(this.groups.join(", "))}`;

        const protections = `${this.protections.join(', ')}`
        const released = `${chalk.blue(this.title)} is released on ${this.releaseDate}`;
        return `${chalk.blue(this.title)}${isAAA} and has the following protections: ${chalk.red(protections)}.\n${released}. Status: ${cracked}\n`;
    }
}