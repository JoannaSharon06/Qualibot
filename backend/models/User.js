import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Quality Engineer', 'Production Supervisor', 'Line Manager', 'Compliance Officer', 'Admin'],
    default: 'Quality Engineer'
  }
});

export default mongoose.model('User', userSchema);
