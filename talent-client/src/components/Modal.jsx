import React, { useEffect, useRef, useState } from "react";
import { formatDateTime } from "../helper/helperServices";

function Modal({ showModal, handleClose, job, handleSave, isCreatingNew }) {
  const modalRef = useRef(null);

  // State to manage form inputs
  const [formData, setFormData] = useState({
    department: "",
    listingTitle: "",
    jobTitle: "",
    jobDescription: "",
    additionalInformation: "",
    listingStatus: "",
    dateListed: "",
    dateClosed: "",
  });

  useEffect(() => {
    if (showModal) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();
    }

    // Update form data when job changes or creating a new job
    if (isCreatingNew) {
      setFormData({
        department: "",
        listingTitle: "",
        jobTitle: "",
        jobDescription: "",
        additionalInformation: "",
        listingStatus: "Open",
        dateListed: formatDateTime(new Date()), // Set today's date
        dateClosed: "",
      });
    } else if (job) {
      setFormData({
        department: job.department || "",
        listingTitle: job.listingTitle || "",
        jobTitle: job.jobTitle || "",
        jobDescription: job.jobDescription || "",
        additionalInformation: job.additionalInformation || "",
        listingStatus: job.listingStatus || "",
        dateListed: job.dateListed || "", // Use existing dateCreated
        dateClosed: job.dateClosed || "",
      });
    }
  }, [showModal, job, isCreatingNew]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const updatedJob = {
      ...job,
      ...formData,
      dateClosed:
        formData.listingStatus === "Closed"
          ? formatDateTime(new Date())
          : job?.dateClosed,
    };

    await handleSave(updatedJob);
    handleClose();
  };

  return (
    <div
      className="modal fade"
      ref={modalRef}
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {isCreatingNew ? "Create New Job" : "Edit Job Details"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Listing Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="listingTitle"
                  value={formData.listingTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Job Description</label>
                <textarea
                  className="form-control"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Additional Information</label>
                <textarea
                  className="form-control"
                  name="additionalInformation"
                  value={formData.additionalInformation}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Listing Status</label>
                <select
                  className="form-select"
                  name="listingStatus"
                  value={formData.listingStatus}
                  onChange={handleChange}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              {!isCreatingNew && (
                <div className="mb-3">
                  <label className="form-label">Date Created</label>
                  <input
                    type="text"
                    className="form-control"
                    name="dateCreated"
                    value={formData.dateListed}
                    readOnly
                  />
                </div>
              )}
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
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleSubmit}
            >
              {isCreatingNew ? "Create Job" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
