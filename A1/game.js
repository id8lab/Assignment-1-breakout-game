var defaults = {
  block: {
    width: 126,
    height: 40,
    color: 'Teal',},
  paddle: {
    width: 150,
    height: 30,
    color: 'DarkCyan',},
  ball: {
    width: 30,
    height: 30,
    color: 'white',},
};
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var blocks = [
  {
    x: 10,
    y: 10,},
  {
    x: 166,
    y: 10,},
  {
    x: 322,
    y: 10,},
  {
    x: 478,
    y: 10,},
  {
    x: 634,
    y: 10,},
  {
    x: 10,
    y: 60,},
  {
    x: 166,
    y: 60,},
  {
    x: 322,
    y: 60,},
  {
    x: 478,
    y: 60,},
  {
    x: 634,
    y: 60,},
  {
    x: 10,
    y: 110,},
  {
    x: 166,
    y: 110,},
  {
    x: 322,
    y: 110,},
  {
    x: 478,
    y: 110,},
  {
    x: 634,
    y: 110,},
];
var paddle = {
  x: 10,
  y: 570,
};
var ball = {
  x: 400,
  y: 300,
  velocity: {
    x: 2,
    y: 2,}
};
function getMousePosition (canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,};}

function clear () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);}
function move () {
  var ballXVelocityChanged = false;
  var ballYVelocityChanged = false;
  
  ball.x = ball.x + ball.velocity.x;
  ball.y = ball.y + ball.velocity.y;
  
  if (!ballYVelocityChanged && ball.velocity.y >= 0) {
    if (ball.x >= paddle.x && ball.x <= paddle.x + (paddle.width || defaults.paddle.width)) {
      if (ball.y <= paddle.y && ball.y - (ball.height || defaults.ball.height) >= paddle.y - (paddle.height || defaults.paddle.height)) {
        ball.velocity.y = ball.velocity.y * -1;
        ballYVelocityChanged = true;}}}
  
  if (!ballYVelocityChanged && ball.velocity.y <= 0) {
    if (ball.y <= 0) {
      ball.velocity.y = ball.velocity.y * -1;
      ballYVelocityChanged = true;}}
  
  if (!ballXVelocityChanged && ball.velocity.x >= 0) {
    if (ball.x >= canvas.width) {
      ball.velocity.x = ball.velocity.x * -1;
      ballYVelocityChanged = true;}}
  
  if (!ballYVelocityChanged && ball.velocity.y >= 0) {
    if (ball.y >= canvas.height) {
      ball.velocity.y = ball.velocity.y * -1;
      ballYVelocityChanged = true;}}
  
  if (!ballXVelocityChanged && ball.velocity.x <= 0) {
    if (ball.x <= 0) {
      ball.velocity.x = ball.velocity.x * -1;
      ballYVelocityChanged = true;}}
  
  blocks.map(function(block, i) {
    if (ball.y <= block.y + (block.height || defaults.block.height) && ball.y >= block.y) {
      if (ball.x >= block.x && ball.x <= block.x + (block.width || defaults.block.width)) {
        if (
             (!ballYVelocityChanged && ball.y >= block.y + (block.height || defaults.block.height) - 5 && ball.y <= block.y + (block.height || defaults.block.height)) ||
             (!ballYVelocityChanged && ball.y >= block.y - 5 && ball.y <= block.y)
           ) {
          ball.velocity.y = ball.velocity.y * -1;
          ballYVelocityChanged = true;}      
        if (
             (!ballXVelocityChanged && ball.x >= block.x + (block.width || defaults.block.width) - 5 && ball.x <= block.x + (block.width || defaults.block.width)) ||
             (!ballXVelocityChanged && ball.x >= block.x - 5 && ball.x <= block.x)
           ) {
          ball.velocity.x = ball.velocity.x * -1;
          ballXVelocityChanged = true;}       
        blocks.splice(i, 1);}}});}

function draw() {
  // Background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Blocks
  blocks.map(function(block) {
    ctx.fillStyle = block.color || defaults.block.color;
    ctx.fillRect(block.x, block.y, block.width || defaults.block.width, block.height || defaults.block.height);
  });  
  // Paddle
  ctx.fillStyle = paddle.color || defaults.paddle.color;
  ctx.fillRect(paddle.x, paddle.y, paddle.width || defaults.paddle.width, paddle.height || defaults.paddle.height); 
  // Ball
  ctx.fillStyle = ball.color || defaults.ball.color;
  ctx.fillRect(ball.x, ball.y, ball.width || defaults.ball.width, ball.height || defaults.ball.height);}
function step () {
  clear();
  move();
  draw();
  window.requestAnimationFrame(step);}
  window.requestAnimationFrame(step);
  canvas.addEventListener('mousemove', function(e) {
  var mousePosition = getMousePosition(canvas, e);
  paddle.x = mousePosition.x - (paddle.width || defaults.paddle.width / 2);
});