import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faFilter } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
interface HeaderModelProps {
  onFilter: (typeModel: string, searchTerm: string, nomModel: string) => void;
}
const HeaderModel: React.FC<HeaderModelProps> = ({ onFilter }) => {
  const [typeModel, setTypeModel] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [nomModel, setNomModel] = useState("");
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeModel(e.target.value);
  };
  const handleSearchTermSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchTerm(e.target.value);
  };
  const handleModelNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomModel(e.target.value);
  };
  const handleFilterClick = () => {
    onFilter(typeModel, searchTerm, nomModel);
  };

  const handleResetFilters = () => {
    // Réinitialiser les états des filtres
    setTypeModel("");
    setsearchTerm("");
    setNomModel("");
    // Appeler onFilter avec des valeurs vides pour réinitialiser les filtres côté parent
    onFilter("", "", "");
  };

  return (
    <div className="filters">
      <div className="row align-items-center">
        <div className="col-auto">
          <button className="btn shadow-none" onClick={handleResetFilters}>
            <FontAwesomeIcon
              icon={faSync}
              style={{
                fontSize: "1.5em",
                color: "rgba(59,153,255,255)",
                background: "var(--background-color)",
              }}
            />
          </button>
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="Nom de modéle"
            className="form-control input-placeholder"
            style={{
              width: "100%",
              background: "var(--background-color)",
            }}
            onChange={handleModelNameSearch}
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="chercher"
            className="form-control input-placeholder"
            style={{
              width: "100%",
              background: "var(--background-color)",
            }}
            onChange={handleSearchTermSearch}
          />
        </div>

        <div className="col-auto">
          <select
            className="form-select"
            value={typeModel}
            onChange={handleTypeChange}
            style={{
              background: "var(--background-color)",
              color: "var(--primary-text-color)",
            }}
          >
            <option value="régression">Regression</option>
            <option value="classification binaire">
              Binary Classification
            </option>
            <option value="classification multi-class">
              Multi-class Classification
            </option>
          </select>
        </div>
        <div className="col-auto">
          <button
            className="btn"
            onClick={handleFilterClick}
            style={{
              background: "var(--background-color)",
              color: "var(--primary-text-color)",
              border: "1px solid var(--primary-text-color)",
            }}
          >
            <FontAwesomeIcon icon={faFilter} />
            Filter
          </button>
        </div>
        <hr className="my-3" style={{ color: "#555" }} />
      </div>
    </div>
  );
};

export default HeaderModel;
