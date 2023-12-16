function renderGameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "40px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 40);

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Your Score: " + score, canvas.width / 2, canvas.height / 2);

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(
    "High Score: " + localStorage.getItem("highScore"),
    canvas.width / 2,
    canvas.height / 2 + 30
  );

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(
    "Click anywhere to restart",
    canvas.width / 2,
    canvas.height / 2 + 80
  );
}
