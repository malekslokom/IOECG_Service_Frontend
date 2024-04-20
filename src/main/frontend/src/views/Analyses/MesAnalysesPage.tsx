import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListPage from "../../components/ListPage/ListPage";
import CreateAnalyseModal from "../../components/Modals/CreateAnalyseModal";
import ElementsList from "../../components/ElementsList/ElementsLits";
import ConfirmationArchiverModal from "../../components/Modals/ConfirmationArchiverModal";
import {
  deleteAnalyseById,
  fetchAnalyses,
  getAnalysesWithFilter,
} from "../../services/AnalyseService";

const MesAnalysesPage = () => {
  const navigate = useNavigate();

  const [listAnalyses, setListAnalyses] = useState<Analyse[]>([]);
  useEffect(() => {
    fetchAnalyses()
      .then((data) => setListAnalyses(data))
      .catch((error) => console.error("Error fetching analyses:", error));
  }, []);

  const [columns, setColumns] = useState([
    "Nom",
    "Date création",
    "Auteur",
    "Description",
    "Nom Projet",
  ]);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    searchTerm: "",
  });
  const [newAnalyseSearchModal, setNewAnalyseSearchModal] =
    useState<boolean>(false);

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [selectedAnalyse, setSelectedAnalyse] = useState<number | null>(null);

  const buttonClick = () => {
    setNewAnalyseSearchModal(true);
    console.log("Bouton Créer cliqué !");
  };

  const handleShowAnalyse = (index: number) => {
   //navigate(`/projets/analyses/${index}`);
    navigate(`/projets/1/analyses/${index}`);
    console.log("Analyse ouverte !");
  };
  const handleFilter = (
    startDate: string,
    endDate: string,
    searchTerm: string
  ) => {
    setFilters({ startDate, endDate, searchTerm });
  };
  /*Supprimer un Analyse + demande de confirmation */
  const handleDeleteAnalyse = (index: number) => {
    setSelectedAnalyse(index);
    setShowConfirmationModal(true);
    console.log("Analyse  cliqué et supprimé");
  };

  const handleConfirmDelete = async () => {
    if (selectedAnalyse !== null) {
      /*const updatedList = [...listAnalyses];
      updatedList.splice(selectedAnalyse, 1);*/
      await deleteAnalyseById(selectedAnalyse);
      const updatedList = listAnalyses.filter(analyse => analyse.id_analysis !== selectedAnalyse);
      setListAnalyses(updatedList);

      setSelectedAnalyse(null);
      setShowConfirmationModal(false);
      console.log("Analyse supprimé");
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedAnalyse(null);
  };
  useEffect(() => {
    if (filters.startDate || filters.endDate || filters.searchTerm) {
        getAnalysesWithFilter(
        filters.startDate,
        filters.endDate,
        filters.searchTerm
      )
        .then(setListAnalyses)
        .catch((error) => console.error("Error fetching Analyses:", error));
    } else {
      fetchAnalyses()
        .then(setListAnalyses)
        .catch((error) => console.error("Error fetching Analyses:", error));
    }
  }, [filters]);
  return (
    <div>
      <div className="position-relative">
        <ListPage
          title="Mes Analyses"
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
            nameModule="mesAnalyses"
            columns={columns}
            elementsList={listAnalyses}
            onShow={handleShowAnalyse}
            onDelete={handleDeleteAnalyse}
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

export default MesAnalysesPage;
