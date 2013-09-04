"use strict";

function distance(p1, p2){
  var a = Math.abs(p1.x - p2.x);
  var b = Math.abs(p1.y - p2.y);
  var aSquared = Math.pow(a, 2);
  var bSquared = Math.pow(b, 2);
  return Math.sqrt(aSquared + bSquared);
}
