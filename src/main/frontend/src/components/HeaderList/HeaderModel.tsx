import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faFilter } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const HeaderModel: React.FC = () => {


    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Logic for type change
    };



    const handleFilterClick = () => {
        // Logic for filter button click
    };

    const handleAuthorSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Logic for searching by author
    };

    const handleModelNameSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Logic for searching by model name
    };

    return (
        <div className="filters">
            <div className="row align-items-center">
                <div className="col-auto">
                    <button className="btn shadow-none">
                        <FontAwesomeIcon icon={faSync} style={{ fontSize: '1.5em', color: 'rgba(226,13,23)' }} />
                    </button>
                </div>
                <div className="col">
                    <input type="text" placeholder="Auteur" className="form-control" style={{ width: "100%" }} onChange={handleAuthorSearch} />
                </div>
                <div className="col">
                    <input type="text" placeholder="Nom de modéle" className="form-control" style={{ width: "100%" }} onChange={handleModelNameSearch} />
                </div>
                <div className="col-auto">
                    <select className="form-select" onChange={handleTypeChange}>
                        <option value="">Nature de modéle</option>
                        <option value="Regression">Regression</option>
                        <option value="Binary Classification">Binary Classification</option>
                        <option value="Multi-class Classification">Multi-class Classification</option>
                    </select>
                </div>
                <div className="col-auto">
                    <button className="btn btn-light" onClick={handleFilterClick} style={{ color: 'rgba(226,13,23)' }}>
                        <FontAwesomeIcon icon={faFilter} />
                        Filter
                    </button>
                </div>
                <hr className="my-3" style={{ color: "#555" }} />
            </div>
        </div>
    );
}

export default HeaderModel;
