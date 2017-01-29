import {create_element} from '../utils';
import scene_manager from './scene_manager';
import Scene from './Scene';
import Dialog from './Dialog';

export default class PapaScene extends Scene {

    constructor(part) {
        super();
        this.part = part || 'in';
    }

    render(scene) {
        this.scene = scene;
        scene.classList.add('papa');

        if(this.part == 'in') {
            this.create_in_dialog();
            this.set_background('01');
        } else {
            this.create_out_dialog();
            this.set_background('03');
        }

        window.scene = this;
    }

    dialog_init() {
        this.dialog = new Dialog();
        this.scene.appendChild(this.dialog.add_bubble("papa"));
        this.scene.appendChild(this.dialog.add_bubble("finn"));
        return this.dialog;
    }

    create_in_dialog() {
        this.dialog_init()
            .let('finn')
            .say('Hallo Papa!')
            .wait(3000)

            .let('papa')
            .say('Hallo Finn, du kommst gerade richtig! Ich hab hier wieder '
                    + 'ein paar Ordner, die einsortiert werden müssen. Das '
                    + 'machst du doch so gerne, oder?')
            .wait(9000)

            .let('finn')
            .say('Ja, das kann ich gut!')
            .wait(3000)

            .play();
    }

    create_out_dialog() {
        const self = this;

        self.dialog_init()
            .let('finn')
            .say('Jetzt ist alles wieder aufgeräumt!')
            .wait(3000)

            .let('papa')
            .say('Danke Finn, das sieht super aus!')
            .wait(3000)

            .let('finn')
            .say('Du Papa… Lucy ist schon wieder weg. Hast du eine Idee, '
                    + 'wo sie sein könnte?')
            .wait(5000)

            .let('papa')
            .say('Hm… Das letzte Mal, als wir Lucy suchen mussten, war sie '
                    + 'drüben auf Karls Hühnerhof. Hast du dort schon gesucht?')
            .wait(6000)

            .let('finn')
            .say('Das ist eine gute Idee, da war ich noch nicht.')
            .wait(4000)

            .let('papa')
            .say('Dann lauf mal schnell hin, wir sehen uns heute Abend!')
            .wait(4000)

            .let('finn')
            .say('Okay, tschüss!')
            .wait(2000)

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
