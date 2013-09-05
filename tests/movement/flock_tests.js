"use strict";

var flockTests = [];

function addFlockTest(fun){
  flockTests.push(fun);
}

function getFlockTests(){
  return flockTests.slice(0);
}

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
