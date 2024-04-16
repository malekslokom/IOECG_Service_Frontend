import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface infoExperienceProps {
    onClose: () => void;
    experience: Experience;
}

const InfoExperienceModal: React.FC<infoExperienceProps> = ({ experience, onClose }) => {
    return (
        <Modal show onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Informations de l'expérience: {experience.name_experience} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Liste des modèles: {experience.models.join(", ")}</p>
                <p>Liste des datasets: {experience.datasets.join(", ")}</p>
                <p>Nom machine: {experience.nom_machine}</p>
                <p>Nombre de GPU: {experience.nb_gpu}</p>
                <p>Nombre de processeurs: {experience.nb_processeurs}</p>
            </Modal.Body>
        </Modal>
    );

};

export default InfoExperienceModal;