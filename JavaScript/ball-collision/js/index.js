let ballArray = []; //array for the balls


/**
 * main class
 * takes in number of balls, max size of the balls and min size of the balls
 * 
 */
class Main {
    constructor(numberBalls, MaxSize, MinSize) {
        this.numberBalls = numberBalls || 50;
        this.MaxSize = MaxSize || 10;
        this.MinSize = MinSize || 5;
        this.init();
        this.move();
    }

    /**
     * initializes the ball's properties and adds them to the array
     */
    init() {
        for (let i = 0; i < this.numberBalls; i++) {
            let radius = Math.floor(Math.random() * (this.MaxSize - this.MinSize) + this.MinSize);
            let x = Math.random() * (canvas.width - radius * 2) + radius;
            let y = Math.random() * (canvas.height - radius * 2) + radius;
            let color = getRandomColor();
            ballArray.push(new Ball(x, y, radius, color));
        }
    }

    /**
     * starts the movement and continues it throughout execution
     */
    move() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        ballArray.forEach(ball => ball.update(ballArray));
        requestAnimationFrame(this.move.bind(this));
    }

}
