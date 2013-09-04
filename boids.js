function animate(boids){
  var canvas = document.getElementById("canvas1");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  return animateBoids(ctx, boids, []);
}

function animateBoids(ctx, velocity, boids, newBoids){
  if(boids.length > 0){

    var newBoid = moveBoid(boids[0],
                           boids.concat(newBoids),
                           velocity);
    drawBoid(ctx, newBoid);

    var newBoids = newBoids.slice(0);
    newBoids.push(newBoid);
    return animateBoids(ctx, boids.slice(1), newBoids);
  }else{
    return newBoids;
  }
}

function moveBoid(boid, boids, velocity){
  var canvas = document.getElementById("canvas1");
  var canvasDimensions = {'w': canvas.width, 'h': canvas.height};
  var arenaPoint = arenaVector(boid.location, canvasDimensions);
  var flockPoint = flockPoint(boid,
                              boids,
                              canvasDimensions,
                              {'range': 10, 'velocity': velocity});
  //var combinedVector = combineVectors(newVector, boid.vector);
  var newPoint = combinePoints(boid.point, [arenaPoint, flockPoint]);
  var movedBoid = applyVector(boid, newPoint);
  return movedBoid;
}

function combinePoints(startPoint, endPoints, velocity){
  var totalX = reduce(sum, map(getX, points)); 
  var totalY = reduce(sum, map(getY, points)); 
  var totalDistance = distance(startPoint,
                               {'x': totalX, 'y': totalY});
  var percentPossible = min(1, velocity / totalDistance);
  var possibleX = totalX * percentPossible;
  var possibleY = totalY * percentPossible;
  return {'x': possibleX, 'y': possibleY};
}

function applyVector(boid, vector){
  return movedBoid(boid, vector);
}

function movedBoid(boid, vector){
  var movedBoid = copyBoid(boid);
  movedBoid.location = vector;
  return movedBoid;
}

function copyBoid(boid){
  return {'location': boid.location, 'radius': boid.radius};
}

function addBoid(point){
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
