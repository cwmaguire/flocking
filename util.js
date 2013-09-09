"use strict";

function log(message){
  var logElem = document.getElementById("log");
  //
  if(!document.getElementById("shouldLog").checked){
    return;
  }
  //var currentHTML = logElem.innerHTML;
  //logElem.innerHTML = message + "\n" + currentHTML;
  logElem.innerHTML += message + "\n";
}

function clearLog(){
  document.getElementById("log").innerHTML = "";
}
