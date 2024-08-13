import { useQuery } from "@tanstack/react-query";
import { getAllJobsAPI } from "../APIServices/jobAPI.js";
import { CiUser } from "react-icons/ci";
import { useEffect, useState } from "react";


export default function JobList() {

    const { data: jobs } = useQuery({
        queryKey: ['get-all-jobs'],
        queryFn: getAllJobsAPI,
    });

    // useEffect(() => {
    //     if (jobs.employer_id.profilePic.data) {
    //       const buffer = jobs.employer_id.profilePic.data;
    //       const base64String = Buffer.from(buffer).toString('base64');
    //       const dataUrl = `data:image/jpeg;base64,${base64String}`;
    //       setImageSrc(dataUrl);
    //     }
    //   }, [jobs.employer_id.profilePic]);

    console.log(jobs)

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Form */}
                    <div className="md:w-1/4 w-full md:sticky md:top-16 self-start">
                        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Search Jobs</h2>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="jobTitle">Job Title</label>
                                    <input className="w-full p-2 border border-gray-300 rounded" type="text" id="jobTitle" name="jobTitle" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="location">Location</label>
                                    <input className="w-full p-2 border border-gray-300 rounded" type="text" id="location" name="location" />
                                </div>
                                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">Search</button>
                            </form>
                        </div>
                    </div>

                    {/* Job Listings */}
                    <div className="md:w-3/4 w-full">
                        <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
                        <div className="flex flex-col gap-4">
                            {jobs?.data?.length === 0 && <p className="text-center">No jobs found</p>}
                            {jobs?.data?.map((job) => {
                                // Convert binary data to base64 string
                                const base64String = btoa(
                                    new Uint8Array(job.employer_id.profilePic.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                                );

                                return (
                                    <div key={job._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-gray-100 to-gray-200">
                                        <h2 className="text-2xl font-semibold mb-2">{job.jobTitle}</h2>
                                        <p className="text-gray-700 mb-2"><span className="font-bold">Company:</span> {job.companyName}</p>
                                        <p className="text-gray-700 mb-2"><span className="font-bold">Location:</span> {job.location}</p>
                                        <p className="text-gray-700 mb-2"><span className="font-bold">Job Description:</span> {job.description}</p>
                                        <p className="text-gray-700 mb-2"><span className="font-bold">Qualifications:</span> {job.qualifications}</p>
                                        <p className="text-gray-700 mb-2"><span className="font-bold">Responsibilities:</span> {job.responsibility}</p>
                                        <p className="text-gray-700 mb-2"><span className="font-bold">Salary Range:</span> {job.salaryRange}</p>
                                        
                                        {/* Employer Section */}
                                        <div className="mt-4 p-4 border-t-[1px] border-gray-400">
                                            <h3 className="text-xl font-semibold mb-2">Posted by:</h3>
                                            <div className="flex items-center">
                                                <img src={`data:image/jpeg;base64,${base64String}`} alt="Employer Profile" className="w-16 h-16 rounded-full mr-4" />
                                                <div>
                                                    <h3 className="text-lg font-semibold">{job.employer_id.fullName}</h3>
                                                    <p className="text-gray-600">{job.employer_id.headline}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="mt-4 bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-lg hover:from-blue-600 hover:to-green-600 transition duration-300 font-semibold shadow-lg hover:shadow-xl">
                                            Apply Now
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}