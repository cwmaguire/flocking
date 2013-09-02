var arenaTests = [];

function addTest(fun){
  arenaTests.push(fun);
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
    var endPoint = percentages[0] * size + startPoint;
    newEndPoints = endPoints.slice(0);
    newEndPoints.push(endPoint);
    return percentsToEndPoints(size, percentages.slice(1), endPoint, newEndPoints);
  }else{
    return endPoints;
  }
}

function testPercentsToEndPoints(){
  if(!arraysEqual(percentsToEndPoints(20, [0.1, 0.2, 0.3, 0.4]), [2, 6, 12, 20])){
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

function down(point){
  return {'x': point.x,
          'y': point.y + 5};

function left(point){
  return {'x': point.x - 5,
          'y': point.y};

function right(point){
  return {'x': point.x + 5,
          'y': point.y};
