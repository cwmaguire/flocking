"use strict";

var flockTests = [];

function addFlockTest(fun){
  flockTests.push(fun);
}

function getFlockTests(){
  return flockTests.slice(0);
}

function testFlockVector(){
  var boid0 = newBoid(point(0, 0));
  var boid1 = newBoid(point(3, 4));
  var boid2 = newBoid(point(4, 5));
  var boid3 = newBoid(point(2, 3));
  var boid4 = newBoid(point(-1, -2));

  var world = newWorld(boid0,
                       [boid1, boid2, boid3, boid4],
                       [],
                       5,
                       0,
                       5);

  //log("test flockVector");
  var result = flockVector(world);

  if(!pointsEqual(point(0,1), result)){
    return "Wow, the calculations are ridiculous but should be {0,1}, not " + pointToString(result);
  }

  return true;
}
addFlockTest(testFlockVector);

function testFindNeighboursInRange(){
  var boid0 = newBoid(point(0, 0));
  var boid1 = newBoid(point(3, 4));
  var boid2 = newBoid(point(4, 5));
  var boid3 = newBoid(point(2, 3));
  var boid4 = newBoid(point(-2, -3));
  var boid5 = newBoid(point(-4, -5));
  var boid6 = newBoid(point(-2, 3));
  var boid7 = newBoid(point(-4, 5));
  var boid8 = newBoid(point(2, -3));
  var boid9 = newBoid(point(4, -5));

  var world = newWorld(boid0,
                       [boid1, boid2, boid3],
                       [],
                       5,
                       0,
                       5);
  var result = findNeighboursInRange(world);

  if(!(result.length == 1 &&
       pointsEqual(boid3.location, result[0].boid.location))){
    return "Points {3,4} and {2,3} should have been < five to {0,0}, " +
           "but not {4,5}; got " + pointToString(result[0].boid.location) +
           " and " + pointToString(result[1].boid.location);
  }

  world = newWorld(boid0, [boid4, boid5], [], 5, 0, 5);

  result = findNeighboursInRange(world);
  if(!result.length == 1 && pointsEqual(boid4.location, result[0].boid.location)){
    return "Point {-2,-3} should be within 4 of {0,0} but not {-4,-5}; got " +
           result;
  }

  world = newWorld(boid0, [boid6, boid7], [], 5, 0, 5);

  result = findNeighboursInRange(world);
  if(!result.length == 1 && pointsEqual(boid6.location, result[0].boid.location)){
    return "Point {-2,3} should be within 4 of {0,0} but not {-4,5}; got" +
           result;
  }

  world = newWorld(boid0, [boid8, boid9], [], 5, 0, 5);

  result = findNeighboursInRange(world);
  if(!result.length == 1 && pointsEqual(boid8.location, result[0].boid.location)){
    return "Point {2,-3} should be within 4 of {0,0} but not {4,5}; got" +
           result;
  }

  return true;
}
addFlockTest(testFindNeighboursInRange);

function testAdjustToNeighbours(){
  var neighbour1 = {'boid': {'location': {'x': 12, 'y': 13}}, 'distance': 5};
  var neighbour2 = {'boid': {'location': {'x': 11, 'y': 14}}, 'distance': 5};

  var world = newWorld(newBoid(point(10,9)), [], [], 0, 0, 10);

  var result = adjustToNeighbours(world, [neighbour1, neighbour2]);

  if(!(pointsEqual({'x': 8, 'y': 5}, result[0]) &&
       pointsEqual({'x': 9, 'y': 4}, result[1]))){
    return "testAdjustToNeighbours should have returned {8,5} and {9,4} for points " +
           "{12,13} and {11,14} and starting point {10,9}; instead it returned " +
           pointToString(result[0]) + " and " + pointToString(result[1]);
  }else{
    return true;
  }
}
addFlockTest(testAdjustToNeighbours);

function testAdjustToNeighbour(){
  var world = newWorld(newBoid(point(10, 20)), [], [], 0, 0, 10);

  var result = adjustToNeighbour(world,
                                 {'boid': {'location': {'x': 12, 'y': 25}},
                                  'distance': 5});
  if(!pointsEqual(result, point(8, 15))){
    return "testAdjust to neighbour with a distance of 5 and a range of 15 means " +
           "that the boid will try and go 100% of the remaining range (100% of x1 - x2, 100% of y1 - y2) " +
           "in the opposite direction; instead it tried to go to: " + pointToString(result);
  }

  result = adjustToNeighbour(world,
                             {'boid': {'location': point(8, 15)},
                              'distance': 5});
  if(!pointsEqual(result, point(12, 25))){
    return "Boid should go to {12, 25}, not " + pointToString(result);
  }

  result = adjustToNeighbour(world,
                             {'boid': {'location': point(12, 15)},
                              'distance': 5});
  if(!pointsEqual(result, point(8, 25))){
    return "Boid should go to {12, 25}, not " + pointToString(result);
  }

  result = adjustToNeighbour(world,
                             {'boid': {'location': point(8, 25)},
                              'distance': 5});
  if(!pointsEqual(result, point(12, 15))){
    return "Boid should go to {12, 25}, not " + pointToString(result);
  }

  return true;
}
addFlockTest(testAdjustToNeighbour);

// Test with no adjustments
// Velocity does not bound adjustments

function testAggregatedAdjustments(){
  var point1 = point(10, 20);
  var point2 = point(20, 40);
  var world = {'boid': {'location': point(1, 1)}};

  var result = aggregateAdjustments([point1, point2], world);
  var expectedPoint = point(15, 30);
  if(!pointsEqual(result, expectedPoint)){
    return "testAggregatedAjustments [{10,20},{20,40}] should have " +
           "returned {15,30}, not " + pointToString(result);
  }

  result = aggregateAdjustments([], world);
  if(!pointsEqual(result, world.boid.location)){
    return "testAggregatedAdjustmens [] should have " +
           "returned {1,1}, not " + pointToString(result);
  }

  return true;
}
addFlockTest(testAggregatedAdjustments);

function testProportionateAdjustment(){
  var result = proportionateAdjustment({'x': 2, 'y': 3}, 0.5);

  if(!pointsEqual({'x': 1, 'y': 2}, result)){
    return "50% of {2,3} should be round down to {1,2}, not " + pointToString(result);
  }

  result = proportionateAdjustment({'x': 4, 'y': 8}, 0.75);

  if(!pointsEqual({'x': 3, 'y': 6}, result)){
    return "75% of {4,8} should be round down to {3,6}, not " + pointToString(result);
  }

  return true;
}
addFlockTest(testProportionateAdjustment);

function testSum(){
  var result = sum(1, 2);
  if(result != 3){
    return "1 + 3 should == 3, not " + result;
  }else{
    return true;
  }
}
addFlockTest(testSum);

function testGetX(){
  var result = getX({'x': 1});
  if(result != 1){
    return "getX({'x',1}) should return 1, not " + result;
  }else{
    return true;
  }
}
addFlockTest(testGetX);

function testGetY(){
  var result = getY({'y': 1});
  if(result != 1){
    return "getX({'y',1}) should return 1, not " + result;
  }else{
    return true;
  }
}
addFlockTest(testGetY);

addFlockTest(function testBoidDistanceToString(){
  var boidDistance = {'boid': newBoid(point(10, 20), 10),
                      'distance': 0.213};
  var bdString = boidDistanceToString(boidDistance);
  var expectedString =  "boid: location = {10,20}, radius = 10, distance = 0.213";
  if(bdString != expectedString){
    return "Expected<br>" + expectedString +
           "<br>but got<br>" + bdString;
  }else{
    return true;
  }
});
