import express from "express";
import fs from "fs";
import path from "path";
import Solution from "../models/Solutions.js";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, "../data/experience_dataset.csv");



// Add solution to DB and CSV
router.post("/add", async (req, res) => {
  try {
    const { personName, problem, solution, when } = req.body;
    // Save to MongoDB
    await Solution.create({
      "person name": personName,
      problem,
      solution,
      when,
    });

    // Append to CSV
    const csvLine = `\n${personName},"${problem.replace(/"/g, '""')}","${solution.replace(/"/g, '""')}",${when}`;
    fs.appendFileSync(csvPath, csvLine);

    res.status(201).json({ message: "Solution saved." });
  } catch (err) {
    console.error("Error in /api/solutions/add:", err);
    res.status(500).json({ error: "Failed to save solution." });
  }
}
);
// GET all solutions
router.get("/", async (req, res) => {
  try {
    const solutions = await Solution.find();
    res.json(solutions);
  } catch (err) {
    console.error("Error fetching solutions:", err);
    res.status(500).json({ error: "Failed to fetch solutions." });
  }
});
// DELETE a solution
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Solution.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Solution not found." });
    }
    res.json({ message: "Solution deleted successfully." });
  } catch (err) {
    console.error("Error deleting solution:", err);
    res.status(500).json({ error: "Failed to delete solution." });
  }
});
// UPDATE a solution
router.put("/:id", async (req, res) => {
  try {
    const { personName, problem, solution, when } = req.body;
    const updated = await Solution.findByIdAndUpdate(
      req.params.id,
      {
        "person name": personName,
        problem,
        solution,
        when,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Solution not found." });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating solution:", err);
    res.status(500).json({ error: "Failed to update solution." });
  }
});



export default router;
