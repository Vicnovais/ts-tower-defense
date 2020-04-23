import Engine from "./engine";
import $ from "jquery";

class Monster {
    private hp: number;
    private speed: number;
    private armor: number;
    private element: JQuery<HTMLElement>;

    constructor(hp: number, speed: number, armor: number) {
        this.hp = hp;
        this.speed = speed;
        this.armor = armor
        this.element = null;
    }

    setHpFactor(factor: number) {
        this.hp *= factor;
    }

    setArmorFactor(factor: number) {
        this.armor *= factor;
    }

    setSpeedFactor(factor: number) {
        this.speed *= factor;
    }

    draw() {
        this.element = $(`<div id="${ Engine.createUUID() }" class="monster"></div>`);
        return this;
    }

    getPosition() {
        return this.element.position();
    }

    getElement() {
        return this.element;
    }

    getSpeed() {
        return this.speed;
    }
}

export default Monster;