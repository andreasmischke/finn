import {create_element} from '../utils';
import Scene from './Scene';
import Dialog from './Dialog';

export default class PrefaceScene extends Scene {

    render(scene) {
        this.scene = scene;
        scene.classList.add('preface');

        this.create_dialog();

        this.dialog.play();
    }

    create_dialog() {
        const self = this;
        this.dialog = new Dialog();
        this.scene.appendChild(this.dialog.add_bubble("finn"));
        this.scene.appendChild(this.dialog.add_bubble("narrator"));
        this.dialog
            .do(function() {})
            .wait(1000)

            .let('narrator')
            .say('Hallo Finn, was ist denn los? Warum bist du so traurig?')
            .wait(5000)

            .let('finn')
            .say('Ich finde meine Katze Lucy nicht mehr. '
                    + 'Ich habe mit ihr im Garten gespielt. Dann bin ich kurz '
                    + 'ins Haus gegangen, um etwas zu trinken zu holen und '
                    + 'als ich wieder in den Garten kam, war sie weg.')
            .wait(11000)

            .let('narrator')
            .say('Oh, das ist schade. Hast du sie denn schon gesucht?')
            .wait(5000)

            .let('finn')
            .say('Nein, alleine schaffe ich das nicht.')
            .wait(4000)

            .let('narrator')
            .say('Das ist kein Problem. Ich hätte hier jemanden, der dir '
                    + 'sicher gerne hilft')
            .wait(6000)

            .let('finn')
            .say('Wirklich? Würdest du mir bei der Suche helfen? '
                    + 'Das wäre super! Ich hole nur kurz meine Tasche '
                    + 'und dann können wir los!')
            .wait(9000)

            .do(function() { })
            .wait(1500)

            .let('finn')
            .say('Am besten gehen wir zuerst zu meinem Freund Emil, '
                    + 'vielleicht hat er sie gesehen.')
            .wait(5000)

            .do(x => this.story && this.story.next());
    }

    cleanup(scene) {
        this.dialog && this.dialog.stop();
    }
}
