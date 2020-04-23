import Map from "./map";
import Wave from "./wave";
import Monster from "./monster";
import LevelData from "./level.data.json";
import $ from "jquery";
import _ from "underscore";
import Engine from "./engine";

class Scene {
    private map: Map;
    private waves: Wave[];
    private step: number;
    private level: number;

    constructor() {
        this.level = 1;
        this.step = 1;
        this.map = new Map(this.level);
        this.waves = [];

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

            $monster.hide();
            this.map.appendMonster($monster);
            $monster.css({ left: entrance.left + 10, top: entrance.top + 10 });
            $monster.show();
            Engine.moveMonster(monster, this.map.getWayPoints());
        }, (index + 1) * this.getLevelData().monster.spawnTime);
    }
}

new Scene();