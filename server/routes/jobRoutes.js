import express from 'express';
import { protect } from '../middlewares/protect.js';
import { createJob, getAllJobs } from '../controllers/jobController.js';

const router = express.Router();

router.post('/create-job', protect, createJob);
router.get('/',protect, getAllJobs);

export default router;