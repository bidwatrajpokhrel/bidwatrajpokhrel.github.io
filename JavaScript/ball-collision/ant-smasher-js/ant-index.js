let antArray = []; //array for the ants


/**
 * main class
 * takes in number of ants, max size of the ants and min size of the ants
 * 
 */
class AntMain {
    constructor(numberAnts, MaxSize, MinSize) {
        this.numberAnts = numberAnts || 50;
        this.MaxSize = MaxSize || 10;
        this.MinSize = MinSize || 5;
        this.init();
        this.move();
    }

    /**
     * initializes the ant's properties and adds them to the array
     */
    init() {
        for (let i = 0; i < this.numberAnts; i++) {
            let radius = Math.floor(Math.random() * (this.MaxSize - this.MinSize) + this.MinSize);
            let x = Math.random() * (canvas.width - radius * 2) + radius;
            let y = Math.random() * (canvas.height - radius * 2) + radius;
            let color = getRandomColor();
            antArray.push(new Ant(x, y, radius, color));
        }
    }

    /**
     * starts the movement and continues it throughout execution
     */
    move() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        antArray.forEach(ant => ant.update(antArray));
        requestAnimationFrame(this.move.bind(this));
    }

}
