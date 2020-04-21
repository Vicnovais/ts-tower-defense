import LevelSchema from "./map.levels";
import Tile from "./tile";
import Colors from "./colors";
import * as $ from "jquery";

class Map {
    private readonly level: number;
    private readonly levelSchema: LevelSchema;

    constructor(level: number) {
        this.level = level;
        this.levelSchema = new LevelSchema(level);
    }

    draw() {
        let schema = this.levelSchema.getSchema(),
            container = $("#map");

        for (let i = 0; i < schema.length; i++) {
            for (let j = 0; j < schema[i].length; j++) {
                let tileMarkup = this.drawTile(schema[i][j]);
                container.append(tileMarkup);
            }
        }
    }

    private drawTile(tile: Tile) {
        switch (tile) {
            case Tile.ENTER:
            case Tile.E:
                return `<div class="tile" style="background-color: ${ Colors.GRAY }"></div>`;
            case Tile.EXIT:
            case Tile.X:
                return `<div class="tile" style="background-color: ${ Colors.DARK_GRAY }"></div>`;
            case Tile.PATH:
            case Tile.P:
                return `<div class="tile" style="background-color: ${ Colors.BLACK }"></div>`;
            case Tile.TERRAIN:
            case Tile.T:
                return `<div class="tile"></div>`;
            default: throw new Error(`Tile ${ tile } not found.`);
        }
    }
}

export default Map;