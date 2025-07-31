import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ✅ Profile check endpoint for GET /api/profiles/check?email=...
export const checkProfile = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    res.status(200).json({ exists: !!user });
  } catch (err) {
    console.error('Profile check error:', err);
    res.status(500).json({ exists: false, error: 'Server error' });
  }
};

// ✅ Signup
export const signup = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role
    });

    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ✅ Login with admin special case
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Special Admin Case
    if (email === 'admin@gmail.com' && password === 'admin123') {
      const adminToken = jwt.sign({ id: 'admin', role: 'Admin' }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });

      return res.status(200).json({
        success: true,
        message: 'Admin login successful',
        token: adminToken,
        user: {
          _id: 'admin',
          name: 'Admin',
          email: 'admin@gmail.com',
          role: 'Admin'
        }
      });
    }

    // Regular user login
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
