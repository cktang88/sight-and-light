Sight & Light
===============

TODO
---
- [ ] unify polygon methods between sight proj and collision proj
- [ ] get a Vector + math/geometry lib



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
* Game code structure based on [Entity-Component-System](https://en.wikipedia.org/wiki/Entity%E2%80%93component%E2%80%93system) architecture.

```bash

npm start # start dev server with hot reload

```


Updates
---

- 12/20 - decided trying to piece together many demos is a bad idea. Better to use game engine. Must be **actively** developed, have collision system, preferably math/vector system, ECS system, visibility/LOS system, sound/sprite support, camera/viewport system, particle system.
    * Candidates: 
        1. phaser.js --> API is messy/bloated, not ECS :(
        2. melon.js --> not ECS :(
        3. crafty.js