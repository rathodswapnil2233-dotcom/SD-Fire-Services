import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Service from './models/Service.js';
import Setting from './models/Setting.js';

export async function seed() {
  const adminPassword = await bcrypt.hash('ChangeMe@123', 12);
  await User.updateOne(
    { email: 'admin@sdservices.local' },
    { $setOnInsert: { name: 'SD Fire Services Admin', email: 'admin@sdservices.local', passwordHash: adminPassword, role: 'admin' } },
    { upsert: true }
  );

  const count = await Service.countDocuments();
  if (!count) {
    await Service.insertMany([
      { title: 'Fire Hydrant Systems', slug: 'fire-hydrant-systems', shortDescription: 'Design and installation of fire hydrant networks for industrial and commercial sites.', icon: 'Droplets', order: 1 },
      { title: 'Fire Alarm & Detection', slug: 'fire-alarm-detection', shortDescription: 'Addressable and conventional detection systems with professional commissioning.', icon: 'BellRing', order: 2 },
      { title: 'Fire Sprinkler Systems', slug: 'fire-sprinkler-systems', shortDescription: 'Automatic sprinkler solutions designed for effective fire control.', icon: 'CloudRain', order: 3 },
      { title: 'Fire Suppression Systems', slug: 'fire-suppression-systems', shortDescription: 'Specialized suppression for server rooms, electrical rooms, kitchens and industry.', icon: 'ShieldCheck', order: 4 },
      { title: 'Fire Safety Audit', slug: 'fire-safety-audit', shortDescription: 'Risk assessment, compliance inspection and actionable corrective plans.', icon: 'ClipboardCheck', order: 5 },
      { title: 'AMC & Extinguisher Services', slug: 'amc-extinguisher', shortDescription: 'Supply, refilling, testing and annual maintenance for fire safety assets.', icon: 'Wrench', order: 6 }
    ]);
  }

  await Setting.updateOne(
    { key: 'company' },
    { $setOnInsert: {
      key: 'company', value: {
        name: 'SD Fire Services',
        tagline: 'Fire Safety & Protection Solutions',
        address: 'Yas Park, Plot no 62, Chakan, Kadachiwadi, Chakan, Maharashtra 410501 | Railway station road, Ghorawadi, Talegaon Dabhade, Pune 410507',
        email: 'sdfireserivices111@gmail.com',
        phones: ['+91 7972451110', '+91 92707 77733'],
        mapQuery: 'Railway station road, Ghorawadi, Talegaon Dabhade, Pune 410507',
        licenceNumber: '',
        authorizationLabel: 'Maharashtra Fire Services Authorized Agency'
      }
    }},
    { upsert: true }
  );
  await Setting.updateOne(
    { key: 'company' },
    { $set: {
      'value.address': 'Yas Park, Plot no 62, Chakan, Kadachiwadi, Chakan, Maharashtra 410501 | Railway station road, Ghorawadi, Talegaon Dabhade, Pune 410507',
      'value.mapQuery': 'Railway station road, Ghorawadi, Talegaon Dabhade, Pune 410507',
      'value.phones': ['+91 7972451110', '+91 92707 77733']
    }}
  );
}
