"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const monster_1 = __importDefault(require("./monster"));
const level_data_json_1 = __importDefault(require("./level.data.json"));
const underscore_1 = __importDefault(require("underscore"));
class Wave {
    constructor(level, step) {
        this.level = level;
        this.step = step;
        this.monsters = [];
        this.addMonsters();
    }
    getLevelData() {
        return underscore_1.default.first(level_data_json_1.default.levels.filter(t => t.number === this.level));
    }
    addMonsters() {
        let waveConfig = underscore_1.default.first(this.getLevelData().waves.filter(t => t.number === this.step)), baseMonster = this.getLevelData().monster;
        for (let i = 0; i < waveConfig.monster.count; i++) {
            let hp = baseMonster.baseHp * waveConfig.monster.hpFactor, armor = baseMonster.baseArmor * waveConfig.monster.armorFactor, speed = baseMonster.baseSpeed * waveConfig.monster.speedFactor;
            this.monsters.push(new monster_1.default(hp, speed, armor));
        }
    }
    getMonsters() {
        return this.monsters;
    }
}
exports.default = Wave;
//# sourceMappingURL=wave.js.map