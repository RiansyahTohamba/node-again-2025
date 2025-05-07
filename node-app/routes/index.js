import express from 'express';
import { tampilkanSoal } from '../controllers/soalController.js';
import { submitJawaban } from '../controllers/tesController.js';
import { tampilkanDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', tampilkanSoal);
router.post('/submit', submitJawaban);
router.get('/dashboard', tampilkanDashboard);

export default router;
