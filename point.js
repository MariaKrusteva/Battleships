function Point(x, y, size, ctx){

  this.getX = function() {
    return x;
  }

  this.getY = function() {
    return y;
  }

  this.getSize = function() {
    return size;
  }

  this.getCtx = function() {
    return ctx;
  }

}

Point.prototype.print = function() {
  this.getCtx().fillRect(this.getX() * this.getSize(), this.getY() * this.getSize(), this.getSize(), this.getSize());
}

Point.prototype.equivalent = function(point) {
  return this.getX() === point.getX() && this.getY() === point.getY();
}
