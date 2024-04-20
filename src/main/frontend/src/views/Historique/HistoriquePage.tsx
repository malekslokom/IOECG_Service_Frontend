import ListPage from "../../components/ListPage/ListPage";
import ElementsList from "../../components/ElementsList/ElementsLits";
import { useState, useEffect } from "react";
import ConfirmationArchiverModal from "../../components/Modals/ConfirmationArchiverModal";
import {  useNavigate } from "react-router-dom";
import { fetchExperiences } from "../../services/HistoriqueService";
import InfoExperienceModal from "../../components/Modals/Analyse/InfoExperienceModal";

const HistoriquePage = () => {

  const [listExperiences, setListExperiences] = useState<Experience[]>([]);
 useEffect(() => {
    fetchExperiences()
      .then((data) => setListExperiences(data))
      .catch((error) => console.error("Error fetching Experiences:", error));
  }, []);  
  
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [showModalInfoExperience, setShowModalInfoExperience] = useState(false);

  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const [columns, setColumns] = useState([
    "Nom Experience",
    "Date Création",
    "Nom Analyse",
    "Nom Projet"
    //"Projet" Analyse, Experience
  ]);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    searchTerm: "",
  });


  /*Actions relatif au modal de création */
  const buttonClick = () => {
    console.log("Bouton cliqué !");
  };

  const handleFilter = (
    startDate: string,
    endDate: string,
    searchTerm: string
  ) => {
    setFilters({ startDate, endDate, searchTerm });
  };

  /*useEffect(() => {
    if (filters.startDate || filters.endDate || filters.searchTerm) {
      getRapportWithFilter(
        filters.startDate,
        filters.endDate,
        filters.searchTerm
      )
        .then(setListRapports)
        .catch((error) => console.error("Error fetching rapports:", error));
    } else {
      fetchRapports()
        .then(setListRapports)
        .catch((error) => console.error("Error fetching rapports:", error));
    }
  }, [filters]); // Écoute les changements de filtres  */


  /*Supprimer un rapport + confirmation*/
  const handleDeleteExperience = (id: number) => {
    setSelectedExperience(id);
    setShowConfirmationModal(true);
    console.log("Experience à supprimer cliqué");
  };

  const handleConfirmDeleteExperience = async () => {
    if (selectedExperience !== null) {
      //await deleteRapportById(selectedExperience);
      const updatedList = listExperiences.filter(exp => exp.id_experience !== selectedExperience);
      /*const updatedList = [...listProjets];
      updatedList.splice(selectedProjet, 1);*/
      setListExperiences(updatedList);

      setSelectedExperience(null);
      setShowConfirmationModal(false);
      console.log("Experience supprimée");
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedExperience(null);
  };


  /*Ouvrir les infos d'une expérience */
  const handleShowExperience = (id_experience: number) => {
    setShowModalInfoExperience(true);

    console.log("Ouverture des infos de l'experience: ", id_experience);
    const experience = listExperiences.find(
      (exp) => exp.id_experience === id_experience
    );
    if (experience && experience.id_experience !== undefined) { 
      setSelectedExperience(experience.id_experience);
    } else {
      setSelectedExperience(null); // Si l'expérience n'est pas trouvée ou si id_experience est undefined, définissez selectedExperience sur null
    }

  console.log("Experience ouverte");
  };

  const handleCloseInfoExperience = () => {
    setShowModalInfoExperience(false);
  };




  return (
    <div>
      <div className="position-relative">
        <div>
          <ListPage
            title="Historique"
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
              columns={columns}
              nameModule="historique"
              elementsList={listExperiences}
              onDelete={handleDeleteExperience}
              onShow={handleShowExperience}
            />
          </div>

          <ConfirmationArchiverModal
            isOpen={showConfirmationModal}
            onClose={handleCloseConfirmationModal}
            onConfirm={handleConfirmDeleteExperience}
          />

        {showModalInfoExperience && (
           <InfoExperienceModal
          experience={listExperiences.find((exp) => exp.id_experience === selectedExperience) || null}
          onClose={handleCloseInfoExperience}
        />
      )}    
        </div>
      </div>
    </div>
  );
};

export default HistoriquePage;


