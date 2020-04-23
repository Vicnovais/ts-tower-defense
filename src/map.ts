import LevelSchema from "./map.levels";
import Tile from "./tile";
import Colors from "./colors";
import $ from "jquery";
import Waypoint from "./waypoint";

class Map {
    private readonly level: number;
    private readonly levelSchema: LevelSchema;
    private wayPoints: Waypoint[];

    constructor(level: number) {
        this.level = level;
        this.levelSchema = new LevelSchema(level);
        this.wayPoints = [];
    }

    draw() {
        let schema = this.levelSchema.getSchema(),
            container = $("#map");

        for (let i = 0; i < schema.length; i++) {
            for (let j = 0; j < schema[i].length; j++) {
                this.addWayPoint(schema[i][j], i, j);
                let tileMarkup = this.drawTile(schema[i][j], i, j);
                container.append(tileMarkup);
            }
        }
    }

    private drawTile(tile: Tile, x: number, y: number) {
        switch (tile) {
            case Tile.ENTER:
                return `<div class="tile" style="background-color: ${ Colors.GRAY }" data-x="${ x }" data-y="${ y }" data-type="enter"></div>`;
            case Tile.EXIT:
                return `<div class="tile" style="background-color: ${ Colors.DARK_GRAY }" data-x="${ x }" data-y="${ y }" data-type="exit"></div>`;
            case Tile.PATH:
            case Tile.WAYPOINT:
                return `<div class="tile" style="background-color: ${ Colors.BLACK }" data-x="${ x }" data-y="${ y }"></div>`;
            case Tile.TERRAIN:
                return `<div class="tile"></div>`;
            default: throw new Error(`Tile ${ tile } not found.`);
        }
    }

    private addWayPoint(tile: Tile, x: number, y: number) {
        if (tile === Tile.WAYPOINT) this.wayPoints.push(new Waypoint(x, y));
    }

    getWayPoints() {
        return this.wayPoints;
    }

    getEntrance() {
        return $("div[data-type='enter']");
    }

    appendMonster($elem: JQuery<HTMLElement>) {
        $("#map").append($elem);
    }
}

export default Map;