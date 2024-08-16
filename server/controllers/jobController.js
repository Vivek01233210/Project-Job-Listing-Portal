import JobApplication from "../models/jobApplicationModel.js";
import Job from "../models/jobModel.js";


export const createJob = async (req, res) => {
    const id = req.user._id;
    try {
        await Job.create({ ...req.body, employer_id: id });
        res.status(201).json({ msg: 'Job created successfully' });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllJobs = async (req, res) => {
    // console.log(req);
    try {
        const { title, location } = req.query;

        let filters = {};
        if (title) filters.jobTitle = { $regex: title, $options: 'i' };
        if (location) filters.location = { $regex: location, $options: 'i' };

        const jobs = await Job.find(filters)
            .populate({
                path: 'employer_id',
                select: 'fullName profilePic headline',
            });
        res.status(200).json({ data: jobs });
    } catch (error) {
        console.error('Error getting jobs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createJobApplication = async (req, res) => {
    const { jobId } = req.body;
    const jobSeekerId = req.user._id;

    try {
        // Check if the user has already applied for this job
        const existingApplication = await JobApplication.findOne({ job_seeker_id: jobSeekerId, job_id: jobId });

        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job.' });
        }

        // Create a new job application
        const newApplication = await JobApplication.create({ job_seeker_id: jobSeekerId, job_id: jobId });

        // Add the application to the job
        await Job.findByIdAndUpdate(jobId, { $push: { applicants: jobSeekerId } });

        res.status(201).json({ message: 'Job application created successfully', data: newApplication });
    } catch (error) {
        console.error('Error creating job application:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getMyApplications = async (req, res) => {
    const jobSeekerId = req.user._id;

    try {
        const applications = await JobApplication.find({ job_seeker_id: jobSeekerId })
            .populate({
                path: 'job_id',
                select: 'jobTitle companyName',
            })
        
        res.status(200).json({ data: applications });

    } catch (error) {
        console.error('Error getting applications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getMyJobs = async (req, res) => {
    const employerId = req.user._id;

    try {
        const jobs = await Job.find({ employer_id: employerId });
        res.status(200).json({ data: jobs });
    } catch (error) {
        console.error('Error getting jobs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


