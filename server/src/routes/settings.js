import { Router } from 'express';
import { getPublicSettings, upsertCompanySettings } from '../controllers/settings.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.get('/company', getPublicSettings);
router.put('/company', requireAuth, upsertCompanySettings);
export default router;
