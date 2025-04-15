// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ball class
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          // This is what I had originally to try and make it more realistic ish I guess, and it did not work
          
          // ball.color = this.color = randomRGB();
          // if they're flying at each other horizontally their y difference will be less than their x difference
          // if(this.y - ball.y < this.x - ball.x) {
          //   this.velX = -this.velX;
          //   ball.velX = -ball.velX;
          // }
          // else if(this.x - ball.x < this.y - ball.y) {
          //   this.velY = -this.velY;
          //   ball.velY = -ball.velY;
          // }
          // else {
          //   this.velX = -this.velX;
          //   ball.velX = -ball.velX;
          //   this.velY = -this.velY;
          //   ball.velY = -ball.velY;
          // }

          
          this.velX = -this.velX;
          this.velY = -this.velY;
          ball.velX = -ball.velX;
          ball.velY = -ball.velY;

          // Fixing weird glitchy thing where they'll knock each other off the screen
          if(this.x + this.size >= width) {
            this.x = width - this.size - 1;
          }
          if(ball.x + ball.size >= width) {
            ball.x = width - ball.size - 1;
          }
          if(this.x - this.size <= 0) {
            this.x = this.size + 1;
          }
          if(ball.x - ball.size <= 0) {
            this.x = this.size + 1;
          }
          if(this.y + this.size >= height) {
            this.y = height - this.size - 1;
          }
          if(ball.y + ball.size >= height) {
            ball.y = height - ball.size - 1;
          }
          if(this.y - this.size <= 0) {
            this.y = this.size + 1;
          }
          if(ball.y - ball.size <= 0) {
            ball.y = ball.size + 1;
          }
        }
      }
    }
  }
}

// Create balls
const balls = [];

while (balls.length < 30) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

// Loop
function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();