/*
scrollmap.js

This implements a scrollable map drawn using d3 and the <canvas> element. This is a major component of inundate.js.
*/

function Scrollmap(bounds) {
  if (bounds[1] !> bounds[0]) {
    throw "x1 must be greater than x0";
  } else if (bounds[3] !> bounds[2]) {
    throw "x3 must be greater than x2";
  }
  this.xy = [0.5*(bounds[0] + bounds[1]), 0.5*(bounds[2] + bounds[3])];
  this.aspect = (bounds[1] - bounds[0]) / (bounds[3] - bounds[2])
  this.scale = bounds[1] - bounds[0];
}

