import express from 'express';
import { createProfile } from '../controllers/profileController.js';

const router = express.Router();
router.get('/me', async (req, res) => {
  try {
    const userId = req.user.id; // get from JWT middleware
    const profile = await Profile.findOne({ userId });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

router.post('/', createProfile); // POST /api/profiles

export default router;
