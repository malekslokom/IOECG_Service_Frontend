import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface CreateProjetModalProps {
  onClose: () => void;
  onCreate: (newProjet: Projet) => void;
}

const CreateProjetModal: React.FC<CreateProjetModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [Nom, setName] = useState<string>("");
  const [Type, setType] = useState<string>("");
  const [Version, setVersion] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const handleVersionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setVersion(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProjet: Projet = {
      nom: Nom,
      dateCreation: new Date().toLocaleDateString("fr-FR"),
      auteur: "Andy",
      version: Version,
      type: Type,
    };

    onCreate(newProjet);

    setName("");
    setType("");
    setVersion("");
    onClose();
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nouveau Projet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Nom">
            <Form.Label>Nom *</Form.Label>
            <Form.Control
              type="text"
              value={Nom}
              onChange={handleNameChange}
              required
            />
          </Form.Group>
          <br />
          <Form.Group controlId="Type">
            <Form.Label>Type *</Form.Label>

            <Form.Select value={Type} onChange={handleTypeChange}>
              <option value="">Choisir un type...</option>
              <option value="Classification">Classification</option>
              <option value="Régression">Régression</option>
              <option value="Visualisation">Visualisation</option>
            </Form.Select>
          </Form.Group>
          <br />
          <Form.Group controlId="Version">
            <Form.Label>Version *</Form.Label>
            <Form.Control
              type="text"
              value={Version}
              onChange={handleVersionChange}
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
