import $ from "jquery";
import _ from "underscore";
import Projectile from "./projectile";
import Monster from "./monster";
import colors from "./colors";
import GameData from "./game.data.json";

class Tower {
    public readonly rgbColor: string
    private readonly posX: number
    private readonly posY: number
    public attack: number
    public monsters: Monster[];
    
    constructor(rgbColor: string, posX: number, posY: number) {
        this.rgbColor = rgbColor;
        this.posX = posX;
        this.posY = posY;
        this.monsters = [];
        this.setAttack();
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
        return _.first(this.monsters.filter(t => !t.isDead));
    }

    private setAttack() {
        let hexColor = this.rgb2hex(this.rgbColor),
            colorType = _.first(Object.keys(colors).filter(t => colors[t] === hexColor)),
            towerInfo = _.first(GameData.towers.filter(t => t.type === colorType.toLowerCase()));

        this.attack = towerInfo.atk;
    }

    private rgb2hex(rgb: string) {
        let match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),
            hex = (x: string) => { return ("0" + parseInt(x).toString(16)).slice(-2); };

        return "#" + hex(match[1]) + hex(match[2]) + hex(match[3]);
    }
};

export default Tower;