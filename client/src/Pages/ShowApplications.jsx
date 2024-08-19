import { useParams } from 'react-router-dom';
import { getJobByIdWithApplicantsAPI, updateApplicationAPI } from '../APIServices/jobAPI.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function ShowApplications() {
  const { jobId } = useParams();

  const { data: job, isLoading: jobLoading, error: jobError } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getJobByIdWithApplicantsAPI(jobId),
  });
  // console.log(job)

  const updateApplicationMutation = useMutation({
    mutationKey: 'update',
    mutationFn: (data) => updateApplicationAPI(data),
  })

  const handleViewResume = (buffer) => {
    const blob = new Blob([new Uint8Array(buffer)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  const handleAccept = (applicantId) => {
    updateApplicationMutation
      .mutateAsync({ applicantId, status: 'accepted', jobId: jobId })
      .then(() => toast.success('Applicant accepted!'))
      .then(() => console.log(`Accepted applicant with ID: ${applicantId}`))
      .catch((error) => { console.log(error) })
    
  };

  const handleReject = (applicantId) => {
    updateApplicationMutation
      .mutateAsync({ applicantId, status: 'rejected', jobId: jobId })
      .then(() => { toast.info('Applicant rejected!') })
      .then(() => { console.log(`Rejected applicant with ID: ${applicantId}`) })
      .catch((error) => { console.log(error) })
    
  };

  if (jobLoading) return <div>Loading...</div>;
  if (jobError) return <div>Error loading data</div>;

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Job Details</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">{job?.jobTitle}</h2>
          <p className="mb-2">{job?.description}</p>
          <p className="mb-2"><strong>Location:</strong> {job?.location}</p>
          <p className="mb-2"><strong>Salary Range:</strong> {job?.salaryRange}</p>
          <p className="mb-2"><strong>Company Name:</strong> {job?.companyName}</p>
        </div>
      </div>


      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Applicant{job?.applicants?.length > 1 ? 's' : ''}</h1>
        <div className="space-y-4">
          {job?.applicants?.map((applicant) => (
            <div key={applicant?._id} className="p-4 border rounded shadow-sm">
              <h2 className="text-xl font-semibold">{applicant?.fullName}</h2>
              <p className="text-gray-600">{applicant.headline ? applicant.headline : "-------------"}</p>
              <p className="mb-2"><strong>Skills:</strong> {applicant.skills ? applicant.skills : "N/A"}</p>
              <p className="mb-2"><strong>Description:</strong> {applicant.description ? applicant.description : "N/A"}</p>
              <p className="mb-2"><strong>Mobile:</strong> {applicant.mobile ? applicant.mobile : "N/A"}</p>
              <p className="mb-2"><strong>LinkedIn URL:</strong> {applicant.linkedIn ? applicant.linkedIn : "N/A"}</p>
              <p className="mb-2"><strong>Address:</strong> {applicant.city},{applicant.state}, {applicant.country} </p>
              {applicant?.resume.data && <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleViewResume(applicant?.resume?.data?.data)}
              >
                View Resume
              </button>}
              <div className="my-4 flex space-x-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleReject(applicant._id)}
                >
                  Reject
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => handleAccept(applicant._id)}
                >
                  Accept
                </button>
              </div>
            </div>


          ))}
        </div>

      </div>
    </>
  );
}