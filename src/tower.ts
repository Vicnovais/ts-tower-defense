import Colors from "./colors"

class Tower {
    private readonly color: Colors
    private readonly attack: number
    
    constructor(color: Colors, attack: number) {
        this.color = color;
        this.attack = attack;
    }

    draw() {
        return `<div class="tower" style="background-color: ${ this.color }"></div>`;
    }
};

export default Tower;