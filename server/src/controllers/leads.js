import Lead from '../models/Lead.js';

export async function createLead(req, res) {
  const { name, phone } = req.body;
  if (!name || !phone) return res.status(400).json({ message: 'Name and phone are required' });
  const lead = await Lead.create(req.body);
  res.status(201).json({ message: 'Thank you. Our team will contact you shortly.', id: lead._id });
}

export async function listLeads(req, res) {
  const leads = await Lead.find().sort({ createdAt: -1 }).limit(250);
  res.json(leads);
}

export async function updateLead(req, res) {
  const lead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
}
