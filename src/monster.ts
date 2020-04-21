class Monster {
    private hp: number;
    private speed: number;
    private armor: number;

    constructor(hp: number, speed: number, armor: number) {
        this.hp = hp;
        this.speed = speed;
        this.armor = armor
    }

    setHpFactor(factor: number) {
        this.hp *= factor;
    }

    setArmorFactor(factor: number) {
        this.armor *= factor;
    }

    setSpeedFactor(factor: number) {
        this.speed *= factor;
    }

    draw() {
        return `<div class="monster"></div>`;
    }
}

export default Monster;