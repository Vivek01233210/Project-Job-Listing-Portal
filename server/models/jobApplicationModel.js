import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
    {
        job_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
        job_seeker_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "accepted", "rejected"],
        },
    },
    {
        timestamps: true,
    }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;