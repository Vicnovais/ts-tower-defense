import LevelData from "./level.data.json";
import _ from "underscore";
import Wave from "./wave";
import Map from "./map";

interface IMonster {
    baseHp: number,
    baseArmor: number,
    baseSpeed: number,
    spawnTime: number
}

interface IWaveMonster {
    count: number,
    hpFactor: number,
    armorFactor: number,
    speedFactor: number
}

interface IWave {
    number: number,
    goldPerKill: number,
    monster: IWaveMonster
}

interface ILevelData {
    number: number,
    initialGold: number,
    lives: number,
    monster: IMonster,
    waves: IWave[]
}

class LevelContext {
    private readonly level: number;
    private readonly levelData: ILevelData;
    public readonly waves: Wave[];
    public readonly map: Map;
    public readonly initialLives: number;
    public readonly initialGold: number;

    constructor(level: number) {
        this.level = level;
        this.levelData = this.getLevelData();
        this.waves = this.getWaves();
        this.map = new Map(level);
        this.initialLives = this.levelData.lives;
        this.initialGold = this.levelData.initialGold;
    }

    private getLevelData(): ILevelData {
        return _.first(LevelData.levels.filter(t => t.number === this.level));
    }

    private getWaves() {
        let waveConfig = this.levelData.waves;
        return waveConfig.map((_t, i) => new Wave(this.level, i + 1));
    }
}

export default LevelContext;