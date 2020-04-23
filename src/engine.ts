import Monster from "./monster";
import Waypoint from "./waypoint";

class Engine {
    private static calcDistance(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    static moveMonster(monster: Monster, wayPoints: Waypoint[]) {
        let distance = +Infinity,
            monsterPosition = monster.getPosition(),
            monsterX = monsterPosition.left,
            monsterY = monsterPosition.top,
            $monster = monster.getElement(),
            moveTo = { x: 0, y: 0 };

        wayPoints.forEach((t) => {
            let wayPointPosition = t.getPosition(),
                wayPointX = wayPointPosition.left,
                wayPointY = wayPointPosition.top,
                calc = this.calcDistance(monsterX, monsterY, wayPointX, wayPointY);

            if (calc < distance) {
                distance = calc;
                moveTo.x = wayPointX;
                moveTo.y = wayPointY;
            }
        });

        $monster.animate({ 
            top: moveTo.y + 10,
            left: moveTo.x + 10
        }, monster.getSpeed() * 2000);
    }

    static createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    }
}

export default Engine;