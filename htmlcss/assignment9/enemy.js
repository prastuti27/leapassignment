class Enemy {
  constructor({
    position,
    velocity,
    distance,
    width,
    height,
    movementType,
    coordinatesLeft,
    coordinatesRight,
  }) {
    this.position = position;
    this.velocity = velocity;
    this.distance = distance;
    this.width = width;
    this.height = height;
    this.initialPositionX = position.x;
    this.initialPositionY = position.y;
    this.objectType = "enemy";
    this.isDead = false;
    this.movementType = movementType;
    this.image = new Image();
    this.image.src = "./assets/blocks.png";
    this.coordinatesLeft = coordinatesLeft;
    this.coordinatesRight = coordinatesRight;
    this.currentCoordinates = coordinatesLeft;
  }

  draw() {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.drawImage(
      this.image,
      this.currentCoordinates.x,
      this.currentCoordinates.y,
      this.currentCoordinates.width,
      this.currentCoordinates.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();

    if (this.isDead) {
      this.velocity.y = 3;
      ctx.save();
      ctx.scale(1, -1);
      ctx.drawImage(
        this.image,
        this.currentCoordinates.x,
        this.currentCoordinates.y,
        this.currentCoordinates.width,
        this.currentCoordinates.height,
        this.position.x,
        -this.position.y - this.height,
        this.width,
        this.height
      );
      ctx.restore();
      this.position.y += this.velocity.y;
      return;
    }
    if (this.movementType === "horizontal") {
      if (Math.abs(this.position.x - this.initialPositionX) >= this.distance) {
        this.velocity.x *= -1;

        this.currentCoordinates =
          this.velocity.x > 0 ? this.coordinatesRight : this.coordinatesLeft;
      }
      this.position.x += this.velocity.x;
    }

    if (this.movementType === "vertical") {
      if (Math.abs(this.position.y - this.initialPositionY) >= this.distance) {
        this.velocity.y *= -1;
        if (this.velocity.x > 0) {
          this.currentCoordinates = this.coordinatesRight;
        } else {
          this.currentCoordinates = this.coordinatesLeft;
        }
      }
      this.position.y += this.velocity.y;
    }

    // this.distance=50, initialpos=160, this.pos=200
    // this.pos becomes keeps decreasing  and becomes 50
    // this satisfies if condn and velocity of x reverse
    // it moves back by 1 px
    // upon next frame pos.x is less than 50or 50 ,its again satisfies if condn and the direction reverses
    // the enemy moves from by 1px

    // this.position.x += this.velocity.x;
  }
}
function playerIsAboveEnemy(a, b, tolerance = 10) {
  return a.position.y + a.height <= b.position.y + tolerance;
}
// class CircularEnemy extends Enemy {
//   constructor({ position, radius, angleSpeed, width, height }) {
//     super({
//       position,
//       velocity: { x: 0, y: 0 },
//       distance: 0,
//       width,
//       height,
//       movementType: "circular",
//     });
//     this.radius = radius;
//     this.angle = 0;
//     this.angleSpeed = angleSpeed;
//   }

//   update() {
//     this.draw();
//     if (this.isDead) {
//       // Logic for dead enemies
//       return;
//     }

//     this.angle += (Math.PI / 180) * this.angleSpeed;
//     this.position.x =
//       this.initialPositionX + this.radius * Math.cos(this.angle);
//     this.position.y =
//       this.initialPositionY + this.radius * Math.sin(this.angle);
//   }
// }
// class CircularEnemy extends Enemy {
//   constructor({ position, radius, angleSpeed, width, height }) {
//     super({
//       position,
//       velocity: { x: 0, y: 0 },
//       distance: 0,
//       width,
//       height,
//       movementType: "circular",
//       coordinates: {}
//     });
//     this.radius = radius;
//     this.angle = 0;
//     this.angleSpeed = angleSpeed;
//   }

//   draw() {
//     ctx.drawImage(
//       this.image,
//       this.coordinates.x,
//       this.coordinates.y,
//       this.coordinates.width,
//       this.coordinates.height,
//       this.position.x,
//       this.position.y,
//       this.width,
//       this.height
//     );
//   }

//   update() {
//     this.draw(); // Call the draw method defined in CircularEnemy
//     if (this.isDead) {
//       // Logic for dead enemies
//       return;
//     }

//     this.angle += (Math.PI / 180) * this.angleSpeed; // Convert degrees to radians
//     this.position.x =
//       this.initialPositionX + this.radius * Math.cos(this.angle);
//     this.position.y =
//       this.initialPositionY + this.radius * Math.sin(this.angle);
//   }
// }
