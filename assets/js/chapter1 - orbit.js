let mover1;

function setup() {
    createCanvas(500, 400);
    mover1 = new Mover

}

function drawConstantElements() {
    arrow(20, 20, 80, 20, 5, 'blue', 2);
    arrow(20, 40, 80, 40, 5, 'green', 2);
    stroke(0)
    textSize(16);
    strokeWeight(0);
    fill(0);
    text('position vector', 90, 24);
    text('velocity vector', 90, 44);
    circle(width/2, height/2, 20);
    strokeWeight(1);

}

class Mover {
    constructor() {
        this.rOrbit = 100
        this.position = createVector(width/2+this.rOrbit, height/2);
        this.velocity = createVector(0, this.rOrbit/100);
        this.acceleration = createVector(0, 0);
        this.rPlanet = 10
    };

    changeAcceleration(direction) {
        switch (direction) {
            case 'd':
                this.acceleration.y += 0.001
                break;
            case 'u':
                this.acceleration.y -= 0.001
                break;
            case 'l':
                this.acceleration.x -= 0.001
                break;
            case 'r':
                this.acceleration.x += 0.001
                break;
        }
        console.log(this.acceleration)

    }

    update() {
        let planet = createVector(width/2, height/2);
        let dir = p5.Vector.sub(planet, this.position);
        dir.normalize();
        dir.mult(this.rOrbit/10000);
        this.acceleration = dir;

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        this.velocity.limit(10);
    };

    show() {
        clear()
        drawConstantElements()
        stroke(100);
        fill(230);
        circle(this.position.x, this.position.y, this.rPlanet);
        arrow(this.position.x, this.position.y, this.position.x+(this.velocity.x*40), this.position.y+(this.velocity.y*40), 5, 'green', 2);
        arrow(width/2, height/2, this.position.x, this.position.y, 5,  'blue', 2);

    };

    checkEdges() {
        if (this.position.x > windowWidth-(this.rPlanet/2)) {
            this.position.x = this.rPlanet/2
        }
        else if (this.position.x < this.rPlanet/2) {
            this.position.x = windowWidth-(this.rPlanet/2)

        } else if (this.position.y > windowHeight-this.rPlanet/2) {
            this.position.y = this.rPlanet/2

        } else if (this.position.y < this.rPlanet/2) {
            this.position.y = windowHeight-this.rPlanet/2

        }
    }
}

function drawLine(x1,y1,x2,y2,colour='black',weight=5) {
    stroke(colour);
    strokeWeight(weight);
    line(x1,y1,x2,y2);
}


function arrow(x1, y1, x2, y2, offset, colour='black',weight=5) {
    stroke(colour);
    strokeWeight(weight);
    // this code is to make the arrow point
    line(x1,y1,x2,y2);
    push(); //start new drawing state
    var angle = atan2(y1 - y2, x1 - x2); //gets the angle of the line
    translate(x2, y2); //translates to the destination vertex
    rotate(angle - HALF_PI); //rotates the arrow point
    triangle(-offset * 0.6, offset*1.5, offset * 0.6, offset*1.5, 0, 0); //draws the arrow point as a triangle
    pop();
  }

function draw() {
  mover1.update()
  mover1.checkEdges()
  mover1.show()
}