import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ApplicationsTable = ({ selectedApplications }) => {
  const [selectedApplication, setSelectedApplication] = useState();
  const [applications, setApplications] = useState(selectedApplications);
  const [status, setStatus] = useState(
    selectedApplication?.appStatus || "In Process"
  );
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setApplications(selectedApplications);
  }, [selectedApplications]);

  const handleRowClick = (application) => {
    setSelectedApplication(application);
    setStatus(application.appStatus);
    setNotes("");
  };

  const handleAction = async (action) => {
    const applicationData = {
      userId: selectedApplication.userId,
      jobId: selectedApplication.jobId,
      dateApplied: selectedApplication.dateApplied,
      coverLetter: selectedApplication.coverLetter,
      customResume: selectedApplication.customResume,
      application_status: action,
    };
    const response = await fetch(
      `http://localhost:8081/api/applications/${selectedApplication.id}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(applicationData),
      }
    );
    if (response.ok) {
      toast.success(`${action} successfully!`);
      const response = await fetch(
        `http://localhost:8081/api/applications/job/${selectedApplication.jobId}`
      );
      response.json().then((data) => {
        setApplications(data);
      });
    }
    setSelectedApplication(null);
  };

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Application Status</th>
              <th>Date Applied</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr
                key={app.id}
                onClick={() => handleRowClick(app)}
                style={{ cursor: "pointer" }}
              >
                <td>{app.id}</td>
                <td>{app.application_status}</td>
                <td>{app.dateApplied}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApplication && (
        <div className="application-details mt-3">
          <h4>Application Details (ID: {selectedApplication.id})</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Cover Letter</label>
              <textarea
                className="form-control"
                value={selectedApplication.coverLetter}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Custom Resume</label>
              <textarea
                className="form-control"
                value={selectedApplication.customResume}
                readOnly
                rows="5"
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleAction("Reviewed")}
              >
                Reviewed
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleAction("Hired")}
              >
                Hired
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleAction("Rejected")}
              >
                Rejected
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ApplicationsTable;
