import $ from "jquery";
import Tile from "./tile";

class Waypoint {
    private readonly x: number;
    private readonly y: number;
    private readonly id: string;
    private readonly tile: Tile;

    constructor(x: number, y: number, id: string, tile: Tile) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.tile = tile;
    }

    getPosition() {
        let $elem = $(`div[data-x="${ this.x }"][data-y="${ this.y }"]`);
        if ($elem.length) return $elem.position();
        throw new Error(`Position (${ this.x }, ${ this.y }) not found.`);
    }

    getId() {
        return this.id;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getTile() {
        return this.tile;
    }
}

export default Waypoint;