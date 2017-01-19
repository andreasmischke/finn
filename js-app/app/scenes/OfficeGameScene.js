import interact from 'interactjs';
import {range, shuffle, to_array} from '../utils';
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

        self.messageBox = document.createElement('div');
        self.messageBox.classList.add('message_box');
        scene.appendChild(self.messageBox);

        let dragShadow = document.createElement('div');
        dragShadow.classList.add('drag_shadow');

        self.dragContainer = document.createElement('div');
        self.dragContainer.classList.add('drag_container');
        dragShadow.appendChild(self.dragContainer);

        shuffle(missing_folders).forEach(function(m) {
            let { color: col, number: nr, drop_target: target } = m;
            let missing = self.create_draggable_folder(col, nr, target);
            self.dragContainer.appendChild(missing);
        });

        scene.appendChild(dragShadow);

        self.showMessage("Sortiere die Ordner nach Farbe und Nummer ins Regal!");

        interact('.draggable_folder').draggable({
            inertia: true,
            /* restrict: {
                restriction: 'parent',
                endOnly: true
            }, */
            onstart: function(e) {
                e.target.style.zIndex = 1;
            },
            onmove: function(e) {
                let target = e.target,
                    x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx,
                    y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            onend: function(e) {
                e.target.style.zIndex = '';
                if(e.interaction.dropElement == null) {
                    let folder = e.target;
                    folder.removeAttribute('data-x');
                    folder.removeAttribute('data-y');
                    folder.style.transform = '';
                    if(folder.parentElement != self.dragContainer) {
                        self.dragContainer.appendChild(folder);
                    }
                }
                self.check_finish();
            }
        }).styleCursor(false);
        interact('.folder_space').dropzone({
            overlap: 0.5,
            ondragenter: function(e) {
                e.target.classList.add('drop-target');
            },
            ondragleave: function(e) {
                e.target.classList.remove('drop-target');
            },
            ondrop: function(e) {
                let space = e.target,
                    { x, y } = space.getBoundingClientRect(),
                    folder = e.relatedTarget;

                folder.style.top = y + "px";
                folder.style.left = x + "px";
                folder.style.transform = '';

                if(space.childElementCount > 0) {
                    to_array(space.childNodes).forEach(function(folder) {
                        self.dragContainer.appendChild(folder);
                    });
                }
                space.appendChild(folder);
            },
            ondropdeactivate: function(e) {
                let folder = e.relatedTarget;
                folder.removeAttribute('data-x');
                folder.removeAttribute('data-y');
                folder.style.transform = 0;
                e.target.classList.remove('drop-target');
            }
        });
    }

    check_finish() {
        if(this.dragContainer.childElementCount == 0) {
            let foldersNodelist = document.querySelectorAll('.draggable_folder');
            let folders = to_array(foldersNodelist);
            let correct_count = folders.reduce(function(acc, folder) {
                let folder_space = folder.parentElement,
                    space_type = folder_space.getAttribute('data-type'),
                    folder_type = folder.getAttribute('data-type');
                if(space_type == folder_type) {
                    return acc + 1;
                } else {
                    return acc;
                }
            }, 0);
            if(correct_count == 9) {
                this.showMessage("Richtig!");
            } else {
                this.showMessage("Leider falsch. Schau nochmal genau hin!");
            }
        }
    }

    showMessage(message) {
        let box = this.messageBox;
        box.textContent = message;
        box.classList.add('active');
        clearTimeout(this.messageBoxTimeout);
        this.messageBoxTimeout = setTimeout(function() {
            box.classList.remove('active');
        }, 5000);
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
            if(missing_numbers.indexOf(i) > -1) {
                let folder_space = document.createElement('div');
                folder_space.classList.add('folder_space');
                folder_space.setAttribute('data-type', color + i);
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
        folder.setAttribute('data-type', color + number);
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
