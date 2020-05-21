import Monster from "./monster";
import LevelData from "./level.data.json";
import _ from "underscore";

class Wave {
    private readonly level: number;
    private readonly step: number;
    private monsters: Monster[];

    constructor(level: number, step: number) {
        this.level = level;
        this.step = step;
        this.monsters = [];
        this.addMonsters();
    }

    private getLevelData() {
        return _.first(LevelData.levels.filter(t => t.number === this.level));
    }

    private addMonsters() {
        let waveConfig = _.first(this.getLevelData().waves.filter(t => t.number === this.step)),
            baseMonster = this.getLevelData().monster;

        for (let i = 0; i < waveConfig.monster.count; i++) {
            let hp = baseMonster.baseHp * waveConfig.monster.hpFactor,
                armor = baseMonster.baseArmor * waveConfig.monster.armorFactor,
                speed = baseMonster.baseSpeed * waveConfig.monster.speedFactor,
                goldPerKill = waveConfig.goldPerKill;
            
            this.monsters.push(new Monster(hp, speed, armor, goldPerKill));
        }
    }

    getMonsters() {
        return this.monsters;
    }
}

export default Wave;