import LevelSchema from "./map.levels";
import Tile from "./tile";
import Colors from "./colors";
import $ from "jquery";
import _ from "underscore";
import Waypoint from "./waypoint";
import Engine from "./engine";
import Tower from "./tower";
import Monster from "./monster";

class Map {
    private readonly levelSchema: LevelSchema;
    private wayPoints: Waypoint[];
    private towers: Tower[];
    public monsters: Monster[];

    constructor(level: number) {
        this.levelSchema = new LevelSchema(level);
        this.wayPoints = [];
        this.towers = [];
        this.monsters = [];
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
                return `<div class="tile" id="${ id }" style="background-color: ${ Colors.GRAY }" data-x="${ x }" data-y="${ y }" data-type="exit"></div>`;
            case Tile.PATH:
            case Tile.WAYPOINT:
                return `<div class="tile" id="${ id }" style="background-color: ${ Colors.BLACK }" data-x="${ x }" data-y="${ y }"></div>`;
            case Tile.TERRAIN:
                return `<div class="tile empty" id="${ id }" data-x="${ x }" data-y="${ y }"></div>`;
            default: throw new Error(`Tile ${ tile } not found.`);
        }
    }

    private addWayPoint(tile: Tile, x: number, y: number, id: string) {
        if (tile === Tile.WAYPOINT || tile === Tile.EXIT) 
            this.wayPoints.push(new Waypoint(x, y, id, tile));
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

    getPath(): Waypoint[] {
        return this.levelSchema.getPath().map(t => {
            let i = t[0],
                j = t[1],
                wayPoints = this.wayPoints.filter(t => t.getX() === i && t.getY() === j);

            if (wayPoints.length > 1) throw new Error(`Multiple waypoints found for position (${ i }, ${ j })`);
            return _.first(wayPoints);
        }).filter(t => !!t);
    }

    addTower(color: Colors, posX: number, posY: number) {
        var tower = new Tower(color, posX, posY);
        tower.addMonsters(this.monsters);
        this.towers.push(tower);
    }

    addMonsters(monsters: Monster[]) {
        this.monsters = this.monsters.concat(monsters);
    }
}

export default Map;