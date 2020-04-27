import * as _ from "underscore";
import Tile from "./tile";

class Schema {
    public readonly matrix: Tile[][];
    public readonly path: number[][];
    public readonly level: number;

    constructor(level: number, matrix: Tile[][], path: number[][]) {
        this.matrix = matrix;
        this.level = level;
        this.path = path;
    }
}

class LevelSchema {
    private schemas: Schema[];
    private readonly level: number;

    constructor(level: number) {
        this.level = level;
        this.schemas = [];
        this.addSchemas();
    }

    addSchemas() {
        this.schemas.push(
            new Schema(1, [
                [Tile.T, Tile.T, Tile.E, Tile.T, Tile.T, Tile.T, Tile.T, Tile.T],
                [Tile.T, Tile.T, Tile.P, Tile.T, Tile.T, Tile.T, Tile.T, Tile.T],
                [Tile.T, Tile.T, Tile.P, Tile.T, Tile.T, Tile.T, Tile.T, Tile.T],
                [Tile.T, Tile.T, Tile.W, Tile.P, Tile.W, Tile.T, Tile.T, Tile.T],
                [Tile.T, Tile.T, Tile.T, Tile.T, Tile.P, Tile.T, Tile.T, Tile.T],
                [Tile.T, Tile.T, Tile.T, Tile.T, Tile.W, Tile.P, Tile.P, Tile.W],
                [Tile.T, Tile.T, Tile.T, Tile.T, Tile.T, Tile.T, Tile.T, Tile.P],
                [Tile.T, Tile.T, Tile.T, Tile.T, Tile.X, Tile.P, Tile.P, Tile.W]
            ], [
                [0, 2],
                [3, 2],
                [3, 4],
                [5, 4],
                [5, 7],
                [7, 7],
                [7, 4]
            ])
        );
    }

    getSchema(): Tile[][] {
        let schema = _.first(this.schemas.filter(t => t.level === this.level));
        if (!schema) throw new Error(`Schema for level ${ this.level } not found.`);
        return schema.matrix;
    }

    getPath(): number[][] {
        let schema = _.first(this.schemas.filter(t => t.level === this.level));
        if (!schema) throw new Error(`Path for level ${ this.level } not found.`);
        return schema.path;
    }
}

export default LevelSchema;