import ListPage from "../../components/ListPage/ListPage";
import ElementsList from "../../components/ElementsList/ElementsLits";
import { useState, useEffect } from "react";
import ConfirmationArchiverModal from "../../components/Modals/ConfirmationArchiverModal";
import {  useNavigate } from "react-router-dom";

const HistoriquePage = () => {

  const navigate = useNavigate();

  const [listRapports, setListRapports] = useState<Rapport[]>([]);
 /* useEffect(() => {
    fetchRapports()
      .then((data) => setListRapport(data))
      .catch((error) => console.error("Error fetching Rapports:", error));
  }, []);  */
  
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [selectedRapport, setSelectedRapport] = useState<number | null>(null);
  const [columns, setColumns] = useState([
    "Nom Rapport",
    "Date Création",
    "Auteur",
    ""
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
  const handleDeleteRapport = (id: number) => {
    setSelectedRapport(id);
    setShowConfirmationModal(true);
    console.log("Rapport à supprimer cliqué");
  };

  const handleConfirmDeleteRapport = async () => {
    if (selectedRapport !== null) {
      //await deleteRapportById(selectedRapport);
      const updatedList = listRapports.filter(rapport => rapport.id_rapport !== selectedRapport);
      /*const updatedList = [...listProjets];
      updatedList.splice(selectedProjet, 1);*/
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
  /*Ouvrir une expérience */
  const handleShowRapport = (id: number) => {
    navigate(`/historique/${id}`);
    console.log("Rapport ouvert");
  };



  return (
    <div>
      <div className="position-relative">
        <div>
          <ListPage
            title="Historiques"
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
              nameModule="rapport"
              elementsList={listRapports}
              onDelete={handleDeleteRapport}
              onShow={handleShowRapport}
            />
          </div>

          <ConfirmationArchiverModal
            isOpen={showConfirmationModal}
            onClose={handleCloseConfirmationModal}
            onConfirm={handleConfirmDeleteRapport}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoriquePage;


