const canvas = document.getElementById("canvas");
const content = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ballArr = [];

// const click = {
//   x: undefined,
//   y: undefined,
// };

canvas.addEventListener("click", (e) => {
  const clickX = e.clientX;
  const clickY = e.clientY;

  for (let i = 0; i < 10; i++) {
    const newBall = new Ball(
      clickX,
      clickY,
      Math.random() * 20 + 1,
      Math.random() * 25 - 1.5,
      Math.random() * 25 - 1.5,
      `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
    );

    ballArr.push(newBall);
  }
});
class Ball {
  constructor(x, y, size, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  checkBallCollision(otherBall) {
    const distance = Math.sqrt(
      (this.x - otherBall.x) ** 2 + (this.y - otherBall.y) ** 2
    );
    const sumOfRadii = this.size + otherBall.size;

    if (distance <= sumOfRadii) {
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;
    }
  }

  speedupdate() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (
      this.x + this.speedX > canvas.width - this.size ||
      this.x + this.speedX < this.size
    ) {
      this.speedX = -this.speedX;
    }
    if (
      this.y + this.speedY > canvas.height - this.size ||
      this.y + this.speedY < this.size
    ) {
      this.speedY = -this.speedY;
    }
  }

  draw() {
    content.beginPath();
    content.fillStyle = this.color;
    content.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    content.fill();
    content.closePath();
  }
}

// function ballcount() {
//   for (let i = 0; i < 50; i++) {
//     ballArr.push(new Ball());
//   }
// }

// ballcount();
function handle() {
  for (let i = 0; i < ballArr.length; i++) {
    ballArr[i].draw();
    ballArr[i].speedupdate();

    for (let j = i + 1; j < ballArr.length; j++) {
      ballArr[i].checkBallCollision(ballArr[j]);
    }
  }
}

function screen() {
  content.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(screen);
  handle();
}

screen();
