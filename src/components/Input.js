
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

export default InputComponent;