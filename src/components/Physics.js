import Collisions from 'collisions';

class PhysicsComponent {
    constructor(body) {
        // recycle to avoid wasting memory
        this.result = Collisions.createResult();
        this.body = body;
    }
    update(collisions) {
        this.updateMovement(this.body);
        this.handleCollisions(collisions);
    }

    // updates movement
    updateMovement() {
        if (this.body.velocity > 0) {
            this.body.velocity -= 0.05;

            if (this.body.velocity > 3) {
                this.body.velocity = 3;
            }
        } else if (this.body.velocity < 0) {
            this.body.velocity += 0.05;

            if (this.body.velocity < -2) {
                this.body.velocity = -2;
            }
        }

        if (!Math.round(this.body.velocity * 100)) {
            this.body.velocity = 0;
        }

        const x = Math.cos(this.body.angle);
        const y = Math.sin(this.body.angle);

        if (this.body.velocity) {
            this.body.x += x * this.body.velocity;
            this.body.y += y * this.body.velocity;
        }
    }

    // handle collision of this body with other bodies
    handleCollisions(collisions) {
        collisions.update();

        const potentials = this.body.potentials();
        const result = this.result;
        // Negate any collisions
        for (const body of potentials) {
            if (this.body.collides(body, result)) {
                // collision occured
                this.body.x -= result.overlap * result.overlap_x;
                this.body.y -= result.overlap * result.overlap_y;
                this.body.velocity *= 0.9
            }
        }
    }
}

export default PhysicsComponent;