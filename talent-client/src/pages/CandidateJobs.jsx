import React, { useEffect, useState } from "react";
import ApplicationModal from "../components/ApplicationModal";
import { toast } from "react-toastify";
import "./CandidateJobs.css";
import CandidateEditProfileModal from "../components/CandidateEditProfileModal";

const CandidateJobs = ({ jobs, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [userDashboardState, setUserDashboardState] = useState("Jobs");
  const [applications, setApplications] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentApplication, setCurrentApplication] = useState();
  const [page, setPage] = useState(0);
  const [currentJobs, setCurrentJobs] = useState(jobs);

  const handleShowModal = (job, application = null, editing = false) => {
    setSelectedJob(job);
    setCurrentApplication(application);
    setIsEditing(editing); // Set the mode based on whether editing or creating
    setShowModal(true);
  };

  const handleCandidateModal = () => {
    setShowCandidateModal(true);
  };
  const handleCloseCandidateModal = () => {
    setShowCandidateModal(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    setIsEditing(false); // Reset the editing state
  };

  const handleApplications = async () => {
    if (userDashboardState === "Jobs") {
      const response = await fetch(
        `http://localhost:8081/api/applications/user/${user.id}`
      );
      response.json().then((data) => {
        setApplications(data);
      });
      setUserDashboardState("Applications");
    } else {
      setUserDashboardState("Jobs");
    }
  };

  const handleApply = async (formData) => {
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:8081/api/applications/${currentApplication.id}`
      : "http://localhost:8081/api/applications";

    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: method,
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      if (isEditing) {
        handleApplications();
      }
      toast.success(
        isEditing
          ? "Application Updated Successfully!"
          : "Applied Successfully!"
      );
    }

    handleCloseModal();
  };

  const handlePage = async (direction) => {
    if (direction === "next") {
      setPage((page) => page + 1);
    } else {
      if (page !== 0) {
        setPage((page) => page - 1);
      }
    }
    const users = await fetch(
      `http://localhost:8081/api/jobs/pagination?page=${
        direction === "next" ? page + 1 : page - 1
      }&size=${6}`
    );
    users.json().then((data) => {
      setCurrentJobs(data);
    });
  };
  return (
    <div
      className="CandidateJobs"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>{userDashboardState === "Jobs" ? "Jobs" : "Applications"}</h1>
      <div style={{ justifyContent: "space-between", display: "flex" }}>
        <button
          className="btn btn-primary"
          style={{ margin: "10px" }}
          onClick={handleApplications}
        >
          {userDashboardState === "Jobs" ? "View Applications" : "Jobs"}
        </button>
        <button
          className="btn btn-primary"
          style={{ margin: "10px" }}
          onClick={handleCandidateModal}
        >
          Edit Profile
        </button>
      </div>
      {userDashboardState === "Jobs" ? (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {currentJobs.map((job, id) => (
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
                    disabled={job.listingStatus === "Closed" ? true : false}
                  >
                    {job.listingStatus === "Closed" ? "Closed" : "Apply"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <button
              className="btn btn-secondary"
              style={{ margin: "10px" }}
              disabled={page === 0 ? true : false}
              onClick={() => handlePage("prev")}
            >
              Prev
            </button>
            <button
              className="btn btn-secondary"
              style={{ margin: "10px" }}
              onClick={() => handlePage("next")}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((application, index) => (
                  <tr key={index}>
                    <td>{application.job.jobTitle}</td>
                    <td>{application.job.department}</td>
                    <td>{application.application.application_status}</td>
                    <td>
                      {new Date(
                        application.application.dateApplied
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        disabled={
                          application.application.application_status ===
                            "Hired" ||
                          application.application.application_status ===
                            "Rejected"
                            ? true
                            : false
                        }
                        onClick={() =>
                          handleShowModal(
                            application.job,
                            application.application,
                            true
                          )
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-2">
                    No Applications For Now{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <ApplicationModal
          job={selectedJob}
          application={currentApplication}
          user={user}
          showModal={showModal}
          handleClose={handleCloseModal}
          handleApply={handleApply}
          isEditing={isEditing}
        />
      )}
      {showCandidateModal && (
        <CandidateEditProfileModal
          showModal={showCandidateModal}
          handleClose={handleCloseCandidateModal}
          user={user}
        />
      )}
    </div>
  );
};

export default CandidateJobs;
