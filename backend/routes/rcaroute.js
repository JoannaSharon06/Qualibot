import express from 'express';
import dotenv from "dotenv";
import fs from "fs";
import csv from "csv-parser";
import { OpenAI } from "openai";
import stringSimilarity from "string-similarity";

const router = express.Router();
dotenv.config();

const openai = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

// Utility: Read and parse CSV dataset once at startup
let dataset = [];

const loadCSV = () => {
  const results = [];
  fs.createReadStream("data/experience_dataset.csv") // Place your CSV inside `/data/` folder
    .pipe(csv())
    .on("data", (data) => {
      // Only push rows that have a non-empty 'problem' field
      if (data.problem && data.problem.trim() !== "") {
        results.push(data);
      }
    })
    .on("end", () => {
      dataset = results;
      console.log("Experience dataset loaded:", dataset.length, "records");
    });
};

loadCSV(); // Load on start

// RCA route
router.post("/", async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    // Step 1: Find the most similar entry in the dataset
    const problems = dataset.map((row) => row.problem);
    const { bestMatch, bestMatchIndex } = stringSimilarity.findBestMatch(description, problems);

    let pastExperience = null;

    if (bestMatch.rating > 0.4) {
      const match = dataset[bestMatchIndex];
      pastExperience = {
        person: match["person name"],
        problem: match.problem,
        solution: match.solution,
        date: match.when,
      };
    }

    // Step 2: RCA generation
    const prompt = `
You are a senior quality control expert in a manufacturing unit.

Given the following manufacturing defect:
"${description}"

Perform the following:
1. Generate a 5 Whys Root Cause Analysis (with clear step-by-step reasoning).
2. Summarize the Root Cause.
3. Suggest an appropriate Problem-Solving Method (e.g., Fishbone Diagram, Pareto Analysis, 8D, DMAIC, PDCA, etc.) that best suits this defect and explain why.
4. Provide a brief Learning Guide (1-2 lines) for quality engineers to prevent this type of defect in the future.
`;

    // Log before calling OpenAI
    console.log("Calling Groq/OpenAI with prompt:", prompt);

    const response = await openai.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
    });

    const rca = response.choices[0].message.content;

    res.json({
      rca,
      pastExperience,
    });
  } catch (err) {
    console.error("Groq Error:", err); // log full error for debugging
    // Send full error stack to frontend for debugging (remove in production)
    res.status(500).json({ error: "Groq RCA generation failed", details: err.stack || err.message });
  }
});

export default router;
