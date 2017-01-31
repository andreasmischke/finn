import {create_element} from '../utils';
import interact from 'interactjs';
import Dialog from './Dialog';
import Scene from './Scene';

export default class BarnScene extends Scene {

    render(scene) {
        this.scene = scene;

        scene.classList.add('barn');

        scene.appendChild(this.create_image());
        scene.appendChild(this.create_cat_target());

        this.create_dialog();

        this.dialog1.play();
    }

    create_dialog() {
        this.dialog1 = new Dialog();
        this.scene.appendChild(this.dialog1.add_bubble("finn1"));
        this.dialog1
            .do(function() {})
            .wait(1000)

            .let('finn1')
            .say('Oh, hier ist es aber ganz schön dunkel. Zum Glück hat '
                    + 'mir Emil die Taschenlampe geliehen.')
            .wait(6000)

            .do(this.switch_on_flashlight.bind(this))
            .wait(500)

            .let('finn1')
            .say('Schon besser. Mal sehen, ob wir Lucy jetzt finden können')
            .wait(3000);

        this.dialog2 = new Dialog();
        this.scene.appendChild(this.dialog2.add_bubble("finn2"));
        this.dialog2
            .let('finn2')
            .say('Da ist sie! Komm Lucy, komm raus, aus deinem Versteck!')
            .wait(4000)

            .do(x => this.story && this.story.next());
    }

    switch_on_flashlight() {
        this.scene.appendChild(this.create_light_handle());
        this.scene.appendChild(this.create_light());
    }

    create_cat_target() {
        this.cat_target = create_element('div')
            .class('cat_target')
            .render();
        return this.cat_target;
    }
    create_image() {
        return create_element('div')
            .class('image')
            .render();
    }

    create_light() {
        this.light = create_element('div')
            .class('light')
            .render();
        return this.light;
    }

    create_light_handle() {
        const light_handle = create_element('div')
            .class('light_handle')
            .render(),
              self = this;

        interact(light_handle).draggable({
            onmove: function(e) {
                if(self.freeze) {
                    return;
                }
                const light = self.light,
                      handle = light_handle,
                      x = (parseFloat(handle.getAttribute("data-x")) || 0) + e.dx,
                      y = (parseFloat(handle.getAttribute("data-y")) || 0) + e.dy;

                light.style.transform = `translate(${x}px, ${y}px)`;
                handle.style.transform = `translate(${x}px, ${y}px)`;
                handle.setAttribute('data-x', x);
                handle.setAttribute('data-y', y);
            },
            onend: function(e) {
                if(self.freeze) {
                    return;
                }
                const handle = e.target,
                      t = self.cat_target.getBoundingClientRect(),
                      h = handle.getBoundingClientRect(),
                      radius = h.width/2,
                      midx = radius + h.left,
                      midy = radius + h.top,
                      distanceX = Math.abs(midx - t.left),
                      distanceY = Math.abs(midy - t.top),
                      distance = Math.sqrt(Math.pow(distanceX, 2),
                                           Math.pow(distanceY, 2));

                if(distance < radius * 0.8) {
                    self.freeze = true;
                    self.dialog2.play();
                }
            }
        }).styleCursor(false);

        return light_handle;
    }

    cleanup(scene) {
        this.dialog1 && this.dialog1.stop();
        this.dialog2 && this.dialog2.stop();
    }
}
