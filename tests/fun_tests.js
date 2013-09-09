"use strict";

var funTests = [];

function addFunTest(fun){
  funTests.push(fun);
}

function getFunTests(){
  return funTests.slice(0);
}

function testMap(){
  var result = map(addOne, [1,2,3]);
  if(!arraysEqual(result, [2,3,4])){
    return "Map(addOne, [1,2,3]) should == [2,3,4], not " + result;
  }else{
    return true;
  }
}
addFunTest(testMap);

function addOne(x){return x + 1}

function testFoldl(){
  var result = foldl(sum, [1,2,3], 0);
  if(result != 6){
    return "foldl(sum, [1,2,3] should return 6, not " + result;
  }else{
    return true;
  }
}
addFunTest(testFoldl);

function sum(x, y){return x + y};

function testReduce(){
  var result = reduce(arrayUnshift, [[], 1,2,3]);
  if(!arraysEqual(result, [3,2,1])){
    return "reduce(arrayPush, [[], 1,2,3]) should have applied arrayUnshift " +
           "to the accumulator and each subsequent value to get " + 
           "[3,2,1], not " + result;
  }else{
    return true;
  }
}
addFunTest(testReduce);

function arrayUnshift(array, x){
  var arrayCopy = array.slice(0);
  arrayCopy.unshift(x);
  return arrayCopy;
}
