import Crafty, {
    math
} from "craftyjs";

const {
    Vector2D
} = math;
/**
 * Crafty.e() = entity
 * Crafty.c() = component
 * Crafty.s() = system
 *
 */

Crafty.init(1200, 600, document.getElementById("game"));

const SIZE = 20;

const projectiles = [];

const createBullet = ({
    x,
    y,
    w,
    h
}) => {
    return Crafty.e('2D, DOM, Motion, Collision')
        .setName('bullet')
        .attr({
            x,
            y,
            w,
            h
        })
        .color('333')

    // use .ccdbr() for tunneling protection
    // see https://github.com/craftyjs/Crafty/wiki/Crafty-FAQ-%28draft%29#why-are-my-bullets-passing-through-other-entities-without-registering-hits
}

// If you want more fine-grained control consider using Crafty.map.search().

const player = Crafty.e("2D, DOM, Color, Mouse, Fourway, Collision, Solid")
    .setName('player') // just human readable label
    .attr({
        x: 0,
        y: 0,
        w: SIZE,
        h: SIZE
    })
    .bind("MouseUp", function (e) {
        // lol, works only when you click on the obj, so global mouse often better
    })
    .color("#aaa")
    .fourway(200);

Crafty.s("Mouse").bind("MouseDown", function (e) {
    const {
        realX,
        realY,
        target,
        mouseButton
    } = e;
    Crafty.log("Mouse pos: <" + realX.toFixed(2) + ", " + realY.toFixed(2) + ">");
    console.log(target);

    const start = new Vector2D(realX, realY);
    const end = new Vector2D(player.x, player.y);
    console.log(start.subtract(end));
    const vec = start.subtract(end).getNormal();


    if (mouseButton == Crafty.mouseButtons.LEFT) {} else {}
});
/*
Crafty.e('Floor, 2D, Canvas, Color')
    .attr({
        x: 0,
        y: 250,
        w: 250,
        h: 10
    })
    .color('green');

Crafty.e('2D, Canvas, Color, Twoway, Gravity')
    .attr({
        x: 0,
        y: 0,
        w: 50,
        h: 50
    })
    .color('#F00')
    .twoway(200)
    .gravity('Floor');*/

// selection/events is like d3.js/jQuery http://craftyjs.com/documentation/entities.html