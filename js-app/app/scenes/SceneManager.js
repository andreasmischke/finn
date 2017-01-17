import OfficeGameScene from './OfficeGameScene'
import canvas from 'canvas'

var scenes = {
    'office_game': new OfficeGameScene()
};
var current_scene;

var navigate = function(target) {

    if(target in scenes) {

        let new_scene = scenes[target];

        current_scene && current_scene.cleanup && current_scene.cleanup();

        var scene = canvas.clean();

        new_scene.render(scene);

        current_scene = new_scene;

    } else {
        throw `Unknown scene '${target}'`;
    }
};

module.exports = {
    navigate: navigate
};
