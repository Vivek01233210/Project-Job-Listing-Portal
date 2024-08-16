import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDate } from "../utility/dateFormatter.js";


export default function ViewJobList({ jobId }) {


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Job Applicants</h1>
            <div className="space-y-6">
                {[1, 2, 3]?.map((applicant) => (
                    <div key={applicant?.id} className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">{applicant?.name}</h2>
                        <p className="text-gray-700 mb-1">Email: {applicant?.email}</p>
                        <p className="text-gray-700 mb-1">
                            Resume:{" "}
                            <a
                                href={applicant?.resumeLink}
                                className="text-blue-500"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Resume
                            </a>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Applied on: {formatDate(applicant?.appliedDate)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}