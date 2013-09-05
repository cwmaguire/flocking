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
    return boidsInRange.slice(0);
  }

  var newBoidDistances = boidDistances.slice(0);

  var distance = distance(point, boids[0].point) 

  if(range < distance){
    newBoidDistances.push({'boid': copyBoid(boids[0]),
                           'distance': distance});
  }

  return findNeighboursInRange(point, boids.slice(1), range, newBoidDistances);
}

function adjustToNeighbours(point, boidDistances, range, velocity, adjustments){
  if(adjustments === undefined){
    adjustments = [];
  }

  if(boidDistances.length == 0){
    return adjustments.slice(0);
  }

  var adjustment = adjustToNeighbour(boidDistances[0], range, velocity);
  var newAdjustments = adjustments.slice(0);
  newAdjustments.push(adjustment);
  return adjustToNeighbours(point, boidDistances.slice(1), range, velocity, newAdjustments);
}

function adjustToNeighbour(point, neighbourBoidDistance, range, velocity){
  var distanceToBoid = distance(point, neighbourBoid.point);
  var necessarySpace = range - neighbourBoidDistance.distance;
  var pctOfDistReq = necessarySpace / distanceToBoid;
  var xDistance = point.x - neighbourBoidDistance.boid.x;
  var yDistance = point.y - neighbourBoidDistance.boid.y;
  var oppositeXDistance = xDistance * pctOfDistReq;
  var oppositeYDistance= yDistance * pctOfDistReq;
  var maxOpposingX = Math.min(velocity, oppositeXDistance);
  var maxOpposingY = Math.min(velocity, oppositeYDistance);
  return {'x': point.x - oppositeXDistance,
          'y': point.y - oppositeYDistance};
}

function aggregateAdjustments(adjustments){
  var xs = reduce(sum, map(getX, adjustments)); 
  var ys = reduce(sum, map(getY, adjustments)); 

  var avgX = Math.round(xs / xs.length);
  var avgY = Math.round(ys / ys.length);

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
