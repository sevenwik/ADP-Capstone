import React, { useState } from "react";
import Modal from "../components/Modal";
import "./ManagerJobs.css";

function ManagerJobs({ jobs }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleShow = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="ManagerList">
      <h1>Jobs</h1>
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
          {jobs.map((job, id) => {
            return (
              <tr
                key={id}
                onClick={() => handleShow(job)}
                className="click-job"
              >
                <td>{job.jobTitle}</td>
                <td>{job.jobDescription}</td>
                <td style={{ backgroundColor: "lightgreen" }}>
                  {job.listingStatus}
                </td>
                <td>{job.department}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        showModal={showModal}
        handleClose={handleClose}
        job={selectedJob}
      />
    </div>
  );
}

export default ManagerJobs;
