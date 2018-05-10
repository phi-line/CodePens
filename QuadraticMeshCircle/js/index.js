const SPEED = 0.0009;
const SIZE = 1000;
const LIGHTNESS = '60%';
const COLOR_START = 150;
const COLOR_END = 250;

let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.addEventListener("click", e => {
  c.clearRect(0, 0, canvas.width, canvas.height);
})

function penDown(x, y, t) {  
  c.beginPath();
  c.moveTo(x - Math.sin(t), y - Math.cos(t));
  
  c.quadraticCurveTo(x*Math.sin(Math.PI*t), y*Math.cos(Math.PI*t),canvas.height -x ,canvas.height - y);
  c.stroke();
}

let color = COLOR_START;
let direction = true;
function strobe(){
  let co = (direction)?color++:color--;
  c.strokeStyle = generateColor(co, '50%', LIGHTNESS, 100/co);
  
  if (color <= COLOR_START || color >= COLOR_END) direction = !direction;
}

function generateColor(h, s, l, a){
  return `hsla(${h}, ${s}, ${l}, ${a})`
}

setInterval(function() { strobe() }, 10);

let date = new Date();
function mainLoop() {
  let t = new Date().getTime() * SPEED;
  
  let center = canvas.width/2;
  
  penDown(center + Math.sin(t) * SIZE, center + Math.cos(t) * SIZE, t);
  
  window.requestAnimationFrame(mainLoop);
}

mainLoop();