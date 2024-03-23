import React from "react";
import "./InfosProjet.css";
import ecg from "./../../assets/ecg.jpg";

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
    <div className="card-content card">
      <img className="card-img-top" src={ecg} alt="Card image cap"></img>
      <div className="card-header">
        <h2>{project.nom}</h2>
      </div>
      <div className="card-body">
        <div className="info-row">
          <strong>Auteur</strong>
          <span>{project.auteur}</span>
        </div>
        <div className="info-row">
          <strong>Date Création</strong>
          <span>{project.dateCreation}</span>
        </div>
        <div className="info-row">
          <strong>Version</strong>
          <span>{project.version}</span>
        </div>
        <div className="info-type">
          <strong>Type</strong>
          <div className="project-description">{project.type}</div>
        </div>
      </div>
    </div>
  );
};
export default InfosProjet;
