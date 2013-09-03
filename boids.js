function animate(boids){
  var canvas = document.getElementById("canvas1");
  var ctx = canvas.getContext("2d");
  //alert(ctx);
  //ctx.fillStyle = "#0000A0";
  //ctx.fillStyle = "#000000";
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  return animateBoids(ctx, boids, []);
}

function animateBoids(ctx, boids, newBoids){
  //alert('animating ' + boids.length + ' boids.');
  if(boids.length > 0){

    //alert("boids.length > 0");
    var newBoid = moveBoid(boids[0]);
    //alert("boids[0].location.x is: " + boids[0].location.x);
    //alert("boids[0].location is: " + boids[0].location);
    //alert("newBoid.location is: " + newBoid.location);
    //alert("newBoid.location.x is: " + newBoid.location.x);
    drawBoid(ctx, newBoid);

    var newBoids = newBoids.slice(0);
    newBoids.push(newBoid);
    return animateBoids(ctx, boids.slice(1), newBoids);
  }else{
    return newBoids;
  }
}

function moveBoid(boid){
  var canvas = document.getElementById("canvas1");
  var canvasDimensions = {'w': canvas.width, 'h': canvas.height};
  var newVector = arenaVector(boid.location, canvasDimensions);
  //var combinedVector = combineVectors(newVector, boid.vector);
  var movedBoid = applyVector(boid, newVector);
  return movedBoid;
}

function applyVector(boid, vector){
  return movedBoid(boid, vector);
}

function movedBoid(boid, vector){
  var movedBoid = copyBoid(boid);
  //alert("Boid.radius = " + movedBoid.radius);
  movedBoid.location = vector;
  return movedBoid;
}

function copyBoid(boid){
  //alert("Boid radius: " + boid.radius);
  //var copiedBoid = {'location': boid.location, 'radius': boid.radius};
  //var copiedBoid = {};
  //copiedBoid.location = 
  //alert("copiedBoid.location.x = " + copiedBoid.location.x + ", copiedBoid.radius = " + copiedBoid.radius);
  //return copiedBoid;
  return {'location': boid.location, 'radius': boid.radius};
}

function addBoid(point){
  boids.push({'location': point, 'radius': 10});
}

function drawBoid(ctx, boid){

  var x = boid.location.x;
  var y = boid.location.y;
  var r = boid.radius;

  //ctx.fillStyle = "#303000";
  //ctx.fillRect(0, 0, 50, 70);

  //alert("Drawing boid at " + x + ", " + y + ", " + r);

  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(x, y, r, 1.75 * Math.PI, 1.25 * Math.PI);
  ctx.lineTo(x - r * 0.7, y - (0.6 * r)),
  ctx.lineTo(x, y - (r * 1.8)),
  ctx.lineTo(x + r * 0.7, y - (0.6 * r)),

  ctx.fill();
}
