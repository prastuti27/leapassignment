const canvas = document.getElementById("canvas");
let gameOver = false;
let score = 0;
let gems = 0;
let life = 3;
// let levelFail = false;
let gameStarted = false;
const jumpSound = new Audio("./assets/jump.mp3");
const deathSound = new Audio("./assets/dead.mp3");
const gameOverSound = new Audio("./assets/gameover.mp3");
function playJumpSound() {
  jumpSound.volume = 0.7; // Adjust volume if needed
  jumpSound.play();
}
function playDeathSound() {
  deathSound.volume = 0.7;
  deathSound.play();
}
function playGameOverSound() {
  gameOverSound.volume = 0.9;
  gameOverSound.play();
}
function drawStartButton() {
  ctx.fillStyle = "blue";
  ctx.fillRect(100, 100, 200, 50);

  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Start Game", 130, 135);
}
const bgMusic = new Audio("./assets/level1bgmusic.mp3");
function startGame() {
  bgMusic.volume = 0.5;
  bgMusic.loop = true;

  bgMusic.play();

  gameStarted = true;
}

canvas.addEventListener("click", function (event) {
  if (!gameStarted) {
    startGame();
  }
});
async function playBackgroundMusic(level) {
  const musicSources = {
    1: "./assets/level1bgmusic.mp3",
    2: "./assets/level2bgmusic.mp3",
    3: "./assets/videoplayback.mp3",
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

const player = new Player(
  {
    x: 100,
    y: 0,
  },
  50,
  100
);

let initialLevel = 1;
let isLevelCompleted = false;

let level = {
  1: map,
  2: map2,
  3: map3,
};
const levelBackground = {
  1: "./assets/bgimg1.png",
  2: "./assets/bgimg2.jpg",
  3: "./assets/bg.jpg",
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
      const currentBackground = new Image();
      currentBackground.src = levelBackground[initialLevel];
      // console.log("imageset");
      currentBackground.onload = function () {
        ctx.drawImage(
          currentBackground,
          backgroundImageX,
          0,
          canvas.width,
          canvas.height
        );
      };
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

        if (!enemy.isDead && detectCoinCollision(player, enemy)) {
          if (playerIsAboveEnemy(player, enemy)) {
            enemy.isDead = true;
            playerJump();
          } else {
            player.isDead = true;

            life -= 1;

            playDeathSound();
            player.position.x -= 200;

            player.initialMovement = "death";
            player.frameCount = 0;
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
                if (overlapY > 0) {
                  player.position.y += overlapHeight;
                  player.velocity.y = 0;
                  if (player.velocity.y >= 0) {
                    player.isGrounded = true;
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

      if (life <= 0) {
        gameOver = true;
        playGameOverSound();
        bgMusic.pause();

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
        playJumpSound();
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
      if (gems >= 5) {
        isLevelCompleted = true;

        if (isLevelCompleted) {
          displayNextLevelScreen(ctx); // Wait for the displayNextLevelScreen to complete
          console.log("if await working");
          bgMusic.pause();
          initialLevel++;
          isLevelCompleted = false;
          backgroundImage.src = levelBackground[initialLevel];
          game();
          bgMusic.play();

          console.log(initialLevel);
          gems = 0;
        }
        // setTimeout(() => {
        // }, 5000);
      }
    }
  }

  window.requestAnimationFrame(animate);
}
animate();
