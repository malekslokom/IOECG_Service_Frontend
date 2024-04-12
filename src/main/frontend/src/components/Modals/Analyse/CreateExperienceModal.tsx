import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


interface CreateExperienceModalProps {
    onClose: () => void;
    onCreate: (newExperience: Experience) => void;
    modelsList: Model[];
    datasetsList: Dataset[];
}
const CreateExperienceModal: React.FC<CreateExperienceModalProps> = ({
    onClose,
    onCreate,
    modelsList,
    datasetsList,
}) => {
    
    const [nameExperience, setNameExperience] = useState('');
    const [selectedModels, setSelectedModels] = useState<Model[]>([]);
    const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>([]);

    
    /*const getCurrentTime = () => {
        const currentDate = new Date();
        return currentDate.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const calculateEndTime = () => {
        const currentDate = new Date();
        currentDate.setSeconds(currentDate.getSeconds() + 5);
        return currentDate.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };   */

    const handleCreateExperience = () => {

      const currentTime = new Date().toLocaleTimeString("fr-FR", { hour12: false });
      const endTime = new Date(Date.now() + 6000).toLocaleTimeString("fr-FR", { hour12: false });

        const newExperience: Experience = {
            name_experience: nameExperience,
            models: selectedModels.map(model => model.id_model), 
            datasets: selectedDatasets.map(dataset => dataset.id_dataset), 
            nom_machine: "",
            nb_gpu: 0,
            nb_processeurs: 0,
            heure_lancement: currentTime,
            heure_fin_prevu: endTime,
            statut: "En cours",
            resultat_prediction: [],
        };



        onCreate(newExperience);
        setNameExperience('');
        setSelectedDatasets([]);
        setSelectedModels([]);
        onClose();
    };

  return(
    <Modal show onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Créer une nouvelle expérience</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group controlId="formExperienceName">
        <Form.Label>Nom de l'expérience</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrez le nom de l'expérience"
          value={nameExperience}
          onChange={(e) => setNameExperience(e.target.value)}
          required 
        />
      </Form.Group>
    </Modal.Body>
    <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
    <Button variant="primary" onClick={handleCreateExperience} style={{
                backgroundColor: "var(--toggle-fg-before-hover)",
                width: "281px",
              }}>
        Créer
      </Button>
    </Modal.Footer>
  </Modal>
 );
}

export default CreateExperienceModal;