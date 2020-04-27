"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Engine {
    static calcDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    }
    static moveMonster(monster, map) {
        let distance = +Infinity, monsterPosition = monster.getPosition(), monsterX = monsterPosition.left, monsterY = monsterPosition.top, $monster = monster.getElement(), moveTo = { x: 0, y: 0 }, closerWaypoint = null, wayPoints = map.getWayPoints(), targetWaypoints = wayPoints.filter(t => monster.getWalkedWaypoints()
            .map(u => u.getId())
            .indexOf(t.getId()) === -1);
        targetWaypoints.forEach((t) => {
            let wayPointPosition = t.getPosition(), wayPointX = wayPointPosition.left, wayPointY = wayPointPosition.top, calc = this.calcDistance(monsterX, monsterY, wayPointX, wayPointY);
            if (calc < distance) {
                distance = calc;
                moveTo.x = wayPointX;
                moveTo.y = wayPointY;
                closerWaypoint = t;
            }
        });
        monster.addWalkedWaypoint(closerWaypoint);
        $monster.animate({
            top: moveTo.y + 10,
            left: moveTo.x + 10
        }, monster.getSpeed() * 2000);
    }
    static createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
exports.default = Engine;
//# sourceMappingURL=engine.js.map