function restartGame() {
  score = 0;
  maxScore = 0;
  gameOver = false;
  platformArr.length = 0;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  doodler.x = canvasWidth / 2 - doodler.width / 2;
  doodler.y = canvasHeight * (7 / 8) - doodler.height;
  initialvy = -8;
  vy = initialvy;

  generatePlatforms();

  animate();
}
