import React, { useState } from "react";
import ElementsList from "../../../components/ElementsList/ElementsLits";
import ListPage from "../../../components/ListPage/ListPage";

function ListEcgPage() {
  const [listEcg, setListEcg] = useState<ECG[]>([
    {
      id:1,
      id_patient: 1,
      origin_dataset: 1,
      filepath: "/chemin/vers/fichier1",
      patient_weight: "68",
      patient_sex: 'F',
      patient_age: 32,
      patient_race: "French",
      recording_started_at: "15/03/22",
      recording_ended_at: "20/04/22",
      recording_initial_sampling_rate: 100,
      recording_sampling_rate: 100,
      recording_duration: 1,
      protocol_details: "Détails du protocole 1",
      data: []
    },
    {
      id:2,
      id_patient: 2,
      origin_dataset: 1,
      patient_weight: "70",
      patient_sex: 'M',
      patient_age: 46,
      patient_race: "American",
      filepath: "/chemin/vers/fichier2",
      recording_started_at: "15/03/22",
      recording_ended_at: "01/04/22",
      recording_initial_sampling_rate: 100,
      recording_sampling_rate: 100,
      recording_duration: 2,
      protocol_details: "Détails du protocole 2",
      data: []
    },
    {
      id: 3,
      id_patient: 3,
      origin_dataset: 2,
      filepath: "/chemin/vers/fichier3",
      recording_started_at: "15/06/22",
      recording_ended_at: "15/07/22",
      recording_initial_sampling_rate: 200,
      recording_sampling_rate: 200,
      recording_duration: 3,
      protocol_details: "Détails du protocole 3",
      data: [],
      patient_weight: "60",
      patient_sex: "F",
      patient_age: 24,
      patient_race: "Indian"
    },
  ]);

  const [columns, setColumns] = useState([
    "patientId",
    "origineDatasetId",
    "filepath",
    "recordingStartedAt",
    "recordingEndedAt",
    "recordingInitialSamplingRate",
    "recordingSamplingRate",
    "recordingDuration",
    "protocolDetails",
  ]);

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [selectedEcg, setSelectedEcg] = useState<number | null>(null);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    searchTerm: "",
  }); 
  
  const buttonClick = () => {
    console.log("Bouton cliqué !");
  };

  const handleShowEcg = (index: number) => {
    console.log("Ecg ouvert !");
  };

  /*Supprimer un ECG + confirmation*/
  const handleDeleteEcg = (index: number) => {
    setSelectedEcg(index);
    setShowConfirmationModal(true);
    console.log("Ecg  cliqué et supprimé");
  };

  const handleConfirmDeleteEcg = () => {
    if (selectedEcg !== null) {
      const updatedList = [...listEcg];
      updatedList.splice(selectedEcg, 1);
      setListEcg(updatedList);

      setSelectedEcg(null);
      setShowConfirmationModal(false);
      console.log("Ecg supprimé");
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedEcg(null);
  };

  const handleFilter = (
    startDate: string,
    endDate: string,
    searchTerm: string
  ) => {
    setFilters({ startDate, endDate, searchTerm });
  };

  return (
    <div>
      <div className="position-relative">
        <ListPage
          title="ECG"
          bouton="Créer"
          boutonVisible={false}
          onClick={buttonClick}
          onFilter={handleFilter}
        />
        <div
          className="position-absolute"
          style={{ top: "160px", left: 0, width: "100%" }}
        >
          <ElementsList
            nameModule="ecg"
            columns={columns}
            elementsList={listEcg}
            onDelete={handleDeleteEcg}
            onShow={handleShowEcg}
          />
        </div>
      </div>
    </div>
  );
}

export default ListEcgPage;
