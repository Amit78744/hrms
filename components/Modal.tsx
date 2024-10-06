// Modal.tsx
import React from 'react';

interface ModalProps {
  showModal: boolean;
  handleClose: () => void;
  handleSubmit: () => void; // Add a submit handler prop
  title: string; // Title for the modal
  children: React.ReactNode; // Content inside the modal
}

const Modal: React.FC<ModalProps> = ({ showModal, handleClose, handleSubmit, title, children }) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal only if the overlay is clicked
    if (event.currentTarget === event.target) {
      handleClose();
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="modal fade show d-block fixed inset-0 bg-black bg-opacity-75 z-50"
          tabIndex={-1}
          style={{ display: 'block' }}
          onClick={handleOverlayClick}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                
              </div>
              {/* <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-secondary mr-2" onClick={handleClose}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
