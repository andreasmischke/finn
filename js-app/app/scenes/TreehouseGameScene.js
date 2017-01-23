import interact from 'interactjs';
import {range, to_array, shuffle, create_element} from '../utils';
import Scene from './Scene';

export default class TreehouseGameScene extends Scene {

    render(scene) {

        this.scene = scene;

        scene.appendChild(this.create_message_box());
        scene.appendChild(this.create_problem_field());
        scene.appendChild(this.create_toolbox());

        scene.appendChild(this.create_sink());
        scene.appendChild(this.create_finish_button());

        this.shuffle_problems();
        this.next_problem();
    }

    shuffle_problems() {
        this.problems = shuffle(range(2, 11));
        console.log(this.problems);
    }

    next_problem(problem) {
        if(this.problems.length > 0) {
            this.problem = this.problems.pop();
            this.problem_field.textContent = `Suche ${this.problem} Nägel`;
            return true;
        } else {
            this.problem = undefined;
            this.problem_field.textContent = "";
            this.show_message("Sehr gut! Du hast alle Aufgaben gelöst!");
            return false;
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
            nail_count = self.sink.childElementCount;

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

    create_problem_field() {
        this.problem_field = create_element('div')
                .class('problem_field')
                .render();
        return this.problem_field;
    }

    create_toolbox() {
        let self = this,
            box = create_element('div').class('toolbox').render();

        interact(box).draggable({
            onstart: function(e) {
                if(self.freeze) {
                    return;
                }
                let nail = self.create_nail(),
                    parentOffset = e.target.getBoundingClientRect();

                e.interaction.nail = nail;
                e.target.appendChild(nail);

                let nailOffset = nail.getBoundingClientRect(),
                    left = e.x0 - parentOffset.x - nailOffset.width / 2,
                    top = e.y0 - parentOffset.y - nailOffset.height / 2;

                nail.style.setProperty("left", left + "px");
                nail.style.setProperty("top", top + "px");
            },
            onmove: function(e) {
                if(self.freeze) {
                    return;
                }
                let target = e.interaction.nail,
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
                let nail = e.interaction.nail,
                    sink = e.interaction.dropElement;

                if(sink == null) {
                    nail.parentElement.removeChild(nail);
                } else {
                    let sinkOffset = sink.getBoundingClientRect(),
                        nailOffset = nail.getBoundingClientRect(),
                        minLeft = sinkOffset.width * 0.02,
                        minTop = sinkOffset.height * 0.02,
                        maxLeft = (sinkOffset.width - nailOffset.width) * 0.98,
                        maxTop = (sinkOffset.height - nailOffset.height) * 0.98,
                        left = nailOffset.x - sinkOffset.x,
                        top = nailOffset.y - sinkOffset.y;

                    left = Math.max(minLeft, Math.min(left, maxLeft));
                    top = Math.max(minTop, Math.min(top, maxTop));

                    nail.removeAttribute('data-x');
                    nail.removeAttribute('data-y');
                    nail.style.removeProperty('transform');
                    nail.style.setProperty('left', left + "px");
                    nail.style.setProperty('top', top + "px");
                    sink.appendChild(nail);
                    self.make_nail_draggable(nail);
                }
            }
        }).styleCursor(false);

        return box;
    }

    create_nail() {
        return create_element('div').class('nail').render();
    }

    make_nail_draggable(nail) {
        interact(nail).draggable({
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
                let nail = e.target,
                    dropzone = e.interaction.dropElement;

                if(dropzone != null && dropzone.getAttribute('data-type') == 'sink') {
                    let sinkOffset = dropzone.getBoundingClientRect(),
                        nailOffset = nail.getBoundingClientRect(),
                        minLeft = sinkOffset.width * 0.02,
                        minTop = sinkOffset.height * 0.02,
                        maxLeft = (sinkOffset.width - nailOffset.width) * 0.98,
                        maxTop = (sinkOffset.height - nailOffset.height) * 0.98,
                        left = nailOffset.x - sinkOffset.x,
                        top = nailOffset.y - sinkOffset.y;

                    left = Math.max(minLeft, Math.min(left, maxLeft));
                    top = Math.max(minTop, Math.min(top, maxTop));

                    nail.removeAttribute('data-x');
                    nail.removeAttribute('data-y');
                    nail.style.removeProperty('transform');
                    nail.style.setProperty('left', left + "px");
                    nail.style.setProperty('top', top + "px");
                } else {
                    nail.parentElement.removeChild(nail);
                }
            }
        }).styleCursor(false);
    }

    create_sink() {
        let sink = create_element('div')
                    .class('sink')
                    .attr('data-type', 'sink')
                    .render();

        this.sink = sink;

        interact(sink).dropzone({});

        return sink;
    }

    clear_sink() {
        while(this.sink.firstChild) {
            this.sink.removeChild(this.sink.firstChild);
        }
    }

    create_finish_button() {
        return create_element('button')
                    .class('finish_button')
                    .text("Fertig, zählen!")
                    .click(this.check_finish.bind(this))
                    .render();
    }

    cleanup(scene) {
    }
}
