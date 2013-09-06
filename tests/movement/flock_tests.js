"use strict";

var flockTests = [];

function addFlockTest(fun){
  flockTests.push(fun);
}

function getFlockTests(){
  return flockTests.slice(0);
}

function testAdjustToNeighbours(){
  var neighbour1 = {'boid': {'point': {'x': 12, 'y': 13}}, 'distance': 5};
  var neighbour2 = {'boid': {'point': {'x': 11, 'y': 14}}, 'distance': 5};

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
                             {'boid': {'point': {'x': 12, 'y': 25}},
                              'distance': 5},
                             10);
  if(!pointsEqual(result, {'x': 8, 'y': 15})){
    return "testAdjust to neighbour with a distance of 5 and a range of 15 means " +
           "that the boid will try and go 100% of the remaining range (100% of x1 - x2, 100% of y1 - y2) " +
           "in the opposite direction; instead it tried to go to: " + pointToString(result);
  }

  result = adjustToNeighbour({'x': 10, 'y': 20},
                             {'boid': {'point': {'x': 8, 'y': 15}},
                              'distance': 5},
                             10);
  if(!pointsEqual(result, {'x': 12, 'y': 25})){
    return "Boid should go to {12, 25}, not " + pointToString(result);
  }

  result = adjustToNeighbour({'x': 10, 'y': 20},
                             {'boid': {'point': {'x': 12, 'y': 15}},
                              'distance': 5},
                             10);
  if(!pointsEqual(result, {'x': 8, 'y': 25})){
    return "Boid should go to {12, 25}, not " + pointToString(result);
  }

  result = adjustToNeighbour({'x': 10, 'y': 20},
                             {'boid': {'point': {'x': 8, 'y': 25}},
                              'distance': 5},
                             10);
  if(!pointsEqual(result, {'x': 12, 'y': 15})){
    return "Boid should go to {12, 25}, not " + pointToString(result);
  }

  return true;
}
addFlockTest(testAdjustToNeighbour);

function testAggregatedAdjustments(){
  var point1 = {'x': 10, 'y':20};
  var point2 = {'x': 20, 'y':40};
  var result = aggregateAdjustments([point1, point2]);
  var expectedPoint = {'x': 15, 'y': 30};
  if(!pointsEqual(result, expectedPoint)){
    return "testAggregatedAjustmens [{10,20},{20,40}] should have " +
           "returned {15,30}, not " + pointToString(result);
  }else{
    return true;
  }
}
addFlockTest(testAggregatedAdjustments);

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
