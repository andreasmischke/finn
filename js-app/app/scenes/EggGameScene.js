import interact from 'interactjs';
import {range, to_array, create_element} from '../utils';
import Scene from './Scene';

export default class EggGameScene extends Scene {

    render(scene) {

        scene.appendChild(this.create_egg_box());

        let brown_source = this.create_egg_source('brown');
        this.create_egg(brown_source);
        scene.appendChild(brown_source);

        let white_source = this.create_egg_source('white');
        this.create_egg(white_source);
        scene.appendChild(white_source);

        this.set_problem("2 + ? = 6");

    }

    set_problem(problem) {
        this.problem_field.textContent = problem;
    }

    check_finish() {
        let {brown, white} = this.dimples.reduce(function(acc, dimple) {
            if(dimple.childElementCount > 0) {
                acc[dimple.firstChild.getAttribute('data-color')] += 1;
            }
            return acc;
        }, {white: 0, brown: 0});

        if(brown + white >= 6) {
            setTimeout(_ => alert(`Voll! ${brown} braune und ${white} weiße!`), 0);
        }
    }

    create_egg_box() {
        let self = this,
            box = create_element('div')
                .class('egg_box')
                .adopt(this.create_problem_field());

        this.dimples = [];
        range(6).forEach(function(i) {
            let dimple = self.create_dimple(i);
            box.adopt(dimple);
            self.dimples.push(dimple);
        });

        return box.render();
    }

    create_problem_field() {
        this.problem_field = create_element('div')
                .class('problem_field')
                .render();
        return this.problem_field;
    }

    create_dimple(i) {
        let dimple = create_element('div')
                .class('egg_dimple')
                .class('egg_dimple_' + i)
                .render();

        interact(dimple).dropzone({
            overlap: 0.25,
            ondragenter: function(e) {
                e.target.classList.add('drop-target');
            },
            ondragleave: function(e) {
                e.target.classList.remove('drop-target');
            },
            ondropdeactivate: function(e) {
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
        let self = this,
            color = source.getAttribute('data-color'),
            egg = create_element('div')
                .class('egg')
                .class('egg_draggable')
                .class(color + '_egg')
                .attr('data-color', color)
                .render();

        interact(egg).draggable({
            inertia: true,
            onstart: function(e) {
                e.target.classList.remove('egg_in_box');
            },
            onmove: function(e) {
                let target = e.target,
                    x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx,
                    y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            onend: function(e) {
                let egg = e.target,
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
