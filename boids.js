"use strict";

function animate(boids, velocity){
  log("animating " + boids.length + " boids");
  var canvas = document.getElementById("canvas1");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var slicedBoids = boids.slice(0);
  log("slicedBoids.length is " + slicedBoids.length);

  return animateBoids(ctx, velocity, boids.slice(0), []);
}

function animateBoids(ctx, velocity, boidsToAnimate, animatedBoids){
  if(animatedBoids === undefined){
    animatedBoids = [];
  }
  if(boidsToAnimate.length > 0){
    log("animating " + boidsToAnimate.length + " boids");

    var newBoid = moveBoid(boidsToAnimate[0],
                           boidsToAnimate.concat(animatedBoids),
                           velocity);
    drawBoid(ctx, newBoid);

    var newAnimatedBoids = animatedBoids.slice(0);
    newAnimatedBoids.push(newBoid);
    return animateBoids(ctx, boids.slice(1), newAnimatedBoids);
  }else{
    log("animatedBoids is empty");
    return animatedBoids;
  }
}

function moveBoid(boid, boids, velocity){
  var canvas = document.getElementById("canvas1");
  var canvasDimensions = {'w': canvas.width, 'h': canvas.height};
  var arenaPoint = arenaVector(boid.location, canvasDimensions);
  var flockPoint = flockVector(boid,
                               boids,
                               canvasDimensions,
                               {'range': 10, 'velocity': velocity});
  //var combinedVector = combineVectors(newVector, boid.vector);
  var newPoint = combinePoints(boid.point, [arenaPoint, flockPoint]);
  var movedBoid = applyVector(boid, newPoint);
  return movedBoid;
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

function applyVector(boid, vector){
  return moveBoid(boid, vector);
}

function moveBoid(boid, vector){
  var movedBoid = copyBoid(boid);
  movedBoid.location = vector;
  return movedBoid;
}

function copyBoid(boid){
  return {'location': boid.location, 'radius': boid.radius};
}

function addBoid(point){
  log("boids is " + boids + " and length is " + boids.length);
  boids.push({'location': point, 'radius': 10});
}

function drawBoid(ctx, boid){

  var x = boid.location.x;
  var y = boid.location.y;
  var r = boid.radius;

  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(x, y, r, 1.75 * Math.PI, 1.25 * Math.PI);
  ctx.lineTo(x - r * 0.7, y - (0.6 * r)),
  ctx.lineTo(x, y - (r * 1.8)),
  ctx.lineTo(x + r * 0.7, y - (0.6 * r)),

  ctx.fill();
}
