// Utility function to calculate the user's numeric rating
const calculateNumericRating = (user) => {
  const { contributions, pullRequests, starsReceived, followers, publicRepos } =
    user;

  // Weights for each metric (can be adjusted as needed)
  const WEIGHTS = {
    contributions: 0.35, // Lowered from 0.4
    pullRequests: 0.2, // Lowered from 0.25
    starsReceived: 0.2, // Retained as is
    followers: 0.15, // Increased slightly from 0.1
    publicRepos: 0.6, // Increased slightly from 0.05
  };

  // Calculate weighted sum
  const rating =
    contributions * WEIGHTS.contributions +
    pullRequests * WEIGHTS.pullRequests +
    starsReceived * WEIGHTS.starsReceived +
    followers * WEIGHTS.followers +
    publicRepos * WEIGHTS.publicRepos;

  // Normalize rating (e.g., scale between 0 to 100)
  return Math.min(100, Math.max(0, rating.toFixed(2))); // Ensures the rating is within 0-100
};

// Function to map numeric rating to star rating
const calculateStarRating = (numericRating) => {
  if (numericRating <= 20) return 1;
  if (numericRating <= 40) return 2;
  if (numericRating <= 60) return 3;
  if (numericRating <= 80) return 4;
  return 5; // numericRating > 80
};

module.exports = { calculateNumericRating, calculateStarRating };
