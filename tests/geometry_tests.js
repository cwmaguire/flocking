"use strict";

var geometryTests = [];

function addGeometryTest(fun){
  geometryTests.push(fun);
}

function getGeometryTests(){
  return geometryTests.slice(0);
}

addGeometryTest(function testPoint(){
  var newPoint = point(1,2);

  if(newPoint.x != 1 || newPoint.y != 2){
    return "new point should be 1,2 not " + pointToString(newPoint);
  }else{
    return true;
  }
});

addGeometryTest(function testNewPointScale(){
  var pointScale = newPointScale(point(1,2), 2.0);

  if(!pointsEqual(point(1,2), pointScale.point) || 2.0 != pointScale.scale){
    return "PointScale should be created with point {1,2} and " +
           "and scale 2.0 but was " + pointToString(pointScale.point) +
           " and " + pointScale.scale;
  }else{
    return true;
  }
});

addGeometryTest(function testDistance(){
  if(5 != distance({'x': 0, 'y': 0}, {'x': 3, 'y': 4})){
    return "Distance between 0,0 and 3,4 should be " + 
           "sqrt(3^2 + 4^2), or sqrt(9 + 16) or sqrt(25) " +
           "or 5";
  }else{
    return true;
  }
});

addGeometryTest(function testScaledRelativePoints(){
  var referencePoint = point(10,10);
  var absolutePointScales = [newPointScale(point(8,12), 1),
                             newPointScale(point(12,8), 2),
                             newPointScale(point(10,10), 3)];

  var result = scaledRelativePoints(referencePoint, absolutePointScales);

  if(!pointsEqual(result[0], point(-2,2)) ||
     !pointsEqual(result[1], point(4,-4)) ||
     !pointsEqual(result[2], point(0,0))){
    return "Relative points should be {-2,2}, {4,-4}, and {0,0} not " +
           pointToString(result[0]) + ", " +
           pointToString(result[1]) + ", " +
           pointToString(result[2]);
  }else{
    return true;
  }
});
