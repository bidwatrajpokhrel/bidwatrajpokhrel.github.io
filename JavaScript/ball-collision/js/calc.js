//only using selected colors that look appealing instead of randomly
//picking from the entire spectrum
let prettyColorsArray = [
    "#ffe227",
    "#eb596e",
    "#4d375d",
    "#121013",
    "#ec4646",
    "#663f3f",
    "#51c2d5",
    "#51c2d5",
    "#f8dc81",
    "#eff7e1",
    "#a2d0c1",
    "#f88f01",
    "#ffc1b6",
    "#6930c3",
    "#ff577f"
]

//picks a random color from the color array
function getRandomColor() {
    return (prettyColorsArray[Math.floor(Math.random() * prettyColorsArray.length)]);
}

//checks if the balls have colided
function checkCollision(ball1, ball2) {
    let distance = getDistance(ball1, ball2);
    let radiusSum = ball1.radius + ball2.radius;
    return ((distance - radiusSum + 1) <= 0);
}

//gets the distance between balls
function getDistance(ball1, ball2) {
    return Math.sqrt((ball1.x - ball2.x) ** 2 + (ball1.y - ball2.y) ** 2);
}

//two dimentional elastic collision between two moving objects is the type of collision,
//reference to wikipedia link added
//Link for formula: https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
function twoDimentionalElasticCollision(ball1, ball2) {

    //obtaining values to plug in to the formula
    let theta1 = ball1.angle();
    let theta2 = ball2.angle();
    let phi = Math.atan2(ball2.y - ball1.y, ball2.x - ball1.x);
    let m1 = ball1.mass;
    let m2 = ball2.mass;
    let v1 = ball1.speed();
    let v2 = ball2.speed();

    //calculation of velocity after collision
    let dx1_ = (v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2) * Math.cos(phi) + v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
    let dy1_ = (v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2) * Math.sin(phi) + v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
    let dx2_ = (v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) / (m1 + m2) * Math.cos(phi) + v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
    let dy2_ = (v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) / (m1 + m2) * Math.sin(phi) + v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);

    //reassigning velocity
    ball1.dx = dx1_;
    ball1.dy = dy1_;
    ball2.dx = dx2_;
    ball2.dy = dy2_;
}

