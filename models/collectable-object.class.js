class CollectableObejct extends MoveableObject {
    height = 100
    width = 100

    constructor(x) {
        super();
        this.x = x + Math.random() * 70;
        this.y = 120 + Math.random() * 170;
    }
}
