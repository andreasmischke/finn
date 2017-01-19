import scene_manager from './scenes/SceneManager';

let $app = document.getElementById('app');
let $scene = document.getElementById('scene');

let $main_menu_btn = document.querySelector('img.hud_mainmenu');

$main_menu_btn.onclick = function(e) {
    scene_manager.navigate('main_menu');
};

let timeoutThrottle = false;
let resizeTimeout;
let resizeApp = function() {

    if(timeoutThrottle)
        return;
    timeoutThrottle = true;
    setTimeout(_ => timeoutThrottle = false, 500);

    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        let w = window.innerWidth,
            h = window.innerHeight,
            height = w / 16 * 9;

        if(height < h) {
            // max width
            $app.style.height = height + "px";
            $app.style.width = "100%";
            $app.style.top = (h - height) / 2 + "px";
            $app.style.left = "";
        } else {
            // max height
            let width = h / 9 * 16;
            $app.style.height = "100%";
            $app.style.width = width + "px";
            $app.style.top = "";
            $app.style.left = (w - width) / 2 + "px";
        }
        $app.style.fontSize = $app.getBoundingClientRect()['height'] / 100 + "px";
    }, 750);
};

window.addEventListener('resize', resizeApp);
resizeApp();

var clean = function() {
    $scene.innerHTML = "";
    return $scene;
};
var getScene = function() {
    return $scene;
}


export default {
    clean: clean,
    getScene: getScene
};

