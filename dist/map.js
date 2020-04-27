"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const map_levels_1 = __importDefault(require("./map.levels"));
const tile_1 = __importDefault(require("./tile"));
const colors_1 = __importDefault(require("./colors"));
const jquery_1 = __importDefault(require("jquery"));
const underscore_1 = __importDefault(require("underscore"));
const waypoint_1 = __importDefault(require("./waypoint"));
const engine_1 = __importDefault(require("./engine"));
class Map {
    constructor(level) {
        this.levelSchema = new map_levels_1.default(level);
        this.wayPoints = [];
    }
    draw() {
        let schema = this.levelSchema.getSchema(), container = jquery_1.default("#map");
        for (let i = 0; i < schema.length; i++) {
            for (let j = 0; j < schema[i].length; j++) {
                let id = engine_1.default.createUUID();
                this.addWayPoint(schema[i][j], i, j, id);
                let tileMarkup = this.drawTile(schema[i][j], i, j, id);
                container.append(tileMarkup);
            }
        }
    }
    drawTile(tile, x, y, id) {
        switch (tile) {
            case tile_1.default.ENTER:
                return `<div class="tile" id="${id}" style="background-color: ${colors_1.default.GRAY}" data-x="${x}" data-y="${y}" data-type="enter"></div>`;
            case tile_1.default.EXIT:
                return `<div class="tile" id="${id}" style="background-color: ${colors_1.default.DARK_GRAY}" data-x="${x}" data-y="${y}" data-type="exit"></div>`;
            case tile_1.default.PATH:
            case tile_1.default.WAYPOINT:
                return `<div class="tile" id="${id}" style="background-color: ${colors_1.default.BLACK}" data-x="${x}" data-y="${y}"></div>`;
            case tile_1.default.TERRAIN:
                return `<div class="tile" id="${id}"></div>`;
            default: throw new Error(`Tile ${tile} not found.`);
        }
    }
    addWayPoint(tile, x, y, id) {
        if (tile === tile_1.default.WAYPOINT || tile === tile_1.default.EXIT)
            this.wayPoints.push(new waypoint_1.default(x, y, id));
    }
    getWayPoints() {
        return this.wayPoints;
    }
    getEntrance() {
        return jquery_1.default("div[data-type='enter']");
    }
    getExit() {
        return jquery_1.default("div[data-type='exit']");
    }
    appendMonster($elem) {
        jquery_1.default("#map").append($elem);
    }
    findNeighbors(position) {
        let schema = this.levelSchema.getSchema(), i = position[0], j = position[1], neighbors = [
            [--i, j],
            [i, ++j],
            [i, ++j],
            [i, --j],
            [--i, --j],
            [--i, ++j],
            [++i, --j],
            [++i, ++j]
        ];
        neighbors = neighbors.filter(t => {
            let i = t[0], j = t[1];
            return i >= 0 && j >= 0 && schema[i] && schema[i][j];
        });
        return neighbors;
    }
    findTile(tile) {
        let schema = this.levelSchema.getSchema();
        for (let i = 0; i < schema.length; i++) {
            for (let j = 0; j < schema[i].length; j++) {
                if (schema[i][j] === tile)
                    return [i, j];
            }
        }
        return null;
    }
    findNextPath(position) {
        let schema = this.levelSchema.getSchema(), i = position[0], j = position[1], neighbors = this.findNeighbors(position), paths = neighbors.filter(t => {
            let i = t[0], j = t[1];
            return schema[i][j] === tile_1.default.PATH ||
                schema[i][j] === tile_1.default.WAYPOINT ||
                schema[i][j] === tile_1.default.EXIT;
        });
        if (paths.length > 1)
            throw new Error(`Multiple paths found for position: (${i}, ${j})`);
        return underscore_1.default.flatten(paths);
    }
    ;
    getPath() {
        let entranceCoord = this.findTile(tile_1.default.ENTER);
        if (!entranceCoord)
            throw new Error("Map entrance not found.");
        let path = [], schema = this.levelSchema.getSchema(), nextPath = null, currentTile = entranceCoord;
        do {
            nextPath = this.findNextPath(currentTile);
            path.push(nextPath);
            currentTile = nextPath;
        } while (schema[nextPath[0]][nextPath[1]] !== tile_1.default.EXIT);
        return path;
    }
}
exports.default = Map;
//# sourceMappingURL=map.js.map