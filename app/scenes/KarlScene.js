import {create_element} from '../utils';
import Scene from './Scene';
import Dialog from './Dialog';

export default class KarlScene extends Scene {

    constructor(part) {
        super();
        this.part = part || 'in';
    }

    render(scene) {
        this.scene = scene;
        scene.classList.add('karl');

        if(this.part == 'in') {
            this.create_in_dialog();
        } else {
            this.create_out_dialog();
        }

        this.dialog.play();
    }

    dialog_init() {
        this.dialog = new Dialog();
        this.scene.appendChild(this.dialog.add_bubble("karl"));
        this.scene.appendChild(this.dialog.add_bubble("finn"));
        return this.dialog;
    }

    create_in_dialog() {
        this.dialog_init()
            .let('karl')
            .say('Hallo Finn! Na, magst du mir wieder beim Eier einpacken '
                    + 'helfen?')
            .wait(6000)

            .let('finn')
            .say('Hallo Karl! Sehr gerne!')
            .wait(3000)

            .do(x => this.story && this.story.next());
    }

    create_out_dialog() {
        this.dialog_init()
            .let('karl')
            .say('Gute Arbeit, Finn! Dann kann ich morgen früh direkt auf den '
                    + 'Markt fahren und die Eier verkaufen!')
            .wait(6000)

            .let('finn')
            .say('Danke, das hab ich gern gemacht! Sag mal Karl, hast du '
                    + 'vielleicht Lucy gesehen?')
            .wait(5000)

            .let('karl')
            .say('Lass mal überlegen…')
            .wait(3000)

            .let('karl')
            .say('Nein, aber ich war auch den ganzen Tag mit dem Traktor '
                    + 'auf dem Feld. Aber sieh doch mal in der Scheune nach. '
                    + 'Da war sie ja schon öfters.')
            .wait(7500)

            .do(x => this.story && this.story.next());
    }

    cleanup(scene) {
        this.dialog && this.dialog.stop();
    }
}
