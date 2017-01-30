import interact from 'interactjs';
import {range, to_array, shuffle, create_element} from '../utils';
import Scene from './Scene';

export default class ShopGameScene extends Scene {

    render(scene) {

        this.scene = scene;
        scene.classList.add('shop_game');

        scene.appendChild(this.create_message_box());
        scene.appendChild(this.create_scale());

        scene.appendChild(this.create_source());
        scene.appendChild(this.create_finish_button());

        this.shuffle_problems();
        this.next_problem();

        this.freeze = false;
    }

    shuffle_problems() {
        const items = ["apple", "milk", "butter"];

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
            }
            this.problem = this.problems.pop();
            this.source.classList.add('item_' + this.problem.item);
            this.source.appendChild(this.create_item(this.problem.item));
            this.reset_dishes(this.problem.sum, this.problem.less, this.problem.item);
            return true;
        } else {
            this.problem = undefined;

            if(this.story) {
                this.finish_timeout = setTimeout(x => this.story.next(), 1000);
            } else {
                this.show_message("Sehr gut! Du hast alle Aufgaben gelöst!");
            }

            return false;
        }
    }

    create_message_box() {
        const box = create_element('div')
                .class('message_box')
                .render();
        this.message_box = box;
        return box;
    }

    show_message(message) {
        const box = this.message_box;
        box.textContent = message;
        box.classList.add('active');
        clearTimeout(this.message_box_timeout);
        this.message_box_timeout = setTimeout(function() {
            box.classList.remove('active');
        }, 3000);
    }

    check_finish() {
        const self = this,
            {sum} = self.problem,
            right_count = self.right_dish.childElementCount;

        if(sum == right_count) {
            self.freeze = true;
            self.show_message("Richtig!");
            setTimeout(function() { 
                if(self.next_problem()) {
                    self.freeze = false;
                }
            }, 3000);
        } else {
            self.show_message("Leider falsch. Schau nochmal genau hin!");
        }
    }

    create_scale() {
        const self = this,
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

        interact(self.right_dish).dropzone({
            ondragenter: function(e) {
                if(self.freeze) {
                    return;
                }
                e.target.classList.add('drop-target');
            },
            ondragleave: function(e) {
                if(self.freeze) {
                    return;
                }
                e.target.classList.remove('drop-target');
            },
            ondropdeactivate: function(e) {
                if(self.freeze) {
                    return;
                }
                e.target.classList.remove('drop-target');
            }
        });

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

    reset_dishes(left_count, right_count, item_type) {
        const self = this;

        while(self.left_dish.firstChild) {
            self.left_dish.removeChild(self.left_dish.firstChild);
        }
        while(self.right_dish.firstChild) {
            self.right_dish.removeChild(self.right_dish.firstChild);
        }

        range(left_count).forEach(function(i) {
            self.left_dish.appendChild(self.create_item(item_type, true));
        });

        range(right_count).forEach(function(i) {
            self.right_dish.appendChild(self.create_item(item_type));
        });
    }

    create_source() {
        this.source = create_element('div')
                    .class('source')
                    .class('item')
                    .attr('data-type', 'source')
                    .render();
        return this.source;
    }

    create_item(type, fixed) {
        const self = this,
            item = create_element('div')
                .class('item')
                .class('item_' + type)
                .attr('data-type', type)
                .render();

        !fixed && interact(item).draggable({
            onstart: function(e) {
                if(self.freeze) {
                    return;
                }
            },
            onmove: function(e) {
                if(self.freeze) {
                    return;
                }
                const target = e.target,
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
                const item = e.target,
                      dish = e.interaction.dropElement,
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
                    const new_item = self.create_item(
                            item.getAttribute('data-type'));
                    self.source.appendChild(new_item);
                }
            }
        }).styleCursor(false);

        return item;
    }

    create_finish_button() {
        return create_element('button')
                    .class('finish_button')
                    .text("Wiegen!")
                    .click(this.check_finish.bind(this))
                    .render();
    }

    cleanup(scene) {
        this.problem = undefined;
    }
}
