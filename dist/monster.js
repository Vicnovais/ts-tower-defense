"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = __importDefault(require("./engine"));
const jquery_1 = __importDefault(require("jquery"));
class Monster {
    constructor(hp, speed, armor) {
        this.hp = hp;
        this.speed = speed;
        this.armor = armor;
        this.element = null;
        this.walkedWaypoints = [];
    }
    setHpFactor(factor) {
        this.hp *= factor;
    }
    setArmorFactor(factor) {
        this.armor *= factor;
    }
    setSpeedFactor(factor) {
        this.speed *= factor;
    }
    draw() {
        this.element = jquery_1.default(`<div id="${engine_1.default.createUUID()}" class="monster"></div>`);
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
    addWalkedWaypoint(wayPoint) {
        this.walkedWaypoints.push(wayPoint);
    }
    getWalkedWaypoints() {
        return this.walkedWaypoints;
    }
}
exports.default = Monster;
//# sourceMappingURL=monster.js.map