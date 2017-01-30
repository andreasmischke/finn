import {create_element} from '../utils';
import Scene from './Scene';
import Dialog from './Dialog';

export default class EmilScene extends Scene {

    constructor(part) {
        super();
        this.part = part || 'in';
    }

    render(scene) {
        this.scene = scene;
        scene.classList.add('emil');

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
        this.scene.appendChild(this.dialog.add_bubble("emil"));
        this.scene.appendChild(this.dialog.add_bubble("finn"));
        return this.dialog;
    }

    create_in_dialog() {
        const self = this;

        self.dialog_init()
            .let("finn")
            .say("Hallo Emil! Was machst du da?")
            .wait(3000)

            .let("emil")
            .say("Hallo Finn! Ich baue mir ein Baumhaus. Der Boden ist schon fertig!")
            .wait(4000)

            .let("finn")
            .say("Wow, das sieht schon gut aus! Sag mal, hast du Lucy gesehen?")
            .wait(4000)

            .let("emil")
            .say("Nein, heute noch nicht. Ist sie denn weg?")
            .wait(3000)

            .let("finn")
            .say("Ja, ich war vorhin mit ihr im Garten und während ich kurz im Haus war, ist sie verschwunden.")
            .wait(5000)

            .let("emil")
            .say("Oh nein, hoffentlich findest du sie bald wieder. In meinem Werkzeugkoffer ist eine "
                     + "Taschenlampe. Ich leihe sie dir gerne aus, dann kannst du Lucy auch finden, wenn sie "
                     + "sich irgendwo versteckt hat.")
            .wait(10000)

            .do(function() { self.set_background('02'); })
            .wait(1000)

            .let("finn")
            .say("Vielen Dank, ich werde gut darauf aufpassen!")
            .wait(3000)

            .let("emil")
            .say("Finn, kannst du mir kurz helfen? Ich muss "
                     + "diese Bretter festnageln, aber die Nägel sind "
                     + "in meinem Werkzeugkoffer. Kannst du sie "
                     + "mir geben?")
            .wait(7000)

            .let("finn")
            .say("Klar, ich helfe dir gerne! Wieviele Nägel "
                     + "brauchst du?")
            .wait(4000)

            .play();
    }

    create_out_dialog() {
        this.dialog_init()
            .let("emil")
            .say("Super, vielen Dank! Du warst mir eine große Hilfe!")
            .wait(3500)

            .let("finn")
            .say("Gern geschehen! Ich muss jetzt weiter, damit "
                         + "ich Lucy bald wieder finde!")
            .wait(4000)

            .let("emil")
            .say("Okay, viel Glück!")
            .wait(2500)

            .play();
    }

    set_background(number) {
        this.scene.style.setProperty('background-image', 
                                     `url(img/emil_scene_${number}.png)`);
    }

    cleanup(scene) {
        this.dialog.stop().rewind();
    }
}
