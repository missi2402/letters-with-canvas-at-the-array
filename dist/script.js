'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Blocks with letters
var letters = document.getElementsByClassName('ck-button');
var arrayCanvas = [];
var letterForRecognition = document.getElementById('recognition');
// HTML-element with details
var descBlock = document.getElementById('description');
// Values output
var initialOutput = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
var NUMBER_OF_INPUTS = void 0; // Columns * rows
var objectLetters = [];
var weight = void 0;
// Class storage input and output values

var Neuron = function Neuron(input, output) {
    _classCallCheck(this, Neuron);

    this.input = input;
    this.output = output;
};

function createCanvas(parent) {
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    parent.innerHTML = "";
    var canvas = {};
    canvas.node = document.createElement('canvas');
    canvas.context = canvas.node.getContext('2d');
    canvas.node.width = width;
    canvas.node.height = height;
    parent.appendChild(canvas.node);
    return canvas;
}
var init = function init() {
    var arrayElements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : letters;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    var fillColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#fff';

    NUMBER_OF_INPUTS = height * width;
    weight = [new Array(NUMBER_OF_INPUTS), new Array(NUMBER_OF_INPUTS)];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = arrayElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var arrayElement = _step.value;

            funcCanvas(arrayElement);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    funcCanvas(letterForRecognition);
    // Function for painting
    function funcCanvas(arrayElement) {
        var canvas = createCanvas(arrayElement);
        var ctx = canvas.context;
        arrayCanvas.push(ctx);
        ctx.fillCircle = function (x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.beginPath();
            this.moveTo(x, y);
            this.arc(x, y, radius, 0, Math.PI * 2, false);
            this.fill();
        };
        ctx.clearTo = function (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);
        };
        ctx.clearTo(fillColor || "#ddd");
        // bind mouse events
        canvas.node.onmousemove = function (e) {
            if (!canvas.isDrawing) {
                return;
            }
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var radius = 5; // or whatever
            var fillColor = '#000';
            ctx.fillCircle(x, y, radius, fillColor);
        };
        canvas.node.onmousedown = function (e) {
            canvas.isDrawing = true;
        };
        canvas.node.onmouseup = function (e) {
            canvas.isDrawing = false;
        };
    }
};
var getArrayFromCanvas = function getArrayFromCanvas(ctx) {
    var arrayElements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : letters;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;

    var resultArray = [];
    for (var h = 0; h < height; h++) {
        for (var w = 0; w < width; w++) {
            var Pixel = ctx.getImageData(h, w, 1, 1);
            var res = Pixel.data.reduce(function (previousValue, currentValue) {
                return (previousValue + currentValue) / 2;
            }, 0);
            if (res > 128) {
                resultArray.push(-1);
            } else resultArray.push(1);
        }
    }
    console.log(resultArray);
    return resultArray;
};

/* The function to fill an two-dimensional array of zero */
var setZero = function setZero(array) {
    descBlock.innerHTML += "<h2>An array of weights: </h2>";
    for (var x = 0; x < array.length; x++) {
        for (var y = 0; y < array[x].length; y++) {
            array[x][y] = 0;
            descBlock.innerHTML += array[x][y];
        }
        descBlock.innerHTML += '<br>';
    }
    return array;
};
var training = function training() {
    for (var i = 0; i < 4; i++) {
        getArrayFromCanvas(arrayCanvas[i]);
    }
};
init();