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

function map(fun, xs, results){
  if(results === undefined){
    results = [];
  }
  if(xs.length == 0){
    return results;
  }
  var result = fun.call(null, xs[0]);
  var newResults = results.slice(0);
  newResults.push(result);
  return map(fun, xs.slice(1), newResults);
}

