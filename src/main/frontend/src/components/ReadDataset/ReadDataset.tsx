import React, { useState,useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ElementsList from '../ElementsList/ElementsLits';
import { useParams } from "react-router-dom";
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import ShowECGModal from '../Modals/ECG/ShowEcgModal';
import { fetchEcgLead } from '../../services/DatasetService';
interface ReadDatasetProps {
  id: number;
  dataset: Dataset;
  ecg: ECG[];
  onClose: () => void;
}

const ReadDataset: React.FC<ReadDatasetProps> = ({ id, dataset, ecg, onClose }) => {
  const [showModal, setShowModal] = useState(false); // État pour contrôler l'affichage du modal
  const [selectedEcg, setSelectedEcg] = useState<PatientEcgData | null>(null);

  const handleShowEcg = (id: number) => {
    if (id) {
      fetchEcgLead(id)
        .then((ecgData) => {
          setSelectedEcg(ecgData); // Mettre à jour les données de l'ECG sélectionné
          setShowModal(true); // Afficher le modal une fois les données récupérées
        })
        .catch((error) => console.error("Error fetching ECG data:", error)); // Gérer les erreurs
    }
    
  };
  
  

  const handleDeleteDataset = () => { };

  const [columns, setColumns] = useState([
    "Poid patient",
    "sexe patient",
    "age patient",
    "race patient",
    "Debut Enregistrement",
    "Fin Enregistrement",
    "dure Enregistrement",
    "Taux echantillonage initial",
    "Taux echantillonage ",
  ]);

  return (
    <>
      <br />
      <div className="header" style={{ backgroundColor: "white" }}>
        <div style={{ color: "var(--primary-text-color)" }} className="d-flex align-items-center justify-content-between">
          <h2> {dataset.name_dataset}</h2>
        </div>
        <br />
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Informations Générales</h5>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Date de création:</strong> {dataset.created_at}</p>
                <p><strong>Type:</strong> {dataset.type_dataset}</p>
                <p><strong>Nom de l'étude:</strong> {dataset.study_name}</p>
                <p><strong>Détails sur l'étude:</strong> {dataset.study_details}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Description:</strong> {dataset.description_dataset}</p>
                <p><strong>Source:</strong> {dataset.source_name}</p>
                <p><strong>Détails sur la source:</strong> {dataset.source_details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Liste des ECG</h5>
          <div className="position-relative">
            <ElementsList
              nameModule="ecg"
              columns={columns}
              elementsList={ecg}
              onShow={handleShowEcg}
              onDelete={handleDeleteDataset}
            />
          </div>
        </div>
      </div>

      {/* Modal pour afficher les détails de l'ECG */}
      <ShowECGModal
        show={showModal}
        onClose={() => setShowModal(false)}
        ecg_lead={selectedEcg} // Passer les données de l'ECG au modal
      />
    </>
  );
};

export default ReadDataset;
