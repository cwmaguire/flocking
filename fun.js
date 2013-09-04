"use strict";

function reduce(fun, arr, accum){
  if(accum === undefined){
    if(arr.length == 0){
      return null;
    }
    accum = arr[0];
    return reduce(fun, arr.slice(1), accum);
  }

  if(arr.length == 0){
    return accum;
  }

  var newAccum = fun.call(null, arr[0], accum);
  return reduce(fun, arr.slice(1), newAccum);
}

function foldl(fun, arr, accum){
  if(arr.length == 0){
    return accum;
  }
  var newAccum = fun.call(null, arr[0], accum);
  return foldl(fun, arr.slice(1), newAccum);
}

function map(fun, arr, results){
  if(results === undefined){
    results = [];
  }
  var newResults = results.slice(0);
  var result = fun.call(null, arr[0]);
  newResults.push(result);
  return reduce(fun, arr.slice(1), newResults);
}

