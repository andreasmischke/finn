import Scene from './Scene';

export default class OfficeGameScene extends Scene {

    render(scene) {
        scene.style.backgroundImage = "url(img/officegame_bg2.jpg)";

        var shelf1 = document.createElement("div");
        shelf1.classList.add('shelf1');
        scene.appendChild(shelf1);
    }

    cleanup(scene) {
        scene.style.backgroundImage = "";
    }
}
