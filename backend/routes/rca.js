import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  // Placeholder logic, replace with your RCA generation logic
  const { description } = req.body;
  res.json({ rca: `RCA for: ${description}` });
});

export default router;
