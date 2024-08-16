import express from 'express';
import { protect } from '../middlewares/protect.js';
import { createJob, createJobApplication, deleteJob, getAllJobs, getMyApplications, getMyJobs } from '../controllers/jobController.js';

const router = express.Router();

router.post('/create-job', protect, createJob);
router.get('/', protect, getAllJobs);
router.get('/my-jobs', protect, getMyJobs);
router.post('/apply-job', protect, createJobApplication);
router.get('/my-application', protect, getMyApplications);
router.delete('/:jobId', protect, deleteJob);

export default router;