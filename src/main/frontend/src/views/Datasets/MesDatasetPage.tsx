import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListPage from "../../components/ListPage/ListPage";
import ElementsList from "../../components/ElementsList/ElementsLits";
import ConfirmationArchiverModal from "../../components/Modals/ConfirmationArchiverModal";
import {
  addDataset,
  fetchDatasets,
  getDatasetsWithFilter,
} from "../../services/DatasetService";
import ImportDatasetModel from "../../components/Modals/Datasets/ImportDatasetModel";

const MesDatasetPage = () => {
  const navigate = useNavigate();

  const [listDatasets, setListDatasets] = useState<Dataset[]>([]);
  useEffect(() => {
    fetchDatasets()
      .then((data) => setListDatasets(data))
      .catch((error) => console.error("Error fetching datasets:", error));
  }, []);

  const [columns, setColumns] = useState([
    "Nom",
    "Date création",
    "Description",
    "Nom étude",
    "Nom source",
  ]);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    searchTerm: "",
  });
  const [importDataset, setImportDataset] = useState<boolean>(false);

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);

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
  useEffect(() => {
    if (filters.startDate || filters.endDate || filters.searchTerm) {
      getDatasetsWithFilter(
        filters.startDate,
        filters.endDate,
        filters.searchTerm
      )
        .then(setListDatasets)
        .catch((error) => console.error("Error fetching datasets:", error));
    } else {
      fetchDatasets()
        .then(setListDatasets)
        .catch((error) => console.error("Error fetching datasets:", error));
    }
  }, [filters]);
  const handleCloseImportModal = () => {
    setImportDataset(false);
  };
  const handleImportDatasetModal = async (dataset: Dataset) => {
    const newDataset = await addDataset(dataset);
    setListDatasets([...listDatasets, newDataset]);
  };
  const handleImportDataset = () => {
    setImportDataset(true);
    console.log("Bouton Ajouter cliqué !");
  };
  return (
    <div>
      <div className="position-relative">
        <ListPage
          title="Mes Datasets"
          bouton="Créer"
          boutonVisible={true}
          onClick={handleImportDataset}
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
      {importDataset && (
        <ImportDatasetModel
          onCreate={handleImportDatasetModal}
          onClose={handleCloseImportModal}
        />
      )}
    </div>
  );
};

export default MesDatasetPage;
