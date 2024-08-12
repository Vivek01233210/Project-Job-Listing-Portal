import Job from "../models/jobModel.js";


export const createJob = async (req, res) => {
    try {
        await Job.create(req.body);
        res.status(201).json({ msg: 'Job created successfully'});
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}