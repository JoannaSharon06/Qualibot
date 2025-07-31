import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as fuzz from 'fuzzball';
import csv from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let experienceData = [];

const loadCSV = () => {
  const filePath = path.join(__dirname, '../data/experience_dataset.csv');
  fs.createReadStream(filePath)
    .on('error', (err) => {
      console.error('CSV file load error:', err.message);
    })
    .pipe(csv())
    .on('data', (row) => experienceData.push(row))
    .on('end', () => console.log('Experience dataset loaded.'));
};
loadCSV();

const findPastExperience = (req, res) => {
  const { description } = req.body;
  if (!description) return res.status(400).json({ error: 'Description required' });

  const matches = experienceData.map(exp => ({
    ...exp,
    score: fuzz.token_set_ratio(description, exp.problem)
  }));

  // Filter for good matches (optional threshold > 50)
  const goodMatches = matches
    .filter(match => match.score > 50)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // send top 3 matches if needed

 if (goodMatches.length > 0) {
  const bestMatch = goodMatches[0];
  res.json({
    matchedProblem: bestMatch.problem,
    person: bestMatch['person name'],
    solution: bestMatch.solution,
    date: bestMatch['when(date)'],
    score: bestMatch.score
  });
} else {
  res.json({ matches: [] });
}

};


export { findPastExperience };