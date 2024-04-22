import React, { useState, useEffect } from "react";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import "./ElementLists.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchAnalyses } from "../../services/AnalyseService";
import { fetchProjets } from "../../services/ProjetService";
import { fetchExperiences } from "../../services/HistoriqueService";
interface ListProps {
  nameModule: string;
  columns: string[];
  elementsList: any[];
  onDelete: (index: number) => void;
  onShow: (index: number) => void;
  listRaport?: number[]
}

const ElementsList: React.FC<ListProps> = ({
  nameModule,
  columns,
  elementsList,
  onShow,
  onDelete,
}) => {
  const [selectedReports, setSelectedReports] = useState<number[]>([]);
  const elementsPerPage = 15; // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(0); // React Paginate utilise un index basé sur 0
  const onPageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const paginatedElements = elementsList.slice(
    currentPage * elementsPerPage,
    (currentPage + 1) * elementsPerPage
  );


  const [analysesList, setAnalysesList] = useState<Analyse[]>([]);
  useEffect(() => {
    fetchAnalyses()
      .then((data) => setAnalysesList(data))
      .catch((error) => console.error("Error fetching analyses:", error));
  }, []);

  const [projetsList, setProjetsList] = useState<Projet[]>([]);
  useEffect(() => {
    fetchProjets()
      .then((data) => setProjetsList(data))
      .catch((error) => console.error("Error fetching projets:", error));
  }, []);


  const [experiencesList, setExperiencesList] = useState<Experience[]>([]);
  useEffect(() => {
    fetchExperiences()
      .then((data) => setExperiencesList(data))
      .catch((error) => console.error("Error fetching experiences:", error));
  }, []);


  const getAnalyseName = (id: number) => {
    // Rechercher l'analyse correspondante dans la liste des analyses
    const analyse = analysesList.find(analyse => analyse.id_analysis === id);
    // Si une analyse correspondante est trouvée, renvoyer son nom, sinon renvoyer une chaîne vide
    return analyse ? analyse.name_analysis : "";
  };

  const getProjectName = (id: number) => {
    // Rechercher le projet correspondant dans la liste des projets
    const project = projetsList.find(project => project.id_project === id);
    // Si un projet correspondant est trouvé, renvoyer son nom, sinon renvoyer une chaîne vide
    return project ? project.name_project : "" ; 
  };
  
  /*const toggleReportSelection = (id: number) => {
    console.log(selectedReports)
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter(reportId => reportId !== id));
      
    } else {
      if (selectedReports.length < 2) {
        setSelectedReports([...selectedReports, id]);
      } else {
        console.log("Vous ne pouvez sélectionner que jusqu'à deux rapports.");
      }
    }
   
  };  */

  return (
    <div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {paginatedElements.map((item, index) => ( */}

            {paginatedElements.map((item, index) => {
              // Déterminer la clé en fonction du module
              let key;
              switch (nameModule) {
                case "analyse":
                case "mesAnalyses":
                  key = `analyse-${item.id_analysis}`; // Utiliser id_analysis pour les modules d'analyse
                  break;
                case "projet":
                  key = `projet-${item.id_project}`; // Utiliser id_project pour les modules de projet
                  break;
                case "dataset":
                  key = `dataset-${item.id_dataset}`; // Utiliser id_dataset pour les modules de dataset
                  break;
                case "experience":
                  key = `experience-${item.id_experience}`; // Utiliser id_experience pour les modules d'expérience
                  break;
                case "rapport":
                  key = `rapport-${item.id_rapport}`; // Utiliser id_rapport pour les modules de rapport
                  break;
                case "ecg":
                    key = `ecg-${item.id_ecg}`; // Utiliser id_rapport pour les modules de rapport
                    break;
                default:
                  key = `default-${index}`; // Utiliser l'index comme fallback
                  break;
              }return (
              <tr
                key={
                  item.id_project ||
                  item.id_analysis ||
                  item.id_dataset ||
                  item.id_experience ||
                  item.id_rapport ||
                  item.id||item.id_ecg ||
                  index
                }
              >
                {nameModule == "analyse" && (
                  <>
                    <td>{item.name_analysis}</td>
                    <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                    <td>{item.created_by}</td>
                    <td>{item.description_analysis}</td>
                    <td></td>
                  </>
                )}
                {nameModule == "mesAnalyses" && (
                  <>
                    <td>{item.name_analysis}</td>
                    <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                    <td>{item.created_by}</td>
                    <td>{item.description_analysis}</td>
                    <td>{getProjectName(item.id_project)}</td>
                    <td></td>
                  </>
                )}
                {nameModule == "projet" && (
                  <>
                    <td>{item.name_project}</td>
                    <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                    <td>{item.description_project}</td>
                    <td>{item.created_by}</td>
                    <td>{item.type_project}</td>
                    <td></td>
                  </>
                )}
                {nameModule == "dataset" && (
                  <>
                    <td>{item.name_dataset}</td>
                    <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                    <td>{item.description_dataset}</td>
                    <td>{item.study_name}</td>
                    <td>{item.source_name}</td>
                  </>
                )}

                {nameModule === "ecg" && (
                  <>
                    <td>{item.patient_weight}</td>
                    <td>{item.patient_sex}</td>
                    <td>{item.patient_age}</td>
                    <td>{item.patient_race}</td>
                    <td>{item.recording_started_at}</td>
                    <td>{item.recording_ended_at}</td>
                    <td>{item.recording_ended_at}</td>
                    <td>{item.recording_initial_sampling_rate}</td>
                    <td>{item.recording_sampling_rate}</td>
                  
                  </>
                 )}

                {nameModule == "rapport" && (
                  <>
                    <td>{item.name_rapport}</td>
                    <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                    <td> {/* On récupère l'experience correspondante dans la liste des experience */}
                          {item.id_experience_rapport && experiencesList.find(exp => exp.id_experience === item.id_experience_rapport)?
                           // Si experience trouvée, obtenir id de l'analyse en utilisant la lste des experiences et ainsi récupérer le nom de l'analyse
                          getAnalyseName(experiencesList.find(exp => exp.id_experience === item.id_experience_rapport)?.id_analysis_experience || 0)
                          : "" /* Si aucune analyse correspondante n'est trouvée, afficher une chaîne vide */}
                    </td>
                  </>
                )}

                {nameModule == "experienceAnalyse" && (
                  <>
                    <td>{item.name_experience}</td>
                    <td>{moment(item.heure_lancement,"HH:mm:ss").format("HH:mm:ss")}</td>
                    <td>{moment(item.heure_fin_prevu,"HH:mm:ss").format("HH:mm:ss")}</td>
                    <td> 
                          {item.statut === "En cours" && (
                              <img
                                src="/assets/statut-en-cours.svg"
                                alt="En cours"
                              />
                            )}
                            {item.statut === "Terminé" && (
                              <img
                                src="/assets/statut-termine.svg"
                                alt="Terminé"
                              />
                            )}
                    </td>
                    <td></td>
                  </>
                )}

                {nameModule == "historique" && (
                  <>
                    <td>{item.name_experience}</td>
                    <td>{moment(item.heure_lancement).format("DD-MM-YYYY")}</td>
                    <td>{getAnalyseName(item.id_analysis_experience)}</td>
                    <td>   {/* On récupère l'analyse correspondante dans la liste des analyses */}
                          {item.id_analysis_experience && analysesList.find(analysis => analysis.id_analysis === item.id_analysis_experience)?
                           // Si analyse trouvée, obtenir id du projet pour récupérer le nom du projet
                          getProjectName(analysesList.find(analysis => analysis.id_analysis === item.id_analysis_experience)?.id_project || 0)
                          : "" /* Si aucune analyse correspondante n'est trouvée, afficher une chaîne vide */}</td>
                  </>
                )}  

                <td>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() =>
                      onShow(
                        item.id_analysis ||
                        item.id_project ||
                          
                          item.id_dataset ||
                          item.id_experience ||
                          item.id_rapport ||
                          item.id_ecg ||
                          item.id
                          
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />
                </td>
                
                { /* <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() =>
                      onDelete(
                        item.id_project ||
                          item.id_analysis ||
                          item.id_dataset ||
                          item.id_experience ||
                          index
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />*/}
          {/* {nameModule != "ecg" && nameModule != "rapportAnalyse" && nameModule != "experienceAnalyse" && ( */}
            {nameModule != "ecg" && 
            nameModule != "rapportAnalyse" &&  
            nameModule != "experienceAnalyse" && 
            nameModule != "historique" && 
            (
                  <td>
                   <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => {
                      let idToDelete;
                      switch (nameModule) {
                        case "analyse":
                          idToDelete = item.id_analysis;
                          break;
                        case "mesAnalyses":
                          idToDelete = item.id_analysis;
                          break;
                        case "projet":
                          idToDelete = item.id_project;
                          break;
                        case "dataset":
                          idToDelete = item.id_dataset;
                          break;
                        case "experience":
                          idToDelete = item.id_experience;
                          break;
                        case "rapport":
                          idToDelete = item.id_rapport;
                          break;
                        default:
                          console.error(
                            "Module type not recognized for deletion"
                          );
                          return;
                      }
                      onDelete(idToDelete);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              )}
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={"«"}
        nextLabel={"»"}
        breakLabel={"..."}
        pageCount={Math.ceil(elementsList.length / elementsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName={"pagination justify-content-end"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default ElementsList;
