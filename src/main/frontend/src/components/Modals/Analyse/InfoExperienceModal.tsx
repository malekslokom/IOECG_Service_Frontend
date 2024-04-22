import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { fetchModels } from '../../../services/ModelService';
import { fetchDatasets } from '../../../services/DatasetService';

interface infoExperienceProps {
    onClose: () => void;
    experience: Experience | null;
}

const InfoExperienceModal: React.FC<infoExperienceProps> = ({ experience, onClose }) => {
    
    if (experience === null) {
        console.log("Experience inexistante");
        return null; // Ou un composant de remplacement si nécessaire
    }
    
    const [modelsList, setModelsList] = useState<Model[]>([]);
    useEffect(() => {
      fetchModels()
        .then((data) => setModelsList(data))
        .catch((error) => console.error("Error fetching models:", error));
    }, []);
  
  
    const [datasetsList, setDatasetsList] = useState<Dataset[]>([]);
    useEffect(() => {
      fetchDatasets()
        .then((data) => setDatasetsList(data))
        .catch((error) => console.error("Error fetching datasets:", error));
    }, []);
  
    /*const getModelName = (id: number) => {
        // Rechercher le modèle correspondant dans la liste des modèles
        const model = modelsList.find(model => model.id === id);
        console.log(model?.name);
        // Si un modèle correspondant est trouvé, renvoyer son nom, sinon renvoyer une chaîne vide
        return model ? model.name : "";
    };
    
    const getDatasetName = (id: number) => {
        // Rechercher le dataset correspondant dans la liste des datasets
        const dataset = datasetsList.find(dataset => dataset.id_dataset === id);
        console.log(dataset?.name_dataset); 
        // Si un dataset correspondant est trouvé, renvoyer son nom, sinon renvoyer une chaîne vide
        return dataset ? dataset.name_dataset : "";
    };*/

    const getModelNames = (modelIds: number[]): string[] => {
        return modelIds.map(modelId => {
            const model = modelsList.find(model => model.id === modelId);
            return model ? model.name : ""; // Renvoie le nom du modèle ou une chaîne vide si le modèle n'est pas trouvé
        });
    };

    const getDatasetNames = (datasetIds: number[]): string[] => {
    return datasetIds.map(datasetId => {
        const dataset = datasetsList.find(dataset => dataset.id_dataset === datasetId);
        return dataset ? dataset.name_dataset : ""; // Renvoie le nom du dataset ou une chaîne vide si le dataset n'est pas trouvé
    });
};

    return (
        <Modal show onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Informations de l'expérience: {experience.name_experience} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Liste des modèles: {getModelNames(experience.models).join(", ")}</p>
                <p>Liste des datasets: {getDatasetNames(experience.datasets).join(", ")}</p>
                <p>Nom machine: {experience.nom_machine}</p>
                <p>Nombre de GPU: {experience.nb_gpu}</p>
                <p>Nombre de processeurs: {experience.nb_processeurs}</p>
            </Modal.Body>
        </Modal>
    );

};

export default InfoExperienceModal;