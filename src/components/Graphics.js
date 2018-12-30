import {
    FANCY_GRAPHICS
} from '../constants'

import context from '../game'

class GraphicsComponent {
    constructor(body) {
        this.body = body;
    }
    // NOTE: for optimization, passing by value like this may waste lots of memory...
    update(context) {

        if (FANCY_GRAPHICS) {
            // cyan highlight
            context.strokeStyle = '#4040ff';
            context.lineWidth = 4;
            context.beginPath();
            // collisions.draw(context);
            this.body.draw(context);
            context.stroke();
        }

        // white main line color
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = 1;
        context.beginPath();
        // collisions.draw(context);
        this.body.draw(context);
        context.stroke();
    }
}

export default GraphicsComponent;