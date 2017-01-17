document.addEventListener('DOMContentLoaded', () => {
    let SceneManager = require('./scenes/SceneManager');

    console.log('initialized');
    SceneManager.navigate('office_game');

    console.log('main loaded');
});
