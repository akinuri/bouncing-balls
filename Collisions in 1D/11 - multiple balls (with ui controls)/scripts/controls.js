var viewSelect  = document.getElementById("view");
var fpsSelect   = document.getElementById("fps");
var speedSelect = document.getElementById("speed");
var resetButton = document.getElementById("reset");

resetButton.onclick = function resetBalls() {
    cancelAnimationFrame(handler);
    init();
};

viewSelect.onchange = function changeView() {
    globals.xray = false;
    globals.wireframe = false;
    switch (this.selectedIndex) {
        case 1:
            globals.xray = true;
            break;
        case 2:
            globals.wireframe = true;
            break;
    }
};

fpsSelect.onchange = function changeFPS() {
    globals.fps = parseInt(this.options[this.selectedIndex].value, 10);
};

fpsSelect.onchange = function changeFPS() {
    globals.fps = parseInt(this.options[this.selectedIndex].value, 10);
    fpsInterval = 1000 / globals.fps;
};

speedSelect.onchange = function changeSpeed() {
    globals.speed = parseInt(this.options[this.selectedIndex].value, 10);
};