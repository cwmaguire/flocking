"use strict";

function animateBoids(drawBoidFun, world){
  if(world.boid == undefined){
    return world.movedBoids;
  }else{
    var movedBoid = moveBoid(world);
    //log("\nmovedBoid\n" + boidToString(movedBoid) + "\n\n");
    drawBoidFun.call(null, movedBoid, world);

    var movedWorld = shiftBoids(world, movedBoid);
    //log("moved world\n" + worldToString(movedWorld));
    return animateBoids(drawBoidFun, movedWorld);
  }
}

function moveBoid(world){
  var applyMovementFun = function(movement){
                             return {'point': movement.fun.call(null, world),
                                     'scale': movement.scale};
                         };

  var pointScales = map(applyMovementFun, world.movements);

  //log("movementPointScales: " + pointScalesToString(pointScales));

  var newPoint = combineMovements(world, pointScales);
  var movedBoid = copyBoid(world.boid);
  movedBoid.location = newPoint;

  return movedBoid;
}

function pointScalesToString(pointScales){
  var reduceFun = function(string, pointScale){
    return string +
           pointToString(pointScale.point) +
           " " +
           pointScale.scale +
           ", ";
  };

  return reduce(reduceFun, pointScales, "");
}

function shiftBoids(world, movedBoid){
  var boids = world.boids.slice(1);
  var movedBoids = world.movedBoids.slice(0);
  var boid = undefined; // in case there's no more boids
  if(world.boids.length > 0){
    boid = copyBoid(world.boids[0]);
  }
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
                  world.movements,
                  world.ctx);
}

function newWorld(boid, boids, movedBoids, velocity, canvasDimensions, range, movements, ctx){
  return {'boid': boid,
          'boids': boids,
          'movedBoids': movedBoids,
          'velocity': velocity,
          'canvasDimensions': canvasDimensions,
          'range': range,
          'movements': movements,
          'ctx': ctx};
}

function lastMovedBoid(world){
  var movedBoids = world.movedBoids;
  return movedBoids[movedBoids.length - 1];
}

function combineMovements(world, pointScales){
  var startPoint = world.boid.location;
  var velocity = world.velocity;
  var points = scaledRelativePoints(startPoint, pointScales);
  var totalPoint = reduce(sumPoints, points);
  var constrainedPoint = constrainDist(totalPoint, velocity);
  return point(constrainedPoint.x + startPoint.x,
               constrainedPoint.y + startPoint.y);
}

function constrainDist(point1, velocity){
  var dist = distance(point(0, 0), point1);
  var fractionAllowed = Math.min(velocity, dist) / dist;
  return point(point1.x * fractionAllowed,
               point1.y * fractionAllowed);
}

function sumPoints(point1, point2){
  return point(point1.x + point2.x,
               point1.y + point2.y);
}

function copyBoid(boid){
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
