class ImageCarousel {
  constructor() {
    this.currentIndex = 0;
    this.images = document.querySelectorAll(".image");

    this.totalImages = this.images.length;
    this.prevButton = document.getElementById("prev-button");
    this.nextButton = document.getElementById("next-button");
    this.interval = null;
    this.isAnimating = false;
    this.animationDuration = 500;
    this.animationFrames = 60;

    this.prevButton.addEventListener("click", this.showPrevious.bind(this));
    this.nextButton.addEventListener("click", this.showNext.bind(this));
  }

  showPrevious() {
    if (!this.isAnimating) {
      this.currentIndex =
        (this.currentIndex - 1 + this.totalImages) % this.totalImages;
      this.slideImage("right");
    }
  }

  showNext() {
    if (!this.isAnimating) {
      this.currentIndex = (this.currentIndex + 1) % this.totalImages;
      this.slideImage("left");
    }
  }

  slideImage(direction) {
    const prevIndex =
      this.currentIndex - 1 <= -1
        ? this.totalImages - 1
        : this.currentIndex - 1;
    const prevImage = this.images[prevIndex];

    const nextIndex = (this.currentIndex + 1) % this.totalImages;
    const currentImage = this.images[this.currentIndex];
    const width = currentImage.offsetWidth;
    let offset = 0;
    const distance = width / (this.animationDuration / this.animationFrames);

    currentImage.style.transform = `translateX(${
      direction === "left" ? width : -width
    }px)`;
    currentImage.style.display = "block";
    currentImage.classList.add("active");
    console.log(this.currentIndex, prevImage);
    console.log(nextIndex, currentImage);

    this.isAnimating = true;

    this.interval = setInterval(() => {
      offset += direction === "left" ? distance : -distance;

      if (
        (direction === "left" && offset >= width) ||
        (direction === "right" && offset <= 0)
      ) {
        clearInterval(this.interval);
        prevImage.style.display = "none";
        prevImage.classList.remove("active");
        currentImage.style.transform = "";
        currentImage.style.display = "block";
        this.isAnimating = false;
        return;
      }

      prevImage.style.transform = `translateX(${
        direction === "left" ? -offset : width - offset
      }px)`;
      currentImage.style.transform = `translateX(${
        direction === "left" ? width - offset : -offset
      }px)`;
    }, this.animationDuration / this.animationFrames);
  }
}

// Initialize the carousel
const imageCarousel = new ImageCarousel();
