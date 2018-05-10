const SPEED = 0.001;
const SIZE = 1000;

const SATURATION = 50;
const LIGHTNESS = 60;
const COLOR_START = 0;
const COLOR_END = 360;

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
  c.quadraticCurveTo(x*Math.sin(2.25*Math.PI*t), y*Math.cos(.25*Math.PI*t), canvas.width -x, canvas.height - y);
  c.stroke();
}

let date = new Date();
function mainLoop() {
  let t = new Date().getTime() * SPEED;
  
  penDown(canvas.width + Math.sin(t) * SIZE, canvas.height + Math.cos(t) * SIZE, t);
  
  window.requestAnimationFrame(mainLoop);
}

mainLoop();

let color = COLOR_START;
let direction = true;
function strobe(){
  let co = (direction)?color++:color--;
  c.strokeStyle = generateColor(co, SATURATION, LIGHTNESS, 1);
  // c.shadowColor = generateColor(co, SATURATION, 70, .5);
  // c.shadowBlur = 50;
  // c.shadowOffsetX = 0;
  // c.shadowOffsetY = 0;
  
  if (color <= COLOR_START || color >= COLOR_END) direction = !direction;
}

function generateColor(h=0, s=SATURATION, l=LIGHTNESS, a=1.0){
  return `hsla(${h}, ${s}%, ${l}%, ${a})`
}

setInterval(function() { strobe() }, 100/(COLOR_END+COLOR_START));

function fadeOut(color) {
  c.fillStyle = generateColor(color, 0, 0, .1);
  c.fillRect(0, 0, canvas.width, canvas.height);
}

setInterval(function() {fadeOut(color)}, 50)