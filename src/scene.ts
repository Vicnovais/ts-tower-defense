import Map from "./map";
import Wave from "./wave";
import Monster from "./monster";
import LevelData from "./level.data.json";
import $ from "jquery";
import _ from "underscore";
import Engine from "./engine";
import GameContext from "./game.context";

class Scene {
    private map: Map;
    private waves: Wave[];
    private step: number;
    private level: number;
    private gameContext: GameContext;

    constructor() {
        this.level = 1;
        this.step = 1;
        this.map = new Map(this.level);
        this.gameContext = new GameContext(this.level);
        this.waves = [];
        this.map.getPath();
        $(document).ready(() => {
            this.setup();
            this.start();
        });
    }

    private getLevelData() {
        return _.first(LevelData.levels.filter(t => t.number === this.level));
    }

    private setup() {
        this.map.draw();
        this.waves.push(new Wave(this.level, this.step));
        this.sendWaves();
    }

    private sendWaves() {
        this.waves.forEach((t) => {
            t.getMonsters().forEach((u, i) => {
                this.spawnMonster(u, i);
            });
        });
    }

    private start() {

    }

    private clear() {
    }

    private getEntrance() {
        return this.map.getEntrance();
    }

    private spawnMonster(monster: Monster, index: number) {
        setTimeout(() => {
            let $monster = monster.draw().getElement(),
                entrance = this.getEntrance().position();

            monster.spawn(entrance);
            this.map.appendMonster($monster);
            Engine.moveMonster(monster, this.map, this.gameContext);
        }, (index + 1) * this.getLevelData().monster.spawnTime);
    }
}

new Scene();