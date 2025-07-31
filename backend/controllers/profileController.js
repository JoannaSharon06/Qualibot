// controllers/profileController.js

import Profile from '../models/Profile.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const createProfile = async (req, res) => {
  try {
    const { name, email, password, role, dob, education, skills, experience } = req.body;

    // Step 1: Check if profile already exists
    const existingProfile = await Profile.findOne({ email });
    if (existingProfile) {
      return res.status(400).json({ error: 'Profile already exists' });
    }

    // Step 2: Save profile
    const profile = new Profile({
      name,
      email,
      password,
      role,
      dob,
      education,
      skills,
      experience
    });
    const savedProfile = await profile.save();

    // Step 3: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Save to users collection
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });
    await user.save();

    res.status(201).json(savedProfile);
  } catch (err) {
    console.error('Error creating profile and user:', err);
    res.status(500).json({ error: 'Server error while creating profile' });
  }
};
