import {create_element} from 'utils';
import MainMenuScene from './scenes/MainMenuScene';
import scene_manager from './scenes/SceneManager';

let flashlight, catfood;

function create_main_menu_button() {
    return create_element('img')
            .attr('src', 'img/home_button.png')
            .class('hud_mainmenu')
            .click(e => scene_manager.navigate(new MainMenuScene()))
            .render();
};
function create_bag_box() {
    return create_element('div')
            .class('hud_bag_box')
            .adopt(create_bag())
            .adopt(create_bag_button())
            .render();
};
function create_bag() {
    flashlight = create_element('img')
            .attr('src', 'img/flashlight.png')
            .class('bag_item')
            .class('bag_item_hidden')
            .render();

    catfood = create_element('img')
            .attr('src', 'img/catfood.png')
            .class('bag_item')
            .class('bag_item_hidden')
            .render();

    return create_element('div')
            .class('hud_bag')
            .adopt(flashlight)
            .adopt(catfood)
            .render();
};
function create_bag_button() {
    return create_element('img')
            .attr('src', 'img/bag_button.png')
            .class('hud_bag_button')
            .render();
};
function init() {
    return create_element('div')
            .class('hud')
            .adopt(create_main_menu_button())
            .adopt(create_bag_box())
            .render();
};

function add_flashlight() {
    flashlight.classList.remove('bag_item_hidden');
}
function add_catfood() {
    catfood.classList.remove('bag_item_hidden');
}

function empty_bag() {
    flashlight.classList.add('bag_item_hidden');
    catfood.classList.add('bag_item_hidden');
}

module.exports = {
    init: init,
    add_flashlight: add_flashlight,
    add_catfood: add_catfood,
    empty_bag: empty_bag
};

