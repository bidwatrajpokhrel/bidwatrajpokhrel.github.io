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
 * Ball Class for creating balls and controlling them 
 */

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = Math.random() * 3;
        this.dy = Math.random() * 3;
        //setting mass as a factor of radius will make bigger balls have more intertia than smaller ones.
        this.mass = this.radius;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    //runs on each frame
    update(ballArray) {
        this.draw();

        for (let i = 0; i < ballArray.length; i++) {
            //ignore self
            if (this === ballArray[i]) {
                continue;
            }

            //check collision and change velocity
            if (checkCollision(this, ballArray[i])) {
                twoDimentionalElasticCollision(this, ballArray[i]);
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