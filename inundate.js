'use strict;'
/*
Implement a map of coastal areas (in North America, for now) that visualizes the potential coastline changes due to sea level rise.
*/

var bounds = [-130, -70, 20, 60];
var map = Scrollmap(bounds);
var canvas = document.getElementById("map");
var ctx = canvas.getContext('2d');

map.readIndex('data/coast/')    // this will be the modern coastline data
   .readIndex('data/slr100/')   // a feature representing 1m of SLR
   .update()
   .drawTo(ctx);

