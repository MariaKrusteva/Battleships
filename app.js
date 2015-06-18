var
  canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  height = 300,
  width = 300;


// initial drawing of the canvas
// top left corner is (0;0)
// bottom right corner is (10;10)
// going left - right increases x coordinate
// going up - down increases y coordinate

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

// random integer between min and max(excluding max)

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// generating random start possition and possible directions for a ship

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

// generating points for the whole ship

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
  return points;
}

// cheking entered possition for a hit
// we get the index of the point if we have a hit
// and -1 otherwise

function checkForHit(points, enteredX, enteredY){
  var result = -1;
  points.forEach(function(point, index) {
    if(point.getX() == enteredX && point.getY() == enteredY){
      result = index;
      point.print();
    }
  })

  return result;
}

// cheking for eqivalent poins in the array
// (this means 2 ships have the same point)

function numberOfEqivalentPoints(points) {
  var result = 0;
  points.forEach(function(point1) {
    points.forEach(function(point2) {
      if(point1.equivalent(point2)) {
        result++;
      }
    })
  })
  return result;
}

// generating 3 ships without repeating points

function generateShips(size1, size2, size3) {
  var result = null;
  do {
    result = _.union(getShip(size1), getShip(size2), getShip(size3));
  }
  while(numberOfEqivalentPoints(result) > size1 + size2 + size3);

  return result;
}


$(document).ready(function() {
  drawCanvas();
  var
    ships = generateShips(5,4,4),
    hits = 0,
    enteredX = null,
    enteredY = null,
    index = null,
    message = null;

  $('#checkForHitButton').on('click', function(event) {
    event.preventDefault();
    enteredX = $('#xCoordinate').val() - 1;
    enteredY = $('#yCoordinate').val() - 1;
    $('#message').empty();

    index = checkForHit(ships, enteredX, enteredY);

    if(index > -1){
      message = 'Hit'
      ships.splice(index, 1)
    }
    else{
      message = 'Missed'
    }

    $('#message').html(message);

    $('#statistics').append(['<br/>', 'X:', enteredX + 1, 'Y:', enteredY+1, message].join(' '));
    if(ships.length === 0) {
      alert('YOU WIN!');
    }
  })

})
