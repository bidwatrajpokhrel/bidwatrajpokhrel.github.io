/**
 * Car Object with Bullets
 * Used for both player and opponent car
 * 
 */
class Car {
    /**
     * 
     * @param {*} container - parent container of the car object
     * @param {*} background - background image url for the car
     * @param {*} left - left position for the car object in the lane
     * @param {*} bottom  - bottom position in the lane
     * 
     */
    constructor(container, background, left, bottom) {
        this.container = container;
        this.car;
        this.background = background;
        this.width = 50;
        this.height = 90;
        this.left = left;
        this.bottom = bottom;
        this.laneWidth = 172;
        this.leftStart = 103;
        this.rightEnd = 386;
        this.bulletArray = [];
        this.isFiring = false;
        this.bullets = 1;
    }

    /**
     * create the car in using html elements  and style it
     */
    create() {
        this.car = document.createElement('div');
        this.car.style.background = this.background;
        this.car.style.backgroundSize = 'contain';
        this.car.style.backgroundRepeat = 'no-repeat';
        this.car.style.left = this.left + 'px';
        this.car.style.width = this.width + 'px';
        this.car.style.height = this.height + 'px';
        this.car.style.position = 'absolute';

        this.add();

        this.container.appendChild(this.car);
    }

    /**
     * remove the car from the road (HTML)
     */
    remove() {
        this.container.removeChild(this.car);
    }

    /**
     * Add the car to the road
     */
    add() {
        this.car.style.bottom = this.bottom + 'px';
    }


    /**
     * Go left in the lane (only player)
     * 
     */
    goLeft() {
        if (this.left > this.leftStart) {
            keyPressed = true;
            var leftInterval = setInterval(moveLeft.bind(this), frameLength);
            var targetLeft = this.left - this.laneWidth;
            function moveLeft() {
                if (this.left <= targetLeft) {
                    this.left = targetLeft;
                    this.car.style.left = this.left + 'px';

                    keyPressed = false;
                    clearInterval(leftInterval);
                }
                else {
                    this.left -= 15;
                    this.car.style.left = this.left + 'px';
                }
            }
        }
    }

    /**
     * go right in the lane (only player)
     */
    goRight() {
        if (this.left < this.rightEnd) {
            keyPressed = true;
            var rightInterval = setInterval(moveRight.bind(this), frameLength);
            var targetLeft = this.left + this.laneWidth;
            function moveRight() {
                if (this.left >= targetLeft) {
                    this.left = targetLeft;
                    this.car.style.left = this.left + 'px';
                    keyPressed = false;
                    clearInterval(rightInterval);
                }
                else {
                    this.left += 15;
                    this.car.style.left = this.left + 'px';
                }
            }
        }
    }

    /**
     * Activate bullet(s) for the car
     */
    hitBullet() {
        var bullet = document.createElement('div');
        bullet.style.width = '20px';
        bullet.style.height = '20px';
        bullet.style.background = 'url(images/bullet.png)';
        bullet.style.backgroundSize = 'contain';
        bullet.style.position = 'absolute';
        bullet.style.left = this.left + 15 + 'px';
        var bulletStart = this.bottom + this.height;
        bullet.style.bottom = bulletStart + 'px';
        this.container.appendChild(bullet);
        this.bulletArray.push(bullet);
    }
}
