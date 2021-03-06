"use strict";

function getTests(){
  var tests = [];
  tests = tests.concat(getArenaTests());
  tests = tests.concat(getGeometryTests());
  tests = tests.concat(getFunTests());
  tests = tests.concat(getFlockTests());
  tests = tests.concat(getBoidsTests());
  document.getElementById("testResults").innerHTML = "found " + tests.length + " tests";
  return tests;
}

function runTests(tests, results){
  if(tests === undefined){
    tests = getTests();
  }
  if(results === undefined){
    results = [];
  }
  if(tests.length == 0){
    showTestResults(results);
    return;
  }

  var result;
  try{
    result = tests[0].call(null);
  }catch(err){
    result = tests[0].toString().split("(")[0] + " caused error: " + err.message + " (" + err.lineNumber + ")";
  }
  var newResults = results.slice(0);
  if(result != true){
    //newResults.push(result);
    newResults.push(tests[0].toString().split("(")[0] + ": " + result);
  }
  return runTests(tests.slice(1), newResults);
}

function isFunction(fun){
  var obj = {};
  return fun && obj.toString.call(fun) === '[object Function]';
}

function showTestResults(results){
  var testDiv = document.getElementById("testResults");
  if(results.length == 0){
    testDiv.innerHTML += "<br>All Tests Passed";
  }else{
    testDiv.innerHTML += "<br>Test failures:<br>";
    showTestFailures(testDiv, results);
  }
}

function showTestFailures(div, failures){
  if(failures.length == 0){
    return;
  }
  div.innerHTML += failures[0] + "<br>";
  showTestFailures(div, failures.slice(1));
}

function arraysEqual(array1, array2){
  if(array1.length == 0 && array2.length == 0){
    return true;
  }else if(array1.length == 0 || array2.length == 0){
    return false;
  }else if(array1[0] == array2[0]){
    return arraysEqual(array1.slice(1), array2.slice(1));
  }else{
    return false;
  }
}

function randomInt(min, max){
  if(max === undefined){
    max = min;
    min = 0;
  }
  return min + Math.round(Math.random() * (max - min));
}
