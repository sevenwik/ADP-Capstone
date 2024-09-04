import React, { useEffect, useRef } from "react";

function Modal({ showModal, handleClose, job }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();
    }
  }, [showModal]);

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
              {job?.jobTitle || "Modal title"}
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
            <p>{job?.jobDescription || "No description available"}</p>
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
            <button type="button" className="btn btn-primary">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
