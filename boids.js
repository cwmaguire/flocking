"use strict";

function animateBoids(drawBoidFun, world){
  //log("animateBoids\n" + worldToString(world));
  if(world.boid == undefined){
    return world.movedBoids;
  }else{
    var movedBoid = moveBoid(world);
    log("\nmovedBoid\n" + boidToString(movedBoid) + "\n\n");
    drawBoidFun.call(null, movedBoid, world);

    var movedWorld = shiftBoids(world, movedBoid);
    //log("shifted boids");
    log("moved world\n" + worldToString(movedWorld));
    return animateBoids(drawBoidFun, movedWorld);
  }
}

function moveBoid(world){
  var applyMovementFun = function(movementFun){
                             //log("calling applyMovementFun " +
                             //    "with " + movementFun.toString().split("(")[0]);
                             return movementFun.call(null, world);
                         };

  //log("movementFun: " + world.movementFuns[0].toString().split("(")[0]);

  var movementPoints = map(applyMovementFun, world.movementFuns);

  //log("movementPoints.length = " + movementPoints.length);
  //log("movementPoints[0] = " + movementPoints[0]);

  log("movementPoints: " + pointToString(movementPoints[0]));

  var newPoint = combinePoints(world, movementPoints);
  //log("newPoint = " + pointToString(newPoint));
  var movedBoid = copyBoid(world.boid);
  //log("moveBoid copied boid");
  movedBoid.location = newPoint;

  return movedBoid;
}

function shiftBoids(world, movedBoid){
  var boids = world.boids.slice(1);
  var movedBoids = world.movedBoids.slice(0);
  var boid = undefined; // in case there's no more boids
  if(world.boids.length > 0){
    boid = copyBoid(world.boids[0]);
  }
  //log("shiftBoids: movedBoid: " + pointToString(movedBoid.location));
  movedBoids.push(copyBoid(movedBoid));
  return changeWorldBoids(boid, boids, movedBoids, world);
}

function changeWorldBoids(boid, boids, movedBoids, world){
  return newWorld(boid,
                  boids,
                  movedBoids,
                  world.velocity,
                  world.canvasDimensions,
                  world.range,
                  world.movementFuns,
                  world.ctx);
}

function newWorld(boid, boids, movedBoids, velocity, canvasDimensions, range, movementFuns, ctx){
  return {'boid': boid,
          'boids': boids,
          'movedBoids': movedBoids,
          'velocity': velocity,
          'canvasDimensions': canvasDimensions,
          'movementFuns': movementFuns,
          'range': range,
          'ctx': ctx};
}

function lastMovedBoid(world){
  var movedBoids = world.movedBoids;
  return movedBoids[movedBoids.length - 1];
}

function combinePoints(world, endPoints){
  //log("combinePoints " + pointToString(endPoints[0]));
  var startPoint = world.boid.location;
  var velocity = world.velocity;
  var pointDifferences = pointsRelativeTo(startPoint, endPoints);
  var totalX = reduce(sum, map(getX, pointDifferences)); 
  var totalY = reduce(sum, map(getY, pointDifferences)); 
  //log("totalX: " + totalX + ", totalY: " + totalY);
  var totalDistance = distance(point(0,0),
                               {'x': totalX, 'y': totalY});
  //log("totalDistance: " + totalDistance);
  var percentPossible = Math.min(1, velocity / totalDistance);
  //log("% pos: " + percentPossible);
  var possibleX = Math.round(totalX * percentPossible);
  var possibleY = Math.round(totalY * percentPossible);
  //log("returning from combinePoints");
  return {'x': startPoint.x + possibleX, 'y': startPoint.y + possibleY};
}

function copyBoid(boid){
  //log("copyBoid with " + pointToString(boid.location));
  return {'location': boid.location, 'radius': boid.radius};
}

function addBoid(location){
  boids.push(newBoid(location, 10));
}

function newBoid(location, radius){
  return {'location': location, 'radius': radius};
}

function drawBoid(boid, world){
  var x = boid.location.x;
  var y = boid.location.y;
  var r = boid.radius;
  var ctx = world.ctx;

  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(x, y, r, 1.75 * Math.PI, 1.25 * Math.PI);
  ctx.lineTo(x - r * 0.7, y - (0.6 * r)),
  ctx.lineTo(x, y - (r * 1.8)),
  ctx.lineTo(x + r * 0.7, y - (0.6 * r)),

  ctx.fill();
}

function boidToString(boid){
  if(boid == undefined){
    return "nil";
  }
  var location = "nil";
  if(boid.location != undefined){
    location = pointToString(boid.location);
  }
  return "boid: location = " + location + ", radius = " + boid.radius;
}

function boidsToString(field, boids){
  return field + ": [\n  " +
         reduce(function(boidString, accumString){
                  return accumString + "\n  " + boidString;
                },
                map(boidToString, boids)) +
         "\n]\n";
}

function worldToString(world){
  var w = "nil";
  var h = "nil";
  if(world.canvasDimensions != undefined){
    w = world.canvasDimensions.w;
    h = world.canvasDimensions.h;
  }

  var boidString = boidToString(world.boid);
  var boidsString = boidsToString("boids", world.boids);
  var movedBoidsString = boidsToString("movedBoids", world.movedBoids);
  return "world:\n" + boidString + "\n" + boidsString + movedBoidsString +
         "velocity: " + world.velocity + "\n" +
         "dimensions: {" + w + "," + h + "}\n" +
         "range: " + world.range + "\n" +
         "ctx: " + world.ctx;
}
