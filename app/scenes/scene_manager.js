import {create_element} from '../utils';

var create_scene = function() {
    return create_element('div').class('scene').render();
};

var clean_scene = function() {
    let new_scene = create_scene();
    scene_element.parentNode.replaceChild(new_scene, scene_element);
    scene_element = new_scene;
};

var register = function(name, scene) {
    if(!scene || !scene.render || !scene.cleanup) {
        thorw `${scene} is not a scene`;
    }
    scenes[name] = scene;
};

var navigate = function(target) {

    if(target in scenes) {

        let new_scene = scenes[target];

        if(current_scene && current_scene.cleanup) {
            current_scene.cleanup(scene_element);
        }

        clean_scene();

        new_scene.render(scene_element);

        current_scene = new_scene;

    } else {
        throw `Unknown scene '${target}'`;
    }
};

var get_scene_element = function() {
    return scene_element;
}

let scene_element = create_scene(),
    scenes = {},
    current_scene;

module.exports = {
    register: register,
    navigate: navigate,
    get_scene_element: get_scene_element
}

