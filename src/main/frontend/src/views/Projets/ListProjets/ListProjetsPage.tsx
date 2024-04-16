import "./ListProjetsPage.css";
import ListPage from "../../../components/ListPage/ListPage";
import ElementsList from "../../../components/ElementsList/ElementsLits";
import { useState, useEffect } from "react";
import CreateProjetModal from "../../../components/Modals/CreateProjetModal";
import {
  fetchProjets,
  getProjectWithFilter,
  createProject,
  deleteProjectById,
} from "../../../services/ProjetService";
import ConfirmationArchiverModal from "../../../components/Modals/ConfirmationArchiverModal";
import { useNavigate } from "react-router-dom";

const ListProjetsPage = () => {
  const navigate = useNavigate();

  const [listProjets, setListProjets] = useState<Projet[]>([]);
  useEffect(() => {
    fetchProjets()
      .then((data) => setListProjets(data))
      .catch((error) => console.error("Error fetching projets:", error));
  }, []);

  const [columns, setColumns] = useState([
    "Nom",
    "Date Création",
    "Description",
    "Auteur",
    "Version",
    "Type",
  ]);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    searchTerm: "",
  });
  const [newProjetModal, setNewProjetModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [selectedProjet, setSelectedProjet] = useState<number | null>(null);

  useEffect(() => {
    if (filters.startDate || filters.endDate || filters.searchTerm) {
      getProjectWithFilter(
        filters.startDate,
        filters.endDate,
        filters.searchTerm
      )
        .then(setListProjets)
        .catch((error) => console.error("Error fetching projects:", error));
    } else {
      fetchProjets()
        .then(setListProjets)
        .catch((error) => console.error("Error fetching projects:", error));
    }
  }, [filters]); // Écoute les changements de filtres

  const handleFilter = (
    startDate: string,
    endDate: string,
    searchTerm: string
  ) => {
    setFilters({ startDate, endDate, searchTerm });
  };

  /*Actions relatif au modal de création */
  const buttonClick = () => {
    setNewProjetModal(true);
    console.log("Bouton Ajouter cliqué !");
  };

  const handleCreateProjet = async (newProjet: Projet) => {
    console.log("Nouveau projet créé:", newProjet);
    const createdProjet = await createProject(newProjet);
    console.log("Projet créé avec succès:", createdProjet);
    setListProjets([...listProjets, newProjet]);
  };

  const handleCloseModal = () => {
    setNewProjetModal(false);
  };
  /*Supprimer un projet + confirmation*/
  const handleDeleteProjet = (id: number) => {
    setSelectedProjet(id);
    setShowConfirmationModal(true);
    console.log("Projet à supprimer cliqué");
  };

  const handleConfirmDeleteProjet = async () => {
    if (selectedProjet !== null) {
      await deleteProjectById(selectedProjet);
      const updatedList = listProjets.filter(
        (projet) => projet.id_project !== selectedProjet
      );
      /*const updatedList = [...listProjets];
      updatedList.splice(selectedProjet, 1);*/
      setListProjets(updatedList);

      setSelectedProjet(null);
      setShowConfirmationModal(false);
      console.log("Projet supprimé");
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedProjet(null);
  };
  /*Ouvrir une analyse */
  const handleShowProjet = (id: number) => {
    navigate(`/projets/${id}`);
    console.log("Projet ouvert");
  };
  return (
    <div>
      <div className="position-relative">
        <div>
          <ListPage
            title="Projets"
            bouton="Créer"
            boutonVisible={true}
            onClick={buttonClick}
            onFilter={handleFilter}
          />
          <hr style={{ color: "#555" }} />
          <div
            className="position-absolute"
            style={{ top: "160px", left: 0, width: "100%" }}
          >
            <ElementsList
              columns={columns}
              nameModule="projet"
              elementsList={listProjets}
              onDelete={handleDeleteProjet}
              onShow={handleShowProjet}
            />
          </div>

          {newProjetModal && (
            <CreateProjetModal
              onClose={handleCloseModal}
              onCreate={handleCreateProjet}
            />
          )}
          <ConfirmationArchiverModal
            isOpen={showConfirmationModal}
            onClose={handleCloseConfirmationModal}
            onConfirm={handleConfirmDeleteProjet}
          />
        </div>
      </div>
    </div>
  );
};

export default ListProjetsPage;
