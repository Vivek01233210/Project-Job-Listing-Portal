import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: [true, "Please provide a job title"],
        },
        companyName: {
            type: String,
            required: [true, "Please provide a company name"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        qualifications: {
            type: String,
            required: [true, "Please provide qualifications"],
        },
        responsibility: {
            type: String,
            required: [true, "Please provide responsibilities"],
        },
        location: {
            type: String,
            required: [true, "Please provide a location"],
        },
        salaryRange: {
            type: String,
        },
        employer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        applicants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;