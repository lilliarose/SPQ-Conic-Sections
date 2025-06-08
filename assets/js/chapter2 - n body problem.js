let bodies = [];
let n = 7;
let button;
let nInput;

function load() {
    console.log(n)
    button = document.getElementById('submitButton');
    nInput = document.getElementById('nInput');
    button.addEventListener('click',submitCallback)
}

function submitCallback() {
    n = nInput.value
    console.log(n)
    clear()
    setup()
}

function setup() {
    // creates a canvas and then appends it to the div with the id "canvasContainer"
    bodies = []
    if (windowWidth/2 < 360) {
        canvas = createCanvas(360, 360);
    } else {
        canvas = createCanvas(windowWidth/2, windowHeight/2);
    }
    canvas.parent("canvasContainer");
    for (var i = 0; i < n; i++) {
        // creates a new body with a mass of 10-50, at a random position within the middle 80% of the canvas
        bodies.push(new Body(random(10,50), random(width*0.1, width*0.9), random(height*0.1, height*0.9), i));
    }
}

function draw() {
    // draw a rectangle to clear the background, but with opacity to create a trail effect
    fill(0, 20);
    rect(0, 0, width, height);
    // calculate the force of attraction between each pair of bodies
    for (var i = 0; i < bodies.length; i++) {
        for (var j = 0; j < bodies.length; j++) {
            if (i != j) {
                let force = bodies[j].attract(bodies[i]);
                bodies[i].applyForce(force);
            }
        }
    }
    // update and show each body
    for (var i = 0; i < bodies.length; i++) {
        bodies[i].update();
        bodies[i].show();
    }
}

class Body {
    constructor(mass, x, y, index) {
        this.index = index;
        this.mass = mass;
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
    }

    // returns the force of attraction between this body and the given body
    attract(planet) {
        let force = p5.Vector.sub(this.position, planet.position);
        let distance = force.mag();
        distance = constrain(distance, 5, 25);
        let strength = (0.4 * this.mass * planet.mass) / (distance * distance);
        force.setMag(strength);
        return force;
    }

    // updates the body's position based on its velocity and acceleration
    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    // applies a force to the body, e.g. gravity
    applyForce(force) {
        let f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }

    // draws the body on the canvas
    show() {
        fill(255*this.index/n,125,255/this.velocity.mag());
        circle(this.position.x, this.position.y, this.mass);
    }
}

setup()
draw()
