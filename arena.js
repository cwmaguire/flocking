
function vector(boid){
  return getRegionFun(boid).call(null, boid);
}

function getRegion(w, h, x, y){
  var columnSizes = [0.15, 0.20, 0.30, 0.20, 0.15];
  var rowSizes = [0.15, 0.20, 0.30, 0.20, 0.15];
  var regionCoords = regionCoords(w, h, x, y, columnSizes, rowSizes);
  var regionFuns = [[outTopLeft,
                     outMidLeft,
                     outMidLeft,
                     outMidLeft,
                     outBottomLeft],
                    [outTopMiddle,
                      midTopLeft,
                      midMidLeft,
                      midBottomLeft,
                      outBottomMiddle],
                     [outTopMiddle,
                      midTopMiddle,
                      center,
                      midBottomMiddle,
                      outBottomMiddle],
                     [outTopMiddle,
                      midTopRight,
                      center,
                      midBottomRight,
                      outBottomMiddle],
                     [outTopRight,
                      outMidRight,
                      outMidRight,
                      outMidRight,
                      outBottomRight]];
  return regionFun[regionCoords.x][regionCoords.y];
}

function regionCoords(x, y, w, h, columnSizes, rowSizes){
  var actualColumns = columnSizes(w, columnSizes);
  var actualRows = rowSizes(h, rowSizes);
  return {'x', regionRowOrColumn(x, 1, actualColumns);
    'y', regionRowOrColumn(y, 1, actualRows)}
}

function regionRowOrColumn(xOrY, rowOrColNum, rowOrColSizes){
  if(xOrY < rowOrColSizes[0]){
    return rowOrColNumber;
  }else{
    return regionRowOrColumn(xOrY, rowOrColNumber + 1, rowOrColSizes.slice(1));
  }
}

function addBoid(){
  var canvas = document.getElementById("canvas1");
  var ctx = canvas.getContext("2d");

  drawBoids(ctx, 10, 40, 200, 10, 10);
}

function drawBoids(ctx, count, x, y, radius, radiusGrowth){
  if(count > 1){
    drawBoid(ctx, x + radius + 10, y, radius);
    drawBoids(ctx, count - 1, x + (radius * 2) + 20, y, radius + radiusGrowth, radiusGrowth);
  }
}

function drawBoid(ctx, x, y, r){
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(x, y, r, 1.75 * Math.PI, 1.25 * Math.PI);
  ctx.lineTo(x - r * 0.7, y - (0.6 * r)),
  ctx.lineTo(x, y - (r * 1.8)),
  ctx.lineTo(x + r * 0.7, y - (0.6 * r)),
  ctx.fill();
}
