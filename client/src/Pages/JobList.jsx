import { useQuery } from "@tanstack/react-query";
import { getAllJobsAPI } from "../APIServices/jobAPI.js";


export default function JobList() {

    const { data: jobs } = useQuery({
        queryKey: ['get-all-jobs'],
        queryFn: getAllJobsAPI,
    });

    console.log(jobs)

    return (
        <>
             <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Form */}
                <div className="md:w-1/4 w-full md:sticky md:top-16 self-start">
                    <div className="bg-white p-6 rounded-lg shadow-md">
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
                        {jobs?.data?.map((job) => (
                            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-2xl font-semibold mb-2">{job.jobTitle}</h2>
                                <p className="text-gray-700 mb-2"><span className="font-bold">Company:</span> {job.companyName}</p>
                                <p className="text-gray-600 mb-4">{job.description}</p>
                                <p className="text-gray-700 mb-2"><span className="font-bold">Qualifications:</span> {job.qualifications}</p>
                                <p className="text-gray-700 mb-2"><span className="font-bold">Responsibilities:</span> {job.responsibility}</p>
                                <p className="text-gray-700 mb-2"><span className="font-bold">Location:</span> {job.location}</p>
                                <p className="text-gray-700 mb-2"><span className="font-bold">Salary Range:</span> {job.salaryRange}</p>
                                <p className="text-gray-700"><span className="font-bold">Employer ID:</span> {job.employer_id}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}