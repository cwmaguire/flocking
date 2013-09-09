"use strict";

var arenaTests = [];

function addArenaTest(fun){
  arenaTests.push(fun);
}

function getArenaTests(){
  return arenaTests.slice(0);
}

function testArenaVector(){
  var dimensions = {'w':200, 'h':200};
  var arenaVectorTests = [arenaVectorTest(point(0,0), 5, point(0,5), dimensions),
                          arenaVectorTest(point(0,31), 5, point(0,36), dimensions),
                          arenaVectorTest(point(0,71), 5, point(0,76), dimensions),
                          arenaVectorTest(point(0,131), 5, point(0,136), dimensions),
                          arenaVectorTest(point(0,171), 5, point(5,171), dimensions),
                          arenaVectorTest(point(31,171), 5, point(36,171), dimensions),
                          arenaVectorTest(point(71,171), 5, point(76,171), dimensions),
                          arenaVectorTest(point(131,171), 5, point(136,171), dimensions),
                          arenaVectorTest(point(171,171), 5, point(171,166), dimensions),
                          arenaVectorTest(point(171,131), 5, point(171,126), dimensions),
                          arenaVectorTest(point(171,71), 5, point(171,66), dimensions),
                          arenaVectorTest(point(171,31), 5, point(171,26), dimensions),
                          arenaVectorTest(point(171,1), 5, point(166,1), dimensions),
                          arenaVectorTest(point(131,1), 5, point(126,1), dimensions),
                          arenaVectorTest(point(71,1), 5, point(66,1), dimensions),
                          arenaVectorTest(point(31,1), 5, point(26,1), dimensions),
                          arenaVectorTest(point(31,31), 5, point(26,31), dimensions),
                          arenaVectorTest(point(31,71), 5, point(26,71), dimensions),
                          arenaVectorTest(point(31,131), 5, point(31,136), dimensions),
                          arenaVectorTest(point(71,131), 5, point(71,136), dimensions),
                          arenaVectorTest(point(131,131), 5, point(136,131), dimensions),
                          arenaVectorTest(point(131,71), 5, point(136,71), dimensions),
                          arenaVectorTest(point(131,31), 5, point(131,26), dimensions),
                          arenaVectorTest(point(71,31), 5, point(71,26), dimensions),
                          arenaVectorTest(point(71,71), 5, point(71,66), dimensions)];
  return testArenaVectorPoints(arenaVectorTests);
}
addArenaTest(testArenaVector);

function arenaVectorTest(startPoint, velocity, endPoint, dimensions){
  return {'world': newWorld(newBoid(startPoint),
                            [],[],velocity,
                            dimensions,
                            0),
          'endPoint': endPoint};
}

function testArenaVectorPoints(arenaVectorTests){
  if(arenaVectorTests.length == 0){
    return true;
  }
  var arenaVectorTest = arenaVectorTests[0];
  var newPoint = arenaVector(arenaVectorTest.world);
  if(!pointsEqual(arenaVectorTest.endPoint, newPoint)){
    return "Point " + pointToString(arenaVectorTest.startPoint) +
           " should have moved to " + pointToString(arenaVectorTest.endPoint) +
           " instead of " + pointToString(newPoint);
  }else{
    return testArenaVectorPoints(arenaVectorTests.slice(1));
  }
}

function testRegionCoords(){
  var columnPercentages = [0.1, 0.2];
  var rowPercentages = [0.5, 0.5];
  var dimensions = {'w': 100, 'h': 100};
  var expectedRowColumnPoint = {'x':1, 'y':1};
  var world = newWorld(newBoid(point(20, 51)), [], [], 0, dimensions, 0);

  var rowColumnPoint = regionCoords(world, columnPercentages, rowPercentages);

  if(!pointsEqual(expectedRowColumnPoint, rowColumnPoint)){
    return "Row/Column point should be {1,1}, not " + rowColumnPoint.x + "," + rowColumnPoint.y;
  }else{
    return true;
  }
}
addArenaTest(testRegionCoords);

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
addArenaTest(testSizes);

function testPercentsToEndPoints(){
  if(!arraysEqual(percentsToEndPoints(20, [0.1, 0.2, 0.3, 0.4]), [2, 6, 12, 20])){
    return "percentsToEndPoints failed";
  }else{
    return true;
  }
}
addArenaTest(testPercentsToEndPoints);

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
addArenaTest(testRegionRowOrColumn);
