import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CandidateEditProfileModal = ({ showModal, handleClose, user }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    resume: "",
  });

  useEffect(() => {
    if (showModal) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();

      // Fetch candidate profile data
      fetch(`http://localhost:8081/api/candidates/${user.id}`)
        .then((response) => response.json())
        .then((candidate) => {
          setFormData({
            id: candidate.id || "",
            userId: candidate.userId || "",
            fullName: candidate.fullName || "",
            email: candidate.email || "",
            address: candidate.address || "",
            phone: candidate.phone || "",
            resume: candidate.resume || "",
          });
        });
    }
  }, [showModal, user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8081/api/candidates/${formData.id}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      toast.success("Updated successfully");
      const data = await response.json();
      console.log(data);
    }
    handleClose();
  };

  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex="-1"
      aria-labelledby="candidateProfileModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog" style={{ maxWidth: "60%" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="candidateProfileModalLabel">
              Edit Profile
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
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
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="resume" className="form-label">
                  Resume
                </label>
                <textarea
                  className="form-control"
                  id="resume"
                  name="resume"
                  rows="3"
                  value={formData.resume}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save Changes
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

export default CandidateEditProfileModal;
