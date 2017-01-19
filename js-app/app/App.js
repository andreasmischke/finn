import SceneManager from './scenes/SceneManager';

module.exports = class App {

    constructor() {
        SceneManager.navigate('office_game');

        console.log('initialized');
    }
}
