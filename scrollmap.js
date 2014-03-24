'use strict;'
/*
This implements a scrollable map drawn using d3 and the <canvas> element. This
is a major component of inundate.js.
*/

function Scrollmap(svg, bounds) {

  if (bounds[1] < bounds[0]) {
    throw "x1 must be greater than x0";
  } else if (bounds[3] < bounds[2]) {
    throw "x3 must be greater than x2";
  }

  this.svg = svg;
  this.xy = [0.5*(bounds[0] + bounds[1]), 0.5*(bounds[2] + bounds[3])];
  this.aspect = (bounds[1] - bounds[0]) / (bounds[3] - bounds[2])
  this.scale = bounds[1] - bounds[0];
  this.indices = [];  // this will a list of indices to all the feature to display
  this.tiles = [];    // this will be a hash map of the currently "owned" tiles
}

Scrollmap.prototype.readIndex = function (addr) {
  var sm = this;
  d3.json(addr, function (err, data) {
    sm.indices.push(data);
    sm.update();
  })
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

  // search the indices for tiles in view
  // the following loop leaves room for optimization
  var tiles = [];
  for (var ii=0; ii < this.indices.length; ii++) {
    var index = this.indices[ii]

    for (var it=0; it < index.tiles.length; it++) {
      var tile = index.tiles[it];
      var b = tile.bounds;
      if (((b[1] > bounds[0]) || (b[0] < bounds[1])) &&
          ((b[3] > bounds[2]) || (b[2] < bounds[3]))) {
        tile.fullAddr = index.topAddr + tile.addr;
        tile.class = index.class;
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
    if (this.tiles.indexOf(tiles[i]) === -1) {
      this.tiles.push(tiles[i]);
      this.loadTile(tiles[i]);
    }
  }

  // remove local tiles not in the new list
  for (var i=0; i<this.tiles.length; i++) {
    if (tiles.indexOf(this.tiles[i]) === -1) {
      this.tiles.pop(i);
      // remove points from svg
      console.log("Not implemented - cleanup point from SVG");
    }
  }

  return this;
}

Scrollmap.prototype.loadTile = function (tile) {
  var sm = this;
  d3.json(tile.fullAddr, function (err, data) {
    // check for errors?
    data.class = tile.class;
    sm.tiles.push(data);
    sm.draw(data);
  })
  return this;
}

Scrollmap.prototype.draw = function (tile) {
  this.svg.append("path")
    .datum(topojson.feature(tile, tile.objects.ne_10m_coastline))
    .attr("class", tile.class)
    .attr("d", d3.geo.path().projection(d3.geo.mercator()));
}

Scrollmap.prototype.drawTo = function (svg) {
  for (var i=0; i<this.tiles.length; i++) {
    var tile = this.tiles[i]
    svg.append("path")
      .datum(topojson.feature(tile, tile.data.ne_10m_coastline))
      .attr("d", d3.geo.path().projection(d3.geo.mercator()));
  }
}

