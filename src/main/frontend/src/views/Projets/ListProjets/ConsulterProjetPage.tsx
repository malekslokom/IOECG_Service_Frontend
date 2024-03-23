import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import InfosProjet from "../../../components/InfosProjet/InfosProjet";
import { getProjectById } from "../../../services/ProjetService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./ConsulterProjetPage.css";
import DatasetProjetPage from "../Datasets/DatasetProjetPage";
import AnalyseProjetPage from "../Analyses/AnalyseProjetPage";
import RapportProjetPage from "../Rapports/RapportProjetPage";
import "./ConsulterProjetPage.css";
// Remplacez les composants suivants par vos propres composants pour Datasets, Rapports, Modèles

const ConsulterProjetPage = () => {
  const { id } = useParams();
  const projectId = id ? parseInt(id, 10) : -1;
  const navigate = useNavigate();
  const [project, setProjet] = useState<Projet>({
    dateCreation: "",
    nom: "",
    auteur: "",
    type: "",
    version: "",
  });
  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    getProjectById(projectId)
      .then((data) => setProjet(data))
      .catch((error) => console.error("Error fetching project", error));
  }, [projectId]);

  return (
    <>
      <div className="navigation-link" onClick={handleGoBack}>
        <strong className="navigation-text">Projets</strong>{" "}
        <strong className="navigation-separator">&gt;</strong>
        <strong>{project.nom}</strong>
      </div>
      <div className="consulter-projet-page">
        <div className="InfosProjet">
          <InfosProjet project={project} />
        </div>

        <Tabs>
          <TabList>
            <Tab>Analyses</Tab>
            <Tab>Datasets</Tab>
            <Tab>Rapports</Tab>
          </TabList>
          <TabPanel>
            <AnalyseProjetPage />
          </TabPanel>
          <TabPanel>
            <DatasetProjetPage />
          </TabPanel>
          <TabPanel>
            <RapportProjetPage />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default ConsulterProjetPage;
