import * as _ from "underscore";
import Tile from "./tile";

class Schema {
    public matrix: number[][];
    public level: number;

    constructor(level: number, matrix: number[][]) {
        this.matrix = matrix;
        this.level = level;
    }
}

class LevelSchema {
    private schemas: Schema[];
    private readonly level: number;

    constructor(level: number) {
        this.level = level;
        this.addSchemas();
    }

    addSchemas() {
        this.schemas.push(
            new Schema(1, [
                [Tile.T, Tile.T, Tile.E, Tile.T, Tile.T, Tile.T, Tile.T, Tile.T],
                [Tile.T, Tile.T, Tile.P, Tile.T, Tile.T, Tile.T, Tile.T, Tile.T],
                [Tile.T, Tile.T, Tile.P, Tile.T, Tile.T, Tile.T, Tile.T, Tile.T],
                [Tile.T, Tile.T, Tile.P, Tile.P, Tile.P, Tile.T, Tile.T, Tile.T],
                [Tile.T, Tile.T, Tile.T, Tile.T, Tile.P, Tile.T, Tile.T, Tile.T],
                [Tile.T, Tile.T, Tile.T, Tile.T, Tile.P, Tile.T, Tile.T, Tile.T],
                [Tile.T, Tile.T, Tile.T, Tile.T, Tile.P, Tile.T, Tile.T, Tile.T],
                [Tile.T, Tile.T, Tile.T, Tile.T, Tile.X, Tile.T, Tile.T, Tile.T]
            ])
        );
    }

    getSchema(): number[][] {
        let schema = _.first(this.schemas.filter(t => t.level === this.level));
        if (!schema) throw new Error(`Schema for level ${ this.level } not found.`);
        return schema.matrix;
    }
}

export default LevelSchema;