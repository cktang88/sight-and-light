/**
 * for controlling game entities with keyboard
 */
class InputComponent {
    constructor(body) {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.body = body;

        this.setKeyEventHandler = (e) => {
            const keydown = e.type === 'keydown';
            const key = e.key.toLowerCase();

            key === 'w' && (this.up = keydown);
            key === 's' && (this.down = keydown);
            key === 'a' && (this.left = keydown);
            key === 'd' && (this.right = keydown);
        };

        // TODO: make time-dependent
        this.ACCELERATION = 0.1;
        this.TURN_SPEED = 0.04;
    }
    update() {
        this.up && (this.body.velocity += this.ACCELERATION);
        this.down && (this.body.velocity -= this.ACCELERATION);
        this.left && (this.body.angle -= this.TURN_SPEED);
        this.right && (this.body.angle += this.TURN_SPEED);
    }
}

export default InputComponent;