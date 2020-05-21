import $ from "jquery";
import _ from "underscore";
import Map from "./map";

class EventController {
    private map: Map;
    private draggedElement: JQuery<HTMLElement>;

    constructor(map: Map) {
        this.map = map;
    }

    public attachDragEvents() {
        $(".tile.empty").on("drop", (e) => {
            this.onDrop(e);
        });

        $(".tower").on("dragstart", (e) => {
            this.onDragStart(e);
        });

        $(".tile.empty").on("dragover", (e) => {
            this.onDragOver(e);
        });

        $(".tile.empty").on("dragleave", (e) => {
            this.onDragLeave(e);
        });
    }

    private onDrop(e: JQuery.DropEvent) {
        e.preventDefault();
        e.stopPropagation();

        let dataTransfer = e.originalEvent.dataTransfer,
            towerType = dataTransfer.getData("towerType"),
            square = $(e.currentTarget),
            dataX = Number(square.attr("data-x")),
            dataY = Number(square.attr("data-y"));

        this.map.addTower(towerType, dataX, dataY);
        square.css("opacity", 1);
        square.css("backgroundColor", towerType);
        square.off("drop");
        square.off("dragover");
        square.off("dragleave");
    }

    private onDragStart(e: JQuery.DragStartEvent) {
        let dataTransfer = e.originalEvent.dataTransfer,
            target = $(e.currentTarget),
            towerType = target.css("background-color");

        this.draggedElement = target;
        dataTransfer.setData("towerType", towerType);
    }

    private onDragOver(e: JQuery.DragOverEvent) {
        e.preventDefault();  
        e.stopPropagation();

        if (this.draggedElement) {
            let towerType = this.draggedElement.css("background-color"),
                square = $(e.currentTarget);
        
            square.css("opacity", 0.5);
            square.css("backgroundColor", towerType);
        }
    }

    private onDragLeave(e: JQuery.DragLeaveEvent) {
        e.preventDefault();  
        e.stopPropagation();

        let square = $(e.currentTarget);
        square.css("opacity", 1);
        square.css("backgroundColor", "transparent");
    }

    public dispose() {
        $(".tile.empty").off("drop");
        $(".tower").off("dragstart");
        $(".tile.empty").off("dragover");
        $(".tile.empty").off("dragleave");
    }
}

export default EventController;