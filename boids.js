function go(){
  setInterval(function() {boids = animateBoids(boids, [])}, 1000);
}

function animateBoids(boids, newBoids){
  if(boids.length > 0){
    var newBoid = moveBoid(boids[0]);
    animateBoid(boid);
    var newBoids = newBoids.slice(0);
    newBoids.push(newBoid);
    animateBoids(boids.slice(1), newBoids);
  }else{
    return newBoids;
  }
}

function moveBoid(boid){
  var newVector = circleEdgesVector(boid);
  var combinedVector = combineVectors(newVector, boid.vector);
  var movedBoid = applyVector(boid, newVector);
  return movedBoid;
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
