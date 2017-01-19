import Scene from './Scene';

export default class MainMenuScene extends Scene {

    render(scene) {
        scene.textContent = "This is the main menu";
    }

    cleanup(scene) {
        scene.textContent = "";
    }
}
