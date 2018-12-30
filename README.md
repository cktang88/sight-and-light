Sight & Light
===============

Play
---

TIP: turn `FANCY_GRAPHICS` option on!

```bash
npm start
```


Libs
---

* Collision detection via [sinova/Collisions](https://sinova.github.io/Collisions)
* Visibility from [ncase/sight-and-light](http://ncase.github.io/sight-and-light)

Collisions
---
 - Lib is chosen b/c can handle **systems** of collisions, not just individual pairs.
 - keeps track of both broad-phase and narrow-phase detection via [BVH](https://en.wikipedia.org/wiki/Bounding_volume_hierarchy) and [SAT](https://en.wikipedia.org/wiki/Separating_axis_theorem). 
 - `NOTE: line = one-sided polygon`.
 - (currently only works for convex polygons due to SAT, but can use convex decomposition workaround for concave polygons)

Dev
---
* Built using [parcel](https://parceljs.org/)

```bash

npm start # start dev server with hot reload

```
