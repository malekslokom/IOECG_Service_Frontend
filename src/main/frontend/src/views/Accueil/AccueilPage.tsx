import "./AccueilPage.css";
import StatsAccueil from "../../components/StatsAccueil/StatsAccueil";
import { useEffect, useState } from "react";
import { fetchModels } from "../../services/ModelService";
import { fetchAnalyses } from "../../services/AnalyseService";
import { fetchDatasets } from "../../services/DatasetService";
import { fetchProjets, createProject } from "../../services/ProjetService";
import { fetchExperiences } from "../../services/ExperienceService";
import CreateProjetModal from "./../../components/Modals/CreateProjetModal";

const AccueilPage = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [analyses, setAnalyses] = useState<Analyse[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [projects, setProjects] = useState<Projet[]>([]);
  const [analyseCount, setAnalyseCount] = useState(0);
  const [datasetCount, setDatasetCount] = useState(0);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [recentExperiences, setRecentExperiences] = useState<Experience[]>([]);
  const [projetCount, setProjetCount] = useState(0);
  const [modelCount, setModelCount] = useState(0);
  const [newProjetModal, setNewProjetModal] = useState<boolean>(false);

  useEffect(() => {
    fetchModels()
      .then((data) => {
        setModels(data);
        setModelCount(data.length);
      })
      .catch((error) => console.error("Error fetching models:", error));
    fetchProjets()
      .then((data) => {
        setProjects(data);
        setProjetCount(data.length);
      })
      .catch((error) => console.error("Error fetching projetcs:", error));

    fetchAnalyses()
      .then((data) => {
        setAnalyses(data);
        setAnalyseCount(data.length);
      })
      .catch((error) => console.error("Error fetching analyses:", error));

    fetchExperiences()
      .then((data) => {
        setExperiences(data);
        setRecentExperiences(data.slice(0, 4));
      })
      .catch((error) => console.error("Error fetching projetcs:", error));
    fetchDatasets()
      .then((data) => {
        setDatasets(data);
        setDatasetCount(data.length);
      })
      .catch((error) => console.error("Error fetching datasets:", error));
  }, []);
  const buttonClick = () => {
    setNewProjetModal(true);
    console.log("Bouton Ajouter cliqué !");
  };
  const handleCreateProjet = async (newProjet: Projet) => {
    console.log("Nouveau projet créé:", newProjet);
    const createdProjet = await createProject(newProjet);
  };
  const handleCloseModal = () => {
    setNewProjetModal(false);
  };
  return (
    <div className="Accueil">
      <div className="welcome-section">
        <h1>Welcome, Andy</h1>
        <h4>Revenez ou commencez quelque chose de nouveau</h4>
      </div>

      <div className="stats-section">
        <StatsAccueil
          icon="/assets/Acceuil/project-plan.png"
          title="Projets"
          count={projects.length}
          maxValue={100}
        />
        <StatsAccueil
          icon="/assets/Acceuil/analysing.png"
          title="Analyses"
          count={analyses.length}
          maxValue={100}
        />
        <StatsAccueil
          icon="/assets/Acceuil/data-transfer.png"
          title="Datasets"
          count={datasets.length}
          maxValue={100}
        />
        <StatsAccueil
          icon="/assets/Acceuil/repports.png"
          title="Rapports"
          count={models.length}
          maxValue={100}
        />
      </div>
      <hr style={{ color: "#555" }} />

      <div className="content-section">
        <div className="recent-experiences">
          <h2>Expériences récentes</h2>
          {recentExperiences.map((exp) => (
            <div className="experience-box" key={exp.id_experience}>
              <span>
                {exp.name_experience} - résultat: {exp.resultat_prediction}-
                status : {exp.statut}
              </span>
            </div>
          ))}
        </div>

        <div className="no-project-section">
          <img src="/assets/Acceuil/havProject.png" alt="No Project Found" />
          <h4>
            Créer un nouveau projet pour réaliser <br />
            plusieurs analyses facinantes
          </h4>
          <button onClick={buttonClick}>Créer un Projet</button>
        </div>
      </div>
      {newProjetModal && (
        <CreateProjetModal
          onClose={handleCloseModal}
          onCreate={handleCreateProjet}
        />
      )}
    </div>
  );
};

export default AccueilPage;
