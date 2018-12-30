import {
    FANCY_GRAPHICS,
    WIDTH,
    HEIGHT
} from '../constants'

class GraphicsComponent {
    constructor(context) {
        this.context = context;
    }
    update(collisions, DRAW_BOUNDING_BOX) {
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, WIDTH, HEIGHT);

        if (FANCY_GRAPHICS) {
            // cyan highlight
            this.context.strokeStyle = '#00FFFF';
            this.context.lineWidth = 2;
            this.context.beginPath();
            collisions.draw(this.context);
            this.context.stroke();
        }

        // white main line color
        this.context.strokeStyle = '#FFFFFF';
        this.context.lineWidth = 1;
        this.context.beginPath();
        collisions.draw(this.context);
        this.context.stroke();

        if (DRAW_BOUNDING_BOX) {
            this.context.strokeStyle = '#00FF00';
            this.context.beginPath();
            collisions.drawBVH(this.context);
            this.context.stroke();
        }
    }
}

export default GraphicsComponent;