document.addEventListener("DOMContentLoaded", onLoaded);

var img;
var viewport;
var width;
var height;

function onLoaded() {
    var stub = document.querySelector("img");
    viewport = document.querySelector(".viewport");
    viewport.addEventListener("mousedown", onMouseDown);
    viewport.addEventListener("mousemove", onMouseMove);
    width = viewport.offsetWidth;
    height = viewport.offsetHeight;
    img = new Image();
    img.classList.add("mosaic");
    img.load(stub.getAttribute("full"), onLoaded);

    function onLoaded()
    {
        stub.parentElement.replaceChild(img, stub);
    }
}

function onMouseMove(event) {
    if (!img.classList.contains("zoom"))
        return;
    var x = event.offsetX;
    var y = event.offsetY;
    var scale = 20;
    var offsetX = - x + x/scale;
    var offsetY = - y + y/scale;

    var matrix = new Matrix();
    matrix.scale(scale, scale);
    matrix.translate(offsetX, offsetY);

    img.classList.add("zoom");
    img.style.setProperty("transform", matrix.toCSS());
    img.style.setProperty("transition-duration", "0.1s");
}

function onMouseDown(event) {
    if (img.classList.contains("zoom")) {
        img.classList.remove("zoom");
        img.style.removeProperty("transform");
        img.style.setProperty("transition-duration", "1s");
        return;
    }
    var x = event.offsetX;
    var y = event.offsetY;
    var scale = 20;

    var offsetX = - x + x/scale;
    var offsetY = - y + y/scale;

    var matrix = new Matrix();
    matrix.scale(scale, scale);
    matrix.translate(offsetX, offsetY);

    img.classList.add("zoom");
    img.style.setProperty("transform", matrix.toCSS());
    img.style.setProperty("transition-duration", "1s");
}
