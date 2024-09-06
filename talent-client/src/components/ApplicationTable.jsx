import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ApplicationsTable = ({ selectedApplications }) => {
  const [selectedApplication, setSelectedApplication] = useState();
  const [applications, setApplications] = useState(selectedApplications);
  const [page, setPage] = useState(0);

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
        `http://localhost:8081/api/applications/job/pagination/${
          selectedApplication.jobId
        }?page=${page}&size=${3}`
      );
      response.json().then((data) => {
        setApplications(data);
      });
    }
    setSelectedApplication(null);
  };

  const handlePage = async (direction) => {
    if (direction === "next") {
      setPage((page) => page + 1);
    } else {
      if (page !== 0) {
        setPage((page) => page - 1);
      }
    }
    const response = await fetch(
      `http://localhost:8081/api/applications/job/pagination/1?page=${
        direction === "next" ? page + 1 : page - 1
      }&size=${3}`
    );
    response.json().then((data) => {
      setApplications(data);
    });
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
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => handleRowClick(app)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{app.id}</td>
                  <td>{app.application_status}</td>
                  <td>{app.dateApplied}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-2">
                  No Applications For Now
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
