const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// physics
let vx = 0;
let vy = 0;
let initialvy = -7;
const gravity = -0.2;

let score = 0;
let maxScore = 0;
let gameOver = false;

const doodler = new Doodler(46, 46, canvasWidth, canvasHeight);
document.addEventListener("keydown", moveDoodler);

// Platform-related variables
const platformArr = [];
const platWidth = 60; // Rename platformWidth to platWidth to avoid conflict
const platHeight = 18; // Rename platformHeight to platHeight to avoid conflict
const platformImgSrc = "./assets/platform.png";
let isMovingLeft = false;
let isMovingRight = false;

document.addEventListener("keydown", function (e) {
  if (e.code === "ArrowLeft" || e.code === "KeyA") {
    isMovingLeft = true;
    doodler.setLeftImage();
  } else if (e.code === "ArrowRight" || e.code === "KeyD") {
    isMovingRight = true;
    doodler.setRightImage();
  } else if (e.code == "Space" && gameOver) {
    restartGame();
  }
});

document.addEventListener("keyup", function (e) {
  if (e.code === "ArrowLeft" || e.code === "KeyA") {
    isMovingLeft = false;
  } else if (e.code === "ArrowRight" || e.code === "KeyD") {
    isMovingRight = false;
  }
});
function moveDoodler() {
  if (isMovingLeft) {
    vx = -4;
  } else if (isMovingRight) {
    vx = 4;
  } else {
    vx = 0;
  }
}
function animate() {
  requestAnimationFrame(animate);
  if (gameOver) {
    return;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  moveDoodler(); // Update velocity based on key events

  doodler.x += vx;
  if (doodler.x > canvasWidth) {
    doodler.x = 0;
  } else if (doodler.x + doodler.width < 0) {
    doodler.x = canvasWidth;
  }

  vy -= gravity;
  doodler.y += vy;
  ctx.drawImage(
    doodler.img,
    doodler.x,
    doodler.y,
    doodler.width,
    doodler.height
  );

  if (doodler.y > canvasHeight) {
    gameOver = true;
  }

  for (let i = 0; i < platformArr.length; i++) {
    const platform = platformArr[i];
    platform.draw(ctx);

    if (vy < 0 && doodler.y < (canvasHeight * 2) / 4) {
      platform.y -= initialvy;
    }

    if (detectCollision(doodler, platform)) {
      if (vy >= 0 && doodler.y + doodler.height <= platform.y + vy + 1) {
        vy = initialvy;
        doodler.y = platform.y - doodler.height;
      }
    }
  }
  while (platformArr.length > 0 && platformArr[0].y >= canvasHeight) {
    platformArr.shift(); //removes first element from the array
    newPlatforms(); //replace with new platform on top
  }
  updateScore();
  ctx.fillStyle = "black";
  ctx.font = "16px sans-serif";
  ctx.fillText(score, 5, 20);
  if (gameOver) {
    ctx.fillText(
      " Game Over: Press 'Space' to restart",
      canvasWidth / 7,
      (canvasHeight * 7) / 8
    );
  }
}

animate();
function generatePlatforms() {
  for (let i = 0; i < 6; i++) {
    let randomX = Math.floor((Math.random() * canvasWidth * 3) / 4);
    const platform = new Platform(
      randomX,
      canvasHeight - 75 * i - 75,
      platWidth,
      platHeight,
      platformImgSrc
    );
    platformArr.push(platform);
  }
}
let platformCreationInterval = 500; // Set the interval between new platform additions (in milliseconds)

function newPlatforms() {
  let randomX = Math.floor((Math.random() * canvasWidth * 3) / 4);
  const platform = new Platform(
    randomX,
    platHeight,
    platWidth,
    platHeight,
    platformImgSrc
  );
  platformArr.push(platform);

  // Delay the creation of the next platform
  if (platformArr.length < 6) {
    // Limit the number of platforms or adjust as needed
    setTimeout(newPlatforms, platformCreationInterval);
  }
}

vy = initialvy;
generatePlatforms();

// Start the animation loop
animate();
