async function displayNextLevelScreen(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.src = "";

  ctx.fillStyle = "black";
  ctx.font = "30px Arial";

  ctx.fillText("Level Completed!", 500, 200);
  ctx.fillText("Next Level Loading...", 70, 250);

  await wait(3000);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited for ${timeout} milliseconds`);
    }, timeout);
  });
}

// function moveToNextLevel() {
//   const background = document.createElement("div");
//   background.className = "game_background";
//   background.style.backgroundColor = "#000"; // Set background color using style

//   const text = document.createElement("h2");
//   text.textContent = "Your Text Here"; // Set the text content

//   const button = document.createElement("button");
//   button.className = "click_me";
//   button.textContent = "Click Me";

//   // Append the text and button elements to the background div
//   background.appendChild(text);
//   background.appendChild(button);

//   //   const container = document.getElementById('container');
//   // container.appendChild(background);
// }
