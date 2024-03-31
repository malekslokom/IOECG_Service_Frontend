import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import moment from "moment";
interface CreateProjetModalProps {
  onClose: () => void;
  onCreate: (newProjet: Projet) => void;
}

const CreateProjetModal: React.FC<CreateProjetModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [nameProjet, setNameProjet] = useState<string>("");
  const [typeProjet, setTypeProjet] = useState<string>("");
  const [descriptionProjet, setDescriptionProjet] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameProjet(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeProjet(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionProjet(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProjet: Projet = {
      name_project: nameProjet,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      created_by: "Andy",
      description_project: descriptionProjet,
      type_project: typeProjet,
    };

    onCreate(newProjet);

    setNameProjet("");
    setTypeProjet("");
    setDescriptionProjet("");
    onClose();
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nouveau Projet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} method="POST">
          <Form.Group controlId="Nom">
            <Form.Label>Nom *</Form.Label>
            <Form.Control
              type="text"
              value={nameProjet}
              onChange={handleNameChange}
              required
            />
          </Form.Group>
          <br />
          <Form.Group controlId="Type">
            <Form.Label>Type *</Form.Label>

            <Form.Select value={typeProjet} onChange={handleTypeChange}>
              <option value="">Choisir un type...</option>
              <option value="Classification">Classification</option>
              <option value="Régression">Régression</option>
              <option value="Visualisation">Visualisation</option>
            </Form.Select>
          </Form.Group>
          <br />
          <Form.Group controlId="Version">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              type="text"
              value={descriptionProjet}
              onChange={handleDescriptionChange}
              required
            />
          </Form.Group>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: "var(--toggle-fg-before-hover)",
                width: "281px",
              }}
            >
              Créer
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateProjetModal;
