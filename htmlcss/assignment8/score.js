function updateScore() {
  let points = Math.floor(50 * Math.random());
  if (vy < 0) {
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  } else if (vy >= 0) {
    maxScore -= points; // Set score to maxScore
  }
}
