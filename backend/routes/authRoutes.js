import express from 'express';
import { signup, login ,checkProfile } from '../controllers/authController.js';

const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

router.put('/users/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

// ✅ Only one login route
router.post('/login', login);
router.post('/signup', signup);
router.get('/profiles/check', checkProfile);
export default router;
