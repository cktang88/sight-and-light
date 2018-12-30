import Collisions from 'collisions';

class PhysicsComponent {
    constructor() {
        // recycle to avoid wasting memory
        this.result = Collisions.createResult();
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
        const result = this.result;
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

export default PhysicsComponent;