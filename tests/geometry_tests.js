"use strict";

var geometryTests = [];

function addGeometryTest(fun){
  geometryTests.push(fun);
}

function getGeometryTests(){
  return geometryTests.slice(0);
}

function testDistance(){
  if(5 != distance({'x': 0, 'y': 0}, {'x': 3, 'y': 4})){
    return "Distance between 0,0 and 3,4 should be " + 
           "sqrt(3^2 + 4^2), or sqrt(9 + 16) or sqrt(25) " +
           "or 5";
  }else{
    return true;
  }
}
addGeometryTest(testDistance);

function testPointsRelativeTo(){
  var referencePoint = point(10,10);
  var absolutePoints = [point(8,12),
                        point(12,8),
                        point(10,10)];

  var result = pointsRelativeTo(referencePoint, absolutePoints);

  var expectedResults = [point(-2,2), point(2,-2), point(0,0)];

  if(!pointsEqual(result[0], point(-2,2)) ||
     !pointsEqual(result[1], point(2,-2)) ||
     !pointsEqual(result[2], point(0,0))){
    return "Relative points should be {-2,2}, {2,-2}, and {0,0} not " +
           pointToString(result[0]) + ", " +
           pointToString(result[1]) + ", " +
           pointToString(result[2]);
  }else{
    return true;
  }
}
addGeometryTest(testPointsRelativeTo);
