import LevelSchema from "./map.levels";

class Map {
    private readonly level: number;
    private readonly levelSchema: LevelSchema;

    constructor(level: number) {
        this.level = level;
        this.levelSchema = new LevelSchema(level);
    }

    build() {
        let schema = this.levelSchema.getSchema();
    }
}

export default Map;