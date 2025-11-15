import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getPaceCodes,
  getCrimeClassification,
  getLegislation,
  getNDM,
  getEvidenceEntries,
  saveEvidenceEntry
} from '../controllers/toolsController.js';

const router = Router();

router.get('/pace', authenticate, getPaceCodes);
router.get('/crime-classification', authenticate, getCrimeClassification);
router.get('/legislation', authenticate, getLegislation);
router.get('/ndm', authenticate, getNDM);
router
  .route('/evidence')
  .get(authenticate, getEvidenceEntries)
  .post(authenticate, saveEvidenceEntry);

export default router;
