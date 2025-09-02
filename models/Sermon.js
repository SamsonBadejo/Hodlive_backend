import mongoose from 'mongoose';

const sermonSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String, required: true },
  youtubeLink:  String,
  youtubeThumb: String,
  audioUrl:     String,
  createdAt:    { type: Date, default: Date.now }
});

export default mongoose.model('Sermon', sermonSchema);
