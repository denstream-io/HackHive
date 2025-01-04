const express = require('express');
const User = require('../models/User'); // Import the User model
const { calculateNumericRating, calculateStarRating } = require('../utils');
const router = express.Router();

// Get a list of all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Send the list of users as a response
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Route to update a single user's star rating
router.post('/update-rating', async (req, res) => {
  try {
    const {
      githubID,
      username,
      email,
      profilePicture,
      contributions,
      pullRequests,
      starsReceived,
      followers,
      publicRepos,
    } = req.body; // Extract user data from the request body

    if (!githubID) {
      return res.status(400).json({ message: 'githubID is required.' });
    }

    // Find the user by GitHub ID or create a new one
    let user = await User.findOne({ githubID });

    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({
        githubID,
        username,
        email,
        profilePicture,
      });
    }

    // Update user stats
    user.contributions = contributions || user.contributions;
    user.pullRequests = pullRequests || user.pullRequests;
    user.starsReceived = starsReceived || user.starsReceived;
    user.followers = followers || user.followers;
    user.publicRepos = publicRepos || user.publicRepos;

    // Calculate ratings
    const numericRating = calculateNumericRating(user); // Calculate numeric rating
    const starRating = calculateStarRating(numericRating); // Map to star rating
    user.rating = starRating; // Set star rating

    // Save user to the database
    await user.save();

    res.json({
      message: 'User rating updated successfully',
      user,
    });
  } catch (err) {
    console.error('Error updating user rating:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Export the user routes
module.exports = router;
