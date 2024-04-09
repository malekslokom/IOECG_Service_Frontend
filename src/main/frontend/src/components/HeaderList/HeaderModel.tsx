import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faFilter } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
interface HeaderModelProps {
  onFilter: (typeModel: string, auteurModel: string, nomModel: string) => void;
}
const HeaderModel: React.FC<HeaderModelProps> = ({ onFilter }) => {
  const [typeModel, setTypeModel] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [nomModel, setNomeModel] = useState("");
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeModel(e.target.value);
  };
  const handleSearchTermSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchTerm(e.target.value);
  };
  const handleModelNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomeModel(e.target.value);
  };
  const handleFilterClick = () => {
    onFilter(typeModel, searchTerm, nomModel);
  };

  const handleResetFilters = () => {
    // Réinitialiser les états des filtres
    setTypeModel("");
    setsearchTerm("");
    setNomeModel("");
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
            className="form-control"
            style={{ width: "100%" }}
            onChange={handleModelNameSearch}
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="chercher"
            className="form-control"
            style={{ width: "100%" }}
            onChange={handleSearchTermSearch}
          />
        </div>

        <div className="col-auto">
          <select
            className="form-select"
            value={typeModel}
            onChange={handleTypeChange}
          >
            <option value="">Nature de modéle</option>
            <option value="Regression">Regression</option>
            <option value="Binary Classification">Binary Classification</option>
            <option value="Multi-class Classification">
              Multi-class Classification
            </option>
          </select>
        </div>
        <div className="col-auto">
          <button
            className="btn btn-light"
            onClick={handleFilterClick}
            style={{ color: "rgba(226,13,23)" }}
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
