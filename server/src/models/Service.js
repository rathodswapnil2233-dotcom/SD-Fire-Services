import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  shortDescription: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: 'Flame' },
  featured: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
