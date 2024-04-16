import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface CreateAnalyseModalProps {
  onClose: () => void;
  onCreate: (newAnalyse: Analyse) => void;
}

const CreateAnalyseModal: React.FC<CreateAnalyseModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newAnalyse: Analyse = {
      nom: name,
      dateCreation: new Date().toLocaleDateString("fr-FR"),
      auteur: "Andy", // Vous pouvez remplacer par le nom de l'utilisateur actuel
      description: description,
    };

    onCreate(newAnalyse);

    setName("");
    setDescription("");
    onClose();
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nouvelle Analyse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Nom *</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={handleDescriptionChange}
              style={{ height: "261px" }}
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

export default CreateAnalyseModal;

/*import React, { useState } from 'react';



interface CreateAnalyseModalProps {
  onClose: () => void;
  onCreate: (newAnalyse: Analyse) => void;
}


const CreateAnalyseModal: React.FC<CreateAnalyseModalProps> = ({ onClose, onCreate }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newAnalyse: Analyse = {
        nom: name,
        description: description,
        auteur: 'Andy' ,// Vous pouvez remplacer par le nom de l'utilisateur actuel
        dateCreation: new Date().toLocaleDateString('fr-FR')
      };

    onCreate(newAnalyse);

    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal">
    <div className="container"> 
      <div className="modal-header">
        <span>Nouvelle Analyse</span>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="create-btn">Créer</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default CreateAnalyseModal;
*/
