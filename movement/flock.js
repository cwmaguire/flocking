"use strict";

function flockVector(world){
  var boidDistances = findNeighboursInRange(world);
  log(boidDistancesToString(boidDistances));
  //log("found distances: " + boidDistances.length);
  //log("found distances: " + boidDistances[0].distance);
  //log("found distances: " + pointToString(boidDistances[0].boid.location));
  //log("found distances: " + boidDistances[1].distance);
  //log("found distances: " + pointToString(boidDistances[1].boid.location));
  var adjustmentsToNeighbours = adjustToNeighbours(world, boidDistances);
  //log("found adjustments: " + pointToString(adjustmentsToNeighbours[0]));
  var aggregatedAdjustment = aggregateAdjustments(adjustmentsToNeighbours,
                                                  world);
  //log("aggregatedAdjustment = " + pointToString(aggregatedAdjustment));
  return aggregatedAdjustment;
}

function findNeighboursInRange(world, boidDistances){
  //log("finding neighbours in range");
  if(boidDistances === undefined){
    //log("boidDistances is undefined");
    boidDistances = [];
  }

  if(world.boids.length == 0){
   // log("world.boids.length == 0");
    return boidDistances.slice(0);
  }

  var newBoidDistances = boidDistances.slice(0);

  //log("getting distance to boid ...");

  var distanceToBoid = distance(world.boid.location,
                                world.boids[0].location) 

  //log("distanceToBoid = " + distanceToBoid);

  if(distanceToBoid < world.range){
    newBoidDistances.push({'boid': copyBoid(world.boids[0]),
                           'distance': distanceToBoid});
  }

  var restOfWorld = changeWorldBoids(world.boid,
                                     world.boids.slice(1),
                                     [],
                                     world);

  return findNeighboursInRange(restOfWorld, newBoidDistances);
}

function adjustToNeighbours(world, boidDistances, adjustments){
  if(adjustments === undefined){
    adjustments = [];
  }

  if(boidDistances.length == 0){
    return adjustments.slice(0);
  }

  var adjustment = adjustToNeighbour(world, boidDistances[0]);
  //log("adjustment: " + pointToString(adjustment));
  var newAdjustments = adjustments.slice(0);
  newAdjustments.push(adjustment);
  return adjustToNeighbours(world, boidDistances.slice(1), newAdjustments);
}

function adjustToNeighbour(world, neighbourBoidAndDistance){
  var neighbour = neighbourBoidAndDistance.boid;
  var distance = neighbourBoidAndDistance.distance;

  var necessarySpace = world.range - distance;
  //log("necessarySpace = " + necessarySpace);
  var pctOfDistReq = necessarySpace / distance;
  //log("pctOfDistReq = " + pctOfDistReq);

  //log("world.boid.location.x = " + world.boid.location.x);

  var xDistance = world.boid.location.x - neighbour.location.x;
  var yDistance = world.boid.location.y - neighbour.location.y;

  //log("xDistance = " + xDistance + ", yDistance = " + yDistance);

  var oppositeXDistance = Math.round(xDistance * pctOfDistReq);
  var oppositeYDistance = Math.round(yDistance * pctOfDistReq);

  return {'x': world.boid.location.x + oppositeXDistance,
          'y': world.boid.location.y + oppositeYDistance};
}

function aggregateAdjustments(adjustments, world){
  if(adjustments.length == 0){
    return world.boid.location;
  }
  var xs = reduce(sum, map(getX, adjustments)); 
  var ys = reduce(sum, map(getY, adjustments)); 
  var avgX = Math.round(xs / adjustments.length);
  var avgY = Math.round(ys / adjustments.length);

  var adjustmentDistance = distance(point(0, 0), point(avgX, avgY));
  if(adjustmentDistance > world.velocity){
    return proportionateAdjustment(point(avgX, avgY), world.velocity / adjustmentDistance);
  }else{
    return point(avgX, avgY);
  }
}

function proportionateAdjustment(point, proportion){
  return {'x': Math.round(point.x * proportion),
          'y': Math.round(point.y * proportion)};
}

function sum(x, y){
  return x + y;
}

function getX(obj){
  return obj['x'];
}

function getY(obj){
  return obj['y'];
}

function boidDistancesToString(boidDistances){
  var boidDistString = reduce(function(bdString, accumString){
                                return accumString + "\n  " + bdString;
                              },
                              map(boidDistanceToString, boidDistances));
  return "boid distances: [\n  " + boidDistString + "\n]\n";
}

function boidDistanceToString(boidDistance){
  return boidToString(boidDistance.boid) +
         ", distance = " + boidDistance.distance;
}
