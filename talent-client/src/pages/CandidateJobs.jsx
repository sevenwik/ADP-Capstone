import React, { useState } from "react";
import ApplicationModal from "../components/ApplicationModal";
import { toast } from "react-toastify";

const CandidateJobs = ({ jobs, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleShowModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleApply = async (formData) => {
    // Logic to handle job application submission
    // You can send the form data to a server or process it as needed
    const applicationData = {
      ...formData,
      id: user.id,
      userId: user.id,
    };

    const response = await fetch("http://localhost:8081/api/applications", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(applicationData),
    });
    if (response.ok) {
      toast.success("Applied Successfully!");
    }

    handleCloseModal(); // Close the modal after applying
  };

  return (
    <div style={{ maxWidth: "70%" }}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {jobs
          .filter((job) => job.listingStatus === "Open")
          .map((job, id) => (
            <div
              key={id}
              className="card"
              style={{ width: "18rem", margin: "10px" }}
            >
              <div className="card-body">
                <h5 className="card-title">{job.jobTitle}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {job.department}
                </h6>
                <p className="card-text">{job.jobDescription}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleShowModal(job)}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
      </div>
      {showModal && (
        <ApplicationModal
          job={selectedJob}
          user={user}
          showModal={showModal}
          handleClose={handleCloseModal}
          handleApply={handleApply}
        />
      )}
    </div>
  );
};

export default CandidateJobs;
