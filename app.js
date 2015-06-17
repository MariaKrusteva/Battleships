var
  canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  height = 300,
  width = 300;


function drawCanvas(){

  canvas.height = height;
  canvas.width = width;
  context.fillStyle = "black";
  _.range(0, width, 30).forEach(function(i) {
      context.beginPath();
      context.moveTo(i,0);
      context.lineTo(i,height);
      context.stroke();

      context.beginPath();
      context.moveTo(0,i);
      context.lineTo(width, i);
      context.stroke();
  });
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
  var
    x = getRandomInt(0, 10),
    y = getRandomInt(0 ,10),
    possibleDirections = [],
    result = {};

  if(x + shipSize > 10){
    possibleDirections.push("left")
  }
  else{
    possibleDirections.push("right")
  }
  if(y + shipSize > 10){
    possibleDirections.push("up")
  }
  else{
    possibleDirections.push("down")
  }

  result.directions = possibleDirections;
  result.startPoint = new Point(x, y, 30, context);

  return result;
}


function getShip(shipSize){
  var
    ship = getTheDirection(shipSize),
    direction = ship.directions[getRandomInt(0,2)],
    x = ship.startPoint.getX(),
    y = ship.startPoint.getY(),
    points = [];

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

  // points.forEach(function(point) {
  //   point.print();
  // })
  // console.log(direction, points);
  return points;
}

function checkForHit(points, enteredX, enteredY){
  var result = false;
  points.forEach(function(point) {
    if(point.getX() == enteredX && point.getY() == enteredY){
      point.print();
      result = true;
    }
  })
  return result;
}

$(document).ready(function() {
  drawCanvas();
  var
    ships = _.union(getShip(5), getShip(4), getShip(4)),
    hits = 0,
    enteredX = null,
    enteredY = null;

    console.log(ships);

  $('#checkForHitButton').on('click', function() {
    enteredX = $('#xCoordinate').val();
    enteredY = $('#yCoordinate').val();
    $('#message').empty();
    if(checkForHit(ships, enteredX, enteredY)){
      $('#message').html('HIT');
      hits += 1;
    }
    else{
      $('#message').html('MISSED');
    }
    if(hits === ships.length) {
      alert('YOU WIN!');
    }
  })


  //console.log(getTheDirection(5));
  // drawShip(5);
  // drawShip(4);
  // drawShip(4);

})
