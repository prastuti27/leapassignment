class Doodler {
  constructor(doodlerWidth, doodlerHeight, canvasWidth, canvasHeight) {
    this.width = doodlerWidth;
    this.height = doodlerHeight;
    this.x = canvasWidth / 2 - this.width / 2;
    this.y = (canvasHeight * 7) / 8 - this.height;
    this.imgRight = new Image();
    this.imgRight.onload = () => {
      this.draw(ctx);
    };
    this.imgRight.src = "./assets/doodler-right.png";
    this.imgLeft = new Image();
    this.imgLeft.src = "./assets/doodler-left.png";
    this.img = this.imgRight;
    this.vx = 0;
    this.vy = 0;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (this.img.complete) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = "green";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  setLeftImage() {
    this.img = this.imgLeft;
  }

  setRightImage() {
    this.img = this.imgRight;
  }
}
