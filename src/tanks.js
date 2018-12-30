
import InputComponent from './components/Input';
import PhysicsComponent from './components/Physics';
import GraphicsComponent from './components/Graphics';
import Collisions from 'collisions';

import {
    WIDTH,
    HEIGHT,
} from './constants'

const width = WIDTH;
const height = HEIGHT;

class Game {
    constructor(rootDOMElem) {
        const collisions = new Collisions();

        this.collisions = collisions;
        this.bodies = [];

        this.player = null;

        this.input = new InputComponent();
        this.physics = new PhysicsComponent();
        this.graphics = new GraphicsComponent();

        rootDOMElem.appendChild(this.graphics.element);

        document.addEventListener('keydown', this.input.setKeyEventHandler);
        document.addEventListener('keyup', this.input.setKeyEventHandler);

        this.createPlayer(400, 300);
        this.createMap();

        const frame = () => {
            this.graphics.update(this.collisions);
            requestAnimationFrame(frame);
        };
        // starts drawing as soon as initialized
        frame();

        this.TARGET_FPS = 60;
        setInterval(this.update.bind(this), 1000 / this.TARGET_FPS);
    }

    update() {
        this.input.update(this.player);
        this.physics.update(this.player, this.collisions);
    }

    createPlayer(x, y) {
        this.player = this.collisions.createPolygon(x, y, [
            [-20, -10],
            [20, -10],
            [20, 10],
            [-20, 10],
        ], 0.2);

        this.player.velocity = 0;
    }

    createMap() {
        const createPolygon = this.collisions.createPolygon.bind(this.collisions);
        // World bounds
        createPolygon(0, 0, [
            [0, 0],
            [width, 0]
        ]);
        createPolygon(0, 0, [
            [width, 0],
            [width, height]
        ]);
        createPolygon(0, 0, [
            [width, height],
            [0, height]
        ]);
        createPolygon(0, 0, [
            [0, height],
            [0, 0]
        ]);

        // Factory
        createPolygon(100, 100, [
            [-50, -50],
            [50, -50],
            [50, 50],
            [-50, 50],
        ], 0.4);
        createPolygon(190, 105, [
            [-20, -20],
            [20, -20],
            [20, 20],
            [-20, 20],
        ], 0.4);
        this.collisions.createCircle(170, 140, 8);
        this.collisions.createCircle(185, 155, 8);
        this.collisions.createCircle(165, 165, 8);
        this.collisions.createCircle(145, 165, 8);

        // Airstrip
        createPolygon(230, 50, [
            [-150, -30],
            [150, -30],
            [150, 30],
            [-150, 30],
        ], 0.4);

        // HQ
        createPolygon(100, 500, [
            [-40, -50],
            [40, -50],
            [50, 50],
            [-50, 50],
        ], 0.2);
        this.collisions.createCircle(180, 490, 20);
        this.collisions.createCircle(175, 540, 20);

        // Barracks
        createPolygon(400, 500, [
            [-60, -20],
            [60, -20],
            [60, 20],
            [-60, 20]
        ], 1.7);
        createPolygon(350, 494, [
            [-60, -20],
            [60, -20],
            [60, 20],
            [-60, 20]
        ], 1.7);

        // Mountains
        createPolygon(750, 0, [
            [0, 0],
            [-20, 100]
        ]);
        createPolygon(750, 0, [
            [-20, 100],
            [30, 250]
        ]);
        createPolygon(750, 0, [
            [30, 250],
            [20, 300]
        ]);
        createPolygon(750, 0, [
            [20, 300],
            [-50, 320]
        ]);
        createPolygon(750, 0, [
            [-50, 320],
            [-90, 500]
        ]);
        createPolygon(750, 0, [
            [-90, 500],
            [-200, 600]
        ]);

        // Lake
        createPolygon(550, 100, [
            [-60, -20],
            [-20, -40],
            [30, -30],
            [60, 20],
            [40, 70],
            [10, 100],
            [-30, 110],
            [-80, 90],
            [-110, 50],
            [-100, 20],
        ]);
    }
}

function random(min, max) {
    return Math.floor(Math.random() * max) + min;
}

export default Game;