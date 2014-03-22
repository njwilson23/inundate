/*
Implement a map of coastal areas (in North America, for now) that visualizes the potential coastline changes due to sea level rise.
*/

var bounds = [-130, -70, 20, 60];
var map = Scrollmap(bounds);

map.addCoast('data/coast/');         // this will be the modern coastline data
map.addPolygon('data/slr100/');      // when the app starts, a feature representing 1m of SLR will be shown

