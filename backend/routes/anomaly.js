import express from 'express';
const router = express.Router();
import axios from 'axios';

router.get('/anomalies', async (req, res) => {
  try {
    const response = await axios.get('https://qualibot-python.onrender.com/api/anomalies');
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching anomalies:', err.message);
    res.status(500).json({ error: 'Failed to get anomalies' });
  }
});

export default router;
