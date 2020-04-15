import Tower from "./tower";
import Monster from "./monster";

class Board {
    private towers: Tower[]
    private monsters: Monster[]
    private readonly difficulty: number

    constructor(difficulty: number = 1) {
        this.difficulty = difficulty;
    }

    addTower(tower: Tower) {
        this.towers.push(tower);
    }

    addMonster(monster: Monster) {
        monster.setHpFactor(this.difficulty);
        monster.setArmorFactor(this.difficulty);
        monster.setSpeedFactor(this.difficulty);
        
        this.monsters.push(monster);
    }
}

export default Board;