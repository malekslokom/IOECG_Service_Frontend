import React, { useState } from "react";
import ElementsList from "../../../components/ElementsList/ElementsLits";
import ListPage from "../../../components/ListPage/ListPage";

function ListEcgPage() {
  const [listEcg, setListEcg] = useState<ECG[]>([
    {
      id:1,
      patientId: 1,
      origineDatasetId: 1,
      filepath: "/chemin/vers/fichier1",
      recordingStartedAt: "15/03/22",
      recordingEndedAt: "20/04/22",
      recordingInitialSamplingRate: 100,
      recordingSamplingRate: 100,
      recordingDuration: 1,
      protocolDetails: "Détails du protocole 1",
      data: []
    },
    {
      id:2,
      patientId: 2,
      origineDatasetId: 1,
      filepath: "/chemin/vers/fichier2",
      recordingStartedAt: "15/03/22",
      recordingEndedAt: "01/04/22",
      recordingInitialSamplingRate: 100,
      recordingSamplingRate: 100,
      recordingDuration: 2,
      protocolDetails: "Détails du protocole 2",
      data: []
    },
    {
      id:3,
      patientId: 3,
      origineDatasetId: 2,
      filepath: "/chemin/vers/fichier3",
      recordingStartedAt: "15/06/22",
      recordingEndedAt: "15/07/22",
      recordingInitialSamplingRate: 200,
      recordingSamplingRate: 200,
      recordingDuration: 3,
      protocolDetails: "Détails du protocole 3",
      data: []
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

  return (
    <div>
      <div className="position-relative">
        <ListPage
          title="ECG"
          bouton="Créer"
          boutonVisible={false}
          onClick={buttonClick}
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
