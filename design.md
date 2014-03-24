# Inundate design

## Scrollmap

The base library object is the `Scrollmap`. This provides an abstraction to the tiled data on the server. The `Scrollmap` keeps track of the current map position, the current tiles displayed, and knows how to query the server for more tiles.

The currently owned tiles can be drawn to a `<svg>` element using the `Scrollmap.draw` method.

### Tile index

The tiles are listed in a JSON file on the server called the tile index. The schema is something like

    {
      "tiles": [<array of tile objects>],
      "topAddr": String,
      "projection": String,
      "class": String
    }

where each tile object looks like

    {
      "xy": [x0, x1, y0, y1],
      "addr": String,
      "class": String
    }

The `addr` in the tile object is the URL to the corresponding GeoJSON/topojson file.If the tile index has a class, then all subsidiary tiles will receive the same class.


## App

The app will show a simple map with a line representing the modern coast, and blue hashes representing coastal inundation. A traditional legend will be shown in the corner. The degree of sea level rise will be adjustable from a drop-down box. Features may be downloaded from OSM in the future.


