"use strict";

function log(message){
  var logElem = document.getElementById("log");
  //var currentHTML = logElem.innerHTML;
  //logElem.innerHTML = message + "\n" + currentHTML;
  logElem.innerHTML += message + "\n";
}

function clearLog(){
  document.getElementById("log").innerHTML = "";
}
