import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';
import HeaderDataset from '../../HeaderList/HeaderSearchDataset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faFilter,faEye } from '@fortawesome/free-solid-svg-icons';
import "./ElementLists.css";
import ECGPlotModal from '../ECG/ECGPlotModal';

interface AnalyseDatsetModalProps {
  onClose: () => void;
  onCreate: (newDatasets: Dataset[]) => void;
}

const AnalyseSearchDatsetModal: React.FC<AnalyseDatsetModalProps> = ({ onClose, onCreate }) => {
  const { id } = useParams();
  const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>([]);
  const [filteredData, setFilteredData] = useState<{ data: PatientEcgData[] }>({ data: [] });
  const [showECGModal, setShowECGModal] = useState(false); 
  const [selectedECGs, setSelectedECGs] = useState<ECG[]>([]);
  const [newDatasetName, setNewDatasetName] = useState<string>('');
  const [newDatasetDescription, setNewDatasetDescription] = useState<string>('');
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
const [ecgDataForModal, setEcgDataForModal] = useState<any>(null);
const [showNewDatasetModal, setShowNewDatasetModal] = useState<boolean>(false);

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

const handleNewDatasetSubmit = () => {
  // if (newDatasetName.trim() !== '') {
  //   const newDataset = createDatasetFromECGs(selectedECGs,newDatasetName,newDatasetDescription);
  //   setSelectedDatasets([newDataset]);
  //   onCreate([newDataset]);
  //   setShowNewDatasetModal(false);
  //   onClose();
  // }
};



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`/api/analyses/all`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch datasets');
  //       }
  //       const data = await response.json();
  //       setDatasets(data);
  //       setFilteredData(data);
  //     } catch (error) {
  //       console.error('Error fetching datasets:', error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);
  
  const handleCheckboxChange = (dataset: Dataset) => {
    const newSelectedDatasets = selectedDatasets.includes(dataset)
      ? selectedDatasets.filter(item => item !== dataset)
      : [...selectedDatasets, dataset];

    setSelectedDatasets(newSelectedDatasets);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(selectedDatasets);
    onClose();
  };

  const handleClose = () => {
    setSelectedDatasets([]);
    setShowECGModal(false);
    onClose();
  };


const handleShowEcg = (ecgDataForCurrentRow: any) => {
  setShowECGModal(true);
  setEcgDataForModal(ecgDataForCurrentRow);

}
 const closeModal = () => {
  setShowECGModal(false);
  setEcgDataForModal([])
};
  return (
    <>
    <Modal show onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Datasets de Recherche</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <HeaderDataset setFilteredData={setFilteredData} /> */}
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
        <Form onSubmit={handleSubmit}>
        <div className="table-container">
        <table className="table">
          <thead>
              <tr>
                <th></th>
                <th>Age de Patient</th>
                <th>Poids de Patient</th>
                <th>Taille de Patient</th>
                <th>Genre de Patient</th>
                <th>Nom du Dataset</th>
                {/* <th>Description</th>
                <th>Type</th> */}
                <th></th>
              </tr>
              </thead>
          <tbody>
              {filteredData.data.map(dataset => (
                <tr key={dataset.idDataset}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      // onChange={() => handleCheckboxChange(dataset)}
                      // checked={selectedDatasets.includes(dataset)}
                    />
                  </td>
                  <td>{dataset.age}</td>
                  <td>{dataset.height}</td>
                  <td>{dataset.weight}</td>
                  <td>{dataset.sex}</td>
                  <td>{dataset.nameDataset}</td>
                  {/* <td>{dataset.nameDataset}</td> */}
                  {/* <td>{dataset.descriptionDataset}</td>
                  <td>{dataset.typeDataset}</td> */}
                  <td>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => handleShowEcg([dataset.lead_i,dataset.lead_ii,dataset.lead_iii,dataset.lead_avr,dataset.lead_avf,dataset.lead_avl,dataset.lead_v1,dataset.lead_v2,dataset.lead_v3,dataset.lead_v4,dataset.lead_v5,dataset.lead_v6,dataset.lead_x,dataset.lead_y,dataset.lead_z,dataset.lead_es,dataset.lead_as,dataset.lead_ai])}
                  
                    style={{ cursor: "pointer" }}
                  />
                </td>
                </tr>
              ))}
            </tbody>
        </table>
        {ecgDataForModal && showECGModal &&<ECGPlotModal onClose={closeModal} ecgData={ecgDataForModal} />}

      </div>
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button type="submit" className="custom-button" >
            Ajouter
          </Button>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal><Modal show={showNewDatasetModal} onHide={() => setShowNewDatasetModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Nouveau Dataset</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formDatasetName">
        <Form.Label>Nom du Dataset</Form.Label>
        <Form.Control type="text" placeholder="Entrez le nom du Dataset" value={newDatasetName} onChange={(e) => setNewDatasetName(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formDatasetDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Entrez la description du Dataset" value={newDatasetDescription} onChange={(e) => setNewDatasetDescription(e.target.value)} />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button className='custom-button' onClick={handleNewDatasetSubmit}>
    Enregistrer
    </Button>
    <Button variant="secondary"  onClick={() => setShowNewDatasetModal(false)}>
      Annuler
    </Button>
  </Modal.Footer>
</Modal>
</>
  );
};

export default AnalyseSearchDatsetModal;
