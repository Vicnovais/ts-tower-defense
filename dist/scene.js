"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const map_1 = __importDefault(require("./map"));
const wave_1 = __importDefault(require("./wave"));
const level_data_json_1 = __importDefault(require("./level.data.json"));
const jquery_1 = __importDefault(require("jquery"));
const underscore_1 = __importDefault(require("underscore"));
const engine_1 = __importDefault(require("./engine"));
class Scene {
    constructor() {
        this.level = 1;
        this.step = 1;
        this.map = new map_1.default(this.level);
        this.waves = [];
        jquery_1.default(document).ready(() => {
            this.setup();
            this.start();
        });
    }
    getLevelData() {
        return underscore_1.default.first(level_data_json_1.default.levels.filter(t => t.number === this.level));
    }
    setup() {
        this.map.draw();
        this.waves.push(new wave_1.default(this.level, this.step));
        this.sendWaves();
    }
    sendWaves() {
        this.waves.forEach((t) => {
            t.getMonsters().forEach((u, i) => {
                this.spawnMonster(u, i);
            });
        });
    }
    start() {
    }
    clear() {
    }
    getEntrance() {
        return this.map.getEntrance();
    }
    spawnMonster(monster, index) {
        setTimeout(() => {
            let $monster = monster.draw().getElement(), entrance = this.getEntrance().position();
            $monster.hide();
            this.map.appendMonster($monster);
            $monster.css({ left: entrance.left + 10, top: entrance.top + 10 });
            $monster.show();
            this.map.getWayPoints().forEach(t => {
                engine_1.default.moveMonster(monster, this.map);
            });
        }, (index + 1) * this.getLevelData().monster.spawnTime);
    }
}
new Scene();
//# sourceMappingURL=scene.js.map