import LevelSchema from "./map.levels";
import Tile from "./tile";
import Colors from "./colors";
import $ from "jquery";
import _ from "underscore";
import Waypoint from "./waypoint";
import Engine from "./engine";

class Map {
    private readonly levelSchema: LevelSchema;
    private wayPoints: Waypoint[];

    constructor(level: number) {
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

    getPath(schema: Tile[][]) {
        let findNeighbors = (position: number[]) => {
            let i = position[0],
                j = position[1],
                neighbors = [
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
                let i = t[0],
                    j = t[1];

                return i >= 0 && j >= 0 && schema[i] && schema[i][j];
            });

            return neighbors;
        };

        let findTile = (tile: Tile) => {
            for (let i = 0; i < schema.length; i++) {
                for (let j = 0; j < schema[i].length; j++) {
                    if (schema[i][j] === tile) return [i, j];
                }
            }

            return null;
        };

        let findNextPath = (position: number[]): number[] => {
            let i = position[0],
                j = position[1],
                neighbors = findNeighbors(position),
                paths = neighbors.filter(t => {
                    let i = t[0],
                        j = t[1];

                    return schema[i][j] === Tile.PATH ||
                           schema[i][j] === Tile.WAYPOINT ||
                           schema[i][j] === Tile.EXIT;
                });

            if (paths.length > 1) throw new Error(`Multiple paths found for position: (${ i }, ${ j })`);
            return _.flatten(paths);
        };

        let entranceCoord = findTile(Tile.ENTER);
        if (!entranceCoord) throw new Error("Map entrance not found.");

        let exitCoord = findTile(Tile.EXIT);
        if (!exitCoord) throw new Error("Map exit not found.");

        let path: number[][] = [];

        do {
            let currentTile = entranceCoord,
                nextPath = findNextPath(currentTile);

            path.push(nextPath);
            currentTile = nextPath;
        } while (true);
    }
}

export default Map;