import "./ListProjetsPage.css";
import ListPage from "../../../components/ListPage/ListPage";
import ElementsList from "../../../components/ElementsList/ElementsLits";
import { useState, useEffect } from "react";
import CreateProjetModal from "../../../components/Modals/CreateProjetModal";
import { fetchProjets } from "../../../services/ProjetService";
import ConfirmationArchiverModal from "../../../components/Modals/ConfirmationArchiverModal";
import { useNavigate } from "react-router-dom";

const ListProjetsPage = () => {
  const navigate = useNavigate();

  const [listProjets, setListProjets] = useState<Projet[]>([]);
  useEffect(() => {
    fetchProjets()
      .then((data) => setListProjets(data))
      .catch((error) => console.error("Error fetching analyses:", error));
  }, []);

  const [columns, setColumns] = useState([
    "Nom",
    "Date Création",
    "Auteur",
    "Version",
    "Type",
  ]);

  const [newProjetModal, setNewProjetModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [selectedProjet, setSelectedProjet] = useState<number | null>(null);

  useEffect(() => {
    fetchProjets()
      .then((data) => setListProjets(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  /*Actions relatif au modal de création */
  const buttonClick = () => {
    setNewProjetModal(true);
    console.log("Bouton Ajouter cliqué !");
  };

  const handleCreateProjet = (newProjet: Projet) => {
    console.log("Nouveau projet créé:", newProjet);
    setListProjets([...listProjets, newProjet]);
  };

  const handleCloseModal = () => {
    setNewProjetModal(false);
  };
  /*Supprimer un projet + confirmation*/
  const handleDeleteProjet = (index: number) => {
    setSelectedProjet(index);
    setShowConfirmationModal(true);
    console.log("Projet cliqué et supprimé");
  };

  const handleConfirmDeleteProjet = () => {
    if (selectedProjet !== null) {
      const updatedList = [...listProjets];
      updatedList.splice(selectedProjet, 1);
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
  const handleShowProjet = (index: number) => {
    console.log(index);
    let id = index + 1;
    navigate(`/projets/${id}`);
    console.log("Projet ouverte");
  };
  return (
    <div>
      <div className="position-relative">
        {/*<ListProjets projects={projects}  />*/}
        <ListPage
          title="Projets"
          bouton="Créer"
          boutonVisible={true}
          onClick={buttonClick}
        />
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
  );
};

export default ListProjetsPage;
