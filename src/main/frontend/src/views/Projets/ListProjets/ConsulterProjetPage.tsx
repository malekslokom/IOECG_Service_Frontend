import React, { useEffect, useState } from "react";
import "./ConsulterProjetPage.css";
import InfosProjet from "../../../components/InfosProjet/InfosProjet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AnalysesExperiencesProjet from "../../../components/AnalysesExperiencesProjet/AnalysesExperiencesProjet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProjectById } from "../../../services/ProjetService";
import { useParams } from "react-router-dom";
let analysesData: {
  key: number;
  name: string;
  dateCreation: string;
  author: string;
}[] = [];

for (let i = 1; i < 8; i++) {
  analysesData.push({
    key: i,
    name: "Analyse_1",
    dateCreation: "10/12/2023",
    author: "Andy",
  });
}

const ConsulterProjetPage = () => {
  const { id } = useParams();
  const projectId = id ? parseInt(id, 10) : -1; // Convert to number and handle potential null
  const navigate = useNavigate();
  const [project, setProjet] = useState<Projet>({
    dateCreation: "",
    nom: "",
    auteur: "",
    type: "",
    version: "",
  });
  const handleGoBack = () => {
    navigate("/home");
  };
  useEffect(() => {
    getProjectById(projectId)
      .then((data) => setProjet(data))
      .catch((error) => console.error("Error fetching project", error));
  }, [projectId]);

  return (
    <div className="Bloc">
      <div>
        <button>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="fleche"
            onClick={handleGoBack}
          />
        </button>
      </div>
      <div className="InfosProjet">
        <InfosProjet project={project} />
      </div>
      <div className="analyses">
        <AnalysesExperiencesProjet
          title="Analyses Récentes"
          data={analysesData}
        />
      </div>
      <div className="experiences">
        <AnalysesExperiencesProjet
          title="Expériences Récentes"
          data={analysesData}
        />
      </div>
    </div>
  );
};

export default ConsulterProjetPage;
