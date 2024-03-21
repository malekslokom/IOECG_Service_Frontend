import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListPage from "../../../components/ListPage/ListPage";
import ElementsList from "../../../components/ElementsList/ElementsLits";
import ConfirmationArchiverModal from "../../../components/Modals/ConfirmationArchiverModal";
import { fetchDatasets } from "../../../services/DatasetService";

const DatasetProjetPage = () => {
  const navigate = useNavigate();

  const [listDatasets, setListDatasets] = useState<Dataset[]>([]);
  useEffect(() => {
    fetchDatasets()
      .then((data) => setListDatasets(data))
      .catch((error) => console.error("Error fetching datasets:", error));
  }, []);
  const [columns, setColumns] = useState([
    "Nom",
    "Date Création",

    "Auteur",
    "Description",
    "Type",
  ]);
  const [newDatasetSearchModal, setNewDatasetSearchModal] =
    useState<boolean>(false);

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);

  const buttonClick = () => {
    setNewDatasetSearchModal(true);
    console.log("Bouton Créer cliqué !");
  };

  const handleShowDataset = (index: number) => {
    navigate(`/projets/datasets/${index}/ecg`);
    console.log("Dataset ouvert !");
  };

  /*Supprimer un dataset + demande de confirmation */
  const handleDeleteDataset = (index: number) => {
    setSelectedDataset(index);
    setShowConfirmationModal(true);
    console.log("Dataset  cliqué et supprimé");
  };

  const handleConfirmDelete = () => {
    if (selectedDataset !== null) {
      const updatedList = [...listDatasets];
      updatedList.splice(selectedDataset, 1);
      setListDatasets(updatedList);

      setSelectedDataset(null);
      setShowConfirmationModal(false);
      console.log("Dataset supprimé");
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedDataset(null);
  };

  return (
    <div>
      <div className="position-relative">
        <ListPage
          title="Datasets du projet"
          bouton="Créer"
          boutonVisible={true}
          onClick={buttonClick}
        />
        <div
          className="position-absolute"
          style={{ top: "160px", left: 0, width: "100%" }}
        >
          <ElementsList
            nameModule="dataset"
            columns={columns}
            elementsList={listDatasets}
            onShow={handleShowDataset}
            onDelete={handleDeleteDataset}
          />
        </div>
      </div>
      <ConfirmationArchiverModal
        isOpen={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default DatasetProjetPage;
