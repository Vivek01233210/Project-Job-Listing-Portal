import { useQuery } from "@tanstack/react-query";
import { getMyApplicationsAPI } from "../APIServices/jobAPI.js";
import { formatDate } from './../utility/dateFormatter';

export default function MyApplications() {

    const { data, isLoading } = useQuery({
        queryKey: ["myApplications"],
        queryFn: getMyApplicationsAPI
    });

    // console.log(data)

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">My Applications</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading && <p className="text-center text-lg">Loading...</p>}
                {data?.data?.length === 0 && <p className="text-center text-lg">You haven't applied anywhere yet!</p>}
                {data?.data?.map((application) => (
                    <div key={application?._id} className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">{application?.job_id?.jobTitle}</h2>
                        <p className="text-gray-700 mb-1">Company: {application?.job_id?.companyName}</p>
                        <p className="text-gray-700 mb-1">Status: {application?.status}</p>
                        <p className="text-gray-500 text-sm">Applied on: {formatDate(application?.createdAt)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}