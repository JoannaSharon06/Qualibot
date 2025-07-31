import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String,
  achievements: String
});

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // add password field
  role: String,
  dob: String,
  education: String,
  phone: String,
  skills: [String],
  experience: [experienceSchema]
});

export default mongoose.model('Profile', profileSchema);
