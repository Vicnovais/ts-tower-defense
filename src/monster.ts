import Engine from "./engine";
import $ from "jquery";
import Waypoint from "./waypoint";

class Monster {
    private hp: number;
    private readonly initialHp: number;
    private speed: number;
    private armor: number;
    private element: JQuery<HTMLElement>;
    private walkedWaypoints: Waypoint[];
    public isDead: boolean;
    private goldPerKill: number;

    constructor(hp: number, speed: number, armor: number, goldPerKill: number) {
        this.hp = hp;
        this.initialHp = hp;
        this.speed = speed;
        this.armor = armor
        this.element = null;
        this.walkedWaypoints = [];
        this.isDead = false;
        this.goldPerKill = goldPerKill;
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

    updateHp() {
        let perc = this.hp / this.initialHp,
            width = 30*perc,
            $life = this.element.find(".life");

        $life.css("width", width);
    }

    hit(attack: number) {
        this.hp -= attack;
        this.updateHp();

        if (this.hp <= 0) {
            this.isDead = true;
            this.element.remove();
        }
    }
}

export default Monster;