async function displayNextLevelScreen(ctx) {
  backgroundImage.src = "";
  console.log("before");
  console.log("stx", ctx);
  console.log("stx", canvas.width);
  // ctx.clearRect(0, 0, 800, 800);
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, 800, 800);

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Level Completed!", 100, 200);
  ctx.fillText("Next Level Loading...", 70, 250);
  await wait(5000);
  console.log("displayd");
}
function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited for ${timeout} milliseconds`);
    }, timeout);
  });
}
