import React, { useState } from "react";
import Modal from "../components/Modal";
import "./ManagerJobs.css";

function ManagerJobs({ jobs, user, setJobs }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleShow = (job) => {
    setSelectedJob(job);
    setIsCreatingNew(false);
    setShowModal(true);
  };

  const handleCreateNew = () => {
    setSelectedJob(null); // No job selected for creating a new one
    setIsCreatingNew(true);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = async (job) => {
    if (isCreatingNew) {
      job.managerId = user.id;
      const response = await fetch("http://localhost:8081/api/jobs", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(job),
      });
      if (response.ok) {
        const jobs = await fetch(
          `http://localhost:8081/api/jobs/manager/${user.id}`
        );
        jobs.json().then((data) => {
          setJobs(data);
        });
      }
    } else {
      const response = await fetch(`http://localhost:8081/api/jobs/${job.id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(job),
      });
      if (response.ok) {
        const jobs = await fetch(
          `http://localhost:8081/api/jobs/manager/${user.id}`
        );
        jobs.json().then((data) => {
          setJobs(data);
        });
      }
      handleClose();
    }
  };

  return (
    <div className="ManagerList">
      <h1>Jobs</h1>
      <button className="btn btn-primary" onClick={handleCreateNew}>
        Create New Job
      </button>
      {jobs.length === 0 ? (
        <p>No jobs available. Create one to get started!</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Job title</th>
              <th>Job description</th>
              <th>Status</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, id) => (
              <tr
                key={id}
                onClick={() => handleShow(job)}
                className="click-job"
              >
                <td>{job.jobTitle}</td>
                <td>{job.jobDescription}</td>
                <td
                  style={{
                    backgroundColor:
                      job.listingStatus === "Open"
                        ? "lightgreen"
                        : "lightcoral",
                  }}
                >
                  {job.listingStatus}
                </td>
                <td>{job.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal
        showModal={showModal}
        handleClose={handleClose}
        job={selectedJob}
        handleSave={handleSave}
        isCreatingNew={isCreatingNew}
      />
    </div>
  );
}

export default ManagerJobs;
