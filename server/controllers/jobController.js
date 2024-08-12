import Job from "../models/jobModel.js";


export const createJob = async (req, res) => {
    const id = req.user._id;
    try {
        await Job.create({...req.body, employer_id: id});
        res.status(201).json({ msg: 'Job created successfully'});
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}