import scene_manager from './scenes/SceneManager';
import OfficeGameScene from './scenes/OfficeGameScene'
import MainMenuScene from './scenes/MainMenuScene'

module.exports = class App {

    constructor() {
        scene_manager.register('main_menu', new MainMenuScene());
        scene_manager.register('office_game', new OfficeGameScene());
        scene_manager.navigate('office_game');

        console.log('initialized');
    }
}
