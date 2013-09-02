
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
  var actualColumns = columnSizes(dimensions.w, columnSizes);
  var actualRows = rowSizes(dimensions.h, rowSizes);
  return {'x', regionRowOrColumn(point.x, 1, actualColumns);
          'y', regionRowOrColumn(point.y, 1, actualRows)}
}

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

function outMidLeft(point){
  return {'x': point.x,
          'y': point.y + 5};

function outBottomLeft(point){
  return {'x': point.x + 5,
          'y': point.y};

function outTopMiddle(point){
  return {'x': point.x - 5,
          'y': point.y};

function midTopLeft(point){
  return {'x': point.x - 5,
          'y': point.y};

function midMidLeft(point){
  return {'x': point.x - 5,
          'y': point.y};

function midBottomLeft(point){
  return {'x': point.x,
          'y': point.y + 5};

function outBottomMiddle(point){
  return {'x': point.x + 5,
          'y': point.y};

function midTopMiddle(point){
  return {'x': point.x,
          'y': point.y - 5};

function center(point){
  return {'x': point.x,
          'y': point.y - 5};

function midBottomMiddle(point){
  return {'x': point.x,
          'y': point.y + 5};

function midMidRight(point){
  return {'x': point.x + 5,
          'y': point.y};

function midBottomRight(point){
  return {'x': point.x + 5,
          'y': point.y};

function outTopRight(point){
  return {'x': point.x - 5,
          'y': point.y};

function outMidRight(point){
  return {'x': point.x,
          'y': point.y - 5};

function outBottomRight(point){
  return {'x': point.x,
          'y': point.y - 5};

