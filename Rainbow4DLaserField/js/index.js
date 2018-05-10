const SPEED = 0.0002;
const SIZE = 1000;

const SATURATION = 50;
const LIGHTNESS = 60;
const COLOR_START = 0;
const COLOR_END = 359;

const INTER = 30;

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

function resizeCanvas() {
  let body = document.querySelector('body');
  let w = window.getComputedStyle(body).getPropertyValue('width');
  let h =     window.getComputedStyle(body).getPropertyValue('height');
  canvas.width = parseInt(h, 10);
  canvas.height = parseInt(h, 10);
}
resizeCanvas();

canvas.addEventListener("resize", resizeCanvas);

canvas.addEventListener("click", e => {
  c.clearRect(0, 0, canvas.width, canvas.height);
})

function penDown(x, y, t) {
  c.beginPath();
  c.moveTo(x, y);
  c.quadraticCurveTo(x*Math.sin(.5*Math.PI*t), y*Math.cos(Math.PI*t), canvas.width -x, canvas.height - y);
  c.stroke();
}

let date = new Date();
let last_t = date.getTime();
function mainLoop() {
  let t = new Date().getTime() * SPEED;
  for (let i = 1; i <= INTER; ++i) {
    let line_t = (t) - i;
    penDown(canvas.width + Math.sin(line_t) * SIZE,            canvas.height + Math.cos(line_t) * SIZE, t);
  }
  last_t = t;
  // window.requestAnimationFrame(mainLoop);
}

mainLoop();


let color = COLOR_START;
let direction = true;
function strobe(){
  let co = (direction)?color++:color--;
  c.strokeStyle = generateColor(co, SATURATION, LIGHTNESS, 10);
  
  if (color <= COLOR_START || color >= COLOR_END) direction = !direction;
}

function fadeOut(color) {
  // c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = generateColor(color, 0, 0, .2);
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function generateColor(h=0, s=SATURATION, l=LIGHTNESS, a=1.0){
  return `hsla(${h}, ${s}%, ${l}%, ${a})`
}

setInterval(function() { mainLoop() }, 1)

setInterval(function() { strobe() }, 1000/(COLOR_END+COLOR_START));

setInterval(function() { fadeOut(color) }, 1000/INTER)