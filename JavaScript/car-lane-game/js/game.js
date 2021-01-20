/**
 * All the elements and  controls in the game including calculations
 * 
 */
class Game {
    /**
     * Declaration of all the required variables
     */
    constructor() {
        this.gameDiv;
        this.gameDivWidth = '600px';
        this.gameDivHeight = '800px';
        this.roadWrapper;
        this.player;
        this.roadWrapperHeight = 1800;
        this.roadWrapperTop = -600;
        this.roadWrapperMinTop = -600;
        this.addCarCounter = 1;
        this.opponentCars = [];
        this.opponentCarBottomInit = 920;
        this.opponentSpeed = 5;
        this.addCarTimer = 50;
        this.updateDifficultyCounter = 1;
        this.updateDifficultyLimit = 500;
        this.carsPassedScore = 0;
        this.gameInterval;
        this.scoreElement;
        this.difficultyElement;
        this.highScoreElement;
        this.highScore;
        this.difficulty = 1;
        this.carsDestroyedElement;
        this.carsDestroyed = 0;
        this.totalScoreElement;
        this.totalScore = 0;
        this.bulletCounter = 1;
        this.bulletTimer = 20;
        this.bulletAvailable = true;
        this.bulletLiveCounter = 1;
        this.bulletLiveLimit = 1000;
        this.bulletElement;
        this.init();
    }

    /**
     * Initialize the game DIV and also required HTML elements and event handlers
     */
    init() {
        this.gameDiv = document.getElementById('game-wrapper');
        this.gameDiv.style.width = this.gameDivWidth;
        this.gameDiv.style.height = this.gameDivHeight;
        this.gameDiv.style.position = 'relative';


        this.difficultyElement = document.getElementById('difficulty');
        this.difficultyElement.innerHTML = this.difficulty;

        this.scoreElement = document.getElementById('cars-avoided');
        this.scoreElement.innerHTML = this.carsPassedScore;

        this.carsDestroyedElement = document.getElementById('cars-destroyed');
        this.carsDestroyedElement.innerHTML = this.carsDestroyed;

        this.totalScoreElement = document.getElementById('score');
        this.totalScoreElement.innerHTML = this.totalScore;

        this.highScoreElement = document.getElementById('high-score');
        this.highScore = localStorage.getItem('highscore');
        this.highScoreElement.innerHTML = this.highScore;

        this.bulletElement = document.getElementById('bullet');
        this.bulletElement.innerHTML = 'Available';

        this.addRoadWrapper();
        this.createCar(true, 275, 50);

        document.addEventListener('keydown', (e) => {

            if (e.key == 'a' || e.key == 'ArrowLeft') {
                if (!keyPressed && !paused) {
                    this.player.goLeft();
                }
            } else if (e.key == 'd' || e.key == 'ArrowRight') {
                if (!keyPressed && !paused) {
                    this.player.goRight();
                }
            } else if (e.key == 'w' || e.key == 'ArrowUp' || e.code == 'Space') {
                if (!keyPressed && !paused && this.bulletAvailable) {
                    console.log('hi');
                    this.player.isFiring = true;
                    this.bulletAvailable = false;
                    this.bulletElement.innerHTML = 'Not Available'
                }
            }

        });

        this.gameInterval = setInterval(this.runAll.bind(this), frameLength);
    }


    /**
     * run all the logic (functions) in the app inside. run inside the 'game interval' interval
     */
    runAll() {

        this.moveRoad();

        this.moveBullets();

        this.moveOpponentCheckCollision();

        this.addNewOpponent();

        this.bulletTimeEstimate();

    }



    /**
     * Update the difficult of the app and also move road
     */
    moveRoad() {
        // Difficulty up counter for road speed
        if (this.difficulty < 5) {
            this.updateDifficultyCounter = (this.updateDifficultyCounter + 1) % this.updateDifficultyLimit;
        }
        else {
            this.updateDifficultyCounter = 1;
        }

        if (this.updateDifficultyCounter == 0) {
            this.difficulty += 1;
            this.opponentSpeed += 2;
            this.difficultyElement.innerHTML = this.difficulty;
            this.addCarTimer -= 8;
            this.player.bullets += 1;
        }

        //RoadLoop
        if (this.roadWrapperTop < 0) {
            this.roadWrapperTop += this.opponentSpeed;
        }
        else {
            this.roadWrapperTop = this.roadWrapperMinTop;
        }
        this.roadWrapper.style.top = this.roadWrapperTop + 'px';
    }

    /**
     * Move the bullet upwards after firing them
     */
    moveBullets() {
        this.bulletCounter = (this.bulletCounter + 1) % this.bulletTimer;

        if (this.player.isFiring) {
            if (this.player.bulletArray.length < this.player.bullets && this.bulletCounter == 0) {
                this.player.hitBullet();
            }

            for (var x = 0; x < this.player.bulletArray.length; x++) {
                this.player.bulletArray[x].style.bottom = parseInt(this.player.bulletArray[x].style.bottom) + this.opponentSpeed + 'px';
            }

            if (this.player.bulletArray.length > 0) {
                if (parseInt(this.player.bulletArray[this.player.bulletArray.length - 1].style.bottom) > 950) {
                    this.player.isFiring = false;
                    this.player.bulletArray = [];
                }
            }
        }
    }

    /**
     * This class is responsible for checking collisions, and moving the cars (opponent) downward
     */
    moveOpponentCheckCollision() {
        for (var i = 0; i < this.opponentCars.length; i++) {

            var stop = false;

            //Move the opponent downward
            this.opponentCars[i].bottom -= this.opponentSpeed;
            this.opponentCars[i].add();

            //collision detection for rectangular objects
            if (this.player.left < this.opponentCars[i].left + this.opponentCars[i].width &&
                this.player.left + this.player.width > this.opponentCars[i].left &&
                this.player.bottom < this.opponentCars[i].bottom + this.opponentCars[i].height &&
                this.player.bottom + this.player.height > this.opponentCars[i].bottom) {

                //collision
                paused = true;

                if (this.totalScore > this.highScore) {
                    localStorage.setItem('highscore', this.totalScore);
                    this.highScoreElement.innerHTML = this.totalScore;
                }

                clearInterval(this.gameInterval);
                runGame(true);
            }

            //check the collision of the opponent and the bullet and delete the car if collision occurs
            for (var y = 0; y < this.player.bulletArray.length; y++) {
                if (parseInt(this.player.bulletArray[y].style.left) < this.opponentCars[i].left + this.opponentCars[i].width &&
                    parseInt(this.player.bulletArray[y].style.left) + 10 > this.opponentCars[i].left &&
                    parseInt(this.player.bulletArray[y].style.bottom) < this.opponentCars[i].bottom + this.opponentCars[i].height &&
                    parseInt(this.player.bulletArray[y].style.bottom) + 10 > this.opponentCars[i].bottom) {

                    this.opponentCars[i].remove();
                    this.opponentCars.splice(i, 1);

                    this.carsDestroyed += 1;
                    this.totalScore += 1;

                    this.carsDestroyedElement.innerHTML = this.carsDestroyed;
                    this.totalScoreElement.innerHTML = this.totalScore;

                    stop = true;
                    break;
                }
            }

            //delete the cars that have already passed
            if (!stop) {
                if (this.opponentCars[i].bottom < -this.opponentCars[i].height) {
                    this.opponentCars[i].remove();
                    this.opponentCars.splice(i, 1);

                    this.carsPassedScore += 1;
                    this.totalScore += 1;

                    this.scoreElement.innerHTML = this.carsPassedScore;
                    this.totalScoreElement.innerHTML = this.totalScore;
                }
            }
        }
    }

    /**
     * 
     * Add new opponent cars to the html
     * 
     */
    addNewOpponent() {
        this.addCarCounter = (this.addCarCounter + 1) % this.addCarTimer;

        if (this.addCarCounter == 0) {
            var carLeft = this.getOpponentPosition(this.getRandomLane());
            this.createCar(false, carLeft, this.opponentCarBottomInit);
        }
    }

    /**
     * 
     * Calculate if the bullet should be available to the user
     * 
     */
    bulletTimeEstimate() {
        this.bulletLiveCounter = (this.bulletLiveCounter + 1) % this.bulletLiveLimit;

        if (this.bulletLiveCounter == 0) {
            this.bulletAvailable = true;
            this.bulletElement.innerHTML = 'Available';
        }
    }


    /**
     * responsible for getting the lane position for an opponent car
     * @param {*} lane - Lane number 
     */
    getOpponentPosition(lane) {
        var left;

        if (lane == 1) {
            left = 103;
        }
        else if (lane == 2) {
            left = 275;
        }
        else {
            left = 447;
        }

        return left;
    }

    /**
     * Random number generator between 1 and 3
     */
    getRandomLane() {
        var minLane = 1;
        var maxLane = 3;
        var lane = Math.round(Math.random() * (maxLane - minLane) + minLane);

        return lane;
    }

    /**
     * Adding a wrapper for road and adding images
     */
    addRoadWrapper() {
        this.roadWrapper = document.createElement('div');
        this.roadWrapper.style.position = 'absolute';
        this.roadWrapper.style.width = this.gameDivWidth + 'px';
        this.roadWrapper.style.height = this.roadWrapperHeight + 'px';
        this.roadWrapper.style.top = this.roadWrapperTop + 'px';
        this.gameDiv.appendChild(this.roadWrapper);
        this.addRoadImage('images/background-small.png');
        this.addRoadImage('images/background-small.png');
        this.addRoadImage('images/background-small.png');

    }

    addRoadImage(imageSource) {
        var img = document.createElement('img');
        img.setAttribute('src', imageSource);
        img.style.width = this.gameDivWidth + 'px';
        img.style.height = this.gameDivHeight + 'px';
        img.style.objectFit = 'stretch';
        img.style.display = 'block'
        this.roadWrapper.appendChild(img);
    }

    /**
     * Creation of car object, both player and opponent
     * @param {*} isplayer -- to see if the car is a player or an opponent
     * @param {*} left -- left position for the car in the road
     * @param {*} bottom -- distance from bottom of the screen to the car
     */
    createCar(isplayer, left, bottom) {

        if (isplayer) {
            this.player = new Car(this.gameDiv, 'url(images/player.png)', left, bottom);
            this.player.create();
        }
        else {
            var opponentCar = new Car(this.gameDiv, 'url(images/opponent.png)', left, bottom);
            opponentCar.create();
            this.opponentCars.push(opponentCar);
        }
    }

}