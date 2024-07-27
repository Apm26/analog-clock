class Clock {
  constructor() {
    this.radius = 200;
    this.center = { x: 0, y: 0 };
    this.hourHandLength = 90;
    this.minuteHandLength = 120;
    this.secondHandLength = 140;
  }

  setup() {
    createCanvas(600, 600);
    angleMode(DEGREES);
    // Make the canvas background transparent
    clear();
  }

  draw() {
    // No background color, so the canvas retains transparency
    clear();
    translate(width / 2, height / 2);
    rotate(-90);

    this.drawClockFace();
    this.drawHands();
    this.drawCenter();
    this.drawNumbers();
  }

  drawClockFace() {
    let borderColor = color(22, 22, 22);
    let faceColor = color(50, 50, 50, 200);

    stroke(borderColor);
    strokeWeight(40);
    noFill();
    ellipse(0, 0, this.radius * 2, this.radius * 2);

    fill(faceColor);
    ellipse(0, 0, this.radius * 2 + 40, this.radius * 2 + 40);
  }

  drawHands() {
    let sc = second();
    let mn = minute();
    let hr = hour();

    let secondAngle = map(sc, 0, 60, 0, 360);
    let minuteAngle = map(mn + sc / 60, 0, 60, 0, 360);
    let hourAngle = map(hr % 12 + mn / 60, 0, 12, 0, 360);

    this.drawHand(secondAngle, color(191, 23, 11), 2, this.secondHandLength);
    this.drawHand(minuteAngle, color(250, 250, 255), 4, this.minuteHandLength);
    this.drawHand(hourAngle, color(57, 247, 197, 140), 10, this.hourHandLength);
  }

  drawHand(angle, handColor, lineWeight, handLength) {
    push();
    rotate(angle);
    stroke(handColor);
    strokeWeight(lineWeight);
    line(0, 0, handLength, 0);
    pop();
  }

  drawCenter() {
    strokeWeight(0);
    fill(255);
    ellipse(0, 0, 15, 15);
  }

  drawNumbers() {
    stroke(255);
    textSize(32);
    textAlign(CENTER, CENTER);

    for (let i = 1; i <= 12; i++) {
      let angle = map(i, 0, 12, 0, 360);
      let x = this.radius * cos(angle);
      let y = this.radius * sin(angle);

      push();
      translate(x, y);
      rotate(90);
      text(i, 0, 0);
      pop();
    }
  }
}

// Create an instance of the Clock class
let clock;

function setup() {
  clock = new Clock();
  clock.setup();
}

function draw() {
  clock.draw();
}
