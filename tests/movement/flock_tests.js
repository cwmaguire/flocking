"use strict";

var flockTests = [];

function addFlockTest(fun){
  flockTests.push(fun);
}

function getFlockTests(){
  return flockTests.slice(0);
}

function testFlockVector(){
  var boid0 = {'location': {'x': 0, 'y': 0}};
  var boid1 = {'location': {'x': 3, 'y': 4}};
  var boid2 = {'location': {'x': 4, 'y': 5}};
  var boid3 = {'location': {'x': 2, 'y': 3}};
  var boid4 = {'location': {'x': -1, 'y': -2}};

  var result = flockVector(boid0,
                           [boid1, boid2, boid3, boid4],
                           {'range': 5, 'velocity': 5});

  return true;
}
addFlockTest(testFlockVector);

function testFindNeighboursInRange(){
  var point = {'x': 0, 'y': 0};
  var boid1 = {'location': {'x': 3, 'y': 4}};
  var boid2 = {'location': {'x': 4, 'y': 5}};
  var boid3 = {'location': {'x': 2, 'y': 3}};
  var boid4 = {'location': {'x': -2, 'y': -3}};
  var boid5 = {'location': {'x': -4, 'y': -5}};
  var boid6 = {'location': {'x': -2, 'y': 3}};
  var boid7 = {'location': {'x': -4, 'y': 5}};
  var boid8 = {'location': {'x': 2, 'y': -3}};
  var boid9 = {'location': {'x': 4, 'y': -5}};

  var result = findNeighboursInRange(point, [boid1, boid2, boid3], 5);

  if(!(result.length == 1 &&
       pointsEqual(boid3.location, result[0].boid.location))){
    return "Points {3,4} and {2,3} should have been < five to {0,0}, " +
           "but not {4,5}; got " + pointToString(result[0].boid.location) +
           " and " + pointToString(result[1].boid.location);
  }


  result = findNeighboursInRange(point, [boid4, boid5], 5);
  if(!result.length == 1 && pointsEqual(boid4.location, result[0].boid.location)){
    return "Point {-2,-3} should be within 4 of {0,0} but not {-4,-5}; got " +
           result;
  }

  result = findNeighboursInRange(point, [boid6, boid7], 5);
  if(!result.length == 1 && pointsEqual(boid6.location, result[0].boid.location)){
    return "Point {-2,3} should be within 4 of {0,0} but not {-4,5}; got" +
           result;
  }

  result = findNeighboursInRange(point, [boid8, boid9], 5);
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

  var result = adjustToNeighbours({'x': 10, 'y': 9}, [neighbour1, neighbour2], 10);

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

  var result = adjustToNeighbour({'x': 10, 'y': 20},
                             {'boid': {'location': {'x': 12, 'y': 25}},
                              'distance': 5},
                             10);
  if(!pointsEqual(result, {'x': 8, 'y': 15})){
    return "testAdjust to neighbour with a distance of 5 and a range of 15 means " +
           "that the boid will try and go 100% of the remaining range (100% of x1 - x2, 100% of y1 - y2) " +
           "in the opposite direction; instead it tried to go to: " + pointToString(result);
  }

  result = adjustToNeighbour({'x': 10, 'y': 20},
                             {'boid': {'location': {'x': 8, 'y': 15}},
                              'distance': 5},
                             10);
  if(!pointsEqual(result, {'x': 12, 'y': 25})){
    return "Boid should go to {12, 25}, not " + pointToString(result);
  }

  result = adjustToNeighbour({'x': 10, 'y': 20},
                             {'boid': {'location': {'x': 12, 'y': 15}},
                              'distance': 5},
                             10);
  if(!pointsEqual(result, {'x': 8, 'y': 25})){
    return "Boid should go to {12, 25}, not " + pointToString(result);
  }

  result = adjustToNeighbour({'x': 10, 'y': 20},
                             {'boid': {'location': {'x': 8, 'y': 25}},
                              'distance': 5},
                             10);
  if(!pointsEqual(result, {'x': 12, 'y': 15})){
    return "Boid should go to {12, 25}, not " + pointToString(result);
  }

  return true;
}
addFlockTest(testAdjustToNeighbour);

function testAggregatedAdjustments(){
  var point1 = {'x': 10, 'y': 20};
  var point2 = {'x': 20, 'y': 40};

  var result = aggregateAdjustments([point1, point2], 100);
  var expectedPoint = {'x': 15, 'y': 30};
  if(!pointsEqual(result, expectedPoint)){
    return "testAggregatedAjustments [{10,20},{20,40}] should have " +
           "returned {15,30}, not " + pointToString(result);
  }

  result = aggregateAdjustments([point1, point2], 10);
  expectedPoint = {'x': 4, 'y': 9}; // velocity 10 is about 29% of the distnance 33
  if(!pointsEqual(result, expectedPoint)){
    return "testAggregatedAdjustmens [{10,20},{20,40}] should have " +
           "returned {3,6}, not " + pointToString(result);
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
