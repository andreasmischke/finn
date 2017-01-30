import {create_element} from '../utils';

export default class SceneManager {

    constructor() {
        this.scene_element = this.create_scene_element();
        this.scenes = {};
        this.current_scene = undefined;
    }

    create_scene_element() {
        return create_element('div').class('scene').render();
    }

    clean_scene() {

        if(this.current_scene && this.current_scene.cleanup) {
            this.current_scene.cleanup(this.scene_element);
        }

        const new_scene = this.create_scene_element();
        this.scene_element.parentNode.replaceChild(new_scene, this.scene_element);
        this.scene_element = new_scene;
    }

    pushState(scene) {
        if(!history.pushState) {
            return;
        }
        let queryString = "?" + scene.constructor.name;
        if(scene.part) {
            queryString += "/" + scene.part;
        }

        history.pushState(null, "Finns Zahlenabenteuer", queryString);
    }

    navigate(scene) {
        if(!scene || !scene.render || !scene.cleanup) {
            throw `${scene} is not a scene`;
        }

        this.clean_scene();

        scene.render(this.scene_element);

        this.current_scene = scene;
        this.pushState(scene);
        window.scene = scene;
    }

    get_scene_element() {
        return this.scene_element;
    }
}

const scene_manager = new SceneManager();
window.navigate = scene_manager.navigate;

module.exports = scene_manager;
