"use strict";

var boidsTests = [];

function addBoidsTest(fun){
  boidsTests.push(fun);
}

function getBoidsTests(){
  return boidsTests.slice(0);
}

addBoidsTest(function testAnimateBoids(){
  // create a dummy object with some random
  // fields that a mocked drawBoidFun can set, to 
  // make sure the 
  var drawFun = function(){
                  //log("drawFun called");
                  return true;
                };

  var movementFun = function twelveTwelve(world){
                      var p = point(12, 12);
                      //log("twelveTwelve point = " + pointToString(p));
                      return point(12, 12);
                    };

  var world = {'boid': newBoid(point(10, 10)),
               'boids': [],
               'movedBoids': [],
               'velocity': 10,
               'movements': [{'fun': movementFun, 'scale': 1.0}]};

  var movedBoids = animateBoids(drawFun, world);

  if(!pointsEqual(point(12, 12), movedBoids[0].location)){
    return "testAnimateBoids: 10,10 should be moved to 12,12 not " +
           pointToString(movedBoids[0].location);
  }else{
    return true;
  }
});

addBoidsTest(function testMoveBoid(){
  var boid = newBoid(point(10,10), 10);
  var testWorld = newWorld(boid);
  var testFun1 = function(world){return point(12, 10);};
  var testFun2 = function(world){return point(10, 8);};
  testWorld.velocity = 10;
  testWorld.movements = [{'fun': testFun1, 'scale': 1.0},
                         {'fun': testFun2, 'scale': 1.0}];
  var movedBoid = moveBoid(testWorld);
  var x = movedBoid.location.x;
  var y = movedBoid.location.y;

  if(!pointsEqual(point(12, 8), movedBoid.location)){
    return "12,10 and 10,8 should move 10,10 to 12,8 not " + pointToString(movedBoid.location);
  }else{
    return true;
  }
});

addBoidsTest(function testShiftBoids(){
  var boid1 = newBoid(point(0,0), 0);
  var boid2 = newBoid(point(1,1), 1);
  var world = {'boid': 4,
               'boids': [boid1, 2],
               'movedBoids': [3]};
  var newWorld = shiftBoids(world, boid2);

  if(newWorld.boid.radius != 0 ||
     !arraysEqual(newWorld.boids, [2]) ||
     newWorld.movedBoids.length != 2 ||
     newWorld.movedBoids[0] != 3 ||
     newWorld.movedBoids[1].radius != 1 ||
     newWorld.boid == boid1 ||
     newWorld.movedBoids[1] == boid2){
    return "boids[0] (boid1) should be copied and be the new boid; boid should be dropped; " +
           "movedBoid (boid2) should be pushed onto the end of movedBoids; newWorld.boid " +
           "should not be the same object as boid1 (it should have been copied); " +
           "newWorld's last movedBoid should not be the same object as boid2 (again, it should " +
           "have been copied."
  }else{
    return true;
  }
});

addBoidsTest(function testChangeWorldBoids(){
  var world = {'boid': 1,
               'boids': 2,
               'movedBoids': 3,
               'velocity': 4,
               'canvasDimensions': 5,
               'range': 6};

  var movedWorld = changeWorldBoids(7, 8, 9, world);

  //log("movedWorld.boid = " + movedWorld.boid);
  //log("movedWorld.boids = " + movedWorld.boids);
  //log("movedWorld = " + movedWorld.boid);

  if(movedWorld.boid != 7 ||
     movedWorld.boids != 8 ||
     movedWorld.movedBoids != 9 ||
     world == movedWorld){
    return "movedWorld should have new values set and not be the same " +
           "object as the original world."
  }else{
    return true;
  }
});

addBoidsTest(function testNewWorld(){
  var world = newWorld(1,2,3,4,5,6);

  if(world.boid != 1 ||
     world.boids != 2 ||
     world.movedBoids != 3 ||
     world.velocity != 4 ||
     world.canvasDimensions != 5 ||
     world.range != 6){
    return "World not created with correct field values";
  }else{
    return true;
  }
});


addBoidsTest(function testLastMovedBoid(){
  var world = {'movedBoids': [0, 1, 2]};
  var result = lastMovedBoid(world);
  if(result != 2){
    return "Last 'moved boid' should be 2, not " + result;
  }else{
    return true;
  }
});

addBoidsTest(function testCombineMovements(){
  var startPoint = point(10, 10);
  var pointScale1 = newPointScale(point(14, 13), 2.0);
  var pointScale2 = newPointScale(point(8, 8), 1.0);
  var pointScales = [pointScale1, pointScale2];
  var world = newWorld(newBoid(startPoint));
  world.velocity = 20;

  var result = combineMovements(world, pointScales);

  if(!pointsEqual(point(16,14), result)){
    return "10,10 should move 6 right and 4 up to 16,14 but went to " +
           pointToString(result) + " instead.";
  }

  var pointScale3 = newPointScale(point(6, 7), 1.0);
  var world2 = newWorld(newBoid(startPoint));
  world2.velocity = 2.5;

  var result2 = combineMovements(world2, [pointScale1, pointScale3]);

  if(!pointsEqual(point(12, 11.5), result2)){
    return "10,10 should move 4 left but 8 right (for 4 right total) " +
           "and 3 up but 6 down (for 3 down total), which would put it " +
           "at 14,13 except it's constrained by a 2.5 velocity, (where 14,13 " +
           "would be a 5 velocity) which puts it at 12,11.5; however, it was at " +
           pointToString(result) + " instead.";
  }

  return true;
});

addBoidsTest(function constrainDistTest(){
  var p = point(6,8);
  var velocity = 5;
  var result = constrainDist(p, velocity);

  if(!pointsEqual(point(3,4), result)){
    return "Distance of 6,8 is 10 and should be cut in half " + 
           "to 3,4 but was " + pointToString(result);
  }else{
    return true;
  }
});

addBoidsTest(function sumPointsTest(){
  var p1 = point(1, 2);
  var p2 = point(3, 4);
  var result = sumPoints(p1, p2);

  if(!pointsEqual(point(4,6), result)){
    return "Points 1,2 and 3,4 should add to 4,6 but the result was " +
           pointToString(result);
  }else{
    return true;
  }
});

addBoidsTest(function testCopyBoid(){
  var result = copyBoid({'location': {'x': 10, 'y': 20}, 'radius': 50});
  var location = result.location;
  var radius = result.radius;

  if(location.x != 10 || location.y != 20 || radius != 50){
    return "x,y,r should be 10,20,50, not " + location.x + "," +
           location.y + "," + radius;
  }else{
    return true;
  }
});

addBoidsTest(function testAddBoid(){
  var testPoint = point(10, 10);
  boids = [];
  addBoid(testPoint);
  if(boids.length != 1 ||
     !pointsEqual(testPoint, boids[0].location) ||
     boids[0].radius != 10){
    log("location: " + pointToString(boids[0].location));
    log("radius: " + boids[0].radius);
    boids = [];
    return "Single boid should be added with specified point " +
           "and radius should be undefined";
  }else{
    boids = [];
    return true;
  }
});

addBoidsTest(function testNewBoid(){
  var boid = newBoid(1,2);
  if(boid.location != 1 ||
     boid.radius != 2){
    return "Boid location & radius should be 1,2 not " +
           boid.location + "," + boid.radius;
  }else{
    return true;
  }
});

addBoidsTest(function testBoidToString(){
  var boid = newBoid(point(10, 20), 10);
  var boidString = boidToString(boid);
  var expectedString = "boid: location = {10,20}, radius = 10";
  if(boidString != expectedString){
    return "Expected string: \n" + expectedString + "\n ... but got: " + boidString;
  }else{
    return true;
  }
});

addBoidsTest(function testBoidsToString(){
  var boid1 = newBoid(point(10, 20), 10);
  var boid2 = newBoid(point(11, 21), 11);
  var expectedString = "foo: [\n  boid: location = {11,21}, radius = 11\n  " +
                       "boid: location = {10,20}, radius = 10\n]\n";
  var boidsString = boidsToString("foo", [boid1, boid2]);
  if(boidsString != expectedString){
    //log("Exp len = " + expectedString.length + ", act len = " + boidsString.length);
    //log("expected string: \n" + expectedString);
    //log("boidString: \n" + boidsString);
    return "Expected string:<br>" + expectedString + "<br>... but got:<br>" + boidsString;
  }else{
    return true;
  }
});

addBoidsTest(function testWorldToString(){
  var boid1 = newBoid(point(10, 20), 10);
  var boid2 = newBoid(point(11, 21), 11);
  var boid3 = newBoid(point(12, 22), 12);
  var boid4 = newBoid(point(13, 23), 13);
  var boid5 = newBoid(point(14, 24), 14);
  var world = newWorld(boid1,
                       [boid2, boid3],
                       [boid4, boid5],
                       5,
                       {'w': 1111, 'h': 2222},
                       6);

  var boidString = "boid: location = {10,20}, radius = 10";
  var boidsString = "boids: [\n  boid: location = {12,22}, radius = 12\n  " +
                       "boid: location = {11,21}, radius = 11\n]\n";
  var movedBoidsString = "movedBoids: [\n  boid: location = {14,24}, radius = 14\n  " +
                       "boid: location = {13,23}, radius = 13\n]\n";
  var expectedString = "world:\n" + boidString + "\n" + boidsString +
                       movedBoidsString + "velocity: 5\ndimensions: {1111,2222}\nrange: 6\nctx: undefined";

  var worldString = worldToString(world);

  if(expectedString != worldString){
    return "ExpectedString ...<br>" + expectedString + "<br>... does not match ...<br>" +
           worldString;
  }else{
    return true;
  }
});

