import ListPage from "../../../components/ListPage/ListPage";
import ElementsList from "../../../components/ElementsList/ElementsLits";
import { useState, useEffect } from "react";
import ConfirmationArchiverModal from "../../../components/Modals/ConfirmationArchiverModal";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRapportById, fetchRapportForProject } from "../../../services/RapportService";
import { deleteExperienceById } from "../../../services/ExperienceService";
interface RapportProjetProps {
  idProjet: number;
}

const RapportProjetPage: React.FC<RapportProjetProps> = ({ idProjet }) => {
  const navigate = useNavigate();

  const [listRapports, setListRapports] = useState<Rapport[]>([]);
  useEffect(() => {
  fetchRapportForProject(idProjet)
    .then((data)=> setListRapports(data))
    .catch((error) => console.error("Error fetching rapports:", error));
}, []);
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

  


  const [columns, setColumns] = useState([
    "Nom ",
    "Date Creation",
    "Nom Analyse" //"Analyse"
  ]);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    searchTerm: "",
  });

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [selectedRapport, setSelectedRapport] = useState<number | null>(null);

  const buttonClick = () => {
    console.log("Bouton cliqué !");
  };

  function handleOpenRapport(index: number): void {
    navigate(`/projets/${idProjet}/rapports/${index}`);
    console.log("Rapport ouvert");
  }

  /*Supprimer un rapporRapport + confirmation*/
  const handleDeleteRapport = (index: number) => {
    setSelectedRapport(index);
    setShowConfirmationModal(true);
    console.log("Rapport cliqué , pas encore supprimé");
  };

  const handleConfirmDeleteRapport = async () => {
    if (selectedRapport !== null) {
      const rapportToDelete = listRapports.find(rapport => rapport.id_rapport === selectedRapport);
      const idExperience = rapportToDelete?.id_experience_rapport  //Le "?" est dans le cas où rapportTodelte est undefined

      await deleteRapportById(selectedRapport);
      const updatedList = listRapports.filter(rapport => rapport.id_rapport !== selectedRapport)
      setListRapports(updatedList);
      console.log("Rapport supprimé");

       /*Si on supprime un rapport , il faut supprimer son expérience */
      if (idExperience!==undefined){
          await deleteExperienceById(idExperience);
          console.log("L'experience associé au rapport supprimée")
      }
      else {
        console.log("id_experience_rapport est indéfini");
      }
      
      setSelectedRapport(null);
      setShowConfirmationModal(false);
    }
  };


  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedRapport(null);
  };

  const handleFilter = (
    startDate: string,
    endDate: string,
    searchTerm: string
  ) => {
    setFilters({ startDate, endDate, searchTerm });
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
          onFilter={handleFilter}
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
            onShow={handleOpenRapport}
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
