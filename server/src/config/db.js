import mongoose from 'mongoose';

export async function connectDB(uri) {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const dbUri = uri || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sd_services';
  await mongoose.connect(dbUri);
  console.log('MongoDB connected successfully');
}

