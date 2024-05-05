import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Match = mongoose.model('Match', matchSchema);

export default Match;
