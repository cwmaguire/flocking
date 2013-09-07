"use strict";

var regionFuns = [[outTopLeft, outMidLeft, outMidLeft, outMidLeft, outBottomLeft],
                  [outTopMiddle, midTopLeft, midMidLeft, midBottomLeft, outBottomMiddle],
                  [outTopMiddle, midTopMiddle, center, midBottomMiddle, outBottomMiddle],
                  [outTopMiddle, midTopRight, midMidRight, midBottomRight, outBottomMiddle],
                  [outTopRight, outMidRight, outMidRight, outMidRight, outBottomRight]];

function arenaVector(point, dimensions, velocity){
  var columnPercentages = [0.15, 0.20, 0.30, 0.20, 0.15];
  var rowPercentages = [0.15, 0.20, 0.30, 0.20, 0.15];
  var regionPoint = regionCoords(point, dimensions, columnPercentages, rowPercentages);
  var regionFun = regionFuns[regionPoint.x][regionPoint.y].toString();
  //log("region fun = " + regionFun.split("(")[0]);
  //log("point is " + pointToString(point));
  return regionFuns[regionPoint.x][regionPoint.y].call(null, point, velocity);
}


function regionCoords(point, dimensions, columnPercentages, rowPercentages){
  var columnEndPoints = percentsToEndPoints(dimensions.w, columnPercentages);
  var rowEndPoints = percentsToEndPoints(dimensions.h, rowPercentages);
  return {'x': regionRowOrColumn(point.x, columnEndPoints),
          'y': regionRowOrColumn(point.y, rowEndPoints)};
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
function outTopLeft(point, velocity){ return down(point, velocity); }

function outMidLeft(point, velocity){ return down(point, velocity); }

function outBottomLeft(point, velocity){ return right(point, velocity); }

function outBottomMiddle(point, velocity){ return right(point, velocity); }

function outBottomRight(point, velocity){ return up(point, velocity); }

function outMidRight(point, velocity){ return up(point, velocity); }

function outTopRight(point, velocity){ return left(point, velocity); }

function outTopMiddle(point, velocity){ return left(point, velocity); }

// Middle box, from top left counter-clockwise
// to top middle
function midTopLeft(point, velocity){ return left(point, velocity); }

function midMidLeft(point, velocity){ return left(point, velocity); }

function midBottomLeft(point, velocity){ return down(point, velocity); }

function midBottomMiddle(point, velocity){ return down(point, velocity); }

function midBottomRight(point, velocity){ return right(point, velocity); }

function midMidRight(point, velocity){ return right(point, velocity); }

function midTopRight(point, velocity){ return up(point, velocity); }

function midTopMiddle(point, velocity){ return up(point, velocity); }

// The center box
function center(point, velocity){ return up(point, velocity); }

function up(point, velocity){
  return {'x': point.x,
          'y': point.y - velocity};
}

function down(point, velocity){
  //log("Moving point " + pointToString(point) + " down " + velocity);
  return {'x': point.x,
          'y': point.y + velocity};
}

function left(point, velocity){
  return {'x': point.x - velocity,
          'y': point.y};
}

function right(point, velocity){
  return {'x': point.x + velocity,
          'y': point.y};
}
