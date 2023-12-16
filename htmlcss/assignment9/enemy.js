class Enemy {
  constructor({ position, velocity, distance, width, height }) {
    this.position = position;
    this.velocity = velocity;
    this.distance = distance;
    this.width = width;
    this.height = height;
    this.initialPosition = position.x;
    this.objectType = "enemy";
    this.isDead = false;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();

    if (Math.abs(this.position.x - this.initialPosition) >= this.distance) {
      this.velocity.x *= -1;
    }

    // this.distance=50, initialpos=160, this.pos=200
    // this.pos becomes keeps decreasing  and becomes 50
    // this satisfies if condn and velocity of x reverse
    // it moves back by 1 px
    // upon next frame pos.x is less than 50or 50 ,its again satisfies if condn and the direction reverses
    // the enemy moves from by 1px

    this.position.x += this.velocity.x;
  }
}
function playerIsAboveEnemy(a, b, overlapThreshold = 5, tolerance = 10) {
  return a.position.y + a.height <= b.position.y - overlapThreshold + tolerance;
}
