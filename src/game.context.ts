import _ from "underscore";
import $ from "jquery";
import LevelContext from "./level.context";

class GameContext {
    private lives: number;
    private gold: number;
    private $elementLives: JQuery<HTMLElement> = $("#lives-count");
    private $elementGold: JQuery<HTMLElement> = $("#gold-count");
    private levelContext: LevelContext;

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
}

export default GameContext;