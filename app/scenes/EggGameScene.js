import interact from 'interactjs';
import {range, to_array, shuffle, create_element} from '../utils';
import Scene from './Scene';

export default class EggGameScene extends Scene {

    render(scene) {

        scene.classList.add('egg_game');
        scene.appendChild(this.create_message_box());

        scene.appendChild(this.create_egg_box());

        const brown_source = this.create_egg_source('brown');
        this.create_egg(brown_source);
        scene.appendChild(brown_source);

        const white_source = this.create_egg_source('white');
        this.create_egg(white_source);
        scene.appendChild(white_source);

        this.shuffle_problems();
        this.next_problem();

    }

    shuffle_problems() {
        this.problems = shuffle(range(7));
    }

    next_problem(problem) {
        if(this.problems.length > 0) {
            const summand1 = this.problems.pop(),
                  summand2 = 6 - summand1;
            this.problem = [summand1, summand2];
            this.problem_field.textContent = `${summand1} + ${summand2} = 6`;
            return true;
        } else {
            this.problem = undefined;
            this.problem_field.textContent = "";
            this.show_message("Sehr gut! Du hast alle Aufgaben gelöst!");
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
              [a, b] = self.problem,
              {brown, white} = self.dimples.reduce(function(acc, dimple) {
                  if(dimple.childElementCount > 0) {
                      acc[dimple.firstChild.getAttribute('data-color')] += 1;
                  }
                  return acc;
              }, {white: 0, brown: 0});

        if(brown + white >= 6) {
            if(a == brown && b == white || a == white && b == brown) {
                self.freeze = true;
                self.show_message("Richtig!");
                setTimeout(function() { 
                    self.clear_dimples();
                    if(self.next_problem()) {
                        self.freeze = false;
                    }
                }, 3000);
            } else {
                self.show_message("Leider falsch. Schau nochmal genau hin!");
            }
        }
    }

    create_egg_box() {
        const self = this,
              box = create_element('div')
                .class('egg_box')
                .adopt(this.create_problem_field());

        this.dimples = [];
        range(6).forEach(function(i) {
            const dimple = self.create_dimple(i);
            box.adopt(dimple);
            self.dimples.push(dimple);
        });

        return box.render();
    }

    clear_dimples() {
        this.dimples.forEach(d => d.removeChild(d.firstChild));
    }

    create_problem_field() {
        this.problem_field = create_element('div')
                .class('problem_field')
                .render();
        return this.problem_field;
    }

    create_dimple(i) {
        const self = this,
              dimple = create_element('div')
                .class('egg_dimple')
                .class('egg_dimple_' + i)
                .render();

        interact(dimple).dropzone({
            overlap: 0.25,
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
        return dimple;
    }

    create_egg_source(color) {
        return create_element('div')
                .class('egg_source')
                .class('egg_source_' + color)
                .class('egg')
                .class(color + '_egg')
                .attr('data-color', color)
                .render()
    }

    create_egg(source) {
        const self = this,
              color = source.getAttribute('data-color'),
              egg = create_element('div')
                .class('egg')
                .class('egg_draggable')
                .class(color + '_egg')
                .attr('data-color', color)
                .render();

        interact(egg).draggable({
            onstart: function(e) {
                if(self.freeze) {
                    return;
                }
                e.target.classList.remove('egg_in_box');
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
                const egg = e.target,
                      dimple = e.interaction.dropElement;

                if(dimple == null) {
                    egg.parentNode.removeChild(egg);
                } else {
                    egg.removeAttribute('data-x');
                    egg.removeAttribute('data-y');
                    egg.style.removeProperty('transform');
                    egg.classList.add('egg_in_box')

                    to_array(dimple.childNodes).forEach(function(egg) {
                        dimple.removeChild(egg);
                    });
                    dimple.appendChild(egg);
                }

                self.create_egg(source);
                self.check_finish();
            }
        }).styleCursor(false);

        source.appendChild(egg);
    }

    cleanup(scene) {
    }
}
