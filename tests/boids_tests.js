"use strict";

var boidsTests = [];

function addBoidsTest(fun){
  boidsTests.push(fun);
}

function getBoidsTests(){
  return boidsTests.slice(0);
}

function testMoveBoid(){
  var result = moveBoid({'location': {'x': 10, 'y': 20}},
                        {'x': 100, 'y': 200});
  var x = result.location.x;
  var y = result.location.y;

  if(x != 100 || y != 200){
    return "10,20 should move to 100,200 not " + pointToString(result.location);
  }else{
    return true;
  }
}
addBoidsTest(testMoveBoid);

function testCopy(){
  var result = copyBoid({'location': {'x': 10, 'y': 20}, 'radius': 50});
  var location = result.location;
  var radius = result.radius;

  if(location.x != 10 || location.y != 20 || radius != 50){
    return "x,y,r should be 10,20,50, not " + location.x + "," +
           location.y + "," + radius;
  }else{
    return true;
  }
}
addBoidsTest(testCopy);
