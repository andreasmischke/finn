import {create_element} from '../utils';
import scene_manager from './scene_manager';
import Scene from './Scene';
import Dialog from './Dialog';

export default class PrefaceScene extends Scene {

    render(scene) {
        this.scene = scene;
        scene.classList.add('preface');

        this.create_in_dialog();
        this.set_background('01');
        window.scene = this;
    }

    create_in_dialog() {
        this.dialog = new Dialog();
        this.scene.appendChild(this.dialog.add_bubble("finn"));
        this.scene.appendChild(this.dialog.add_bubble("narrator"));
        this.dialog
            .let('narrator')
            .say('Hallo Finn, was ist denn los? Warum bist du so traurig?')
            .wait(60000)

            .let('finn')
            .say('Ich finde meine Katze Lucy nicht mehr. '
                    + 'Ich habe mit ihr im Garten gespielt. Dann bin ich kurz '
                    + 'ins Haus gegangen, um etwas zu trinken zu holen und '
                    + 'als ich wieder in den Garten kam, war sie weg.')
            .wait(60000)

            .let('narrator')
            .say('Oh, das ist schade. Hast du sie denn schon gesucht?')
            .wait(60000)

            .let('finn')
            .say('Nein, alleine schaffe ich das nicht.')
            .wait(60000)

            .let('narrator')
            .say('Das ist kein Problem. Ich hätte hier jemanden, der dir '
                    + 'sicher gerne hilft')
            .wait(60000)

            .let('finn')
            .say('Wirklich? Würdest du mir bei der Suche helfen? '
                    + 'Das wäre super! Ich hole nur kurz meine Tasche '
                    + 'und dann können wir los!')
            .wait(60000)

            .do(function() { })
            .wait(3000)

            .let('finn')
            .say('Am besten gehen wir zuerst zu meinem Freund Emil, '
                    + 'vielleicht hat er sie gesehen.')
            .wait(60000)

            .play();
    }

    set_background(number) {
        this.scene.style.setProperty('background-image',
                                     `url(img/preface_scene_${number}.png)`);
    }

    cleanup(scene) {
        this.dialog && this.dialog.stop().rewind();
    }
}
