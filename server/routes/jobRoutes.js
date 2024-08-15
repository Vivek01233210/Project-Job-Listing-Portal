import express from 'express';
import { protect } from '../middlewares/protect.js';
import { createJob, createJobApplication, getAllJobs, getMyApplications } from '../controllers/jobController.js';

const router = express.Router();

router.post('/create-job', protect, createJob);
router.get('/', protect, getAllJobs);
router.post('/apply-job', protect, createJobApplication);
router.get('/my-application', protect, getMyApplications);

export default router;