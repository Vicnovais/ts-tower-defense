import $ from "jquery";

class EventController {
    static draggedElement: JQuery<HTMLElement>;

    static attachDragEvents() {
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

    private static onDrop(e: JQuery.DropEvent) {
        e.preventDefault();
        e.stopPropagation();

        let dataTransfer = e.originalEvent.dataTransfer,
            towerType = dataTransfer.getData("towerType"),
            square = $(e.currentTarget),
            dataX = square.attr("data-x"),
            dataY = square.attr("data-y");

        //this.mapController.map.schema[dataX][dataY] = this.mapController.getTileType(TOWER);
        //this.towerController.addTower({ x: dataX, y: dataY }, towerType);
        square.css("opacity", 1);
        square.css("backgroundColor", towerType);
        //square.addClass(TOWER.toLowerCase());
        square.off("drop");
        square.off("dragover");
        square.off("dragleave");
    }

    private static onDragStart(e: JQuery.DragStartEvent) {
        let dataTransfer = e.originalEvent.dataTransfer,
            target = $(e.currentTarget),
            towerType = "red"
            //towerType = target.attr("data-kind");
            //towerCost = this.towerController.getTowerCost(towerType);

        // if (currentGold < towerCost) {
        //     e.stopPropagation();
        //     e.preventDefault();
        // }
        // else {
            this.draggedElement = target;
            dataTransfer.setData("towerType", towerType);
        //}
    }

    private static onDragOver(e: JQuery.DragOverEvent) {
        e.preventDefault();  
        e.stopPropagation();

        if (this.draggedElement) {
            let towerType = "red",
                square = $(e.currentTarget);
        
            square.css("opacity", 0.5);
            square.css("backgroundColor", towerType);
        }
    }

    private static onDragLeave(e: JQuery.DragLeaveEvent) {
        e.preventDefault();  
        e.stopPropagation();

        let square = $(e.currentTarget);
        square.css("opacity", 1);
        square.css("backgroundColor", "transparent");
    }

    static dispose() {
        $(".tile.empty").off("drop");
        $(".tower").off("dragstart");
        $(".tile.empty").off("dragover");
        $(".tile.empty").off("dragleave");
    }
}

export default EventController;