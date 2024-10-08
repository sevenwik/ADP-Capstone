import React, { useRef, useState, useEffect } from "react";
import { formatDateTime } from "../helper/helperServices"; // Ensure this is your helper function

const ApplicationModal = ({
  job,
  application,
  showModal,
  handleClose,
  handleApply,
  user,
  isEditing,
}) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
    customResume: "",
  });

  const fetchCandidateData = (callback) => {
    fetch(`http://localhost:8081/api/candidates/${user.id}`)
      .then((response) => response.json())
      .then((candidate) => {
        callback(candidate);
      });
  };

  useEffect(() => {
    if (showModal) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();

      fetchCandidateData((candidate) => {
        setFormData({
          name: candidate.fullName,
          email: candidate.email,
          coverLetter: isEditing ? application.coverLetter : "",
          customResume: isEditing ? application.customResume : "",
        });
      });
    }
  }, [showModal, isEditing, job.id, user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      dateApplied: isEditing
        ? application.dateApplied
        : formatDateTime(new Date()),
      application_status: isEditing ? application.appStatus : "In Process",
      jobId: job.id,
      userId: user.id,
    };
    handleApply(updatedFormData);
  };

  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex="-1"
      aria-labelledby="jobModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog" style={{ maxWidth: "60%" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="jobModalLabel">
              {isEditing
                ? `Edit Application for ${job.jobTitle}`
                : job.jobTitle}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              data-bs-dismiss="modal"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Department:</strong> {job.department}
            </p>
            <p>
              <strong>Job Description:</strong> {job.jobDescription}
            </p>
            <p>
              <strong>Additional Info:</strong> {job.additionalInfo}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="coverLetter" className="form-label">
                  Cover Letter
                </label>
                <textarea
                  className="form-control"
                  id="coverLetter"
                  name="coverLetter"
                  rows="3"
                  value={formData.coverLetter}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="customResume" className="form-label">
                  Custom Resume (Optional)
                </label>
                <textarea
                  className="form-control"
                  id="customResume"
                  name="customResume"
                  rows="3"
                  value={formData.customResume}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                {isEditing ? "Update Application" : "Apply"}
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
