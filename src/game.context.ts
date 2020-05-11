import _ from "underscore";
import $ from "jquery";
import LevelContext from "./level.context";

class GameContext {
    private lives: number;
    private $element: JQuery<HTMLElement> = $("#lives-count");
    private readonly levelContext: LevelContext;

    constructor(level: number) {
        this.levelContext = new LevelContext(level);
        this.setLives();
    }

    private setLives() {
        this.lives = this.levelContext.initialLives;
        this.setLivesText();
    }

    takeLife() {
        if (this.lives === 0) this.onGameOver();
        else {
            --this.lives;
            this.setLivesText();
        }
    }

    private onGameOver() {
        //alert("Game Over!");
    }

    private setLivesText() {
        this.$element.text(this.lives);
    }

    getLevelMap() {
        return this.levelContext.map;
    }

    getLevelWaves() {
        return this.levelContext.waves;
    }
}

export default GameContext;