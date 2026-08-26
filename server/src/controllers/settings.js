import Setting from '../models/Setting.js';

export async function getPublicSettings(req, res) {
  const s = await Setting.findOne({ key: 'company' });
  res.json(s?.value || {});
}

export async function upsertCompanySettings(req, res) {
  const s = await Setting.findOneAndUpdate({ key: 'company' }, { key: 'company', value: req.body }, { new: true, upsert: true });
  res.json(s.value);
}
