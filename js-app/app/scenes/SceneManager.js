import canvas from 'canvas'

class SceneManager {
    constructor() {
        this.scenes = {};
        this.current_scene;

        window.addEventListener('finn-navigate', this.navigateEventListener);
    }

    register(name, scene) {
        this.scenes[name] = scene;
    }

    navigateEventListener(evt) {
        console.log(evt);
    }

    navigate(target) {

        if(target in this.scenes) {

            let new_scene = this.scenes[target],
                scene = canvas.clean();

            if(this.current_scene && this.current_scene.cleanup) {
                this.current_scene.cleanup(scene);
            }

            new_scene.render(scene);

            this.current_scene = new_scene;

        } else {
            throw `Unknown scene '${target}'`;
        }
    };
}

let instance = new SceneManager();
export default instance;

