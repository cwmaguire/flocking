"use strict";

var arenaTests = [];

function addTest(fun){
  arenaTests.push(fun);
}

function getArenaTests(){
  return arenaTests.slice(0);
}

function testVector(){
  var dimensions = {'w':200, 'h':200};
  var vectorTests = [vectorTest({'x':0, 'y':0}, {'x':0, 'y':5}, dimensions),
                     vectorTest({'x':0, 'y':31}, {'x':0, 'y':36}, dimensions),
                     vectorTest({'x':0, 'y':71}, {'x':0, 'y':76}, dimensions),
                     vectorTest({'x':0, 'y':131}, {'x':0, 'y':136}, dimensions),
                     vectorTest({'x':0, 'y':171}, {'x':5, 'y':171}, dimensions),
                     vectorTest({'x':31, 'y':171}, {'x':36, 'y':171}, dimensions),
                     vectorTest({'x':71, 'y':171}, {'x':76, 'y':171}, dimensions),
                     vectorTest({'x':131, 'y':171}, {'x':136, 'y':171}, dimensions),
                     vectorTest({'x':171, 'y':171}, {'x':171, 'y':166}, dimensions),
                     vectorTest({'x':171, 'y':131}, {'x':171, 'y':126}, dimensions),
                     vectorTest({'x':171, 'y':71}, {'x':171, 'y':66}, dimensions),
                     vectorTest({'x':171, 'y':31}, {'x':171, 'y':26}, dimensions),
                     vectorTest({'x':171, 'y':1}, {'x':166, 'y':1}, dimensions),
                     vectorTest({'x':131, 'y':1}, {'x':126, 'y':1}, dimensions),
                     vectorTest({'x':71, 'y':1}, {'x':66, 'y':1}, dimensions),
                     vectorTest({'x':31, 'y':1}, {'x':26, 'y':1}, dimensions),
                     vectorTest({'x':31, 'y':31}, {'x':26, 'y':31}, dimensions),
                     vectorTest({'x':31, 'y':71}, {'x':26, 'y':71}, dimensions),
                     vectorTest({'x':31, 'y':131}, {'x':31, 'y':136}, dimensions),
                     vectorTest({'x':71, 'y':131}, {'x':71, 'y':136}, dimensions),
                     vectorTest({'x':131, 'y':131}, {'x':136, 'y':131}, dimensions),
                     vectorTest({'x':131, 'y':71}, {'x':136, 'y':71}, dimensions),
                     vectorTest({'x':131, 'y':31}, {'x':131, 'y':26}, dimensions),
                     vectorTest({'x':71, 'y':31}, {'x':71, 'y':26}, dimensions),
                     vectorTest({'x':71, 'y':71}, {'x':71, 'y':66}, dimensions)];
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
  var newPoint = vector(vectorTest.startPoint, vectorTest.dimensions);
  if(!pointsEqual(vectorTest.endPoint, newPoint)){
    return "Point " + pointToString(vectorTest.startPoint) +
           " should have moved to " + pointToString(vectorTest.endPoint) +
           " instead of " + pointToString(newPoint);
  }else{
    return testVectorPoints(vectorTests.slice(1));
  }
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

function testPercentsToEndPoints(){
  if(!arraysEqual(percentsToEndPoints(20, [0.1, 0.2, 0.3, 0.4]), [2, 6, 12, 20])){
    return "percentsToEndPoints failed";
  }else{
    return true;
  }
}
addTest(testPercentsToEndPoints);

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
