import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


interface CreateExperienceModalProps {
    id_analyse: number; 
    onClose: () => void;
    onCreate: (newExperience: Experience) => void;
    modelsList: Model[];
    datasetsList: Dataset[];
}
const CreateExperienceModal: React.FC<CreateExperienceModalProps> = ({
    id_analyse, 
    onClose,
    onCreate,
    modelsList,
    datasetsList,
}) => {
    
    const [nameExperience, setNameExperience] = useState('');

    const handleCreateExperience = () => {

      //const currentTime = new Date().toLocaleTimeString("fr-FR", { hour12: false });
      //const endTime = new Date(Date.now() + 10000).toLocaleTimeString("fr-FR", { hour12: false });

      const currentTime = new Date().toISOString();
      const endTime = new Date(Date.now() + 10000).toISOString();


        console.log(modelsList);
        console.log(datasetsList);
        const newExperience: Experience = {
            id_analysis_experience: id_analyse,
            name_experience: nameExperience,
            models: modelsList.map(model => model.id), 
            datasets: datasetsList.map(dataset => dataset.id_dataset), 
            nom_machine: "Machine Andy",     //Données statiques
            nb_gpu: 6,           //Données statiques
            nb_processeurs: 4,   //Données statiques
            heure_lancement: currentTime,
            heure_fin_prevu: endTime,
            statut: "En cours",
            resultat_prediction: [],
        };



        onCreate(newExperience);
        setNameExperience('');
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