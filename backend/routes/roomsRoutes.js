const express = require('express');
const Room = require('../models/Room'); // Import the Room model
const User = require('../models/User'); // Import the User model
const { default: mongoose } = require('mongoose');

const router = express.Router();

// Create a new room
router.post('/', async (req, res) => {
  try {
    const { joinCode, name, description, members } = req.body;

    // Validate required fields
    if (
      !joinCode ||
      !name ||
      !description ||
      !Array.isArray(members) ||
      members.length === 0
    ) {
      return res
        .status(400)
        .json({ error: 'Name, description, and members are required.' });
    }

    // Convert ids in members to ObjectIds
    const membersIds = members.map(
      (member) => new mongoose.Types.ObjectId(member)
    );

    // Check if all members exist (optional but a good practice)
    // Assuming `User` is the model for users
    const usersExist = await User.find({ '_id': { $in: membersIds } });

    if (usersExist.length !== membersIds.length) {
      return res.status(404).json({ error: 'Some members do not exist.' });
    }

    // Create the room
    const room = await Room.create({
      joinCode,
      name,
      description,
      members: membersIds,
    });

    // Return the created room
    res.status(201).json(room);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Server error, please try again later.' }); // Generic server error
  }
});

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().populate('members'); // Fetch all rooms and populate members data
    res.json(rooms); // Respond with rooms
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
});

// Get a specific room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('members'); // Fetch room by ID
    if (!room) {
      return res.status(404).json({ error: 'Room not found' }); // Handle non-existent room
    }
    res.json(room); // Respond with room data
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
});

// Add a member to a room
router.post('/:id/addMember', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const { userId } = req.body;
    if (room.members.includes(userId)) {
      return res.status(400).json({ message: 'User already in the room' });
    }

    room.members.push(userId);
    await room.save();
    res.status(200).json({ message: 'Member added', room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a member from a room
router.post('/:id/removeMember', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const { userId } = req.body;
    room.members = room.members.filter(
      (member) => member.toString() !== userId
    );
    await room.save();
    res.status(200).json({ message: 'Member removed', room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
