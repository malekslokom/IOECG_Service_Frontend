import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faFilter } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

interface HeaderDatasetProps {
    setFilteredData: React.Dispatch<React.SetStateAction<DatasetAnalyse[]>>; 
  }

const HeaderDataset: React.FC<HeaderDatasetProps> = ({ setFilteredData }) => {
    const [patientFilters, setPatientFilters] = useState<{ [key: string]: string[] }>({
        age: [],
        height: [],
        weight: [],
        sex: []
    });

    const [datasetFilters, setDatasetFilters] = useState<{ [key: string]: string[] }>({
        name_dataset: [],
        type_dataset: [],
        source_name: [],
        study_name: []
    });
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({
        age: '',
        height: '',
        weight: '',
        sex: '',
        source_name: '',
        study_name: ''
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        // Charger les filtres pour le patient depuis la base de données
        fetchPatientFilters();
        
        // Charger les filtres pour le dataset depuis la base de données
        fetchDatasetFilters();
    }, []);

    const fetchPatientFilters = async () => {
        try {
            // Remplacer l'URL par l'endpoint approprié de votre API Flask pour récupérer les filtres patient
            const response = await fetch('/api/analyses/datasetSearch/patientFilters');
            const data = await response.json();
            setPatientFilters(data);
        } catch (error) {
            console.error('Erreur lors du chargement des filtres pour le patient :', error);
        }
    };

    const fetchDatasetFilters = async () => {
        try {
            // Remplacer l'URL par l'endpoint approprié de votre API Flask pour récupérer les filtres dataset
            const response = await fetch('/api/analyses/datasetSearch/datasetFilters');
            const data = await response.json();
            setDatasetFilters(data);
        } catch (error) {
            console.error('Erreur lors du chargement des filtres pour le dataset :', error);
        }
    };

    const handleFilterClick = async () => {
        try {
          const response = await fetch('/api/analyses/datasetSearch/filter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedFilters)
          });
          const filteredData = await response.json(); 
          setFilteredData(filteredData);
        } catch (error) {
          console.error('Error fetching filtered data:', error);
        }
      };
      
      
    const handleFilterChange = (filterName: string, value: string) => {
        setSelectedFilters(prevState => ({
            ...prevState,
            [filterName]: value
        }));
    };

    return (
        <div className="filters">
    <div className="row align-items-center">
        <div className="col-md-1">
            <button className="btn shadow-none">
                <FontAwesomeIcon icon={faSync} style={{ fontSize: '1.5em', color: 'rgba(226,13,23)' }} />
            </button>
        </div>
        <div className="col-md-9">
            <div className="row">
                <div className="col-md-2">Patient</div>
                {/* Filtres pour les patients */}
                <div className="col d-flex align-items-center">
                    <label htmlFor="ageSelect">Age</label>
                    <Form.Select  id="ageSelect" style={{
                        width: "100%",
                        color: "var(--primary-text-color)",
                        background: "var(--background-color)",
                    }}
                    onChange={(e) => handleFilterChange("age", e.target.value)}
                    value={selectedFilters.age}
                    >
                        <option value="">Sélectionner l'âge</option>
                        {patientFilters.age.map((age, index) => (
                            <option key={index} value={age}>{age}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className="col d-flex align-items-center">
                    <label htmlFor="tailleSelect">Taille</label>
                    <Form.Select id="tailleSelect"  style={{
                        width: "100%",
                        color: "var(--primary-text-color)",
                        background: "var(--background-color)",
                    }}
                    onChange={(e) => handleFilterChange("height", e.target.value)}
                    value={selectedFilters.height}
                    >
                        <option value="">Sélectionner la taille</option>
                        {patientFilters.height.map((height, index) => (
                            <option key={index} value={height}>{height}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className="col d-flex align-items-center">
                    <label htmlFor="poidSelect">Poids</label>
                    <Form.Select id="poidSelect" style={{
                        width: "100%",
                        color: "var(--primary-text-color)",
                        background: "var(--background-color)",
                    }}
                    onChange={(e) => handleFilterChange("weight", e.target.value)}
                    value={selectedFilters.weight}
                    >
                        <option value="">Sélectionner le poids</option>
                        {patientFilters.weight.map((weight, index) => (
                            <option key={index} value={weight}>{weight}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className="col d-flex align-items-center">
                    <label htmlFor="genreSelect">Genre</label>
                    <Form.Select style={{
                        width: "100%",
                        color: "var(--primary-text-color)",
                        background: "var(--background-color)",
                    }}
                    onChange={(e) => handleFilterChange("sex", e.target.value)}
                    value={selectedFilters.sex}
                    >
                        <option value="">Sélectionner le genre</option>
                        {patientFilters.sex.map((sex, index) => (
                            <option key={index} value={sex}>{sex}</option>
                        ))}
                    </Form.Select>
                </div>
            </div>
            {/* Filtres pour les jeux de données */}
            <div className="row">
                <div className="col">Dataset</div>
                <div className="col d-flex align-items-center">
                    <label htmlFor="sourceSelect">Nom de la source</label>
                    <Form.Select id="sourceSelect" style={{
                        width: "100%",
                        color: "var(--primary-text-color)",
                        background: "var(--background-color)",
                    }}
                    onChange={(e) => handleFilterChange("source_name", e.target.value)}
                    value={selectedFilters.source_name}
                    >
                        <option value="">Sélectionner le nom de la source</option>
                        {datasetFilters.source_name.map((source, index) => (
                            <option key={index} value={source}>{source}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className="col d-flex align-items-center">
                    <label htmlFor="etudeSelect">Nom de l'étude</label>
                    <Form.Select id="etudeSelect" style={{
                        width: "100%",
                        color: "var(--primary-text-color)",
                        background: "var(--background-color)",
                    }}
                    onChange={(e) => handleFilterChange("study_name", e.target.value)}
                    value={selectedFilters.study_name}
                    >
                        <option value="">Sélectionner le nom de l'étude</option>
                        {datasetFilters.study_name.map((study, index) => (
                            <option key={index} value={study}>{study}</option>
                        ))}
                    </Form.Select>
                </div>
            </div>
        </div>
        <div className="col-auto">
            <button className="btn btn-light" onClick={handleFilterClick} style={{ color: 'rgba(226,13,23)' }}>
                <FontAwesomeIcon icon={faFilter} />
                Filtrer
            </button>
        </div>
        <hr className="my-3" style={{ color: "#555" }} />
        
    </div>
</div>

    );
}

export default HeaderDataset;
