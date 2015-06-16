  var
    canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    height = 300,
    width = 300;


function drawCanvas(){


  canvas.height = height;
  canvas.width = width;
  context.fillStyle = "black";
  for(var i=0; i<width; i+=30){
      context.beginPath();
      context.moveTo(i,0);
      context.lineTo(i,height);
      context.stroke();

      context.beginPath();
      context.moveTo(0,i);
      context.lineTo(width, i);
      context.stroke();
  }
}

function Point(x, y, size, ctx){
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;

    this.getX = function(){
        return this.x;
    }

    this.getY = function(){
        return this.y;
    }

    this.print = function(){
        this.ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
  }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getTheDirection(shipSize){
  var x = getRandomInt(0, 10);
  var y = getRandomInt(0 ,10);
  var possibleDirections = [];
  var result = {};
  if(x+shipSize > 10){
    possibleDirections.push("left")
  }
  else{
    possibleDirections.push("right")
  }
  if(y+shipSize > 10){
    possibleDirections.push("up")
  }
  else{
    possibleDirections.push("down")
  }
  result.directions = possibleDirections;
  result.startPoint = new Point(x,y,30, context);
  return result;
}


function drawShip(shipSize){
  var lqlq = getTheDirection(shipSize)
  var direction = lqlq.directions[getRandomInt(0,2)];
  var x = lqlq.startPoint.getX();
  var y = lqlq.startPoint.getY();
  console.log(direction,x,y);
  var points = [];
  switch (direction){
    case "left": _.range(x, x-shipSize, -1).forEach(function(i) {
      points.push(new Point(i, y, 30, context));
    }); break;

    case "right": _.range(x, x+shipSize).forEach(function(i) {
      points.push(new Point(i, y, 30, context));
    }); break;

    case "up": _.range(y, y-shipSize, -1).forEach(function(i) {
      points.push(new Point(x, i, 30, context));
    }); break;

    case "down": _.range(y, y+shipSize).forEach(function(i) {
      points.push(new Point(x, i, 30, context));
    }); break;

  }

  points.forEach(function(point) {
    point.print();
  })
  console.log(direction, points);
}

$(document).ready(function() {
  drawCanvas();
  //console.log(getTheDirection(5));
  drawShip(5);
})
