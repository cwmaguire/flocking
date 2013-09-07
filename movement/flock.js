"use strict";

function flockVector(boid, neighbourBoids, flockBehaviours){
  var boidDistances = findNeighboursInRange(boid.location,
                                            neighbourBoids,
                                            flockBehaviours.range);
  log("boid.location = " + pointToString(boid.location));
  log("boidDistances[0] = " + pointToString(boidDistances[0]));
  log("boidDistances = " + boidDistances.toString());
  log("flockBehaviours.range = " + flockBehaviours.range);
  var adjustmentsToNeighbours = adjustToNeighbours(boid.location,
                                                   boidDistances,
                                                   flockBehaviours.range);
  log("adjustmentsToNeighbours is " + adjustmentsToNeighbours.toString());
  var aggregatedAdjustment = aggregateAdjustments(adjustmentsToNeighbours,
                                                  flockBehaviours.velocity);
  return aggregatedAdjustment;
}

function findNeighboursInRange(point, allBoids, range, boidDistances){
  if(boidDistances === undefined){
    boidDistances = [];
  }

  if(allBoids.length == 0){
    return boidDistances.slice(0);
  }

  var newBoidDistances = boidDistances.slice(0);

  //log("Calling distance (flock.js:28) with " + pointToString(point) + " and " + pointToString(allBoids[0].location));

  var distanceToBoid = distance(point, allBoids[0].location) 

  if(distanceToBoid < range){
    newBoidDistances.push({'boid': copyBoid(allBoids[0]),
                           'distance': distanceToBoid});
  }

  return findNeighboursInRange(point, allBoids.slice(1), range, newBoidDistances);
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

  var oppositeXDistance = Math.round(xDistance * pctOfDistReq);
  var oppositeYDistance = Math.round(yDistance * pctOfDistReq);

  return {'x': point.x + oppositeXDistance,
          'y': point.y + oppositeYDistance};
}

function aggregateAdjustments(adjustments, velocity){
  log("adjustments[0] is " + pointToString(adjustments[0]));
  var xs = reduce(sum, map(getX, adjustments)); 
  var ys = reduce(sum, map(getY, adjustments)); 

  log("xs = " + xs.toString());
  log("ys = " + ys.toString());

  var avgX = Math.round(xs / adjustments.length);
  var avgY = Math.round(ys / adjustments.length);

  log("Calling distance (flock.js:78) with 0,0 and " + avgX + "," + avgY);
  var adjustmentDistance = distance({'x': 0, 'y': 0}, {'x': avgX, 'y': avgY});
  if(adjustmentDistance > velocity){
    return proportionateAdjustment({'x': avgX, 'y': avgY}, velocity / adjustmentDistance);
  }else{
    return {'x': avgX, 'y': avgY};
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
