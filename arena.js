var arenaTests = [];

function addTest(fun){
  //alert("Pushing " + fun.toString());
  arenaTests.push(fun);
}

function saySomething(){
  alert("Something");
}

function getArenaTests(){
  return arenaTests.slice(0);
}

var regionFuns = [[outTopLeft, outMidLeft, outMidLeft, outMidLeft, outBottomLeft],
                  [outTopMiddle, midTopLeft, midMidLeft, midBottomLeft, outBottomMiddle],
                  [outTopMiddle, midTopMiddle, center, midBottomMiddle, outBottomMiddle],
                  [outTopMiddle, midTopRight, midMidRight, midBottomRight, outBottomMiddle],
                  [outTopRight, outMidRight, outMidRight, outMidRight, outBottomRight]];

function vector(point, dimensions){
  var columnSizes = [0.15, 0.20, 0.30, 0.20, 0.15];
  var rowSizes = [0.15, 0.20, 0.30, 0.20, 0.15];
  var regionCoords = regionCoords(point, dimensions, columnSizes, rowSizes);
  return regionFun[regionCoords.x][regionCoords.y].call(point);
}

function regionCoords(point, dimensions, columnSizes, rowSizes){
  var actualColumns = sizes(dimensions.w, columnSizes);
  var actualRows = sizes(dimensions.h, rowSizes);
  return {'x': regionRowOrColumn(point.x, 1, actualColumns),
          'y': regionRowOrColumn(point.y, 1, actualRows)};
}

function percentsToEndPoints(size, percentages, startPoint, endPoints){
  if(percentages.length > 0){
    if(startPoint === undefined){
      startPoint = 0;
    }
    if(endPoints === undefined){
      endPoints = [];
    }
    endPoint = percentages[0] * size + startPoint;
    newEndPoints = endPoints.slice(0);
    newEndPoints.push(endPoint);
    return endPoints(size, percentages.slice(1), endPoint, newEndPoints);
  }else{
    return endPoints;
  }
}

function testPercentsToEndPoints(){
  if(percentsToEndPoints(20, [0.1, 0.2, 0.3, 0.4]) != [10.0, 30.0, 60.0, 100.0]){
    return "percentsToEndPoints failed";
  }else{
    return true;
  }
}
addTest(testPercentsToEndPoints);

function regionRowOrColumn(xOrY, rowOrColNum, rowOrColSizes){
  if(xOrY < rowOrColSizes[0]){
    return rowOrColNumber;
  }else{
    return regionRowOrColumn(xOrY, rowOrColNumber + 1, rowOrColSizes.slice(1));
  }
}

function outTopLeft(point){
  return {'x': point.x,
          'y': point.y + 5};
}

function outMidLeft(point){
  return {'x': point.x,
          'y': point.y + 5};
}

function outBottomLeft(point){
  return {'x': point.x + 5,
          'y': point.y};
}

function outTopMiddle(point){
  return {'x': point.x - 5,
          'y': point.y};
}

function midTopLeft(point){
  return {'x': point.x - 5,
          'y': point.y};
}

function midMidLeft(point){
  return {'x': point.x - 5,
          'y': point.y};
}

function midBottomLeft(point){
  return {'x': point.x,
          'y': point.y + 5};
}

function outBottomMiddle(point){
  return {'x': point.x + 5,
          'y': point.y};
}

function midTopMiddle(point){
  return {'x': point.x,
          'y': point.y - 5};
}

function center(point){
  return {'x': point.x,
          'y': point.y - 5};
}

function midBottomMiddle(point){
  return {'x': point.x,
          'y': point.y + 5};
}

function midTopRight(point){
  return {'x': point.x,
          'y': point.y - 5}
}

function midMidRight(point){
  return {'x': point.x + 5,
          'y': point.y};
}

function midBottomRight(point){
  return {'x': point.x + 5,
          'y': point.y};
}

function outTopRight(point){
  return {'x': point.x - 5,
          'y': point.y};
}

function outMidRight(point){
  return {'x': point.x,
          'y': point.y - 5};
}

function outBottomRight(point){
  return {'x': point.x,
          'y': point.y - 5};
}

