import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Form, Accordion, Card } from "react-bootstrap";
import { fetchModels } from "../../../services/ModelService"; // Assurez-vous que cette fonction est bien définie
import "./../ModelModal.css";
interface AnalyseModelModalProps {
  onClose: () => void;
  onCreate: (newModels: Model[]) => void;
}

const AnalyseModelModal: React.FC<AnalyseModelModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [selectedModels, setSelectedModels] = useState<Model[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [sectionVisibility, setSectionVisibility] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    fetchModels()
      .then((data) => setModels(data))
      .catch((error) => console.error("Error fetching models:", error));
  }, []);

  const handleCheckboxChange = (model: Model) => {
    const isSelected = selectedModels.some((m) => m.id === model.id);
    if (isSelected) {
      setSelectedModels(selectedModels.filter((m) => m.id !== model.id));
    } else {
      setSelectedModels([...selectedModels, model]);
    }
  };

  const toggleSectionVisibility = (modelId: number) => {
    setSectionVisibility((prev) => ({
      ...prev,
      [modelId]: !prev[modelId],
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(selectedModels);
    onClose();
  };
  const handleClose = () => {
    setSelectedModels([]);
    onClose(); // Close the modal
  };

  return (
    <Modal show onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Ajouter modèles à l'analyse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-4  model-list">
            <Table striped bordered hover>
              <tbody>
                {models.map((model) => (
                  <tr key={model.id}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedModels.some((m) => m.id === model.id)}
                        onChange={() => handleCheckboxChange(model)}
                      />
                    </td>
                    <td>{model.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="col-md-8  model-details">
            <Accordion defaultActiveKey="0">
              {selectedModels.map((model, index) => (
                <Accordion.Item eventKey={`${index}`} key={model.id}>
                  <Accordion.Header>{model.name}</Accordion.Header>
                  <Accordion.Body>
                    <div className="modal-section">
                      <p className="modal-section-title">
                        Informations sur le modèle
                      </p>
                      <div className="section-box">
                        <div className="d-flex justify-content-between">
                          <div className="input-group mb-3">
                            <span className="input-group-text">Auteur</span>
                            <input
                              type="text"
                              className="form-control"
                              value={model.author}
                              readOnly
                            />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">
                              Nom de projet
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              value={model.project_name}
                              readOnly
                            />
                          </div>
                        </div>
                        <textarea
                          className="form-control"
                          rows={4}
                          readOnly
                          value={model.description}
                        />
                      </div>
                    </div>
                    <div className="modal-section">
                      <p className="modal-section-title">Architecture</p>
                      <div className="section-box">
                        <div className="d-flex justify-content-between">
                          <div className="input-group mb-3">
                            <span className="input-group-text">Nom</span>
                            <input
                              type="text"
                              className="form-control"
                              value={model.architecture_name}
                              readOnly
                            />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Version</span>
                            <input
                              type="text"
                              className="form-control"
                              value={model.architecture_version}
                              readOnly
                            />
                          </div>
                        </div>
                        <textarea
                          className="form-control"
                          rows={4}
                          readOnly
                          value={model.architecture_description}
                        />
                      </div>
                    </div>
                    <div className="modal-section">
                      <p className="modal-section-title">
                        Informations Additionnelles
                      </p>
                      <div className="section-box">
                        <div className="d-flex flex-wrap gap-2 justify-content-between mb-4">
                          <div>
                            <h6 className="tag-title">Total des Paramètres</h6>
                            <span className="badge bg-secondary">
                              {model.total_params}
                            </span>
                          </div>
                          <div>
                            <h6 className="tag-title">Taille du Modèle</h6>
                            <span className="badge bg-secondary">
                              {model.model_size}
                            </span>
                          </div>
                          <div>
                            <h6 className="tag-title">Taille du Batch</h6>
                            <span className="badge bg-secondary">
                              {model.batch_size}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2 justify-content-between">
                          <div>
                            <h6 className="tag-title">Taux d'Apprentissage</h6>
                            <span className="badge bg-secondary">
                              {model.learning_rate}
                            </span>
                          </div>
                          <div>
                            <h6 className="tag-title">Nature de la Tâche</h6>
                            <span className="badge bg-secondary">
                              {model.task_nature}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Form onSubmit={handleSubmit}>
          <Button type="submit" className="custom-button">
            Ajouter
          </Button>
        </Form>
        <Button onClick={handleClose} variant="secondary">
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AnalyseModelModal;
