function handleMovement(entityList) {
  entityList.forEach((entity) => {
    if (entity) {
      if (keys.ArrowLeft && player.position.x > 0) {
        player.velocity.x = -5;
      } else if (keys.ArrowRight && player.position.x < canvas.width / 2) {
        player.velocity.x = 5;
      } else {
        player.velocity.x = 0;

        if (keys.ArrowLeft) {
          entity.position.x += 5;
          if (entity.objectType === "enemy") {
            entity.initialPositionX += 5;
          }
        } else if (keys.ArrowRight) {
          entity.position.x -= 5;
          if (entity.objectType === "enemy") {
            entity.initialPositionX -= 5;
          }
        }
      }
    }
  });
}
