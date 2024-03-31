import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListPage from "../../../components/ListPage/ListPage";
import ElementsList from "../../../components/ElementsList/ElementsLits";
import CreateAnalyseModal from "../../../components/Modals/CreateAnalyseModal";
import ConfirmationArchiverModal from "../../../components/Modals/ConfirmationArchiverModal";
import {
  fetchAnalyseProjets,
  getAnalyseProjetWithFilter,
} from "../../../services/AnalyseProjetService";
interface AnalyseProjetProps {
  idProjet: number;
}
const AnalyseProjetPage: React.FC<AnalyseProjetProps> = ({ idProjet }) => {
  const [listAnalyses, setListAnalyses] = useState<Analyse[]>([]);

  useEffect(() => {
    fetchAnalyseProjets(idProjet)
      .then((data) => setListAnalyses(data))
      .catch((error) => console.error("Error fetching analyses:", error));
  }, []);

  const [columns, setColumns] = useState([
    "Nom",
    "Date Création",
    "Auteur",
    "Description",
  ]);

  const [newAnalyseModal, setNewAnalyseModal] = useState<boolean>(false);

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [selectedAnalyse, setSelectedAnalyse] = useState<number | null>(null);

  const navigate = useNavigate();

  /*Actions relatif au modal de création: ouverture et fermeture du modal */
  const buttonClick = () => {
    setNewAnalyseModal(true);
    console.log("Bouton Ajouter cliqué !");
  };

  const handleCreateAnalyse = (newAnalyse: Analyse) => {
    console.log("Nouvelle analyse créée:", newAnalyse);
    setListAnalyses([...listAnalyses, newAnalyse]);
  };

  const handleCloseModal = () => {
    setNewAnalyseModal(false);
  };

  /*Ouvrir une analyse */
  const handleShowAnalyse = (index: number) => {
    navigate(`/projets/${index}/analyses/`);
    console.log("Analyse ouverte");
  };

  /*Supprimer une analyse + demande de confirmation */
  const handleDeleteAnalyse = (index: number) => {
    setSelectedAnalyse(index);
    setShowConfirmationModal(true);
    console.log("Analyse cliquée et supprimée");
  };

  const handleConfirmDelete = () => {
    if (selectedAnalyse !== null) {
      const updatedList = [...listAnalyses];
      updatedList.splice(selectedAnalyse, 1);
      setListAnalyses(updatedList);

      setSelectedAnalyse(null);
      setShowConfirmationModal(false);
      console.log("Analyse supprimée");
    }
  };
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    searchTerm: "",
  });
  const handleFilter = (
    startDate: string,
    endDate: string,
    searchTerm: string
  ) => {
    setFilters({ startDate, endDate, searchTerm });
  };
  useEffect(() => {
    if (filters.startDate || filters.endDate || filters.searchTerm) {
      getAnalyseProjetWithFilter(
        filters.startDate,
        filters.endDate,
        filters.searchTerm,
        idProjet
      )
        .then(setListAnalyses)
        .catch((error) => console.error("Error fetching analyses", error));
    } else {
      fetchAnalyseProjets(idProjet)
        .then(setListAnalyses)
        .catch((error) => console.error("Error fetching analyses:", error));
    }
  }, [filters]);
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedAnalyse(null);
  };

  return (
    <div>
      <div className="position-relative">
        <ListPage
          title="Analyses"
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
            nameModule="analyse"
            columns={columns}
            elementsList={listAnalyses}
            onShow={handleShowAnalyse}
            onDelete={handleDeleteAnalyse}
          />
        </div>
      </div>
      {newAnalyseModal && (
        <CreateAnalyseModal
          onClose={handleCloseModal}
          onCreate={handleCreateAnalyse}
        />
      )}
      <ConfirmationArchiverModal
        isOpen={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AnalyseProjetPage;
