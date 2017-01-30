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
            this.set_background('01');
        } else if(this.parte == 'mid') {
            this.create_mid_dialog();
            this.set_background('02');
        } else {
            this.create_out_dialog();
            this.set_background('03');
        }

        window.scene = this;
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
            .wait(60000)

            .let('finn')
            .say('Hallo Karl! Sehr gerne!')
            .wait(2000)

            .play();
    }

    create_mid_dialog() {
        const self = this;

        self.dialog_init()
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
            .wait(6000)

            .play();
    }

    create_out_dialog() {
        const self = this;

        self.dialog_init()
            .let('finn')
            .say('Schau mal, Karl! ich habe Lucy wieder gefunden!')
            .wait(4000)

            .let('karl')
            .say('Das freut mich! Ich hab mir doch gleich gedacht, dass sie '
                    + 'sich wieder in der Scheune versteckt haben wird!')
            .wait(6000)

            .let('finn')
            .say('Danke, dass du mir geholfen hast! Wenn du Lust hast, komm '
                    + 'mich wieder besuchen und wir können wieder Emma im '
                    + 'Laden helfen oder Papas Ordner einsortieren!')
            .wait(10000)

            .play();
    }

    set_background(number) {
        this.scene.style.setProperty('background-image',
                                     `url(img/papa_scene_${number}.png)`);
    }

    cleanup(scene) {
        this.dialog && this.dialog.stop().rewind();
    }
}
