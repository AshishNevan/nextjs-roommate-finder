import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
  gender: String,
  age: Number,
  university: String,
  major: String,
  graduation_date: Date,
  preferences: {
    smoking: Boolean,
    pets: Boolean,
    study_habits: String,
    sleeping_habits: String,
    move_in_date: Date,
    move_out_date: Date,
    budget: Number,
  },
  location: {
    address: String,
    city: String,
    state: String,
    zip_code: String,
    latitude: Number,
    longitude: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
