import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationArchiverModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton style={{ minHeight: "2rem" }}>
        <Modal.Title style={{ fontSize: "1.0rem" }}>
          Confirmation d'archivage
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            backgroundColor: "#FEFBDB",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <img
            src="/assets/warning 1.png"
            alt="Warning"
            style={{ width: "24px", verticalAlign: "middle" }}
          />
          <span style={{ color: "#BA9B4F", marginLeft: "10px" }}>
            Cette action est permanente, êtes-vous sûr ?
          </span>
        </div>
        <p>Vous êtes sur le point d'archiver un élément, êtes-vous sûr ?</p>
      </Modal.Body>
      <Modal.Footer style={{ minHeight: "2rem", justifyContent: "center" }}>
        <Button
          variant="light"
          onClick={onClose}
          style={{
            backgroundColor: "#E5E7EB",
            color: "#8E8E8F",
            marginRight: "10px",
          }} // Ajout d'une marge à droite
        >
          Annuler
        </Button>
        <Button
          onClick={onConfirm}
          style={{
            backgroundColor: "#E30613",
            color: "white",
            marginLeft: "200px",
          }}
        >
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationArchiverModal;
