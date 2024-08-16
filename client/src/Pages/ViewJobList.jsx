import { useEffect, useState } from "react";
import { formatDate } from "../utility/dateFormatter.js";
import { useQuery } from '@tanstack/react-query';
import { getMyJobsAPI } from "../APIServices/jobAPI.js";

export default function ViewJobList() {

    const { data:jobs, isLoading } = useQuery({
        queryKey: ['my-jobs'],
        queryFn: getMyJobsAPI
    });

    // console.log(data);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Job Status</h1>
            <div className="space-y-4">
                {jobs?.data?.map((job) => (
                    <div key={job?._id} className="p-4 border rounded shadow-sm">
                        <h2 className="text-xl font-semibold">{job?.jobTitle}</h2>
                        <p className="text-gray-600">{job?.location}</p>
                        <p className="text-gray-600">{job?.salaryRange}</p>
                        <p className="text-gray-600">{job?.description}</p>
                        <p className="">No. of applicants: {job?.applicants?.length}</p>
                        <p className="text-gray-500 text-sm">Posted on: {formatDate(job?.createdAt)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}