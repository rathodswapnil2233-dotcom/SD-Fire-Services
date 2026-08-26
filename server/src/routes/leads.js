import { Router } from 'express';
import { createLead, listLeads, updateLead } from '../controllers/leads.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.post('/', createLead);
router.get('/', requireAuth, listLeads);
router.patch('/:id', requireAuth, updateLead);
export default router;
