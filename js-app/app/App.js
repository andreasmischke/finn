import canvas from 'canvas';
import hud from 'hud';
import scene_manager from './scenes/scene_manager';
import OfficeGameScene from './scenes/OfficeGameScene';
import MainMenuScene from './scenes/MainMenuScene';

module.exports = class App {

    constructor() {
        let app_element = this.create_app_element();
        app_element.appendChild(scene_manager.get_scene_element());
        canvas.init(app_element);
        app_element.appendChild(hud.init());

        scene_manager.register('main_menu', new MainMenuScene());
        scene_manager.register('office_game', new OfficeGameScene());
        scene_manager.navigate('office_game');

        console.log('initialized');
    }

    create_app_element() {
        let app_element = document.createElement('div');
        app_element.setAttribute('id', 'app');
        document.body.appendChild(app_element);
        return app_element;
    }
}
