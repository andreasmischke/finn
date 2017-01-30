export default class Story {
    constructor() {
        this.scenes = [];
    }

    add(scene) {
        this.scenes.push(scene);
        return this;
    }
}
