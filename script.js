const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

context.moveTo(0,0);
context.lineTo(0,100);
context.lineTo(100,0);
context.stroke();