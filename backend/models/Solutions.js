import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  "person name": String,
  problem: String,
  solution: String,
  when: String,
});

const Solution = mongoose.model("Solution", solutionSchema);

export default Solution;
