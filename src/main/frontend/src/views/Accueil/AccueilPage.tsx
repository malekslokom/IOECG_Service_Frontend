import "./AccueilPage.css";
import analyseIcon from "../../../../resources/static/assets/Acceuil/analysing.png";
import projetsIcon from "../../../../resources/static/assets/Acceuil/project-plan.png";
import datasetsIcon from "../../../../resources/static/assets/Acceuil/data-transfer.png";
import rapportsIcon from "../../../../resources/static/assets/Acceuil/repports.png";
import noProjectIcon from "../../../../resources/static/assets/Acceuil/no-project.png";
import StatsAccueil from "../../components/StatsAccueil/StatsAccueil";
import { useEffect, useState } from "react";
import { fetchModels } from "../../services/ModelService";
import { fetchAnalyses } from "../../services/AnalyseService";
import { fetchDatasets } from "../../services/DatasetService";
import { fetchProjets } from "../../services/ProjetService";

const AccueilPage = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [analyses, setAnalyses] = useState<Analyse[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [projects, setProjects] = useState<Projet[]>([]);
  const [analyseCount, setAnalyseCount] = useState(0);
  const [datasetCount, setDatasetCount] = useState(0);

  const [projetCount, setProjetCount] = useState(0);
  const [modelCount, setModelCount] = useState(0);
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

    fetchDatasets()
      .then((data) => {
        setDatasets(data);
        setDatasetCount(data.length);
        setProjetCount(data.length);
      })
      .catch((error) => console.error("Error fetching datasets:", error));
  }, []);

  return (
    <div className="Accueil">
      <div className="welcome-section">
        <h1>Welcome, Andy</h1>
        <h4>Revenez ou commencez quelque chose de nouveau</h4>
      </div>

      <div className="stats-section">
        <StatsAccueil
          icon={projetsIcon}
          title="Projets"
          count={projects.length}
          maxValue={100}
        />
        <StatsAccueil
          icon={analyseIcon}
          title="Analyses"
          count={analyses.length}
          maxValue={100}
        />
        <StatsAccueil
          icon={datasetsIcon}
          title="Datasets"
          count={datasets.length}
          maxValue={100}
        />
        <StatsAccueil
          icon={rapportsIcon}
          title="Rapports"
          count={models.length}
          maxValue={100}
        />
      </div>
      <div className="no-project-section">
        <img src={noProjectIcon} alt="No Project Found" />
        <h4>
          Nous supposons que c'est votre première fois ! <br />
          Créez un projet maintenant pour commencer !
        </h4>
        <button>Créer un Projet</button>
      </div>
    </div>
  );
};

export default AccueilPage;
