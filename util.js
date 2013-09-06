"use strict";

function log(message){
  var logElem = document.getElementById("log");
  var currentHTML = logElem.innerHTML;
  logElem.innerHTML = message + "\n" + currentHTML;
}

function clearLog(){
  document.getElementById("log").innerHTML = "";
}
