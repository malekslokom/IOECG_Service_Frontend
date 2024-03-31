import React from "react";
import "./InfosProjet.css";
import ecg from "./../../assets/ecg.jpg";

interface Projet {
  project: {
    created_at: string;
    name_project: string;
    created_by: string;
    type_project: string;
    description_project: string;
  };
}

const InfosProjet = ({ project }: Projet) => {
  return (
    <div className="card-content card">
      <img className="card-img-top" src={ecg} alt="Card image cap"></img>
      <div className="card-header">
        <h2>{project.name_project}</h2>
      </div>
      <div className="card-body">
        <div className="info-row">
          <strong>Auteur</strong>
          <span>{project.created_by}</span>
        </div>
        <div className="info-row">
          <strong>Date Création</strong>
          <span>{project.created_at}</span>
        </div>
        <div className="info-row">
          <strong>Déscription</strong>
          <span>{project.description_project}</span>
        </div>
        <div className="info-type">
          <strong>Type</strong>
          <div className="project-description">{project.type_project}</div>
        </div>
      </div>
    </div>
  );
};
export default InfosProjet;
