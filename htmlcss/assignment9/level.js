function displayNextLevelScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Level Completed!", 100, 200);
  ctx.fillText("Next Level Loading...", 70, 250);
}
