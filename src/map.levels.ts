import * as _ from "underscore";
import Tile from "./tile";

class Schema {
    public matrix: Tile[][];
    public level: number;

    constructor(level: number, matrix: Tile[][]) {
        this.matrix = matrix;
        this.level = level;
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
            ])
        );
    }

    getSchema(): Tile[][] {
        let schema = _.first(this.schemas.filter(t => t.level === this.level));
        if (!schema) throw new Error(`Schema for level ${ this.level } not found.`);
        return schema.matrix;
    }
}

export default LevelSchema;