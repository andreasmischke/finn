let $app = document.getElementById('app');
let $scene = document.getElementById('scene');

let resizeRunning = false;
let resizeApp = function() {
    if(resizeRunning) {
        return;
    }
    resizeRunning = true;

    requestAnimationFrame(function() {
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
        resizeRunning = false;
    });
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

