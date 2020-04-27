"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
class Waypoint {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    }
    getPosition() {
        let $elem = jquery_1.default(`div[data-x="${this.x}"][data-y="${this.y}"]`);
        if ($elem.length)
            return $elem.position();
        throw new Error(`Position (${this.x}, ${this.y}) not found.`);
    }
    getId() {
        return this.id;
    }
}
exports.default = Waypoint;
//# sourceMappingURL=waypoint.js.map