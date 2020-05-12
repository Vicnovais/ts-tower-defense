import Monster from "./monster";
import LevelData from "./level.data.json";
import $ from "jquery";
import _ from "underscore";
import Engine from "./engine";
import GameContext from "./game.context";

class Scene {
    private level: number;
    private gameContext: GameContext;

    constructor() {
        this.level = 1;
        this.gameContext = new GameContext();

        $(document).ready(() => {
            this.setup();
            this.start();
        });
    }

    getMap() {
        return this.gameContext.getLevelMap();
    }

    private getLevelData() {
        return _.first(LevelData.levels.filter(t => t.number === this.level));
    }

    private setup() {
        this.gameContext.createLevelContext(1);
        this.getMap().draw();
    }

    private sendWaves() {
        this.gameContext.getLevelWaves().forEach((t) => {
            t.getMonsters().forEach((u, i) => {
                this.spawnMonster(u, i);
            });
        });
    }

    private start() {
        this.sendWaves();
    }

    private clear() {
    }

    private getEntrance() {
        return this.gameContext.getLevelMap().getEntrance();
    }

    private spawnMonster(monster: Monster, index: number) {
        setTimeout(() => {
            let $monster = monster.draw().getElement(),
                entrance = this.getEntrance().position();

            monster.spawn(entrance);
            this.getMap().appendMonster($monster);
            Engine.moveMonster(monster, this.getMap(), this.gameContext);
        }, (index + 1) * this.getLevelData().monster.spawnTime);
    }
}

new Scene();