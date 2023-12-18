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
  middleUpBlockLevel2: 17,
  middleBlockLevel3: 20,
  leftEdgeLevel3: 21,
  rightEdgeLevel3: 22,
  leftDownEdge: 23,
  rightUpEdge: 24,
  rightBlocklvel2: 18,
};
function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  blocks = [];
  collectcoins = [];
  collectgems = [];
  collectlife = [];
  enemies = [];
  level[initialLevel].forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        case objectMapping.middleBlock:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "green",
              coordinates: {
                x: 61,
                y: 26,
                width: 33,
                height: 30,
              },
            })
          );
          break;
        case objectMapping.rightEdgeBlock:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "green",
              coordinates: {
                x: 100,
                y: 26,
                width: 35,
                height: 30,
              },
            })
          );
          break;
        case objectMapping.middleEdgePlatform:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "blue",
              coordinates: {
                x: 106,
                y: 156,
                width: 34,
                height: 18,
              },
            })
          );
          break;
        case objectMapping.rightEdgePlatform:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "blue",
              coordinates: {
                x: 146,
                y: 156,
                width: 33,
                height: 18,
              },
            })
          );
          break;
        case objectMapping.leftEdgePlatform:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "blue",
              coordinates: {
                x: 183,
                y: 156,
                width: 34,
                height: 18,
              },
            })
          );
          break;
        case objectMapping.coins:
          collectcoins.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "yellow",
              coordinates: {
                x: 23,
                y: 144,
                width: 25,
                height: 29,
              },
            })
          );
          break;
        case objectMapping.gems:
          collectgems.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "yellow",
              coordinates: {
                x: 23,
                y: 178,
                width: 26,
                height: 31,
              },
            })
          );
          break;
        case objectMapping.leftDoor:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "yellow",
              coordinates: {
                x: 278,
                y: 25,
                width: 26,
                height: 34,
              },
            })
          );
          break;
        case objectMapping.rightDoor:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "yellow",
              coordinates: {
                x: 315,
                y: 27,
                width: 26,
                height: 30,
              },
            })
          );
          break;
        case objectMapping.leftEdgeDoor:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "yellow",
              coordinates: {
                x: 240,
                y: 25,
                width: 34,
                height: 34,
              },
            })
          );
          break;
        case objectMapping.rightEdgeDoor:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "yellow",
              coordinates: {
                x: 352,
                y: 25,
                width: 33,
                height: 34,
              },
            })
          );
          break;
        case objectMapping.life:
          collectlife.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "red",
              coordinates: {
                x: 23,
                y: 218,
                width: 24,
                height: 22,
              },
            })
          );
          break;
        case objectMapping.enemy:
          enemies.push(
            new Enemy({
              position: {
                x: 40 * j,
                y: 40 * i,
              },

              width: 50,
              height: 50,
              distance: 50,
              velocity: {
                x: 1,
                y: 0,
              },

              movementType: "horizontal",
              coordinatesLeft: { x: 19, y: 271, width: 30, height: 30 },
              coordinatesRight: { x: 148, y: 317, width: 37, height: 30 },
            })
          );

          break;
        case objectMapping.enemy2:
          enemies.push(
            new Enemy({
              position: {
                x: 40 * j,
                y: 40 * i,
              },

              width: 50,
              height: 50,
              distance: 50,
              velocity: {
                x: 0,
                y: 1,
              },

              movementType: "vertical",
              coordinatesLeft: { x: 56, y: 527, width: 28, height: 28 },
              coordinatesRight: { x: 20, y: 529, width: 28, height: 28 },
            })
          );

          break;
        case objectMapping.middleBlockLevel2:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "green",
              coordinates: {
                x: 484,
                y: 61,
                width: 33,
                height: 33,
              },
            })
          );
          break;
        case objectMapping.middleBlockLevel3:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "green",
              coordinates: {
                x: 700,
                y: 20,
                width: 33,
                height: 36,
              },
            })
          );
          break;
        case objectMapping.middleUpBlockLevel2:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "green",
              coordinates: {
                x: 485,
                y: 26,
                width: 30,
                height: 32,
              },
            })
          );
          break;
        case objectMapping.rightBlocklvel2:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "green",
              coordinates: {
                x: 520,
                y: 61,
                width: 34,
                height: 30,
              },
            })
          );
          break;
        case objectMapping.leftEdgeLevel3:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "green",
              coordinates: {
                x: 743,
                y: 21,
                width: 34,
                height: 34,
              },
            })
          );
          break;
        case objectMapping.rightEdgeLevel3:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "green",
              coordinates: {
                x: 786,
                y: 21,
                width: 34,
                height: 34,
              },
            })
          );
          break;
        case objectMapping.leftDownEdge:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "green",
              coordinates: {
                x: 742,
                y: 59,
                width: 34,
                height: 34,
              },
            })
          );
          break;
        case objectMapping.rightUpEdge:
          blocks.push(
            new Block({
              position: {
                x: 40 * j,
                y: 40 * i,
              },
              color: "green",
              coordinates: {
                x: 786,
                y: 59,
                width: 34,
                height: 34,
              },
            })
          );
          break;

        // case objectMapping.enemy3:
        //   enemies.push(
        //     new CircularEnemy({
        //       position: {
        //         x: 100 * j,
        //         y: 150 * i,
        //       },
        //       radius: 50,
        //       angleSpeed: 3,
        //       width: 50,
        //       height: 50,
        //     })
        //   );
        //   break;
      }
    });
  });
}
