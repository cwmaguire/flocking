"use strict";

function point(x, y){
  return {'x': x, 'y': y};
}

function newPointScale(point, scale){
  return {'point': point, 'scale': scale};
}

function getPointScaleX(pointScale){
  return pointScale.point.x;
}

function getScaledX(pointScale){
  return pointScale.point.x * pointScale.scale;
}

function getScaledY(pointScale){
  return pointScale.point.y * pointScale.scale;
}

function getPointScaleY(pointScale){
  return pointScale.point.y;
}

function getPointScaleScale(pointScale){
  return pointScale.scale;
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

function scaledRelativePoints(referencePoint, absolutePointScales){
  var fun = function(absolutePointScale){
    var absolutePoint = absolutePointScale.point;
    var scale = absolutePointScale.scale;
    var relativeX = absolutePoint.x - referencePoint.x;
    var relativeY = absolutePoint.y - referencePoint.y;
    var scaledX = relativeX * absolutePointScale.scale;
    var scaledY = relativeY * absolutePointScale.scale;
    return point(scaledX, scaledY);
  }

  return map(fun, absolutePointScales);
}
