import React, { useEffect, useRef, useState } from "react";
import { formatDateTime } from "../helper/helperServices";
import ApplicationTable from "./ApplicationTable";

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

  const [modalView, setModalView] = useState("Edit");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (showModal) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();
    }

    if (isCreatingNew) {
      setFormData({
        department: "",
        listingTitle: "",
        jobTitle: "",
        jobDescription: "",
        additionalInformation: "",
        listingStatus: "Open",
        dateListed: formatDateTime(new Date()),
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
        dateListed: job.dateListed || "",
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

  const handleModalView = async (view) => {
    if (modalView === "Edit" && view !== "Edit") {
      setModalView("Applications");
      const response = await fetch(
        `http://localhost:8081/api/applications/job/pagination/1?page=0&size=3`
      );
      response.json().then((data) => {
        setApplications(data);
      });
    } else if (view !== "Applications") {
      setModalView("Edit");
      setApplications([]);
    }
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
      <div className="modal-dialog" style={{ maxWidth: "60%" }}>
        <div className="modal-content">
          {!isCreatingNew ? (
            <ul className="nav nav-tabs" style={{ margin: "10px" }}>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    modalView === "Edit" ? "active" : null
                  } `}
                  style={{ cursor: "pointer" }}
                  aria-current="page"
                  onClick={() => handleModalView("Edit")}
                >
                  Edit
                </a>
              </li>
              {!isCreatingNew && (
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      modalView === "Applications" ? "active" : null
                    }`}
                    style={{ cursor: "pointer" }}
                    aria-current="page"
                    onClick={() => handleModalView("Applications")}
                  >
                    View Applications
                  </a>
                </li>
              )}
            </ul>
          ) : null}
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {isCreatingNew ? "Create New Job" : `${modalView}`}
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
            {modalView === "Edit" ? (
              <form>
                <div className="mb-3">
                  <label className="form-label">
                    Department <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Listing Title <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="listingTitle"
                    value={formData.listingTitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Job Title <span style={{ color: "red" }}>*</span>
                  </label>
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
            ) : (
              <ApplicationTable selectedApplications={applications} />
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                handleClose();
                setApplications([]);
                setModalView("Edit");
              }}
            >
              Close
            </button>
            {modalView === "Edit" && (
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                {isCreatingNew ? "Create Job" : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
