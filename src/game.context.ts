import LevelData from "./level.data.json";
import _ from "underscore";
import $ from "jquery";

class GameContext {
    private level: number;
    private lives: number;
    private $element: JQuery<HTMLElement> = $("#lives-count");

    constructor(level: number) {
        this.level = level;
        this.setLives();
    }

    private setLives() {
        let levelData = _.first(LevelData.levels.filter(t => t.number === this.level));
        this.lives = levelData.lives;
        this.setLivesText();
    }

    takeLife() {
        --this.lives;
        this.setLivesText();
    }

    private setLivesText() {
        this.$element.text(this.lives);
    }
}

export default GameContext;