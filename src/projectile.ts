import Tower from "./tower";
import Monster from "./monster";
import $ from "jquery";

class Projectile {
    private readonly sourceTower: Tower;
    private readonly targetMonster: Monster;
    private $element: JQuery<HTMLElement>;

    constructor(tower: Tower, monster: Monster) {
        this.sourceTower = tower;
        this.targetMonster = monster;
    }

    private draw() {
        return `<div class="projectile"></div>`
    }

    shoot() {
        let $tile = this.sourceTower.getTowerTile(),
            tilePosition = $tile.offset(),
            tileCenter = { x: tilePosition.left + 20, y: tilePosition.top + 20 },
            $projectile = $(this.draw()),
            $monster = this.targetMonster.getElement(),
            monsterPosition = $monster.offset(),
            monsterCenter = { x: monsterPosition.left + 10, y: monsterPosition.top + 10 };

        this.$element = $projectile;
        $("#app").append($projectile);
        $projectile
            .css("top", tileCenter.y)
            .css("left", tileCenter.x)
            .css("background-color", this.sourceTower.rgbColor)
            .show();
        $projectile.animate({
            top: monsterCenter.y,
            left: monsterCenter.x
        }, 100, "swing", this.onCollide.bind(this));
    }

    private onCollide() {
        this.$element.remove();
        this.targetMonster.hit(this.sourceTower.attack);
    }
}

export default Projectile;