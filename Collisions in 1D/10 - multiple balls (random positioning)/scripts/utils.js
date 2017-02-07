function random() {
    if (arguments.length > 2) {
        return 0;
    }
    switch (arguments.length) {
        case 0:
            return Math.random();
        case 1:
            return Math.round(Math.random() * arguments[0]);
        case 2:
            var min = Math.min(arguments[0], arguments[1]);
            var max = Math.max(arguments[0], arguments[1]);
            return Math.round(min + Math.random() * (max - min));
    }
}

function randomColor() {
    var hue = random(0, 360);
    var sat = random(20, 80);
    var lum = random(20, 70);
    return "hsl(" + hue + "," + sat + "%," + lum + "%)";
}