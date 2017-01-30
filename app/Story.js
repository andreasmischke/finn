import scene_manager from './scenes/SceneManager';
import PrefaceScene from './scenes/PrefaceScene';
import EmilScene from './scenes/EmilScene';
import EmmaScene from './scenes/EmmaScene';
import TreehouseGameScene from './scenes/TreehouseGameScene';
import ShopGameScene from './scenes/ShopGameScene';
import PapaScene from './scenes/PapaScene';
import OfficeGameScene from './scenes/OfficeGameScene';
import KarlScene from './scenes/KarlScene';
import EggGameScene from './scenes/EggGameScene';

class Story {
    constructor() {
        this.scenes = [];
        this.current_scene = 0;
    }

    add(scene, ...args) {
        this.scenes.push({scene: scene, args: args});
        return this;
    }

    rewind() {
        this.current_scene = 0;
    }

    next() {
        try {
            throw new Error('story.next');
        } catch(e) {
            console.error(e);
        }
        this.current_scene = this.current_scene + 1;
        this.play();
    }

    play() {
        if(this.current_scene >= this.scenes.length) {
            return;
        }
        const scene_data = this.scenes[this.current_scene],
              scene = new scene_data.scene(...scene_data.args);

        scene.enable_story_mode(this);
        scene_manager.navigate(scene);
    }
}

const story = new Story();
story.add(PrefaceScene)
     .add(EmilScene, 'in')
     .add(TreehouseGameScene)
     .add(EmilScene, 'out')
     .add(EmmaScene, 'in')
     .add(ShopGameScene)
     .add(EmmaScene, 'out')
     .add(PapaScene, 'in')
     .add(OfficeGameScene)
     .add(PapaScene, 'out')
     .add(KarlScene, 'in')
     .add(EggGameScene)
     .add(KarlScene, 'mid')
     // .add(BarnScene)
     .add(KarlScene, 'out');

window.skip = story.next.bind(story);

module.exports = story;
