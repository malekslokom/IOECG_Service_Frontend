import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListPage from "../../../components/ListPage/ListPage";
import ElementsList from "../../../components/ElementsList/ElementsLits";
import ConfirmatioDatasetAnalyseDelete from "../../../components/Modals/ConfirmatioDatasetAnalyseDelete";
import { getDatasetProjetWithFilter } from "../../../services/DatasetProjetService";
import { fetchDatasetProjets } from "../../../services/DatasetProjetService";
import { deleteDatasetAnalyse } from "../../../services/AnalyseService";

interface DatasetProjetProps {
  idProjet: number;
}

const DatasetProjetPage: React.FC<DatasetProjetProps> = ({ idProjet }) => {
  const navigate = useNavigate();
  const [idAnalyse, setIdAnalyse] = useState<number | null>(null);
  const [listDatasets, setListDatasets] = useState<DatasetProjet[]>([]);
  
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
      getDatasetProjetWithFilter(
        filters.startDate,
        filters.endDate,
        filters.searchTerm,
        idProjet
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
  const handleDeleteDataset = (id_dataset: number) => {
    const dataset = listDatasets.find((d) => d.id_dataset === id_dataset);
    if (dataset) {
      setIdAnalyse(
        dataset.id_analysis !== undefined ? dataset.id_analysis : null
      );
      setSelectedDataset(id_dataset);
      setShowConfirmationModal(true);
    }
  };
  
  const handleConfirmDelete = async () => {
    if (selectedDataset !== null && idAnalyse !== null) {
      await deleteDatasetAnalyse(idAnalyse, selectedDataset);
      // Remove the deleted dataset from the state
      setListDatasets((prevDatasets) =>
        prevDatasets.filter((dataset) => dataset.id_dataset !== selectedDataset)
      );
      setShowConfirmationModal(false);
      setSelectedDataset(null);
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
          boutonVisible={false}
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
      <ConfirmatioDatasetAnalyseDelete
        isOpen={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmDelete}
        idProjet={idProjet}
        idAnalyse={idAnalyse ?? 0}
      />
    </div>
  );
};

export default DatasetProjetPage;