# Inundate design

## Scrollmap

The base library object is the `Scrollmap`. This provides an abstraction to the tiled data on the server. The `Scrollmap` keeps track of the current map position, the current tiles displayed, and knows how to query the server for more tiles.

The currently owned tiles can be drawn to an arbitrary `<canvas>` element using the `Scrollmap.drawTo` method.

### Tile index

The tiles are listed in a JSON file on the server called the tile index. The schema is something like

  {
    tiles: [<list of tile objects>],
    topAddr: String
    projection: String
  }

where each tile object looks like

  {
    xy: [x0, x1, y0, y1],
    addr: String
   }

The `addr` in the tile object is the URL to the corresponding GeoJSON/topojson file.


## App

The app will show a simple map with a line representing the modern coast, and blue hashes representing coastal inundation. A traditional legend will be shown in the corner. The degree of sea level rise will be adjustable from a drop-down box.

The app consists of a <canvas> element, which is passed to the `Scrollmap.drawTo` method whenever the data are modified by the user.

