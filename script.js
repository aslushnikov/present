document.addEventListener("DOMContentLoaded", onLoaded);

var mosaic;
var viewport;
var width;
var height;
var tileN = 15,
    tileM = 15;
var tiles = new Array();

function onLoaded() {
    viewport = document.querySelector(".viewport");
    viewport.addEventListener("mousedown", onMouseDown);
    if (transitionEndEventName())
        viewport.addEventListener(transitionEndEventName(), onTransitionEnd);
    width = viewport.offsetWidth;
    height = viewport.offsetHeight;

    mosaic = new Image();
    mosaic.classList.add("mosaic");

    var stub = document.querySelector(".stub");
    mosaic.load(stub.getAttribute("src"), function() { });
    mosaic.addEventListener("load", onLoaded);

    function onLoaded()
    {
        stub.parentElement.replaceChild(mosaic, stub);
        document.querySelector(".splash").remove();
    }
}

function transitionEndEventName () {
    var el = document.createElement('div');
    var transitions = {
        'transition':'transitionend',
        'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    };

    for (var i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined)
            return transitions[i];
    }
    return null;
}

function isZoomed()
{
    return mosaic.classList.contains("zoom");
}

function onTransitionEnd(event)
{
    if (event.propertyName !== "transform")
        return;
    if (isZoomed())
        return;
    // Remove detalization tiles.
    console.log("remove tiles!");
}

function onMouseDown(event) {
    if (isZoomed()) {
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
    // Start loading detalization tiles.
}
