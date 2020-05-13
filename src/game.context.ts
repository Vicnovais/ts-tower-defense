import _ from "underscore";
import $ from "jquery";
import LevelContext from "./level.context";
import GameData from "./game.data.json";

class GameContext {
    private lives: number;
    private gold: number;
    private $elementLives: JQuery<HTMLElement> = $("#lives-count");
    private $elementGold: JQuery<HTMLElement> = $("#gold-count");
    private levelContext: LevelContext;

    constructor() {
        this.setTowersInfo();
    }

    createLevelContext(level: number) {
        this.levelContext = new LevelContext(level);
        this.setLives();
        this.setGold();
    }

    takeLife() {
        if (this.lives === 0) this.onGameOver();
        else {
            --this.lives;
            this.setLivesText();
        }
    }

    private setGold() {
        this.gold = this.levelContext.initialGold;
        this.setGoldText();
    }

    private setLives() {
        this.lives = this.levelContext.initialLives;
        this.setLivesText();
    }

    private onGameOver() {
        //alert("Game Over!");
    }

    private setLivesText() {
        this.$elementLives.text(this.lives);
    }

    private setGoldText() {
        this.$elementGold.text(this.gold);
    }

    getLevelMap() {
        return this.levelContext.map;
    }

    getLevelWaves() {
        return this.levelContext.waves;
    }

    private setTowersInfo() {
        GameData.towers.forEach(t => {
            let type = t.type,
                atk = t.atk,
                price = t.price,
                $tower = $(`.tower.${ type } .tooltip`),
                $atkTxt = `<span>ATK: ${ atk }</span>`;

            $tower.html($atkTxt);
        });
    }
}

export default GameContext;