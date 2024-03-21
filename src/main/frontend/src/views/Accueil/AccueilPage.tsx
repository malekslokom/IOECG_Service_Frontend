import "./AccueilPage.css";
import analyse from "../../../../resources/static/assets/Acceuil/analysing.png";
import projets from "../../../../resources/static/assets/Acceuil/project-plan.png";
import datasets from "../../../../resources/static/assets/Acceuil/data-transfer.png";
import rapports from "../../../../resources/static/assets/Acceuil/repports.png";
import noProject from "../../../../resources/static/assets/Acceuil/no-project.png";
import StatsAccueil from "../../components/StatsAccueil/StatsAccueil";

const AccueilPage = () => {
  return (
    <div className="Accueil">
      <div className="welcome-section">
        <h1>Welcome, Andy</h1>
        <h4>revenez ou commencez quelque chose de nouveau</h4>
      </div>

      <div className="stats-section">
        <StatsAccueil icon={projets} title="Projets" count={0} />
        <StatsAccueil icon={analyse} title="Analyses" count={0} />
        <StatsAccueil icon={datasets} title="Datasets" count={0} />
        <StatsAccueil icon={rapports} title="Rapports" count={0} />
      </div>
      <div className="no-project-section">
        <img src={noProject} alt="No Project Found" />
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
