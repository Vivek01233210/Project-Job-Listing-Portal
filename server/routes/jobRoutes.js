import express from 'express';
import { protect } from '../middlewares/protect.js';
import { createJob } from '../controllers/jobController.js';

const router = express.Router();

router.post('/create-job', protect, createJob);

export default router;