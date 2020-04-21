import Map from "./map";
import * as $ from "jquery";

class Scene {
    private map: Map;

    constructor() {
        debugger
        this.map = new Map(1);

        $(document).ready(() => {
            this.start();
        });
    }

    start() {
        this.map.draw();
    }
}

new Scene();