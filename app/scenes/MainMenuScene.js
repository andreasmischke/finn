import {create_element} from '../utils';
import scene_manager from './scene_manager';
import Scene from './Scene';

export default class MainMenuScene extends Scene {

    render(scene) {
        scene.appendChild(this.create_menu_button('TreeHouse Game', 'treehouse_game'));
        scene.appendChild(this.create_menu_button('Shop Game', 'shop_game'));
        scene.appendChild(this.create_menu_button('Office Game', 'office_game'));
        scene.appendChild(this.create_menu_button('Egg Game', 'egg_game'));
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