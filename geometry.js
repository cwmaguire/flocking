"use strict";

function point(x, y){
  return {'x': x, 'y': y};
}

function newPointWeight(point, weight){
  return {'point': point, 'weight': weight};
}

function getPointWeightX(pointWeight){
  return pointWeight.point.x;
}

function getWeightedX(pointWeight){
  return pointWeight.point.x * pointWeight.weight;
}

function getWeightedY(pointWeight){
  return pointWeight.point.y * pointWeight.weight;
}

function getPointWeightY(pointWeight){
  return pointWeight.point.y;
}

function applyPercentage(pointWeights, percent){
  var applyPercentage_ = function(pointWeight){
    return newPointWeight(pointWeight.point, pointWeight.weight * percent);
  };

  return map(applyPercentage_, pointWeights);
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

function pointsRelativeTo(referencePoint, absolutePointWeights){
  var fun = function(absolutePointWeight){
    var absolutePoint = absolutePointWeight.point;
    var weight = absolutePointWeight.weight;
    var relativeX = absolutePoint.x - referencePoint.x;
    var relativeY = absolutePoint.y - referencePoint.y;
    return newPointWeight(point(relativeX, relativeY), weight);
  }

  return map(fun, absolutePoints);
}
