import Monster from "./monster";
import Map from "./map";
import _ from "underscore";

class Engine {
    static moveMonster(monster: Monster, map: Map) {
        let $monster = monster.getElement(),
            wayPoints = map.getPath(),
            targetWaypoints = wayPoints.filter(t => monster.getWalkedWaypoints()
                                                           .map(u => u.getId())
                                                           .indexOf(t.getId()) === -1);


        let walkTo = _.first(targetWaypoints);
        monster.addWalkedWaypoint(walkTo);

        $monster.animate({
            top: walkTo.getPosition().top + 10,
            left: walkTo.getPosition().left + 10
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