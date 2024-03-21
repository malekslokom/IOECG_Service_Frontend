import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationArchiverModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton style={{ minHeight: "2rem" }}>
                <Modal.Title style={{ fontSize: "1.0rem" }}>Confirmation d'archivage</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Vous êtes sur le point d'archiver un élément, êtes-vous sûr ?</p>
            </Modal.Body>
            <Modal.Footer style={{minHeight: "2rem", justifyContent: "center" }}>
                <Button variant="secondary" onClick={onClose}>
                    Annuler
                </Button>
                <Button onClick={onConfirm} style={{backgroundColor:"var(--toggle-fg-before-hover)"}}>
                    Confirmer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationArchiverModal;
