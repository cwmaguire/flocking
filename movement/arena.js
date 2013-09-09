"use strict";

var regionFuns = [[outTopLeft, outMidLeft, outMidLeft, outMidLeft, outBottomLeft],
                  [outTopMiddle, midTopLeft, midMidLeft, midBottomLeft, outBottomMiddle],
                  [outTopMiddle, midTopMiddle, center, midBottomMiddle, outBottomMiddle],
                  [outTopMiddle, midTopRight, midMidRight, midBottomRight, outBottomMiddle],
                  [outTopRight, outMidRight, outMidRight, outMidRight, outBottomRight]];

function arenaVector(world){
  var columnPercentages = [0.15, 0.20, 0.30, 0.20, 0.15];
  var rowPercentages = [0.15, 0.20, 0.30, 0.20, 0.15];
  //log("\n" + worldToString(world));
  var regionPoint = regionCoords(world, columnPercentages, rowPercentages);
  var regionFun = regionFuns[regionPoint.x][regionPoint.y].toString();
  return regionFuns[regionPoint.x][regionPoint.y].call(null, world);
}


function regionCoords(world, columnPercentages, rowPercentages){
  var w = world.canvasDimensions.w;
  var h = world.canvasDimensions.h;
  var columnEndPoints = percentsToEndPoints(w, columnPercentages);
  var rowEndPoints = percentsToEndPoints(h, rowPercentages);
  return {'x': regionRowOrColumn(world.boid.location.x, columnEndPoints),
          'y': regionRowOrColumn(world.boid.location.y, rowEndPoints)};
}

function sizes(totalSize, percentages){
  if(percentages.length == 1){
    var lastSize = Math.round(totalSize * percentages[0]);
    return [lastSize];
  }
  var restSizes = sizes(totalSize, percentages.slice(1)).slice(0);
  restSizes.unshift(Math.round(totalSize * percentages[0]));
  return restSizes;
}

function percentsToEndPoints(size, percentages, startPoint, endPoints){
  if(percentages.length > 0){
    if(startPoint === undefined){
      startPoint = 0;
    }
    if(endPoints === undefined){
      endPoints = [];
    }
    var endPoint = percentages[0] * size + startPoint;
    var newEndPoints = endPoints.slice(0);
    newEndPoints.push(endPoint);
    return percentsToEndPoints(size, percentages.slice(1), endPoint, newEndPoints);
  }else{
    return endPoints;
  }
}

function regionRowOrColumn(xOrY, rowOrColEndPoints, rowOrColNum){
  if(rowOrColEndPoints.length == 0){
    return -1;
  }
  if(rowOrColNum === undefined){
    rowOrColNum = 0;
  }
  if(xOrY < rowOrColEndPoints[0]){
    return rowOrColNum;
  }else{
    return regionRowOrColumn(xOrY, rowOrColEndPoints.slice(1), rowOrColNum + 1);
  }
}

//  _________
// |Out_<__  |
// | |M|_|_| | Mid
// | |_|C|_|^| Center
// | |_|_|_| |
// |____>____| Arrows show flow direction as
//             well as how the functions are laid out

// Outside box, from top left counter-clockwise
// to top middle
function outTopLeft(world){ return down(world); }

function outMidLeft(world){ return down(world); }

function outBottomLeft(world){ return right(world); }

function outBottomMiddle(world){ return right(world); }

function outBottomRight(world){ return up(world); }

function outMidRight(world){ return up(world); }

function outTopRight(world){ return left(world); }

function outTopMiddle(world){ return left(world); }

// Middle box, from top left counter-clockwise
// to top middle
function midTopLeft(world){ return left(world); }

function midMidLeft(world){ return left(world); }

function midBottomLeft(world){ return down(world); }

function midBottomMiddle(world){ return down(world); }

function midBottomRight(world){ return right(world); }

function midMidRight(world){ return right(world); }

function midTopRight(world){ return up(world); }

function midTopMiddle(world){ return up(world); }

// The center box
function center(world){ return up(world); }

function up(world){
  return {'x': world.boid.location.x,
          'y': world.boid.location.y - world.velocity};
}

function down(world){
  return {'x': world.boid.location.x,
          'y': world.boid.location.y + world.velocity};
}

function left(world){
  return {'x': world.boid.location.x - world.velocity,
          'y': world.boid.location.y};
}

function right(world){
  return {'x': world.boid.location.x + world.velocity,
          'y': world.boid.location.y};
}
