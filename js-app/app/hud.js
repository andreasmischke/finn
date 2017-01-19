import scene_manager from './scenes/scene_manager';

function create_main_menu_button() {
    let main_menu_button = document.createElement('img');
    main_menu_button.setAttribute('src', 'img/home_button.png');
    main_menu_button.classList.add('hud_mainmenu');
    main_menu_button.onclick = function(e) {
        scene_manager.navigate('main_menu');
    };
    return main_menu_button;
};
function create_bag_box() {
    let bag_box = document.createElement('div');
    bag_box.classList.add('hud_bag_box');
    bag_box.appendChild(create_bag());
    bag_box.appendChild(create_bag_button());
    return bag_box;
};
function create_bag() {
    let bag = document.createElement('div');
    bag.classList.add('hud_bag');

    let flashlight = document.createElement('img');
    flashlight.setAttribute('src', 'img/flashlight.png');
    flashlight.classList.add('bag_item');
    bag.appendChild(flashlight);

    let catfood = document.createElement('img');
    catfood.setAttribute('src', 'img/catfood.png');
    catfood.classList.add('bag_item');
    bag.appendChild(catfood);

    return bag;
};
function create_bag_button() {
    let bag_button = document.createElement('img');
    bag_button.setAttribute('src', 'img/bag_button.png');
    bag_button.classList.add('hud_bag_button');
    return bag_button;
};
function init() {
    let hud = document.createElement('div');
    hud.setAttribute('id', 'hud');
    hud.appendChild(create_main_menu_button());
    hud.appendChild(create_bag_box());
    return hud;
};

module.exports = {
    init: init
};

