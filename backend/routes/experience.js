import express from 'express';
const router = express.Router();
import { findPastExperience } from '../controllers/experienceController.js';
router.post('/', findPastExperience);
router.get('/', (req, res) => {
  res.send('API is working. Use POST to query past experiences.');
});

export default router;
