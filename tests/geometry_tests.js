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
