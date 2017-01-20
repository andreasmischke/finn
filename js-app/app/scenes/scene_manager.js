import {create_element} from '../utils';

let scene_element,
    scenes = {},
    current_scene;

var clean_scene = function() {
    scene_element.innerHTML = "";
    return scene_element;
};

var register = function(name, scene) {
    scenes[name] = scene;
};

var navigate = function(target) {

    if(target in scenes) {

        let new_scene = scenes[target],
            scene = clean_scene();

        if(current_scene && current_scene.cleanup) {
            current_scene.cleanup(scene);
        }

        new_scene.render(scene);

        current_scene = new_scene;

    } else {
        throw `Unknown scene '${target}'`;
    }
};

var get_scene_element = function() {
    scene_element = create_element('div').class('scene').render();
    return scene_element;
}

module.exports = {
    register: register,
    navigate: navigate,
    get_scene_element: get_scene_element
}

