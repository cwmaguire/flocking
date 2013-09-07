"use strict";

var boidsTests = [];

function addBoidsTest(fun){
  boidsTests.push(fun);
}

function getBoidsTests(){
  return boidsTests.slice(0);
}

testApplyMovementPipeline(){
  var drawBoidTestFun = function(boid){ return true; };
  var velocity = 10;
  var boid0 = boid(point(9,9), 9);
  var boid1 = boid(point(10,10), 10);
  var boid2 = boid(point(11,11), 11);

  // Okay, do all the math and figure out what these should be ...
  // OR figure out a way to mock out arenaPoint and flockPoint
}

function testCombinePoints(){
  var startPoint = point(10, 10);
  var endPoints = [point(13, 14), point(13, 14)];
  var velocity = 20;

  var result = combinePoints(startPoint, endPoints, velocity);

  if(!pointsEqual(point(16,18), result)){
    return "10,10 should move 6 right and 8 down to 16,18 but went to " +
           pointToString(result) + " instead.";
  }else{
    return true;
  }
}
addBoidsTest(testCombinePoints);

function testMoveBoid(){
  var result = moveBoid({'location': point(10, 20)},
                        point(100, 200));
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
