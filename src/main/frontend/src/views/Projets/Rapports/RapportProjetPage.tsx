import ListPage from "../../../components/ListPage/ListPage";
import ElementsList from "../../../components/ElementsList/ElementsLits";
import { useState } from "react";
import ConfirmationArchiverModal from "../../../components/Modals/ConfirmationArchiverModal";
import { useNavigate } from "react-router-dom";

const RapportProjetPage = () => {
  const navigate = useNavigate();

  /*
    {
      dateCreation: "09/03/2024",
      nom: "Rapport 1",
      modeles: ["Modèle A ", "Modèle B "],
      datasets: ["Dataset 1 ", "Dataset 2 "],
    },
    {
      dateCreation: "04/03/2024",
      nom: "Rapport 2",
      modeles: ["Modèle C ", "Modèle D "],
      datasets: ["Dataset 3 ", "Dataset 4 "],
    },
    {
      dateCreation: "11/03/2024",
      nom: "Rapport 3",
      modeles: ["Modèle E ", "Modèle F "],
      datasets: ["Dataset 5 ", "Dataset 6 "],
    },
  */

  const [listRapports, setListRapports] = useState<Rapport[]>([]);
  const [columns, setColumns] = useState([
    "Nom Rapport",
    "DateCreation",
  ]);

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [selectedRapport, setSelectedRapport] = useState<number | null>(null);

  const buttonClick = () => {
    console.log("Bouton cliqué !");
  };

  function onShow(index: number): void {
    navigate("projets/rapports/${index}");
    console.log("Rapport ouvert");
  }

  /*Supprimer un rapporRapport + confirmation*/
  const handleDeleteRapport = (index: number) => {
    setSelectedRapport(index);
    setShowConfirmationModal(true);
    console.log("Rapport cliqué et supprimé");
  };

  const handleConfirmDeleteRapport = () => {
    if (selectedRapport !== null) {
      const updatedList = [...listRapports];
      updatedList.splice(selectedRapport, 1);
      setListRapports(updatedList);

      setSelectedRapport(null);
      setShowConfirmationModal(false);
      console.log("Rapport supprimé");
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedRapport(null);
  };

  return (
    <div>
      <div className="position-relative">
        {/*<ListProjets projects={projects}  />*/}
        <ListPage
          title="Rapports"
          bouton="Créer"
          boutonVisible={false}
          onClick={buttonClick}
        />
        <div
          className="position-absolute"
          style={{ top: "160px", left: 0, width: "100%" }}
        >
          <ElementsList
            nameModule="rapport"
            columns={columns}
            elementsList={listRapports}
            onDelete={handleDeleteRapport}
            onShow={onShow}
          />
        </div>
      </div>

      <ConfirmationArchiverModal
        isOpen={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmDeleteRapport}
      />
    </div>
  );
};

export default RapportProjetPage;
