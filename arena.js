"use strict";

var regionFuns = [[outTopLeft, outMidLeft, outMidLeft, outMidLeft, outBottomLeft],
                  [outTopMiddle, midTopLeft, midMidLeft, midBottomLeft, outBottomMiddle],
                  [outTopMiddle, midTopMiddle, center, midBottomMiddle, outBottomMiddle],
                  [outTopMiddle, midTopRight, midMidRight, midBottomRight, outBottomMiddle],
                  [outTopRight, outMidRight, outMidRight, outMidRight, outBottomRight]];

function arenaVector(point, dimensions){
  var columnPercentages = [0.15, 0.20, 0.30, 0.20, 0.15];
  var rowPercentages = [0.15, 0.20, 0.30, 0.20, 0.15];
  var regionPoint = regionCoords(point, dimensions, columnPercentages, rowPercentages);
  var regionFun = regionFuns[regionPoint.x][regionPoint.y].toString();
  return regionFuns[regionPoint.x][regionPoint.y].call(null, point);
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
function outTopLeft(point){ return down(point); }

function outMidLeft(point){ return down(point); }

function outBottomLeft(point){ return right(point); }

function outBottomMiddle(point){ return right(point); }

function outBottomRight(point){ return up(point); }

function outMidRight(point){ return up(point); }

function outTopRight(point){ return left(point); }

function outTopMiddle(point){ return left(point); }

// Middle box, from top left counter-clockwise
// to top middle
function midTopLeft(point){ return left(point); }

function midMidLeft(point){ return left(point); }

function midBottomLeft(point){ return down(point); }

function midBottomMiddle(point){ return down(point); }

function midBottomRight(point){ return right(point); }

function midMidRight(point){ return right(point); }

function midTopRight(point){ return up(point); }

function midTopMiddle(point){ return up(point); }

// The center box
function center(point){ return up(point); }

function up(point){
  return {'x': point.x,
          'y': point.y - 5};
}

function down(point){
  return {'x': point.x,
          'y': point.y + 5};
}

function left(point){
  return {'x': point.x - 5,
          'y': point.y};
}

function right(point){
  return {'x': point.x + 5,
          'y': point.y};
}
