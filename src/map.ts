import LevelSchema from "./map.levels";
import Tile from "./tile";
import Colors from "./colors";
import $ from "jquery";
import Waypoint from "./waypoint";
import Engine from "./engine";

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
                let id = Engine.createUUID();
                this.addWayPoint(schema[i][j], i, j, id);
                let tileMarkup = this.drawTile(schema[i][j], i, j, id);
                container.append(tileMarkup);
            }
        }
    }

    private drawTile(tile: Tile, x: number, y: number, id: string) {
        switch (tile) {
            case Tile.ENTER:
                return `<div class="tile" id="${ id }" style="background-color: ${ Colors.GRAY }" data-x="${ x }" data-y="${ y }" data-type="enter"></div>`;
            case Tile.EXIT:
                return `<div class="tile" id="${ id }" style="background-color: ${ Colors.DARK_GRAY }" data-x="${ x }" data-y="${ y }" data-type="exit"></div>`;
            case Tile.PATH:
            case Tile.WAYPOINT:
                return `<div class="tile" id="${ id }" style="background-color: ${ Colors.BLACK }" data-x="${ x }" data-y="${ y }"></div>`;
            case Tile.TERRAIN:
                return `<div class="tile" id="${ id }"></div>`;
            default: throw new Error(`Tile ${ tile } not found.`);
        }
    }

    private addWayPoint(tile: Tile, x: number, y: number, id: string) {
        if (tile === Tile.WAYPOINT || tile === Tile.EXIT) 
            this.wayPoints.push(new Waypoint(x, y, id));
    }

    getWayPoints() {
        return this.wayPoints;
    }

    getEntrance() {
        return $("div[data-type='enter']");
    }

    getExit() {
        return $("div[data-type='exit']");
    }

    appendMonster($elem: JQuery<HTMLElement>) {
        $("#map").append($elem);
    }
}

export default Map;