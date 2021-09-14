const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

context.moveTo(0,0);
context.lineTo(0,400);
context.lineTo(400,400);
context.lineTo(400, 0);
context.lineTo(0,0);
context.lineTo(0,100);
context.lineTo(400, 100);
context.lineTo(400, 200);
context.lineTo(0, 200);
context.lineTo(0, 300);
context.lineTo(400, 300);

context.stroke();