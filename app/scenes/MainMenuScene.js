import {create_element} from '../utils';
import scene_manager from './scene_manager';
import Scene from './Scene';

export default class MainMenuScene extends Scene {

    render(scene) {
        scene.classList.add('main_menu');
        scene.appendChild(this.create_menu_button('Eingangsszene', 'preface'));
        scene.appendChild(this.create_menu_button('Bei Emil', 'emil'));
        scene.appendChild(this.create_menu_button('TreeHouse Game', 'treehouse_game'));
        scene.appendChild(this.create_menu_button('Bei Emma', 'emma'));
        scene.appendChild(this.create_menu_button('Shop Game', 'shop_game'));
        scene.appendChild(this.create_menu_button('Bei Papa', 'papa'));
        scene.appendChild(this.create_menu_button('Office Game', 'office_game'));
        scene.appendChild(this.create_menu_button('Bei Karl', 'karl'));
        scene.appendChild(this.create_menu_button('Egg Game', 'egg_game'));
        scene.appendChild(this.create_button_placeholder('In der Scheune'));

    }

    create_button_placeholder(text) {
        return create_element('div')
            .class('button_placeholder')
            .text(text)
            .render();
    }

    create_menu_button(text, target) {
        return create_element('div')
            .class('menu_button')
            .click(e => scene_manager.navigate(target))
            .text(text)
            .render();
    }

    cleanup(scene) {
    }
}
