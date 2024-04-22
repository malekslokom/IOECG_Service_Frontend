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
            resultat_prediction: {"98" : 0.4367, "197" : 0.68367, "296" : 0.65344, "395" : 0.7367, "494" : 0.7567, "593" : 0.87367, "692" : 0.88367, "791" : 0.84367, "890" : 0.87367, "989" : 0.904367, "1088" : 0.824367, "1187" : 0.914367, "1286" : 0.894367, "1385" : 0.924367, "1484" : 0.884367, "1583" : 0.914367, "1682" : 0.904367, "1781" : 0.904367, "1880" : 0.8647907, "1979" : 0.89664367, "2078" : 0.9189664367, "2177" : 0.869664367, "2276" : 0.9089664367, "2375" : 0.9189664367, "2474" : 0.9119664367},
        };
        console.log("newExperience");
        console.log(newExperience);

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