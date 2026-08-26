import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  company: { type: String, trim: true, default: '' },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true, default: '' },
  service: { type: String, trim: true, default: '' },
  message: { type: String, trim: true, default: '' },
  source: { type: String, default: 'website' },
  status: { type: String, enum: ['new','contacted','quoted','closed'], default: 'new' }
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
