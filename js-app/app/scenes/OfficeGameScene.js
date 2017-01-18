import {range} from '../utils';
import Scene from './Scene';

export default class OfficeGameScene extends Scene {

    render(scene) {
        var self = this;

        scene.style.backgroundImage = "url(img/officegame_bg2.jpg)";

        let colors = ['blue', 'green', 'red'];
        let missing_folders = [];
        let shelves = range(4).map(function(i) {
            let missing;
            var shelf = document.createElement("div");
            shelf.classList.add('shelf');
            shelf.classList.add('shelf' + i);
            if(i < 3) {
                missing = self.fill_shelf_with_folders(shelf, colors[i], 3);
                missing_folders = missing_folders.concat(missing);
            } else {
                self.fill_shelf_with_folders(shelf, 'yellow', 0);
            }
            scene.appendChild(shelf);
            return shelf;
        });

        let dragContainer = document.createElement('div');
        dragContainer.classList.add('drag_container');

        missing_folders.forEach(function(m) {
            let { color: col, number: nr, drop_target: target } = m;
            let missing = self.create_draggable_folder(col, nr, target);
            dragContainer.appendChild(missing);
        });
        scene.appendChild(dragContainer);

        console.log(missing_folders);
    }

    fill_shelf_with_folders(shelf, color, missing) {
        var self = this;
        let may_be_missing = range(10);
        let missing_numbers = range(missing).map(function(i) {
            let missing_index = Math.floor(Math.random() * may_be_missing.length);
            let missing_number = may_be_missing[missing_index];
            let splice_start = Math.max(0, missing_index-1);
            may_be_missing.splice(splice_start, 3);
            return missing_number;
        });
        return range(10).reduce(function(acc, i) {
            let retval = null;
            if(missing_numbers.includes(i)) {
                let folder_space = document.createElement('div');
                folder_space.classList.add('folder_space');
                shelf.appendChild(folder_space);
                return acc.concat({
                    'number': i,
                    'color': color,
                    'drop_target': folder_space
                });
            } else {
                shelf.appendChild(self.create_folder(color, i));
                return acc;
            }
        }, []);
    }

    create_draggable_folder(color, number, dropTarget) {
        let missing = this.create_folder(color, number);
        missing.classList.add('draggable_folder');
        return missing;
    }

    create_folder(color, number) {
        let offset = this.folder_sprite_offset(color, number);
        let folder = document.createElement('div');
        folder.classList.add('folder');
        folder.style.backgroundPosition = offset;
        return folder;
    }

    folder_sprite_offset(color, number) {
        let colors = {
            'yellow': 0,
            'blue': 33.3,
            'green': 66.6,
            'red': 100
        };
        let xOffset = number * 11.1;
        let yOffset = colors[color];
        return `${xOffset}% ${yOffset}%`;
    }

    cleanup(scene) {
        scene.style.backgroundImage = "";
    }
}