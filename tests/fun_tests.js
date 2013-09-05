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
addGeometryTest(testMap);

function addOne(x){return x + 1}

