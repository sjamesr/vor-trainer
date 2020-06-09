var ns = "http://www.w3.org/2000/svg";

// Rotates an element by `angle` degrees around the point (centerX,
// centerY), where (0, 0) represents the top-left of the canvas.
var rotateElementAround = function(elem, angle, centerX, centerY) {
  var animate = document.createElementNS(ns, 'animateTransform');

  animate.setAttribute('attributeName', 'transform');
  animate.setAttribute('type', 'rotate');
  var start = 0;
  var end = 360 - angle;
  animate.setAttribute('from', start + ' ' + centerX + ' ' + centerY);
  animate.setAttribute('to', end + ' ' + centerX + ' ' + centerY);
  animate.setAttribute('dur', '20s');
  animate.setAttribute('repeatCount', 'indefinite');

  elem.appendChild(animate);
};

// Rotates an element by `angle` degrees around the point
// (centerX, centerY), where (0, 0) represents the top-left of the element
// (not the window).
var rotateElement = function(elem, angle, centerX, centerY) {
  var box = elem.getBBox();
  rotateElementAround(elem, angle, box.x + centerX, box.y + centerY);
};

var raiseFlag = function(elem) {
  var animate = document.createElementNS(ns, 'animateTransform');
  animate.setAttribute('attributeName', 'transform');
  animate.setAttribute('type', 'translate');
  animate.setAttribute('by', '0,-100');
  animate.setAttribute('dur', '0.5s');
  animate.setAttribute('fill', 'freeze');
  elem.appendChild(animate);
};

var fadeColor = function(elem, from, to) {
  var animate = document.createElementNS(ns, 'animate');
  animate.setAttribute('attributeName', 'fill');
  animate.setAttribute('from', from);
  animate.setAttribute('to', to);
  animate.setAttribute('dur', '1.5s');
  animate.setAttribute('fill', 'freeze');
  elem.appendChild(animate);
};

var disableToFrom = function(elem) {
  fadeColor(elem, "#ffffff", "#373737");
};

var enableToFrom = function(elem) {
  fadeColor(elem, "#373737", "#ffffff");
};

// Rotates the given element by `angle` degrees about its own center.
var rotateElementAtCenter = function(elem, angle) {
  var box = elem.getBBox();
  rotateElement(elem, angle, box.width / 2, box.height / 2);
}

var obj = window.document.getElementById("hsi");
obj.addEventListener('load', (event) => {
  var hsi = obj.contentDocument;
  {
    var gsIndicators = hsi.getElementById("gs-indicators");
    var animate = document.createElementNS(ns, 'animateTransform');
    animate.setAttribute('attributeName', 'transform');
    animate.setAttribute('type', 'translate');
    animate.setAttribute('from', '-197.719 -80.354');
    animate.setAttribute('to', '-197.719 -290.354');
    animate.setAttribute('dur', '2s');
    animate.setAttribute('repeatCount', 'indefinite');
    gsIndicators.appendChild(animate);
  }

  {
    var cdiNeedle = hsi.getElementById("cdi-needle");
    var animate = document.createElementNS(ns, 'animateTransform');
    animate.setAttribute('attributeName', 'transform');
    animate.setAttribute('type', 'translate');
    animate.setAttribute('from', '0 0');
    animate.setAttribute('to', '50 0');
    animate.setAttribute('dur', '2s');
    animate.setAttribute('repeatCount', 'indefinite');
    cdiNeedle.appendChild(animate);
  }

  rotateElementAtCenter(hsi.getElementById("compass-face"), 240);
  rotateElementAtCenter(hsi.getElementById("cdi-face"), 500);
  rotateElementAtCenter(hsi.getElementById("heading-bug-selector"), 100);
  rotateElementAtCenter(hsi.getElementById("obs-selector"), 500);

  var bbox = hsi.getElementById("compass-face").getBBox();
  rotateElementAround(hsi.getElementById("heading-bug"), 150, bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);

  raiseFlag(hsi.getElementById("nav-flag"));
  raiseFlag(hsi.getElementById("hdg-flag"));

  disableToFrom(hsi.getElementById("to-indicator"));
  enableToFrom(hsi.getElementById("from-indicator"));
});
