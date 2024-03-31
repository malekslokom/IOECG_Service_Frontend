import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListPage from "../../../components/ListPage/ListPage";
import ElementsList from "../../../components/ElementsList/ElementsLits";
import ConfirmationArchiverModal from "../../../components/Modals/ConfirmationArchiverModal";
import { getDatasetsWithFilter } from "../../../services/DatasetService";
import { fetchDatasetProjets } from "../../../services/DatasetProjetService";

interface DatasetProjetProps {
  idProjet: number;
}
const DatasetProjetPage: React.FC<DatasetProjetProps> = ({ idProjet }) => {
  const navigate = useNavigate();

  const [listDatasets, setListDatasets] = useState<Dataset[]>([]);
  useEffect(() => {
    fetchDatasetProjets(idProjet)
      .then((data) => setListDatasets(data))
      .catch((error) => console.error("Error fetching datasets:", error));
  }, []);

  const [columns, setColumns] = useState([
    "Date création",
    "Nom",
    "Description",
    "Nom étude",
    "Nom source",
  ]);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    searchTerm: "",
  });
  const [newDatasetSearchModal, setNewDatasetSearchModal] =
    useState<boolean>(false);

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);
  useEffect(() => {
    if (filters.startDate || filters.endDate || filters.searchTerm) {
      getDatasetsWithFilter(
        filters.startDate,
        filters.endDate,
        filters.searchTerm
      )
        .then(setListDatasets)
        .catch((error) => console.error("Error fetching dataset", error));
    } else {
      fetchDatasetProjets(idProjet)
        .then(setListDatasets)
        .catch((error) => console.error("Error fetching datasets:", error));
    }
  }, [filters]);
  const buttonClick = () => {
    setNewDatasetSearchModal(true);
    console.log("Bouton Créer cliqué !");
  };

  const handleShowDataset = (index: number) => {
    navigate(`/projets/datasets/${index}/ecg`);
    console.log("Dataset ouvert !");
  };

  const handleFilter = (
    startDate: string,
    endDate: string,
    searchTerm: string
  ) => {
    setFilters({ startDate, endDate, searchTerm });
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
          onFilter={handleFilter}
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
