import {create_element} from '../utils';
import scene_manager from './scene_manager';
import Scene from './Scene';
import Dialog from './Dialog';

export default class EmilScene extends Scene {

    render(scene) {
        this.scene = scene;

        this.create_dialog();

        this.preload_images();
        this.set_background('01');

        window.scene = this;
    }

    create_dialog() {
        const dialog = new Dialog()
              self = this;

        this.dialog = dialog;
        this.scene.appendChild(dialog.add_bubble("emil"));
        this.scene.appendChild(dialog.add_bubble("finn"));
        dialog.add("finn", "Hallo Emil! Was machst du da?", 3000);
        dialog.add("emil", "Hallo Finn! Ich baue mir ein Baumhaus. "
                         + "Der Boden ist schon fertig!", 4000);
        dialog.add("finn", "Wow, das sieht schon gut aus! "
                         + "Sag mal, hast du Lucy gesehen?", 4000);
        dialog.add("emil", "Nein, heute noch nicht. Ist sie denn weg?", 3000);
        dialog.add("finn", "Ja, ich war vorhin mit ihr im Garten und "
                         + "während ich kurz im Haus war, ist sie "
                         + "verschwunden.", 5000);
        dialog.add("emil", "Oh nein, hoffentlich findest du sie bald "
                         + "wieder. In meinem Werkzeugkoffer ist eine "
                         + "Taschenlampe. Ich leihe sie dir gerne aus, "
                         + "dann kannst du Lucy auch finden, wenn sie "
                         + "sich irgendwo versteckt hat.", 10000);
        dialog.add(function() { self.set_background('02'); }, 1000);
        dialog.add("finn", "Vielen Dank, ich werde gut darauf aufpassen!", 3000);
        dialog.add("emil", "Finn, kannst du mir kurz helfen? Ich muss "
                         + "diese Bretter festnageln, aber die Nägel sind "
                         + "in meinem Werkzeugkoffer. Kannst du sie "
                         + "mir geben?", 7000);
        dialog.add("finn", "Klar, ich helfe dir gerne! Wieviele Nägel "
                         + "brauchst du?", 4000);
        dialog.add(function() { alert("An dieser Stelle kommt das Nägel-Suchspiel"); }, 0);
        dialog.add(function() { self.set_background('03'); }, 0);
        dialog.add("emil", "Super, vielen Dank! Du warst mir eine große Hilfe!", 3500);
        dialog.add("finn", "Gern geschehen! Ich muss jetzt weiter, damit "
                         + "ich Lucy bald wieder finde!", 4000);
        dialog.add("emil", "Okay, viel Glück!", 2500);
        dialog.play();
    }

    preload_images() {
        const self = this,
              images = [
                  'img/emil_scene_01.png',
                  'img/emil_scene_02.png',
                  'img/emil_scene_03.png'
              ];
        self.image_cache = [];

        setTimeout(function() {
            images.forEach(function(url) {
                const image = new Image();
                image.src = url;
                self.image_cache.push(image);
            });
        }, 0);
    }


    set_background(number) {
        this.scene.style.setProperty('background-image', 
                                     `url(img/emil_scene_${number}.png)`);
    }

    cleanup(scene) {
        console.info("doing cleanup")
        this.dialog.stop().rewind();
    }
}
