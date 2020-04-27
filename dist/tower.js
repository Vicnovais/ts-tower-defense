"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tower {
    constructor(color, attack) {
        this.color = color;
        this.attack = attack;
    }
    draw() {
        return `<div class="tower" style="background-color: ${this.color}"></div>`;
    }
}
;
exports.default = Tower;
//# sourceMappingURL=tower.js.map