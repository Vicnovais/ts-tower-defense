"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Board {
    constructor(difficulty = 1) {
        this.difficulty = difficulty;
    }
    addTower(tower) {
        this.towers.push(tower);
    }
    addMonster(monster) {
        monster.setHpFactor(this.difficulty);
        monster.setArmorFactor(this.difficulty);
        monster.setSpeedFactor(this.difficulty);
        this.monsters.push(monster);
    }
}
exports.default = Board;
//# sourceMappingURL=board.js.map