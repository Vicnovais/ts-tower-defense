import Colors from "./colors"
import $ from "jquery";
import _ from "underscore";
import Projectile from "./projectile";
import Monster from "./monster";

class Tower {
    public readonly color: Colors
    private readonly posX: number
    private readonly posY: number
    private readonly attack: number
    public monsters: Monster[];
    
    constructor(color: Colors, posX: number, posY: number) {
        this.color = color;
        this.posX = posX;
        this.posY = posY;
        this.monsters = [];
        this.shoot();
    }

    addMonsters(monsters: Monster[]) {
        this.monsters = this.monsters.concat(monsters);
    }

    getTowerTile() {
        return $(`div[data-x='${ this.posX }'][data-y='${ this.posY }']`);
    }

    private shoot() {
        setInterval(() => {
            var projectile = new Projectile(this, this.getTarget());
            projectile.shoot();
        }, 200);
    }

    private getTarget(): Monster {
        return _.first(this.monsters);
    }
};

export default Tower;