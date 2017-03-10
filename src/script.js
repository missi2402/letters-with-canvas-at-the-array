//Blocks with letters
let letters = document.getElementsByClassName('ck-button');
let arrayCanvas = [];
let letterForRecognition = document.getElementById('recognition');
// HTML-element with details
let descBlock = document.getElementById('description');
// Values output
let initialOutput = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
];
let NUMBER_OF_INPUTS; // Columns * rows
let objectLetters = [];
let weight;
// Class storage input and output values
class Neuron {
    constructor(input, output) {
        this.input = input;
        this.output = output;
    }
}

function createCanvas(parent, width = 100, height = 100) {
    parent.innerHTML = "";
    var canvas = {};
    canvas.node = document.createElement('canvas');
    canvas.context = canvas.node.getContext('2d');
    canvas.node.width = width;
    canvas.node.height = height;
    parent.appendChild(canvas.node);
    return canvas;
}
let init = (arrayElements = letters, height = 100, width = 100, fillColor = '#fff') => {
    NUMBER_OF_INPUTS = height * width;
    weight = [new Array(NUMBER_OF_INPUTS), new Array(NUMBER_OF_INPUTS)];
    for (let arrayElement of arrayElements) {
        funcCanvas(arrayElement);
    }
    funcCanvas(letterForRecognition);
    // Function for painting
    function funcCanvas(arrayElement) {
        let canvas = createCanvas(arrayElement);
        let ctx = canvas.context;
        arrayCanvas.push(ctx);
        ctx.fillCircle = function(x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.beginPath();
            this.moveTo(x, y);
            this.arc(x, y, radius, 0, Math.PI * 2, false);
            this.fill();
        };
        ctx.clearTo = function(fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);
        };
        ctx.clearTo(fillColor || "#ddd");
        // bind mouse events
        canvas.node.onmousemove = function(e) {
            if (!canvas.isDrawing) {
                return;
            }
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var radius = 5; // or whatever
            var fillColor = '#000';
            ctx.fillCircle(x, y, radius, fillColor);
        };
        canvas.node.onmousedown = function(e) {
            canvas.isDrawing = true;
        };
        canvas.node.onmouseup = function(e) {
            canvas.isDrawing = false;
        };
    }
}
let getArrayFromCanvas = (ctx, arrayElements = letters, height = 100, width = 100) => {
        let resultArray = [];
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                let Pixel = ctx.getImageData(h, w, 1, 1);
                let res = Pixel.data.reduce((previousValue, currentValue) => (previousValue + currentValue)/2, 0);
                if (res > 128) {
                    resultArray.push(-1);
                } else resultArray.push(1);
            }
        }
        console.log(resultArray);
        return resultArray;
    }

    /* The function to fill an two-dimensional array of zero */
let setZero = array => {
    descBlock.innerHTML += "<h2>An array of weights: </h2>";
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            array[x][y] = 0;
            descBlock.innerHTML += array[x][y];
        }
        descBlock.innerHTML += '<br>';
    }
    return array;
}
let training = () => {
    for (let i = 0; i < 4; i++) {
        getArrayFromCanvas(arrayCanvas[i]);
    }
}
init();