const SPEED = 0.0009;
const LIGHTNESS = '100%';

let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.addEventListener("mousedown", e => {
    penDown(e.x, e.y); 
    canvas.onmousemove = e => penDown(e.x, e.y);
});
canvas.addEventListener("mouseup", e => {
  canvas.onmousemove = null;
});
canvas.addEventListener("click", e => {
  c.clearRect(0, 0, canvas.width, canvas.height);
})

function penDown(x, y, t) {  
  c.beginPath();
  c.moveTo(canvas.width,canvas.width);
  // c.moveTo(x - Math.sin(t), y - Math.cos(t));
  
  c.quadraticCurveTo(-y*Math.sin(Math.PI*t), y*Math.cos(Math.PI*t),canvas.height-x,canvas.height - y);
  c.lineWidth = 1;
  c.stroke();
  
  if (color >= 360){
    color = 0;
  }
}

let color = 0;
function strobe(){
  c.strokeStyle = `hsla(${color++}, 50%, ${LIGHTNESS}, 99%)`;
  
  if (color >= 360) color = 0;
}

setInterval(function() { strobe() }, 10);

let date = new Date();

function mainLoop() {
  let t = new Date().getTime() * SPEED;
  
  let size = 1000;
  let center = canvas.width/2;
  
  penDown(center + Math.sin(t) * size, center + Math.cos(t) * size, t);
  
  window.requestAnimationFrame(mainLoop);
}

c.strokeStyle = `hsla(${-1}, 50%, ${LIGHTNESS}, 99%)`;
mainLoop();