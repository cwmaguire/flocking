"use strict";

function point(x, y){
  return {'x': x, 'y': y};
}

function distance(p1, p2){
  var a = Math.abs(p1.x - p2.x);
  var b = Math.abs(p1.y - p2.y);
  var aSquared = Math.pow(a, 2);
  var bSquared = Math.pow(b, 2);
  return Math.sqrt(aSquared + bSquared);
}

function pointsEqual(point1, point2){
  return point1.x == point2.x && point1.y == point2.y;
}

function pointToString(point){
  return "{" + point.x + "," + point.y + "}";
}

function pointsRelativeTo(referencePoint, absolutePoints){
  var fun = function(relativePoint){
    return point(relativePoint.x - referencePoint.x,
                 relativePoint.y - referencePoint.y);
  }

  return map(fun, absolutePoints);
}
