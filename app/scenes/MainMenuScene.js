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

        this.create_story_buttons();
        this.create_menu_buttons();

        /*
        this.create_menu_button('Eingangsszene', PrefaceScene);
        this.create_menu_button('Bei Emil - Teil 1', EmilScene, 'in');
        this.create_menu_button('Bei Emil - Teil 2', EmilScene, 'out');
        this.create_menu_button('Bei Emma - Teil 1', EmmaScene, 'in');
        this.create_menu_button('Bei Emma - Teil 2', EmmaScene, 'out');
        this.create_menu_button('Bei Papa - Teil 1', PapaScene, 'in');
        this.create_menu_button('Bei Papa - Teil 2', PapaScene, 'out');
        this.create_menu_button('Bei Karl - Teil 1', KarlScene, 'in');
        this.create_menu_button('Bei Karl - Teil 2', KarlScene, 'mid');
        this.create_button_placeholder('In der Scheune');
        this.create_menu_button('Bei Karl - Teil 3', KarlScene, 'out');
        */
    }

    create_story_buttons() {
        const section = create_element('div')
            .class('section');

        section.adopt(create_element('div')
            .class('heading')
            .class('heading_story')
            .text("Geschichte spielen")
            .render());

        section.adopt(create_element('div')
            .class('btn')
            .class('btn_play_story')
            .click(e => story.start())
            .text("Von vorne starten")
            .render());

        section.adopt(create_element('div')
            .class('btn')
            .class('btn_resume_story')
            .click(e => story.play())
            .text("Weiterspielen")
            .render());

        this.scene.appendChild(section.render());
    }

    create_menu_buttons() {
        const section = create_element('div')
            .class('section');

        this.game_section = section.render();

        section.adopt(create_element('div')
            .class('heading')
            .class('heading_games')
            .text("Einzelspiele spielen")
            .render());

        this.create_menu_button('Nägel zählen', TreehouseGameScene);
        this.create_menu_button('Artikel wiegen', ShopGameScene);
        this.create_menu_button('Ordner sortieren', OfficeGameScene);
        this.create_menu_button('Eier einpacken', EggGameScene);

        this.scene.appendChild(section.render());
    }

    create_button_placeholder(text) {
        this.scene.appendChild(create_element('div')
            .class('btn')
            .class('button_placeholder')
            .text(text)
            .render());
    }

    create_menu_button(text, target, ...args) {
        this.game_section.appendChild(create_element('div')
            .class('btn')
            .click(e => scene_manager.navigate(new target(...args)))
            .text(text)
            .render());
    }

    cleanup(scene) {
    }
}
