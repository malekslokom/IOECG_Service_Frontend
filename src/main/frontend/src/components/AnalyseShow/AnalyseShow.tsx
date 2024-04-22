import { faEye, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AnalyseDatsetModal from "../Modals/Analyse/AnalyseDatsetModal";
import AnalyseSearchDatsetModal from "../Modals/Analyse/AnalyseSearchDatsetModal";
import { useParams, useNavigate } from "react-router-dom";
import ElementsList from "../ElementsList/ElementsLits";
import CreateExperienceModal from "../Modals/Analyse/CreateExperienceModal";
import InfoExperienceModal from "../Modals/Analyse/InfoExperienceModal";
import ConfirmationArchiverModal from "../Modals/ConfirmationArchiverModal";
import ReportComparisonModal from "../Rapport/ReportComparisonModals";

import {
  fetchExperienceForAnalysis,
  createExperience,
  updateExperienceStatus,
} from "../../services/ExperienceService";
import {
  fetchRapportForAnalysis,
  createRapport,
} from "../../services/RapportService";
import {
  addModelAnalyse,
  deleteModelAnalyse,
  getAnalyseById,
} from "../../services/AnalyseService";
import AnalyseModelModal from "../Modals/Analyse/AnalyseModelModal";
import { Numbers } from "@mui/icons-material";
import "./AnalyseShow.css";
import moment from "moment";
interface AnalyseShowProps {
  projectId: any;
  analyseId:any;
}
// const AnalyseShow=() => {

const AnalyseShow : React.FC<AnalyseShowProps> = ({ projectId,analyseId })=> {
  const [showModalDataset, setShowModalDataset] = useState(false);
  const [ShowModalSearchDataset, setShowModalSearchDataset] = useState(false);
  const [showModalModel, setShowModalModel] = useState(false);
  const [showModalExperience, setShowModalExperience] = useState(false);
  const [showModalInfoExperience, setShowModalInfoExperience] = useState(false);
  const [showModalRapport, setShowModalRapport] = useState(false);
  const [analyse, setAnalyse] = useState<Analyse>({
    created_at: "",
    name_analysis: "",
    last_updated_at: "",
    description_analysis: "",
    id_analysis: 0,
    created_by: "",
    id_project: 0,
  });
  const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>([]);
  const [selectedModels, setSelectedModels] = useState<Model[]>([]);
  const [availableDatasets, setAvailableDatasets] = useState<Dataset[]>([]);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [itemTypeToDelete, setItemTypeToDelete] = useState<
    "dataset" | "model" | null
  >(null);
  const [selectedReports, setSelectedReports] = useState<number[]>([]); 
  const [showReportComparisonModal, setShowReportComparisonModal] = useState(false);

console.log(projectId)
console.log("analyseId")

console.log(analyseId)
const id  = analyseId;
  //const [datasets, setDatasets] = useState<Dataset[]>(selectedDatasets);
  const [selectedExperience, setSelectedExperience] = useState<Experience>({
    id_experience: 1,
    id_analysis_experience: 1,
    name_experience: "Test",
    models: [],
    datasets: [],
    nom_machine: "",
    nb_gpu: 0,
    nb_processeurs: 0,
    heure_lancement: "",
    heure_fin_prevu: "",
    statut: "En cours",
    resultat_prediction: {},
  }); //Experience selectionnée pour visualiser les informations
  const navigate = useNavigate();

  const [columnsExperience, setColumnsExperience] = useState([
    "Nom",
    "Heure lancement",
    "Heure de fin",
    "Statut",
  ]);

  const [columnsRapport, setColumnsRapport] = useState([
    "Nom",
    "Date Creation",
  ]);

   
  const [datasets, setDatasets] = useState<DatasetAnalyse[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  // console.log(id);
  useEffect(() => {
    const idAnalyse = analyseId ? parseInt(analyseId, 10) : -1;
    getAnalyseById(idAnalyse)
      .then((data) => setAnalyse(data))
      .catch((error) => console.error("Error fetching analyse", error));
  }, [analyseId]);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(`/api/analyses/${analyseId}/datasets`);
        if (!response.ok) {
          throw new Error("Failed to fetch datasets");
        }
        const data = await response.json();
        setDatasets(data);
      } catch (error) {
        console.error("Error fetching datasets:", error);
      }
    };

    const fetchAnalyseModels = async () => {
      try {
        const response = await fetch(`/api/analyses/${analyseId}/models`);
        if (!response.ok) {
          throw new Error("Failed to fetch models");
        }
        const data = await response.json();
        setModels(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchDatasets();
    fetchAnalyseModels();
  }, [analyseId]);

  const handleOpenModalDataset = () => {
    setShowModalDataset(true);
  };
  const handleOpenModalModel = () => {
    setShowModalModel(true);
  };

  const handleOpenModalSearchDataset = () => {
    setShowModalSearchDataset(true);
  };
  const closeModal = () => {
    setShowModalDataset(false);
  };

  const closeModalModel = () => {
    setShowModalModel(false);
  };
  const closeModalSearchDataset = () => {
    setShowModalSearchDataset(false);
  };

  // Function to add new datasets
  const handleAddDatasetToAnalyse = async (newDatasets: Dataset[]) => {
    try {
      const response = await fetch(`/api/analyses/${analyseId}/datasets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDatasets),
      });

      if (!response.ok) {
        throw new Error("Failed to add datasets");
      }

      const data = await response.json();
      setDatasets(data);
    } catch (error) {
      console.error("Error adding datasets:", error);
    }
  };
  const handleAddModelToAnalyse = async (newModels: Model[]) => {
    const analyseId = id ? parseInt(id, 10) : -1;
    addModelAnalyse(analyseId, newModels)
      .then((data) => setModels(data))
      .catch((error) => console.error("Error fetching models", error));
  };

  const handleDeleteModelToAnalyse = async (modelId: number) => {
    const analyseId = id ? parseInt(id, 10) : -1;
    await deleteModelAnalyse(analyseId, modelId);
    // Remove the deleted dataset from the state
    setModels((prevModels) =>
      prevModels.filter((model) => model.id !== modelId)
    );
    setShowConfirmationModal(false);
    console.log("Modal supprimé");
  };
  const handleDeleteDatasetClick = (datasetId: number) => {
    setSelectedItemId(datasetId);
    setItemTypeToDelete("dataset");
    setShowConfirmationModal(true);
  };

  const handleDeleteModelClick = (modelId: number) => {
    setSelectedItemId(modelId);
    setItemTypeToDelete("model");
    setShowConfirmationModal(true);
  };
  const handleDeleteDatasetAnalyse = async (datasetId: number) => {
    try {
      const response = await fetch(
        `/api/analyses/${analyseId}/datasets/${datasetId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete dataset");
      }
      // Remove the deleted dataset from the state
      setDatasets((prevDatasets) =>
        prevDatasets.filter((dataset) => dataset.id_dataset !== datasetId)
      );
    } catch (error) {
      console.error("Error deleting dataset:", error);
    }
  };
  const handleDatasetCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, dataset: Dataset) => {
    const isChecked = e.target.checked;
  
    if (isChecked) {
      setSelectedDatasets((prevSelectedDatasets) => [...prevSelectedDatasets, dataset]);
    } else {
      setSelectedDatasets((prevSelectedDatasets) => prevSelectedDatasets.filter((dataset) => dataset.id_dataset !== dataset.id_dataset));
    }
  };
  const handleModelCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, model: Model) => {
    const isChecked = e.target.checked;
  
    if (isChecked) {
      setSelectedModels((prevSelectedModels) => [...prevSelectedModels, model]);
    } else {
      setSelectedModels((prevSelectedModels) => prevSelectedModels.filter((selectedModel) => selectedModel.id_model!== model.id));
    }
  };
  //////////////////////////////////////////////////EXPERIENCE FUNCTIONS////////////////////////////////////////////////////////////
  const handleOpenModalExperience = () => {
    setShowModalExperience(true);
  };

  const handleAddExperience = async (newExperience: Experience) => {
    try {
      await createExperience(Number(id), newExperience);
      setExperiencesList([...experiencesList, newExperience]); //Mise à jour de la liste des experiences de l'analyse
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };

  const closeModalExperience = () => {
    setShowModalExperience(false);
  };

  const handleOpenInfoExperience = (id_experience: number) => {
    setShowModalInfoExperience(true);

    console.log("Ouverture des infos de l'experience: ", id_experience);
    const experience = experiencesList.find(
      (exp) => exp.id_experience === id_experience
    );
    if (experience) {
      setSelectedExperience(experience);
    }
  };

  const handleCloseInfoExperience = () => {
    setShowModalInfoExperience(false);
  };

  const handleDeleteExperience = () => {
     };



  //Liste experience
  const [experiencesList, setExperiencesList] = useState<Experience[]>([]);
  useEffect(() => {
    fetchExperienceForAnalysis(Number(id))
      .then((data) => setExperiencesList(data))
      .catch((error) => console.error("Error fetching experiences:", error));
  }, []);

  /////////Verificatioon pour le changement de statut
  useEffect(() => {

    const timer = setInterval(async () => {
      console.log("This will run every second!");

      for (const experience of experiencesList) {
        const currentTime = new Date();
        const endTime = new Date(experience.heure_fin_prevu);

        if (
          currentTime > endTime &&
          experience.statut !== "Terminé" &&
          experience.id_experience
        ) {
          try {
            await updateExperienceStatus(experience.id_experience, "Terminé");

            // Mettre à jour la liste des expériences dans le state
            setExperiencesList((prevList) =>
              prevList.map((exp) => {
                if (exp.id_experience === experience.id_experience) {
                  return { ...exp, statut: "Terminé" };
                }
                return exp;
              })
            );

            //Créer un rapport
            const newRapport: Rapport = {
              id_experience_rapport: experience.id_experience,
              name_rapport: experience.name_experience, //L'experience et le rapport ont le même nom lors de la creation
              created_at: new Date().toISOString(),
            };
            await handleAddRapport(newRapport);
          } catch (error) {
            console.error(
              "Temps dépassé but error updating experience status:",
              error
            );
          }
        }
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [id, experiencesList]);

  //////////////////////////////////////////////////REPORT FUNCTIONS////////////////////////////////////////////////////////////
 //Liste rapport
 const [rapportsList, setRapportsList] = useState<Rapport[]>([]);
 useEffect(() => {
   fetchRapportForAnalysis(Number(id))
     .then((data) => setRapportsList(data))
     .catch((error) => console.error("Error fetching rapport:", error));
 }, []);

 const handleAddRapport = async (newRapport: Rapport) => {
   try {
     await createRapport(Number(id), newRapport);
     const updatedRapportsList = await fetchRapportForAnalysis(Number(id)); //Mise à jour de la liste des rapports de l'analyse
     setRapportsList(updatedRapportsList);
   } catch (error) {
     console.error("Error adding rapport:", error);
   }
 };

  const handleOpenRapport = (index:number) => {
    navigate(`/projets/analyse/${index}/rapport`);
    console.log("Rapport ouvert !");
  
  }

  /*Supprimer un rapporRapport */
   const handleDeleteRapport = (index: number) => {
        console.log("Rapport supprimé ");
  }; 
 
  const toggleReportSelection = (id: number) => {
    console.log(selectedReports)
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter(reportId => reportId !== id));
      
    } else {
      if (selectedReports.length < 2) {
        setSelectedReports([...selectedReports, id]);
      } else {
        alert("Vous avez déjà sélectionné deux rapports pour la comparaison.");
        console.log("Vous ne pouvez sélectionner que jusqu'à deux rapports.");
      }
    }
   
  };
  
  const handleComparer = () => {
    {console.log(selectedReports)}
    if (selectedReports.length > 1) {
      setShowReportComparisonModal(true);
    } else {
      alert("Vous devez sélectionner deux rapports pour faire la comparaison.");
      console.log("Vous devez d'abord sélectionner les rapports à comparer.");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  //////////////////////////////////////////////////DATASET FUNCTIONS////////////////////////////////////////////////////////////
  const handleAddSearchDatasetToAnalyse = async (newDatasets: Dataset[]) => {};
  const confirmDeleteItem = async () => {
    if (selectedItemId !== null) {
      if (itemTypeToDelete === "dataset") {
        await handleDeleteDatasetAnalyse(selectedItemId);
      } else if (itemTypeToDelete === "model") {
        await handleDeleteModelToAnalyse(selectedItemId);
      }
      setShowConfirmationModal(false);
      setSelectedItemId(null);
      setItemTypeToDelete(null);
    }
  };
  return (
    <div className="my-5">
      <div className="navigation-link" onClick={handleGoBack}>
        <strong className="navigation-text">Analyses</strong>{" "}
        <strong className="navigation-separator">&gt;</strong>
        <strong>{analyse.name_analysis}</strong>
      </div>
      <div
        className="container-fluid rounded border "
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <div
          className=" p-3"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button
            className="btn mb-10"
            style={{
              backgroundColor: "var(--toggle-fg-before-hover)",
              color: "var(--background-color)",
              height: "37px",
              width: "121px",
            }}
            onClick={handleOpenModalSearchDataset}
          >
            Recherche
          </button>
        </div>


        <div className="row ">
          <div className="col-md-6">
            <div
              className="rounded border p-3 position-relative shadow-sm"
              style={{ height: "50vh", overflowY: "auto" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h5> Expériences</h5>
                <div className="mb-0">
                  <button
                    className="btn mb-10"
                    style={{ backgroundColor: "#E30613", color: "var(--background-color)"}}
                    onClick= {() => {
                        // Vérifier si selectedModels et selectedDatasets ne sont pas vides
                        if (selectedModels.length > 0 && selectedDatasets.length > 0) {
                          handleOpenModalExperience();
                        } else {
                              alert("Veuillez sélectionner au moins un modèle et un dataset.");
                        }
                      }
                    }
                  >
                    Exécuter
                  </button>
                  </div>
              </div>
              <hr style={{ color: "#555" }} />
              <div className="overflow-auto">
                <ElementsList
                  nameModule="experienceAnalyse"
                  columns={columnsExperience}
                  elementsList={Array.isArray(experiencesList)?experiencesList:[]}
                  onShow={handleOpenInfoExperience}
                  onDelete={handleDeleteExperience}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="rounded border p-3 position-relative shadow-sm"
              style={{ height: "50vh", overflowY: "auto" }}
            >
              <div className="d-flex align-items-center justify-content-between ">
                <h5> Datasets</h5>
                <div className="mt-1 me-2" onClick={handleOpenModalDataset}>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ color: "#E30613", fontSize: "1.2em" }}
                  />
                </div>
              </div>
              <hr style={{ color: "#555" }} />

              <Table>
                <tbody>
                  {datasets.map((dataset) => (
                    <tr
                      key={dataset.id_dataset}
                      className={
                        selectedDatasets.includes(dataset) ? "selected" : ""
                      }
                    >
                      <td style={{ width: "10px" }}>
                        <input 
                              type="checkbox" 
                              checked={selectedDatasets.includes(dataset)}
                              onChange={(e) =>handleDatasetCheckboxChange(e,dataset)}/>
                      </td>
                      <td>
                        <div style={{ whiteSpace: "nowrap" }}>
                          {dataset.name_dataset} ({dataset.numPatients}{" "}
                          patients, {dataset.numECGs} ECGs)
                        </div>
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="icon-trash"
                          onClick={() =>
                            handleDeleteDatasetClick(dataset.id_dataset)
                          }
                          style={{ cursor: "pointer" }}
                        />
                        </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6 ">
            <div
              className="rounded border p-3 position-relative shadow-sm"
              style={{ height: "50vh", overflowY: "auto" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h5> Rapports</h5>
                <div className="mb-0">
                  <button
                    className="btn px-2"
                    onClick={handleComparer}
                    style={{ backgroundColor: "#E30613", color: "var(--background-color)"}}
                  >
                    Comparer
                  </button>
                  <ReportComparisonModal
                    show={showReportComparisonModal}
                    onHide={() => setShowReportComparisonModal(false)}
                    selectedReports={selectedReports}
                  />
                </div>
                </div>
                <hr style={{ color: "#555" }} />
                <div className="overflow-auto">
                
                <Table>
                    <thead>
                      <tr>
                        <th> </th>
                        <th>Nom</th>
                        <th>Date de création</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rapportsList.length > 0 && rapportsList.map(rapport => (
                        <tr key={rapport.id_rapport} className={rapport.id_rapport && selectedReports.includes(rapport.id_rapport) ? 'selected' : ''}>
                        {rapport.id_rapport &&
                          <td style={{ width: '10px' }}>
                            <input
                              type="checkbox" 
                              className="form-check-input"
                              checked={ selectedReports.includes(rapport.id_rapport)}
                              onChange={() => rapport.id_rapport && toggleReportSelection(rapport.id_rapport)}
                              style={{ backgroundColor: selectedReports.includes(rapport.id_rapport) ? 'red' : ''}}
                            />
                          </td>
                  }
                          <td>
                            <div style={{ whiteSpace: 'nowrap' }}>
                               {rapport.name_rapport}
                            </div>
                          </td>
                          <td> 
                              {moment(rapport.created_at).format("DD-MM-YYYY")}
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faEye}
                              className="icon-trash"
                              onClick={() => rapport.id_rapport && handleOpenRapport(rapport.id_rapport)}
                              style={{ cursor: "pointer" }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="rounded border p-3 position-relative shadow-sm"
              style={{ height: "50vh", overflowY: "auto" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h5> Modèles</h5>
                <div className="mt-1 me-2" onClick={handleOpenModalModel}>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ color: "#E30613", fontSize: "1.2em", cursor: "pointer"}}
                  />
                </div>
              </div>
              <hr style={{ color: "#555" }} />
              <Table>
                <tbody>
                  {models.map((model) => (
                    <tr
                      key={model.id}
                      className={
                        selectedModels.includes(model) ? "selected" : ""
                      }
                    >
                      <td style={{ width: "10px" }}>
                        <input 
                              type="checkbox" 
                              checked={selectedModels.includes(model)}
                              onChange={(e) =>handleModelCheckboxChange(e,model)}
                          />
                      </td>
                      <td>
                        <div style={{ whiteSpace: "nowrap" }}>
                          {model.name} {"(version "}
                          {model.architecture_version} ,{" projet "}{" "}
                          {model.project_name}
                          {")"}
                        </div>
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="icon-trash"
                          onClick={() => handleDeleteModelClick(model.id)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      {showModalDataset && (
        <AnalyseDatsetModal
          onCreate={handleAddDatasetToAnalyse}
          onClose={closeModal}
        />
      )}
      {ShowModalSearchDataset && (
        <AnalyseSearchDatsetModal
          onCreate={handleAddDatasetToAnalyse}
          onClose={closeModalSearchDataset}
        />
      )}
      {showModalModel && (
        <AnalyseModelModal
          onCreate={handleAddModelToAnalyse}
          onClose={closeModalModel}
        />
      )}

      {showModalExperience && (
        <CreateExperienceModal
          id_analyse={Number(id)}
          onCreate={handleAddExperience}
          onClose={closeModalExperience}
          modelsList={selectedModels}
          datasetsList={selectedDatasets}
        />
      )}
      {showModalInfoExperience && (
        <InfoExperienceModal
          experience={selectedExperience}
          onClose={handleCloseInfoExperience}
        />
      )}

<ConfirmationArchiverModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={confirmDeleteItem}
      />

    </div>
  );
};

export default AnalyseShow;
