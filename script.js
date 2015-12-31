document.addEventListener("DOMContentLoaded", onLoaded);

var mosaic;
var viewport;
var width;
var height;

function onLoaded() {
    viewport = document.querySelector(".viewport");
    viewport.addEventListener("mousedown", onMouseDown);
    width = viewport.offsetWidth;
    height = viewport.offsetHeight;

    mosaic = new Image();
    mosaic.classList.add("mosaic");
    mosaic.classList.add("animate");

    var stub = document.querySelector(".stub");
    mosaic.load(stub.getAttribute("src"), function() { });
    mosaic.addEventListener("load", onLoaded);

    function onLoaded()
    {
        stub.parentElement.replaceChild(mosaic, stub);
        document.querySelector(".splash").remove();
    }
}

function onMouseDown(event) {
    if (mosaic.classList.contains("zoom")) {
        mosaic.classList.remove("zoom");
        viewport.style.removeProperty("transform");
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

    mosaic.classList.add("zoom");
    viewport.style.setProperty("transform", matrix.toCSS());
}
