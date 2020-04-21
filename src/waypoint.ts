import $ from "jquery";

class Waypoint {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getPosition() {
        let $elem = $(`div[data-x="${ this.x }"][data-y="${ this.y }"]`);
        if ($elem.length) return $elem.position();
        return null;
    }
}

export default Waypoint;