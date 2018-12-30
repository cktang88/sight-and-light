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
    }
    update() {
        this.up && (this.body.velocity += 0.1);
        this.down && (this.body.velocity -= 0.1);
        this.left && (this.body.angle -= 0.04);
        this.right && (this.body.angle += 0.04);
    }
}

export default InputComponent;