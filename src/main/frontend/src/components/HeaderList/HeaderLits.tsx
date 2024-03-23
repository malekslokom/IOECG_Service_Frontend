import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faFilter } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import moment from "moment";
interface HeaderListProps {
  onFilter: (startDate: string, endDate: string, searchTerm: string) => void;
}

const HeaderList: React.FC<HeaderListProps> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterClick = () => {
    const formattedStartDate = startDate
      ? moment(startDate).format("DD-MM-YYYY")
      : "";
    const formattedEndDate = endDate
      ? moment(endDate).format("DD-MM-YYYY")
      : "";
    onFilter(formattedStartDate, formattedEndDate, searchTerm);
  };

  const handleResetFilters = () => {
    // Réinitialiser les états des filtres
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
    // Appeler onFilter avec des valeurs vides pour réinitialiser les filtres côté parent
    onFilter("", "", "");
  };

  // Correction: Définition des fonctions handleDateChange et handleSearch
  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isStartDate: boolean
  ) => {
    if (isStartDate) {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="filters" style={{ background: "var(--background-color)" }}>
      <div className="row align-items-center">
        <div className="col-auto">
          <button className="btn" onClick={handleResetFilters}>
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
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e, true)}
            className="form-control"
            style={{
              background: "var(--background-color)",
              color: "var(--primary-text-color)",
            }}
          />
        </div>
        <div className="col">
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange(e, false)}
            className="form-control"
            style={{
              background: "var(--background-color)",
              color: "var(--primary-text-color)",
            }}
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="chercher ...."
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
            style={{
              width: "100%",
              color: "var(--primary-text-color)",
              background: "var(--background-color)",
            }}
          />
        </div>
        <div className="col-auto">
          <button
            className="btn"
            style={{
              background: "var(--background-color)",
              color: "var(--primary-text-color)",
              border: "1px solid var(--primary-text-color)",
            }}
            onClick={handleFilterClick}
          >
            <FontAwesomeIcon icon={faFilter} />
            Filtrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderList;
