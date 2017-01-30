import {create_element} from '../utils';
import Scene from './Scene';
import story from 'Story';
import scene_manager from './SceneManager';
import PrefaceScene from './PrefaceScene';
import EmilScene from './EmilScene';
import EmmaScene from './EmmaScene';
import TreehouseGameScene from './TreehouseGameScene';
import ShopGameScene from './ShopGameScene';
import PapaScene from './PapaScene';
import OfficeGameScene from './OfficeGameScene';
import KarlScene from './KarlScene';
import EggGameScene from './EggGameScene';

export default class MainMenuScene extends Scene {

    render(scene) {
        this.scene = scene;
        scene.classList.add('main_menu');

        this.create_story_button();
        this.create_menu_button('Eingangsszene', PrefaceScene);
        this.create_menu_button('Bei Emil - Teil 1', EmilScene, 'in');
        this.create_menu_button('Baumhaus-Spiel', TreehouseGameScene);
        this.create_menu_button('Bei Emil - Teil 2', EmilScene, 'out');
        this.create_menu_button('Bei Emma - Teil 1', EmmaScene, 'in');
        this.create_menu_button('Wiege-Spiel', ShopGameScene);
        this.create_menu_button('Bei Emma - Teil 2', EmmaScene, 'out');
        this.create_menu_button('Bei Papa - Teil 1', PapaScene, 'in');
        this.create_menu_button('Ordner-Spiel', OfficeGameScene);
        this.create_menu_button('Bei Papa - Teil 2', PapaScene, 'out');
        this.create_menu_button('Bei Karl - Teil 1', KarlScene, 'in');
        this.create_menu_button('Eier-Spiel', EggGameScene);
        this.create_menu_button('Bei Karl - Teil 2', KarlScene, 'mid');
        this.create_button_placeholder('In der Scheune');
        this.create_menu_button('Bei Karl - Teil 3', KarlScene, 'out');
    }

    create_story_button() {
        this.scene.appendChild(create_element('div')
            .class('menu_button')
            .click(e => story.play())
            .text("Story")
            .render());
    }

    create_button_placeholder(text) {
        this.scene.appendChild(create_element('div')
            .class('button_placeholder')
            .text(text)
            .render());
    }

    create_menu_button(text, target, ...args) {
        this.scene.appendChild(create_element('div')
            .class('menu_button')
            .click(e => scene_manager.navigate(new target(...args)))
            .text(text)
            .render());
    }

    cleanup(scene) {
    }
}
