import {create_element} from '../utils';
import Scene from './Scene';
import Dialog from './Dialog';

export default class FinaleScene extends Scene {

    constructor(part) {
        super();
    }

    render(scene) {
        this.scene = scene;
        scene.classList.add('finale');

        this.create_dialog();

        this.dialog.play();
    }

    dialog_init() {
        this.dialog = new Dialog();
        this.scene.appendChild(this.dialog.add_bubble("finn"));
        return this.dialog;
    }

    create_dialog() {
        this.dialog_init()
            .let('finn')
            .say('Danke, dass du mir geholfen hast! Gemeinsam haben wir Lucy '
                    + 'wiedergefunden!')
            .wait(6000)

            .let('finn')
            .say('Wenn du Lust hast, komm mich wieder besuchen und wir '
                    + 'können wieder Emma im Laden helfen oder Papas Ordner '
                    + 'einsortieren!')
            .wait(9000)

            .do(x => this.story && this.story.next());
    }

    cleanup(scene) {
        this.dialog && this.dialog.stop();
    }
}
