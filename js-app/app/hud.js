import {create_element} from 'utils';
import scene_manager from './scenes/scene_manager';

function create_main_menu_button() {
    return create_element('img')
            .attr('src', 'img/home_button.png')
            .class('hud_mainmenu')
            .click(function(e) {
                scene_manager.navigate('main_menu');
            })
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
    let flashlight = create_element('img')
            .attr('src', 'img/flashlight.png')
            .class('bag_item')
            .render();

    let catfood = create_element('img')
            .attr('src', 'img/catfood.png')
            .class('bag_item')
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

module.exports = {
    init: init
};

