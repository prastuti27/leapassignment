const canvas = document.getElementById("canvas");
let gameOver = false;
let score = 0;
let gems = 0;
let life = 3;
let levelFail = false;
let gameStarted = false;

function drawStartButton() {
  ctx.fillStyle = "blue";
  ctx.fillRect(100, 100, 200, 50);

  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Start Game", 130, 135);
}
async function startGame() {
  const bgMusic = new Audio("./assets/level1bgmusic.mp3");
  bgMusic.volume = 0.5;
  bgMusic.loop = true;
  try {
    await bgMusic.play();
  } catch (error) {
    console.error("Audio playback failed:", error);
  }

  gameStarted = true;
}

// Event listener to handle clicks on the canvas
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Check if the click is within the button area and game is not started yet
  if (
    mouseX >= 100 &&
    mouseX <= 300 &&
    mouseY >= 100 &&
    mouseY <= 150 &&
    !gameStarted
  ) {
    startGame(); // Call function to start the game and play music
  }
});
async function playBackgroundMusic(level) {
  const musicSources = {
    1: "./assets/level1bgmusic.mp3",
    2: "./assets/level2bgmusic.mp3",
    // Other levels
  };

  bgMusic.src = musicSources[level];

  try {
    await bgMusic.play();
  } catch (error) {
    console.error("Audio playback failed:", error);
  }
}

const highScore = localStorage.getItem("highScore") || 0;
console.log("High Score:", highScore);

const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "./assets/bgimg1.png";
let backgroundImageX = 0;
// const playerIniitialPos = { x: 100, y: 0 };
const player = new Player(
  {
    x: 100,
    y: 0,
  },
  50,
  100
);

const objectMapping = {
  middleBlock: 1,
  rightEdgeBlock: 2,

  middleEdgePlatform: 3,
  rightEdgePlatform: 4,
  leftEdgePlatform: 5,
  coins: 6,
  gems: 7,
  leftDoor: 8,
  rightDoor: 9,
  leftEdgeDoor: 10,
  rightEdgeDoor: 11,
  life: 12,
  enemy: 13,
  enemy2: 14,
  enemy3: 15,
  middleBlockLevel2: 16,
};

let initialLevel = 1;
let isLevelCompleted = false;

let level = {
  1: map,
  2: map2,
};
const levelBackground = {
  1: "./assets/bgimg1.png",
  2: "./assets/bgimg2.jpg",
};

let blocks = [];
let collectcoins = [];
let collectgems = [];
let collectlife = [];
let enemies = [];

game();
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!gameStarted) {
    drawStartButton();
  } else {
    if (!gameOver) {
      if (isLevelCompleted) {
        initialLevel += 1;
      }

      ctx.drawImage(
        backgroundImage,
        backgroundImageX,
        0,
        canvas.width,
        canvas.height
      );

      blocks.forEach((block) => {
        block.draw(ctx);
      });
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Score: " + score, 20, 30);
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Gems: " + gems, 20, 50);
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Life: " + life, 150, 30);

      collectcoins.forEach((block) => {
        block.draw(ctx);
      });
      collectgems.forEach((block) => {
        block.draw(ctx);
      });
      collectlife.forEach((block) => {
        block.draw(ctx);
      });
      enemies.forEach((enemy) => {
        enemy.update();
        // console.log(enemy);
        if (!enemy.isDead && detectCoinCollision(player, enemy)) {
          if (playerIsAboveEnemy(player, enemy)) {
            enemy.isDead = true;
            playerJump();

            // while(enemy.position.y>=canvas)
            // enemy pos y is 50 at the moment velocity will be 50 tat means next frame pos y will be increase by 50
            // enemy pos will be 100 i.e velocity will be 100 in next frame y will increase 100
            // for (let i = enemy.position.y; i < canvas.height; i++) {
            //   console.log(enemy.position.y);
            //   enemy.velocity.y = 1;
            //   enemy.position.y += enemy.velocity.y;
            //   enemy.update();
            // }
            console.log(enemy.isDead);
          } else {
            life -= 1;
            player.position.x -= 200;
            // player.position.y = playerIniitialPos.y;

            player.initialMovement = "death";
            player.frameCount = 0;
            levelFail = true;
          }
        }
      });
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i]) {
          if (detectCollision(player, blocks[i])) {
            const overlapX =
              player.position.x +
              player.width / 2 -
              blocks[i].position.x -
              blocks[i].width / 2;
            const overlapY =
              player.position.y +
              player.height / 2 -
              blocks[i].position.y -
              blocks[i].height / 2;

            const combinedHalfWidths = player.width / 2 + blocks[i].width / 2;
            const combinedHalfHeights =
              player.height / 2 + blocks[i].height / 2;

            if (
              Math.abs(overlapX) < combinedHalfWidths &&
              Math.abs(overlapY) < combinedHalfHeights
            ) {
              const overlapWidth = combinedHalfWidths - Math.abs(overlapX);
              const overlapHeight = combinedHalfHeights - Math.abs(overlapY);

              if (overlapWidth >= overlapHeight) {
                // player.isGrounded = true;
                if (overlapY > 0) {
                  player.position.y += overlapHeight;
                  player.velocity.y = 0;
                  if (player.velocity.y >= 0) {
                    // Check if the player is moving downwards
                    player.isGrounded = true; // Set player as grounded on collision with top of block
                  }
                } else {
                  player.position.y -= overlapHeight;
                  player.velocity.y = 0;
                }
              } else {
                if (overlapX > 0) {
                  player.position.x += overlapWidth;
                } else {
                  player.position.x -= overlapWidth;
                }
              }
            }
          }
        }
      }

      for (let i = 0; i < collectcoins.length; i++) {
        if (collectcoins[i]) {
          if (detectCoinCollision(player, collectcoins[i])) {
            collectcoins = collectcoins.filter(
              (collectcoin) => collectcoin != collectcoins[i]
            );
            score += 10;
          }
        }
      }
      for (let i = 0; i < collectgems.length; i++) {
        if (collectgems[i]) {
          if (detectCoinCollision(player, collectgems[i])) {
            collectgems = collectgems.filter(
              (collectgem) => collectgem != collectgems[i]
            );
            gems++;
          }
        }
      }
      for (let i = 0; i < collectlife.length; i++) {
        if (collectlife[i]) {
          if (detectCoinCollision(player, collectlife[i])) {
            collectlife = collectlife.filter(
              (collectlif) => collectlif != collectlife[i]
            );
            life++;
          }
        }
      }

      // Check for game-over condition
      if (life <= 0) {
        gameOver = true;

        alert("Game Over! Your score: " + score);

        score = 0;
        gems = 0;
        life = 3;
      }

      player.velocity.x = 0;
      handleMovement(blocks);
      handleMovement(collectcoins);
      handleMovement(collectgems);
      handleMovement(enemies);
      handleMovement(collectlife);

      function playerJump() {
        player.velocity.y = -8;
        player.velocity.y += gravity;
        player.isGrounded = false;
      }

      if (keys.ArrowUp) {
        // if (player.isGrounded) {
        playerJump();
      }

      player.update();

      if (score > localStorage.getItem("highScore")) {
        localStorage.setItem("highScore", score);
      }
      if (gems >= 1) {
        isLevelCompleted = true;

        if (isLevelCompleted) {
          displayNextLevelScreen(); // Display the "Next Level" screen

          setTimeout(() => {
            initialLevel++;
            console.log(initialLevel); // Increment the level after a delay
            gems = 0; // Rest of your code for preparing the next level
            game(); // Delay before moving to the next level
          }, 5000);
        }
      }
    }
  }

  window.requestAnimationFrame(animate);
}
animate();
