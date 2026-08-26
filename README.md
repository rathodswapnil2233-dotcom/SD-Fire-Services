# SD Fire Services – Premium MERN Website

A premium, responsive, production-oriented MERN starter for a fire protection & fire safety company.

## Stack
- Client: React + Vite + React Router + Axios + Framer Motion + Lucide
- Admin: React + Vite + React Router + Axios + Recharts + Lucide
- Server: Node.js + Express + MongoDB + Mongoose + JWT + bcryptjs + Helmet + rate limit
- Media: uploaded business photographs stored in `client/public/gallery` for the starter; server supports upload-ready structure.

## Project structure
```text
sd-services-premium-mern/
  client/   # public website
  admin/    # admin dashboard
  server/   # REST API + auth + MongoDB
```

## Included website sections
- Premium hero section with fire-protection visual
- Services grid and service detail cards
- Fire hydrant, alarm, sprinkler, suppression, audit and AMC sections
- Why SD Fire Services / process timeline
- Projects / gallery from the uploaded photos
- Testimonials
- Lead/appointment form
- Contact section with Google Maps embed and directions
- WhatsApp CTA and click-to-call buttons
- Responsive mobile navigation

## Admin features
- JWT login
- Dashboard KPIs
- Create/delete public services
- View and manage leads
- Update lead status
- Company settings endpoint ready for editable contact details

## Business details preloaded from supplied content / public site reference
- Business: SD Fire Services
- Address: Yas Park, Plot no 62, Chakan, Kadachiwadi, Chakan, Maharashtra 410501
- Email: sdfireserivices111@gmail.com
- Phone: +91 7972451110 / +91 9623871857 / +91 9021561190
- Service profile: fire hydrant systems, fire alarm & detection, sprinkler systems, fire suppression, fire safety audits, extinguishers, AMC/maintenance.

### Important
The starter does **not** invent a fire licence number. Add the real licence/registration number from the admin-managed business settings or the company’s official documentation before publishing.

## Setup
1. Install Node.js 20+ and MongoDB (local) or create a MongoDB Atlas database.
2. Copy `server/.env.example` to `server/.env` and update values.
3. From the root:
```bash
npm run install:all
npm run dev
```
4. Public site: http://localhost:5173
5. Admin: http://localhost:5174
6. API: http://localhost:5000

## Default admin seed
- Email: `admin@sdservices.local`
- Password: `ChangeMe@123`

Change the seeded password immediately in a real deployment.

## Build
```bash
npm run build
```

The public client and admin app will output to their respective `dist/` directories.
