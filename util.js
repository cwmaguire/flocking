"use strict";

function log(message){
  var logElem = document.getElementById("log");

  if(!document.getElementById("shouldLog").checked){
    return;
  }
  logElem.innerHTML += message + "\n";
}

function clearLog(){
  document.getElementById("log").innerHTML = "";
}
