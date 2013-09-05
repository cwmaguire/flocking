"use strict";

var flockTests = [];

function addFlockTest(fun){
  flockTests.push(fun);
}

function getFlockTests(){
  return flockTests.slice(0);
}

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
