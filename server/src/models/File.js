import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  filename: String,
  url: String, // S3 URL
  key: String, // S3 Key (for deletion)
  size: Number,
  fileType: String,
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('File', FileSchema);
