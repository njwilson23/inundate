'use strict;'
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
  this.indices = [];  // this will a list of indices to all the feature to display
  this.tiles = {};  // this will be a hash map of the currently "owned" tiles
}

Scrollmap.prototype.readIndex = function (addr) {
  var index = null;
  d3.json(addr, function (data, err) {
    index = data;
    return err;
  })
  this.indices.push(index);
  return this;
}

// private method
// find the files corresponding to the tiles that should be in view from *xy*
Scrollmap.prototype._tilesAt = function (xy) {
  var xy = xy || this.xy;
  var dx = this.scale,
      dy = this.scale / this.aspect;
  var bounds = [xy[0] - 0.5*dx,
                xy[0] + 0.5*dx,
                xy[1] - 0.5*dy,
                xy[1] + 0.5*dy];

  // the following loop leaves room for optimization
  var tiles = [];
  for (var ii=0; ii < this.indices.length; ii++) {
    var index = this.indices[ii]

    for (var it=0; it < index.tiles.length; it++) {
      var tile = index.tiles[it];
      if (((tile.xy[0] > bounds[0]) && (tile.xy[0] < bounds[1])) ||
          ((tile.xy[1] >= bounds[2]) && tile.xy[1] < bounds[3])) {
        tiles.push(tile);
      }
    }
  }
  return tiles;
}

Scrollmap.prototype.update = function () {
  var tiles = this._tilesAt();

  // add tiles missing from local
  for (var i=0; i<tiles.length; i++) {
    if !(tiles[i] in this.tiles) {
      this.tiles.push(tiles[i]);
    }
  }

  // remove local tiles not in the new list
  for (var i=0; i<this.tiles.length; i++) {
    if !(this.tiles[i] in tiles) {
      this.tiles.pop(i);
    }
  }

  return this;
}

Scrollmap.prototype.loadTile = function (addr) {
  var sm = this;
  d3.json(addr, function (data, err) {
    // check for errors?
    sm.tiles.push(data);
  })
  return this;
}

Scrollmap.prototype.drawTo = function (ctx) {
  // a bunch of messy draw logic
  // using d3 or direct to canvas?
  console.log('draw');
}

