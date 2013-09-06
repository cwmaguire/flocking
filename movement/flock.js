"use strict";

function flockVector(boid, neighbourBoids, flockBehaviours){
  boidDistances = findNeighboursInRange(boid.point,
                                        neighbourBoids,
                                        flockBehaviours.range);
  adjustmentsToNeighbours = adjustToNeighbours(boid.point,
                                               boidDistances,
                                               flockBehaviours.range,
                                               flockBehaviours.velocity);
  aggregatedAdjustment = aggregateAjustments(adjustmentsToNeighbours);
  return aggregatedAdjustment;
}

function findNeighboursInRange(point, boids, range, boidDistances){
  if(boidDistances === undefined){
    boidDistances = [];
  }

  if(boids.length == 0){
    return boidDistances.slice(0);
  }

  var newBoidDistances = boidDistances.slice(0);

  var distanceToBoid = distance(point, boids[0].location) 

  if(distanceToBoid <= range){
    newBoidDistances.push({'boid': copyBoid(boids[0]),
                           'distance': distanceToBoid});
  }

  return findNeighboursInRange(point, boids.slice(1), range, newBoidDistances);
}

function adjustToNeighbours(point, boidDistances, range, adjustments){
  if(adjustments === undefined){
    adjustments = [];
  }

  if(boidDistances.length == 0){
    return adjustments.slice(0);
  }

  var adjustment = adjustToNeighbour(point, boidDistances[0], range);
  var newAdjustments = adjustments.slice(0);
  newAdjustments.push(adjustment);
  return adjustToNeighbours(point, boidDistances.slice(1), range, newAdjustments);
}

function adjustToNeighbour(point, neighbourBoidAndDistance, range){
  var neighbour = neighbourBoidAndDistance.boid;
  var distance = neighbourBoidAndDistance.distance;

  var necessarySpace = range - distance;
  var pctOfDistReq = necessarySpace / distance;

  var xDistance = point.x - neighbour.location.x;
  var yDistance = point.y - neighbour.location.y;

  var oppositeXDistance = xDistance * pctOfDistReq;
  var oppositeYDistance = yDistance * pctOfDistReq;

  //if(oppositeXDistance < 0){
    //oppositeXDistance = Math.max(-velocity, oppositeXDistance);
  //}else{
    //oppositeXDistance = Math.min(velocity, oppositeXDistance);
  //}

  //if(oppositeYDistance < 0){
    //oppositeYDistance = Math.max(-velocity, oppositeYDistance);
  //}else{
    //oppositeYDistance = Math.min(velocity, oppositeYDistance);
  //}

  return {'x': point.x + oppositeXDistance,
          'y': point.y + oppositeYDistance};
}

function aggregateAdjustments(adjustments){
  var xs = reduce(sum, map(getX, adjustments)); 
  var ys = reduce(sum, map(getY, adjustments)); 

  var avgX = Math.round(xs / adjustments.length);
  var avgY = Math.round(ys / adjustments.length);

  return {'x': avgX, 'y': avgY};
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
