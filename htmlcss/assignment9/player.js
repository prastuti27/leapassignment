class Player {
  constructor(position, width, height) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = width;
    this.height = height;
    this.isGrounded = false;
    this.sprites = new Image();
    this.sprites.src = "./assets/turtle.png";
    this.inShell = false;
    this.coordinates = {
      initial: [0, 6],
      right: [
        [0, 6],
        [58, 6],
        [116, 6],
        [174, 6],
        [232, 6],
        [290, 6],
        [348, 6],
      ],
      left: [
        [0, 104],
        [58, 104],
        [116, 104],
        [174, 104],
        [232, 104],
        [290, 104],
        [348, 104],
      ],
      up: [
        [0, 207],
        [58, 207],
        [116, 207],
        [174, 207],
        [232, 207],
        [290, 207],
        [348, 207],
      ],
      down: [
        [0, 304],
        [58, 304],
        [116, 304],
        [174, 304],
        [232, 304],
        [290, 304],
        [348, 304],
        [406, 304],
      ],
      death: [
        [0, 398],
        [58, 398],
        [109, 398],
        [172, 398],
        [243, 398],
        [325, 398],
        [404, 398],
        [483, 398],
        [566, 398],
        [664, 398],
      ],
    };
    this.initialMovement = "right";
    this.initialFrame = 0;
    this.frameCount = 0;
    this.animationSpeed = 8;
  }

  draw() {
    const movement = this.initialMovement;
    const coordinates = this.coordinates[movement];

    let x, y;

    if (movement === "death") {
      const deathCoordinates = this.coordinates.death;

      if (this.initialFrame < deathCoordinates.length) {
        [x, y] = deathCoordinates[this.initialFrame];
      } else {
        this.initialMovement = "";
        this.initialFrame = 0;
      }
    } else {
      [x, y] = coordinates[this.initialFrame];
    }

    if (x !== undefined && y !== undefined) {
      ctx.drawImage(
        this.sprites,
        x,
        y,
        55,
        62,
        this.position.x,
        this.position.y,
        this.width * 1.5,
        this.height
      );
    }
  }
  update() {
    this.draw();
    if (this.initialMovement === "death") {
      if (++this.frameCount % this.animationSpeed === 0) {
        this.initialFrame++;
      }
    }

    if (keys.ArrowLeft || keys.ArrowUp || keys.ArrowRight) {
      this.inShell = false;
      if (keys.ArrowRight) {
        this.initialMovement = "right";
        if (++this.frameCount % this.animationSpeed === 0) {
          this.initialFrame =
            (this.initialFrame + 1) % this.coordinates.right.length;
        }
      }
      if (keys.ArrowLeft) {
        this.initialMovement = "left";
        if (++this.frameCount % this.animationSpeed === 0) {
          this.initialFrame =
            (this.initialFrame + 1) % this.coordinates.left.length;
        }
      }
      if (keys.ArrowUp) {
        this.initialMovement = "up";
        if (++this.frameCount % this.animationSpeed === 0) {
          this.initialFrame =
            (this.initialFrame + 1) % this.coordinates.up.length;
        }
      }
    } else if (!this.inShell) {
      this.initialFrame = 0;
      this.frameCount = 0;
    }
    if (keys.ArrowDown) {
      this.inShell = true;
      this.initialMovement = "down";
      if (++this.frameCount % this.animationSpeed === 0) {
        this.initialFrame =
          (this.initialFrame + 1) % this.coordinates.down.length;
      }
    }

    // if ((life -= 1)) {
    //   this.initialMovement = "death";
    //   if (++this.frameCount % this.animationSpeed === 0) {
    //     this.initialFrame =
    //       (this.initialFrame + 1) % this.coordinates.down.length;
    //   }
    // }

    if (
      this.position.y + this.height + this.velocity.y < canvas.height &&
      !this.isGrounded
    ) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
      this.isGrounded = true;
    }
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
  }
}
