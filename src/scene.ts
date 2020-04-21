import Map from "./map";
import Monster from "./monster";
import Wave from "./wave";
import LevelData from "./level.data.json";
import $ from "jquery";
import _ from "underscore";

class Scene {
    private map: Map;
    private waves: Wave[];
    private step: number;
    private level: number;
    private interval: number;

    constructor() {
        this.level = 1;
        this.step = 1;
        this.map = new Map(this.level);
        this.waves = [];

        $(document).ready(() => {
            this.start();
            this.loop();
        });
    }

    private getLevelData() {
        return _.first(LevelData.levels.filter(t => t.number === this.level));
    }

    private start() {
        this.map.draw();
    }

    private loop() {

    }

    private clear() {
        clearInterval(this.interval);
        this.interval = null;
    }

    private spawnMonters() {
        this.interval = setInterval(() => {

        }, this.getLevelData().monster.spawnTime);
    }
}

new Scene();