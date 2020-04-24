import $ from "jquery";

class Waypoint {
    private readonly x: number;
    private readonly y: number;
    private readonly id: string;

    constructor(x: number, y: number, id: string) {
        this.x = x;
        this.y = y;
        this.id = id;
    }

    getPosition() {
        let $elem = $(`div[data-x="${ this.x }"][data-y="${ this.y }"]`);
        if ($elem.length) return $elem.position();
        throw new Error(`Position (${ this.x }, ${ this.y }) not found.`);
    }

    getId() {
        return this.id;
    }
}

export default Waypoint;