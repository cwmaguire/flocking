"use strict";

function animate(boids, velocity){
  //log("animating " + boids.length + " boids");
  var canvas = document.getElementById("canvas1");
  var ctx = canvas.getContext("2d");
  var canvasDimensions = {'w': canvas.width, 'h': canvas.height};
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var world = {'boids': boids.slice(0),
               'velocity': velocity,
               'canvasDimensions': canvasDimensions,
               'range', 10};

  return animateBoids(drawBoidFun(ctx), world, []);
}

function changeWorldBoids(boids, world){
  return newWorld(boids, world.velocity, canvasDimensions, range);

function newWorld(boids, velocity, canvasDimensions, range){
  return {'boids': boids,
          'velocity': velocity,
          'canvasDimensions': canvasDimensions,
          'range': range};

function drawBoidFun(ctx){
  function(boid){
    drawBoid(ctx, boid);
  }
}

function animateBoids(drawBoidFun, world, animatedBoids){
  if(boidsToAnimate.length == 0){
    return animatedboids;
  }else{
    if(animatedBoids === undefined){
      animatedBoids = [];
    }

    var movedBoid = moveBoid(world, animatedBoids);

    drawBoidFun(newBoid);

    var newAnimatedBoids = animatedBoids.slice(0);
    newAnimatedBoids.push(newBoid);
    return animateBoids(ctx, boids.slice(1), newAnimatedBoids);
  }else{
    return animatedBoids;
  }
}

function combinePoints(startPoint, endPoints, velocity){
  var pointDifferences = pointsRelativeTo(startPoint, endPoints);
  var totalX = reduce(sum, map(getX, pointDifferences)); 
  var totalY = reduce(sum, map(getY, pointDifferences)); 
  log("Calling distance with " + pointToString(startPoint) + " and {" + totalX + "," + totalY + "}");
  var totalDistance = distance(startPoint,
                               {'x': totalX, 'y': totalY});
  var percentPossible = Math.min(1, velocity / totalDistance);
  var possibleX = Math.round(totalX * percentPossible);
  var possibleY = Math.round(totalY * percentPossible);
  return {'x': startPoint.x + possibleX, 'y': startPoint.y + possibleY};
}

function moveBoid(world, movedBoids){
  var boid = world.boids[0];
  var worldBoids = world.boids.slice(1).concatenate(movedBoids);
  var newWorld = changeWorldBoids(worldBoids, world);

  var applyMovementFun = function(movementFun){
                             movementFun.call(null, newWorld);
                         };

  var movementPoints = map(applyMovementFun, [arenaVector, flockVector]);

  var newPoint = combinePoints(boid.point, [arenaPoint, flockPoint]);
  var movedBoid = copyBoid(boid);
  movedBoid.location = vector;
  return movedBoid;
}

function copyBoid(boid){
  return {'location': boid.location, 'radius': boid.radius};
}

function addBoid(point){
  //log("boids is " + boids + " and length is " + boids.length);
  boids.push({'location': point, 'radius': 10});
}

function boid(location, radius){
  return {'location': location, 'radius': radius};

function drawBoid(ctx, boid){

  //log("Drawing boid at ...");

  var x = boid.location.x;
  var y = boid.location.y;
  var r = boid.radius;

  //log("... " + x + ", " + y + " with radius " + r);

  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(x, y, r, 1.75 * Math.PI, 1.25 * Math.PI);
  ctx.lineTo(x - r * 0.7, y - (0.6 * r)),
  ctx.lineTo(x, y - (r * 1.8)),
  ctx.lineTo(x + r * 0.7, y - (0.6 * r)),

  ctx.fill();
}
