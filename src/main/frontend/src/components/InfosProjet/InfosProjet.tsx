import "./InfosProjet.css";

import image from "../../assets/projet.png";
interface Projet {
  project: {
    dateCreation: string;
    nom: string;
    auteur: string;
    type: string;
    version: string;
  };
}

const InfosProjet = ({ project }: Projet) => {
  return (
    <div className="card-content">
      <div className="card-header">
        <h2>{project.nom}</h2>
        <img src={image} alt="not found" />
      </div>
      <hr />
      <br />
      <p>
        <strong>Auteur:</strong> {project.auteur}
      </p>
      <br />
      <p>
        <strong>Date Création:</strong> {project.dateCreation}
      </p>
      <br />
      <p>
        <strong>Version:</strong> {project.version}
      </p>
      <br />
      <strong>Description:</strong>
      <div className="project-description">{project.type}</div>
    </div>
  );
};

export default InfosProjet;
