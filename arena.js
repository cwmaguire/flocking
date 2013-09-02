"use strict";

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
  var columnPercentages = [0.15, 0.20, 0.30, 0.20, 0.15];
  var rowPercentages = [0.15, 0.20, 0.30, 0.20, 0.15];
  var regionPoint = regionCoords(point, dimensions, columnPercentages, rowPercentages);
  return regionFuns[regionPoint.x][regionPoint.y].call(null, point);
}

function testVector(){
  var dimensions = {'w':200, 'h':200};
  var vectorTests = [vectorTest({'x':0, 'y':0}, {'x':0, 'y':5}, dimensions),
                     vectorTest({'x':0, 'y':31}, {'x':0, 'y':36}, dimensions),
                     vectorTest({'x':0, 'y':71}, {'x':0, 'y':76}, dimensions)];
  return testVectorPoints(vectorTests);
}
addTest(testVector);

function vectorTest(startPoint, endPoint, dimensions){
  return {'startPoint':startPoint,
          'endPoint':endPoint,
          'dimensions': dimensions};
}

function testVectorPoints(vectorTests){
  if(vectorTests.length == 0){
    return true;
  }
  var vectorTest = vectorTests[0];
  if(!pointsEqual(vectorTest.endPoint,
                  vector(vectorTest.startPoint,
                         vectorTest.dimensions))){
    return "Point " + pointToString(vectorTest.startPoint) +
           "should have moved down to " + pointToString(vectorTest.endPoint);
  }else{
    return testVectorPoints(vectorTests.slice(1));
  }
}

function regionCoords(point, dimensions, columnPercentages, rowPercentages){
  var columnEndPoints = percentsToEndPoints(dimensions.w, columnPercentages);
  var rowEndPoints = percentsToEndPoints(dimensions.h, rowPercentages);
  return {'x': regionRowOrColumn(point.x, columnEndPoints),
          'y': regionRowOrColumn(point.y, rowEndPoints)};
}

function testRegionCoords(){
  var columnPercentages = [0.1, 0.2];
  var rowPercentages = [0.5, 0.5];
  var dimensions = {'w': 100, 'h': 100};
  var point = {'x':20, 'y':51};
  var expectedRowColumnPoint = {'x':1, 'y':1};
  var rowColumnPoint = regionCoords(point, dimensions, columnPercentages, rowPercentages);
  if(!pointsEqual(expectedRowColumnPoint, rowColumnPoint)){
    return "Row/Column point should be {1,1}, not " + rowColumnPoint.x + "," + rowColumnPoint.y;
  }else{
    return true;
  }
}
addTest(testRegionCoords);

function sizes(totalSize, percentages){
  if(percentages.length == 1){
    var lastSize = Math.round(totalSize * percentages[0]);
    return [lastSize];
  }
  var restSizes = sizes(totalSize, percentages.slice(1)).slice(0);
  restSizes.unshift(Math.round(totalSize * percentages[0]));
  return restSizes;
}

function testSizes(){
  var percentages = [0.1, 0.2, 0.3, 0.4];
  var totalSize = 100;
  var expectedSizes = [10, 20, 30, 40];
  var actualSizes = sizes(totalSize, percentages);

  if(!arraysEqual(expectedSizes, actualSizes)){
    return "sizes should return [10, 20, 30, 40]";
  }else{
    return true;
  }
}
addTest(testSizes);

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

function testPercentsToEndPoints(){
  if(!arraysEqual(percentsToEndPoints(20, [0.1, 0.2, 0.3, 0.4]), [2, 6, 12, 20])){
    return "percentsToEndPoints failed";
  }else{
    return true;
  }
}
addTest(testPercentsToEndPoints);

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

function testRegionRowOrColumn(){
  var size1 = randomInt(10, 100);
  var size2 = size1 + randomInt(10, 100);
  var size3 = size2 + randomInt(10, 100);
  var sizes = [size1, size2, size3];
  var testXOrY1 = Math.round((size1) / 2);
  var testXOrY2 = Math.round((size1 + size2) / 2);
  var testXOrY3 = Math.round((size2 + size3) / 2);
  var rowOrColumn1 = regionRowOrColumn(testXOrY1, sizes);
  var rowOrColumn2 = regionRowOrColumn(testXOrY2, sizes);
  var rowOrColumn3 = regionRowOrColumn(testXOrY3, sizes);
  if(rowOrColumn1 != 0){
    return "testRegionRowOrColumn should return 0 instead of " + rowOrColumn1 +
           " for the row/column if the x/y is less than the first size;<br>" +
           "xOrY is " + testXOrY1 + ", size1 = " + size1 +
           ", size2 = " + size2 + ", size3 = " + size3;
  }
  if(rowOrColumn2 != 1){
    return "testRegionRowOrColumn should return 1 instead of " + rowOrColumn2 +
           " for the row/column if the x/y is less than the second size;<br>" +
           "xOrY is " + testXOrY2 + ", size1 = " + size1 +
           ", size2 = " + size2 + ", size3 = " + size3;
  }
  if(rowOrColumn3 != 2){
    return "testRegionRowOrColumn should return 2 instead of " + rowOrColumn3 +
           " for the row/column if the x/y is less than the second size;<br>" +
           "xOrY is " + testXOrY3 + ", size1 = " + size1 +
           ", size2 = " + size2 + ", size3 = " + size3;
  }
  return true;
}
addTest(testRegionRowOrColumn);

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
