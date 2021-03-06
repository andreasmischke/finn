import {create_element} from '../utils';
import Scene from './Scene';
import Dialog from './Dialog';

export default class EmmaScene extends Scene {

    constructor(part) {
        super();
        this.part = part || 'in';
    }

    render(scene) {
        this.scene = scene;
        scene.classList.add('emma');

        if(this.part == 'in') {
            this.create_in_dialog();
        } else {
            this.create_out_dialog();
        }

        this.dialog.play();
        this.dialog.stop();
    }

    dialog_init() {
        this.dialog = new Dialog();
        this.scene.appendChild(this.dialog.add_bubble("emma"));
        this.scene.appendChild(this.dialog.add_bubble("finn"));
        return this.dialog;
    }

    create_in_dialog() {
        this.dialog_init()
            .let('emma')
            .say('Hallo Finn! Das ist aber schön, dass du vorbeischaust! '
                    + 'Möchtest du mir beim Wiegen helfen?')
            .wait(6000)

            .let('finn')
            .say('Oh ja, das mach ich gerne!')
            .wait(3000)

            .do(x => this.story && this.story.next());
    }

    create_out_dialog() {
        const hud = require('../hud');
        this.dialog_init()
            .let('emma')
            .say('Vielen Dank, Finn! Das hast du super gemacht!')
            .wait(3000)

            .let('finn')
            .say('Danke, es hat mir viel Spaß gemacht! Jetzt muss ich aber weiter. '
                    + 'Ich bin auf der Suche nach Lucy, sie ist mir weggelaufen.')
            .wait(8000)

            .let('emma')
            .say('Hier, ich gebe dir noch ein paar Katzenleckerlis mit, '
                    + 'dann kannst du Lucy aus ihrem Versteck locken. '
                    + 'Viel Glück bei deiner Suche!')
            .wait(8000)

            .do(hud.add_catfood.bind(hud))
            .wait(1000)

            .let('finn')
            .say('Danke!')
            .wait(2000)

            .do(x => this.story && this.story.next());
    }

    cleanup(scene) {
        this.dialog && this.dialog.stop();
    }
}
