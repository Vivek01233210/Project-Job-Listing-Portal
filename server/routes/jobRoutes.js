import express from 'express';
import { protect } from '../middlewares/protect.js';
import {  createJob, createJobApplication, deleteJob, getAllJobs, getJobById, getJobByIdWithApplicants, getMyApplications, getMyJobs, updateApplicationStatus, updateJob } from '../controllers/jobController.js';

const router = express.Router();

router.post('/create-job', protect, createJob);
router.get('/', protect, getAllJobs);
router.get('/my-jobs', protect, getMyJobs);
router.post('/apply-job', protect, createJobApplication);
router.get('/my-application', protect, getMyApplications);
router.put('/update-application/:applicationId', protect, updateApplicationStatus);
router.get('/:jobId', protect, getJobById);
router.get('/:jobId/applicants', protect, getJobByIdWithApplicants);
router.put('/:jobId', protect, updateJob);
router.delete('/:jobId', protect, deleteJob);

export default router;