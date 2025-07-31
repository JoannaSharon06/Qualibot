import express from 'express';
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Get all profiles
router.get('/', async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

router.get('/check', async (req, res) => {
  const { email } = req.query;
  try {
    const existingProfile = await Profile.findOne({ email });
    if (existingProfile) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Get profile by email
router.get('/me/:email', async (req, res) => {
  const profile = await Profile.findOne({ email: req.params.email });
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile);
});

// Add new profile
router.post('/', async (req, res) => {
  try {
    const { name, email, password, role, dob, education, skills, experience } = req.body;

    if (!name || !email || !password || !role || !dob || !education || !skills) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check for duplicate email
    const existingProfile = await Profile.findOne({ email });
    if (existingProfile) {
      return res.status(400).json({ error: "Profile with this email already exists." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    const skillsArr = typeof skills === "string" ? skills.split(',').map(s => s.trim()) : skills;
    const hashedPassword = await bcrypt.hash(password, 10);

    const profile = await Profile.create({
      name,
      email,
      password: hashedPassword,
      role,
      dob,
      education,
      skills: skillsArr,
      experience
    });

    await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile
router.put('/:id', async (req, res) => {
  const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete profile
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Profile.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    console.error("Delete Error:", err.message);
    res.status(500).json({ error: 'Server error during deletion' });
  }
});



export default router;
