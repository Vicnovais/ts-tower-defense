"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("underscore"));
const tile_1 = __importDefault(require("./tile"));
class Schema {
    constructor(level, matrix) {
        this.matrix = matrix;
        this.level = level;
    }
}
class LevelSchema {
    constructor(level) {
        this.level = level;
        this.schemas = [];
        this.addSchemas();
    }
    addSchemas() {
        this.schemas.push(new Schema(1, [
            [tile_1.default.T, tile_1.default.T, tile_1.default.E, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T],
            [tile_1.default.T, tile_1.default.T, tile_1.default.P, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T],
            [tile_1.default.T, tile_1.default.T, tile_1.default.P, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T],
            [tile_1.default.T, tile_1.default.T, tile_1.default.W, tile_1.default.P, tile_1.default.W, tile_1.default.T, tile_1.default.T, tile_1.default.T],
            [tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.P, tile_1.default.T, tile_1.default.T, tile_1.default.T],
            [tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.W, tile_1.default.P, tile_1.default.P, tile_1.default.W],
            [tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.P],
            [tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.T, tile_1.default.X, tile_1.default.P, tile_1.default.P, tile_1.default.W]
        ]));
    }
    getSchema() {
        let schema = _.first(this.schemas.filter(t => t.level === this.level));
        if (!schema)
            throw new Error(`Schema for level ${this.level} not found.`);
        return schema.matrix;
    }
}
exports.default = LevelSchema;
//# sourceMappingURL=map.levels.js.map