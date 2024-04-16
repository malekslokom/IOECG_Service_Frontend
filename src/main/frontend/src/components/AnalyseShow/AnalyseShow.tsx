import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AnalyseDatsetModal from "../Modals/Analyse/AnalyseDatsetModal";
import AnalyseSearchDatsetModal from "../Modals/Analyse/AnalyseSearchDatsetModal";
import { useParams, useNavigate } from "react-router-dom";
import ElementsList from "../ElementsList/ElementsLits";
import CreateExperienceModal from "../Modals/Analyse/CreateExperienceModal";
import InfoExperienceModal from "../Modals/Analyse/InfoExperienceModal";
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
const AnalyseShow = () => {
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
    resultat_prediction: [],
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

  const { id } = useParams();
  const [datasets, setDatasets] = useState<DatasetAnalyse[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  console.log(id);
  useEffect(() => {
    const analyseId = id ? parseInt(id, 10) : -1;
    getAnalyseById(analyseId)
      .then((data) => setAnalyse(data))
      .catch((error) => console.error("Error fetching analyse", error));
  }, [id]);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(`/api/analyses/${id}/datasets`);
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
        const response = await fetch(`/api/analyses/${id}/models`);
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
  }, [id]);

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
      const response = await fetch(`/api/analyses/${id}/datasets`, {
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
  };

  const handleDeleteDatasetAnalyse = async (datasetId: number) => {
    try {
      const response = await fetch(
        `/api/analyses/${id}/datasets/${datasetId}`,
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
  //////////////////////////////////////////////////EXPERIENCE FUNCTIONS////////////////////////////////////////////////////////////
  const handleOpenModalExperience = () => {
    setShowModalExperience(true);
  };

  const handleAddExperience = async (newExperience: Experience) => {
    try {
      await createExperience(Number(id), newExperience);
      setExperienceList([...experiencesList, newExperience]); //Mise à jour de la liste des experiences de l'analyse
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };

  const closeModalExperience = () => {
    setShowModalExperience(false);
  };

  const handleOpenInfoExperience = (index: number) => {
    setShowModalInfoExperience(true);

    console.log("Ouverture des infos de l'experience: ", index);
    const experience = experiencesList.find(
      (exp) => exp.id_experience === index
    );
    if (experience) {
      setSelectedExperience(experience);
    }
  };

  const handleCloseInfoExperience = () => {
    setShowModalInfoExperience(false);
  };

  const handleDeleteExperience = () => {};

  //Liste experience
  const [experiencesList, setExperienceList] = useState<Experience[]>([]);
  useEffect(() => {
    fetchExperienceForAnalysis(Number(id))
      .then((data) => setExperienceList(data))
      .catch((error) => console.error("Error fetching experiences:", error));
  }, []);

  /////////Verificatioon pour le changement de statut
  useEffect(() => {
    //Permet de changer le string HH:MM:SS en type Date pour la comparaison
    const parseTimeStringToTime = (timeString: string) => {
      const [hour, minute, second] = timeString.split(":").map(Number);
      return new Date(0, 0, 0, hour, minute, second);
    };

    const timer = setInterval(async () => {
      console.log("This will run every second!");

      for (const experience of experiencesList) {
        const currentTime = new Date();
        const endTime = parseTimeStringToTime(experience.heure_fin_prevu);

        if (
          currentTime > endTime &&
          experience.statut !== "Terminé" &&
          experience.id_experience
        ) {
          try {
            await updateExperienceStatus(experience.id_experience, "Terminé");

            // Mettre à jour la liste des expériences dans le state
            setExperienceList((prevList) =>
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
      /*
    setExperienceList(prevExperiences => prevExperiences.map((experience) => {
      if (experience.statut === "En cours" && experience.heure_fin_prevu) {

        const currentTime = new Date();
        const endTime = parseTimeStringToTime(experience.heure_fin_prevu);

        console.log(currentTime, endTime ,experience.statut)

        if (currentTime > endTime) {
          console.log("Temps dépassé");
          return { ...experience, statut: "Terminé" } as Experience;
        }
      }
      return experience;
    }));*/
    }, 3000);

    return () => clearInterval(timer);
  }, [id, experiencesList]);
  const closeModalRapport = () => {
    setShowModalRapport(false);
  };

  const handleOpenRapport = () => {
    setShowModalRapport(true);
  };

  const handleDeleteRapport = () => {};
  //Liste rapport
  const [rapportsList, setRapportList] = useState<Rapport[]>([]);
  useEffect(() => {
    fetchRapportForAnalysis(Number(id))
      .then((data) => setRapportList(data))
      .catch((error) => console.error("Error fetching rapport:", error));
  }, []);
  const handleAddRapport = async (newRapport: Rapport) => {
    try {
      await createRapport(Number(id), newRapport);
      const updatedRapportsList = await fetchRapportForAnalysis(Number(id)); //Mise à jour de la liste des rapports de l'analyse
      setRapportList(updatedRapportsList);
    } catch (error) {
      console.error("Error adding rapport:", error);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  //////////////////////////////////////////////////DATASET FUNCTIONS////////////////////////////////////////////////////////////
  const handleAddSearchDatasetToAnalyse = async (newDatasets: Dataset[]) => {};

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
              style={{ height: "50vh" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h5> Expériences</h5>
                <div className="mb-0">
                  <button
                    className="btn mb-10"
                    style={{ backgroundColor: "#E30613", color: "white" }}
                    onClick={handleOpenModalExperience}
                  >
                    Exécuter
                  </button>
                </div>
              </div>
              <hr style={{ color: "#555" }} />
              <div className="overflow-auto">
                <ElementsList
                  nameModule="experience"
                  columns={columnsExperience}
                  elementsList={experiencesList}
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
                        <input type="checkbox" />
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
                            handleDeleteDatasetAnalyse(dataset.id_dataset)
                          }
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
              style={{ height: "50vh" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h5> Rapports</h5>
                <div className="mb-0">
                  <button
                    className="btn px-2"
                    style={{ backgroundColor: "#E30613", color: "white" }}
                  >
                    Comparer
                  </button>
                </div>
              </div>
              <hr style={{ color: "#555" }} />
              <div className="overflow-auto">
                <ElementsList
                  nameModule="rapportAnalyse"
                  columns={columnsRapport}
                  elementsList={rapportsList}
                  onShow={handleOpenRapport}
                  onDelete={handleDeleteRapport}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="rounded border p-3 position-relative shadow-sm"
              style={{ height: "50vh" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h5> Modèles</h5>
                <div className="mt-1 me-2" onClick={handleOpenModalModel}>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ color: "#E30613", fontSize: "1.2em" }}
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
                        <input type="checkbox" />
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
                          onClick={() => handleDeleteModelToAnalyse(model.id)}
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
    </div>
  );
};

export default AnalyseShow;
