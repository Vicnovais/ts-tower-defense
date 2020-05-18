import Engine from "./engine";
import $ from "jquery";
import Waypoint from "./waypoint";

class Monster {
    private hp: number;
    private speed: number;
    private armor: number;
    private element: JQuery<HTMLElement>;
    private walkedWaypoints: Waypoint[];

    constructor(hp: number, speed: number, armor: number) {
        this.hp = hp;
        this.speed = speed;
        this.armor = armor
        this.element = null;
        this.walkedWaypoints = [];
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
        this.element = $(`
        <div id="${ Engine.createUUID() }" class="monster">
            <div class="hp">
                <div class="life"></div>
            </div>
        </div>`);
        
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

    addWalkedWaypoint(wayPoint: Waypoint) {
        this.walkedWaypoints.push(wayPoint);
    }

    getWalkedWaypoints() {
        return this.walkedWaypoints;
    }

    spawn(coord: JQuery.Coordinates) {
        this.element.hide();
        this.element.css({ left: coord.left + 10, top: coord.top + 10 });
        this.element.show();
    }
}

export default Monster;