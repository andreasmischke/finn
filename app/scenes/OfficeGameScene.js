import interact from 'interactjs';
import {create_element} from '../utils';
import {range, shuffle, to_array} from '../utils';
import Scene from './Scene';

export default class OfficeGameScene extends Scene {

    render(scene) {
        var self = this;

        scene.classList.add('office_game');

        const colors = ['blue', 'green', 'red'];
        let missing_folders = [];
        range(4).map(function(i) {
            const shelf = create_element('div')
                    .class('shelf')
                    .class('shelf' + i)
                    .render();
            if(i < 3) {
                const missing = self.fill_shelf_with_folders(shelf, colors[i], 3);
                missing_folders = missing_folders.concat(missing);
            } else {
                self.fill_shelf_with_folders(shelf, 'yellow', 0);
            }
            scene.appendChild(shelf);
            return shelf;
        });

        self.messageBox = create_element('div').class('message_box').render();
        scene.appendChild(self.messageBox);

        self.dragContainer = create_element('div')
                .class('drag_container')
                .render();

        shuffle(missing_folders).forEach(function(m) {
            const { color: col, number: nr, drop_target: target } = m,
                  missing = self.create_draggable_folder(col, nr, target);
            self.dragContainer.appendChild(missing);
        });

        scene.appendChild(create_element('div')
                .class('drag_shadow')
                .adopt(self.dragContainer)
                .render());

        self.showMessage("Sortiere die Ordner nach Farbe und Nummer ins Regal!");

        interact('.draggable_folder').draggable({
            onstart: function(e) {
                e.target.style.zIndex = 1;
            },
            onmove: function(e) {
                const target = e.target,
                    x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx,
                    y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            onend: function(e) {
                e.target.style.zIndex = '';
                if(e.interaction.dropElement == null) {
                    const folder = e.target;
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
                const space = e.target,
                      folder = e.relatedTarget;

                folder.style.transform = '';

                if(space.childElementCount > 0) {
                    to_array(space.childNodes).forEach(function(folder) {
                        self.dragContainer.appendChild(folder);
                    });
                }
                space.appendChild(folder);
            },
            ondropdeactivate: function(e) {
                const folder = e.relatedTarget;
                folder.removeAttribute('data-x');
                folder.removeAttribute('data-y');
                folder.style.transform = 0;
                e.target.classList.remove('drop-target');
            }
        });
    }

    check_finish() {
        if(this.dragContainer.childElementCount == 0) {
            const foldersNodelist = document.querySelectorAll('.draggable_folder'),
                  folders = to_array(foldersNodelist),
                  correct_count = folders.reduce(function(acc, folder) {
                      const folder_space = folder.parentElement,
                            space_type = folder_space.getAttribute('data-type'),
                            folder_type = folder.getAttribute('data-type');
                      if(space_type == folder_type) {
                          return acc + 1;
                      } else {
                          return acc;
                      }
                  }, 0);

            if(correct_count == 9) {
                if(this.story) {
                    this.showMessage("Sehr gut!!");
                    this.finish_timeout = setTimeout(x => this.story.next(), 3000);
                } else {
                    this.showMessage("Sehr gut! Du hast alle Aufgaben gelöst!");
                }
            } else {
                this.showMessage("Leider falsch. Schau nochmal genau hin!");
            }
        }
    }

    showMessage(message) {
        const box = this.messageBox;
        box.textContent = message;
        box.classList.add('active');
        clearTimeout(this.messageBoxTimeout);
        this.messageBoxTimeout = setTimeout(function() {
            box.classList.remove('active');
        }, 5000);
    }

    fill_shelf_with_folders(shelf, color, missing) {
        const self = this,
              may_be_missing = range(10),
              missing_numbers = range(missing).map(function(i) {

                  const missing_index = Math.floor(Math.random() * may_be_missing.length),
                        missing_number = may_be_missing[missing_index];

                  may_be_missing.splice(missing_index, 1);

                  const left = may_be_missing.indexOf(missing_number-1);
                  if(left > -1)
                      may_be_missing.splice(left, 1);

                  const right = may_be_missing.indexOf(missing_number+1);
                  if(right > -1 && right < may_be_missing.length)
                      may_be_missing.splice(right, 1);

                  return missing_number;
              });

        return range(10).reduce(function(acc, i) {
            if(missing_numbers.indexOf(i) > -1) {
                const folder_space = create_element('div')
                        .class('folder_space')
                        .attr('data-type', color + i)
                        .render();
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
        const missing = this.create_folder(color, number);
        missing.classList.add('draggable_folder');
        return missing;
    }

    create_folder(color, number) {
        const offset = this.folder_sprite_offset(color, number);
        return create_element('div')
                .class('folder')
                .attr('data-type', color + number)
                .style('background-position', offset)
                .render();
    }

    folder_sprite_offset(color, number) {
        const colors = {
                  'yellow': 0,
                  'blue': 33.3,
                  'green': 66.6,
                  'red': 100
              },
              xOffset = number * 11.1,
              yOffset = colors[color];

        return `${xOffset}% ${yOffset}%`;
    }

    cleanup(scene) {
        clearTimeout(this.finish_timeout);
        clearTimeout(this.messageBoxTimeout);
    }
}
