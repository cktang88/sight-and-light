import Collisions from 'collisions';

import {
    WIDTH,
    HEIGHT,
    FANCY_GRAPHICS
} from './constants'

const width = WIDTH;
const height = HEIGHT;
const result = Collisions.createResult();

class InputComponent {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.setKeyEventHandler = (e) => {
            const keydown = e.type === 'keydown';
            const key = e.key.toLowerCase();

            key === 'w' && (this.up = keydown);
            key === 's' && (this.down = keydown);
            key === 'a' && (this.left = keydown);
            key === 'd' && (this.right = keydown);
        };
    }
    update(player) {
        this.up && (player.velocity += 0.1);
        this.down && (player.velocity -= 0.1);
        this.left && (player.angle -= 0.04);
        this.right && (player.angle += 0.04);
    }
}

class PhysicsComponent {
    constructor() {
        
    }
    update(player, collisions) {
        this.updatePlayer(player);
        this.handleCollisions(player, collisions);
    }
    updatePlayer(player) {
        const x = Math.cos(player.angle);
        const y = Math.sin(player.angle);

        if (player.velocity > 0) {
            player.velocity -= 0.05;

            if (player.velocity > 3) {
                player.velocity = 3;
            }
        } else if (player.velocity < 0) {
            player.velocity += 0.05;

            if (player.velocity < -2) {
                player.velocity = -2;
            }
        }

        if (!Math.round(player.velocity * 100)) {
            player.velocity = 0;
        }

        if (player.velocity) {
            player.x += x * player.velocity;
            player.y += y * player.velocity;
        }
    }
    handleCollisions(player, collisions) {
        collisions.update();

        const potentials = player.potentials();

        // Negate any collisions
        for (const body of potentials) {
            if (player.collides(body, result)) {
                player.x -= result.overlap * result.overlap_x;
                player.y -= result.overlap * result.overlap_y;

                player.velocity *= 0.9
            }
        }
    }
}

class Game {
    constructor() {
        const collisions = new Collisions();

        this.element = document.createElement('div');
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.collisions = collisions;
        this.bodies = [];

        this.canvas.width = width;
        this.canvas.height = height;
        this.player = null;

        this.input = new InputComponent();
        this.physics = new PhysicsComponent();

        this.element.innerHTML = `
        <div><b>W, S</b> - Accelerate/Decelerate</div>
        <div><b>A, D</b> - Turn</div>
        <div><label><input id="bvh" type="checkbox"> Show Bounding Volume Hierarchy</label></div>
    `;

        document.addEventListener('keydown', this.input.setKeyEventHandler);
        document.addEventListener('keyup', this.input.setKeyEventHandler);

        this.bvh_checkbox = this.element.querySelector('#bvh');
        this.element.appendChild(this.canvas);

        this.createPlayer(400, 300);
        this.createMap();

        const frame = () => {
            this.update();
            requestAnimationFrame(frame);
        };

        frame();
    }

    update() {
        this.input.update(this.player);
        this.physics.update(this.player, this.collisions);
        this.render();
    }
    render() {
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, WIDTH, HEIGHT);


        if (FANCY_GRAPHICS) {
            // cyan highlight
            this.context.strokeStyle = '#00FFFF';
            this.context.lineWidth = 2;
            this.context.beginPath();
            this.collisions.draw(this.context);
            this.context.stroke();
        }

        // white main line color
        this.context.strokeStyle = '#FFFFFF';
        this.context.lineWidth = 1;
        this.context.beginPath();
        this.collisions.draw(this.context);
        this.context.stroke();

        if (this.bvh_checkbox.checked) {
            this.context.strokeStyle = '#00FF00';
            this.context.beginPath();
            this.collisions.drawBVH(this.context);
            this.context.stroke();
        }
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