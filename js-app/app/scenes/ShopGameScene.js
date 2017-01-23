import interact from 'interactjs';
import {range, to_array, shuffle, create_element} from '../utils';
import Scene from './Scene';

export default class ShopGameScene extends Scene {

    render(scene) {

        this.scene = scene;

        scene.appendChild(this.create_message_box());
        scene.appendChild(this.create_scale());

        scene.appendChild(this.create_source());
        //scene.appendChild(this.create_finish_button());

        this.shuffle_problems();
        this.next_problem();
    }

    shuffle_problems() {
        let items = ["apple", "milk", "butter"];

        this.problems = shuffle(range(2, 11)).map(function(i) {
            return {
                sum: i,
                less: Math.floor(Math.random() * i),
                item: items[Math.floor(Math.random() * items.length)]
            }
        });
    }

    next_problem(problem) {
        if(this.problems.length > 0) {
            if(this.problem) {
                this.source.classList.remove('item_' + this.problem.item);
                this.source.removeChild(this.source.firstChild);
                this.empty_dishes();
            }
            this.problem = this.problems.pop();
            this.source.classList.add('item_' + this.problem.item);
            this.source.appendChild(this.create_item(this.problem.item));
        } else {
            this.problem = undefined;
            this.show_message("Sehr gut! Du hast alle Aufgaben gelöst!");
        }
    }

    create_message_box() {
        let box = create_element('div')
                .class('message_box')
                .render();
        this.message_box = box;
        return box;
    }

    show_message(message) {
        let box = this.message_box;
        box.textContent = message;
        box.classList.add('active');
        clearTimeout(this.message_box_timeout);
        this.message_box_timeout = setTimeout(function() {
            box.classList.remove('active');
        }, 3000);
    }

    check_finish() {
        let self = this,
            {sum, less} = this.problem;

        console.log(sum, less);
        return;

        if(nail_count == self.problem) {
            self.freeze = true;
            self.show_message("Richtig!");
            setTimeout(function() { 
                self.clear_sink();
                if(self.next_problem()) {
                    self.freeze = false;
                }
            }, 3000);
        } else {
            self.show_message("Leider falsch. Schau nochmal genau hin!");
        }
    }

    create_scale() {
        let self = this,
            scale = create_element('div').class('scale');

        self.left_dish = create_element('div')
                .class('dish')
                .class('dish_left')
                .attr('data-dish', 'left')
                .render();
        self.right_dish = create_element('div')
                .class('dish')
                .class('dish_right')
                .attr('data-dish', 'right')
                .render();

        interact('.dish').dropzone({});

        scale.adopt(create_element('div')
                .class('lever')
                .adopt(create_element('div')
                        .class('needle')
                        .render())
                .render());
        scale.adopt(create_element('div')
                .class('pillar')
                .render());
        scale.adopt(self.left_dish);
        scale.adopt(self.right_dish);

        return scale.render();
    }

    empty_dishes() {
        while(this.left_dish.firstChild) {
            this.left_dish.removeChild(this.left_dish.firstChild);
        }
        while(this.right_dish.firstChild) {
            this.right_dish.removeChild(this.right_dish.firstChild);
        }
    }

    create_source() {
        this.source = create_element('div')
                    .class('source')
                    .attr('data-type', 'source')
                    .render();
        return this.source;
    }

    create_item(type) {
        let self = this,
            item = create_element('div')
                .class('item')
                .class('item_' + type)
                .attr('data-type', type)
                .render();

        interact(item).draggable({
            onstart: function(e) {
                if(self.freeze) {
                    return;
                }
            },
            onmove: function(e) {
                if(self.freeze) {
                    return;
                }
                let target = e.target,
                    x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx,
                    y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            onend: function(e) {
                if(self.freeze) {
                    return;
                }
                let item = e.target,
                    dish = e.interaction.dropElement
                    parent = item.parentNode;

                if(dish == null) {
                    parent.removeChild(item);
                } else {
                    item.removeAttribute('data-x');
                    item.removeAttribute('data-y');
                    item.style.removeProperty('transform');

                    dish.appendChild(item);
                }

                if(parent.getAttribute('data-type', 'source')) {
                    let new_item = self.create_item(item.getAttribute('data-type'));
                    self.source.appendChild(new_item);
                }
                self.check_finish();
            }
        }).styleCursor(false);

        return item;
    }

    cleanup(scene) {
    }
}
