//create and resize canvas

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
const c = canvas.getContext('2d');


/**
 * Ant Class for creating ants and controlling them 
 */

class Ant {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = Math.random() * 2;
        this.dy = Math.random() * 2;
        //setting mass as a factor of radius will make bigger ants have more intertia than smaller ones.
        this.mass = this.radius * this.radius * this.radius;
        this.image = document.getElementById('ant');
    }

    draw() {
        // c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // c.fillStyle = this.color;
        // c.fill();
        // c.closePath();
        c.drawImage(this.image, this.x, this.y, this.radius, this.radius);
    }

    //runs on each frame
    update(antArray) {
        this.draw();

        for (let i = 0; i < antArray.length; i++) {
            //ignore self
            if (this === antArray[i]) {
                continue;
            }

            //check collision and change velocity
            if (checkCollision(this, antArray[i])) {
                twoDimentionalElasticCollision(this, antArray[i]);
            }
        }

        //wall collision
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.dx = -this.dx;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;


    }
    // magnitude of velocity (average of x and y velocity)
    speed() {
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };
    // angle of velocity with the x axis
    angle() {
        return Math.atan2(this.dy, this.dx);
    };
}