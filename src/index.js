import Crafty from 'craftyjs'

Crafty.init(500, 350, document.getElementById('game'));

/*
Crafty.e('2D, DOM, Color, Fourway')
    .attr({
        x: 0,
        y: 0,
        w: 100,
        h: 100
    })
    .color('#F00')
    .fourway(200);*/

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
    .gravity('Floor');


// selection/events is like d3.js/jQuery http://craftyjs.com/documentation/entities.html