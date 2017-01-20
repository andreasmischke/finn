import hud from 'hud';
import {create_element} from 'utils';
import scene_manager from './scenes/scene_manager';
import EggGameScene from './scenes/EggGameScene';
import MainMenuScene from './scenes/MainMenuScene';
import OfficeGameScene from './scenes/OfficeGameScene';

module.exports = class App {

    constructor() {
        let app_element = this.create_app_element();
        this.app_element = app_element;
        this.initialize_resize_listener();
        app_element.appendChild(scene_manager.get_scene_element());
        app_element.appendChild(hud.init());

        scene_manager.register('main_menu', new MainMenuScene());
        scene_manager.register('office_game', new OfficeGameScene());
        scene_manager.register('egg_game', new EggGameScene());

        if(location.search.length > 1) {
            try {
                scene_manager.navigate(location.search.substr(1));
            } catch(e) {
                scene_manager.navigate('main_menu');
            }
        }

        console.log('initialized');
    }

    create_app_element() {
        let app_element = create_element('div').class('app').render();
        document.body.appendChild(app_element);
        return app_element;
    }

    initialize_resize_listener() {
        this.resize_timeout_throttle = false;
        this.resize_timeout_id = null;
        window.addEventListener('resize', this.resize_listener.bind(this));
        this.resize_listener();
    }

    resize_listener(event) {

        if(this.resize_timeout_throttle)
            return;
        this.resize_timeout_throttle = true;

        setTimeout(_ => this.resize_timeout_throttle = false, 500);

        clearTimeout(this.resize_timeout_id);
        this.resize_timeout_id = setTimeout(this.resize_app.bind(this), 750);
    }

    resize_app() {
        this.resize_timeout_id = null;
        let el = this.app_element,
            w = window.innerWidth,
            h = window.innerHeight,
            height = w / 16 * 9;

        if(height < h) {
            // max width
            el.style.height = height + "px";
            el.style.width = "100%";
            el.style.top = (h - height) / 2 + "px";
            el.style.left = "";
        } else {
            // max height
            let width = h / 9 * 16;
            el.style.height = "100%";
            el.style.width = width + "px";
            el.style.top = "";
            el.style.left = (w - width) / 2 + "px";
        }
        el.style.fontSize = el.getBoundingClientRect()['height'] / 100 + "px";
    }

}
