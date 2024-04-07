import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
//import datasets from './datasetFakeData';
import Table from 'react-bootstrap/Table';
import HeaderDataset from '../../HeaderList/HeaderDataset';
import PlotComponent from '../../Plots/PlotComponent';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from 'react-router-dom';

interface AnalyseDatsetModalProps {
  onClose: () =>void;
  onCreate: (newDatasets: Dataset[]) => void;
}

const AnalyseDatsetModal: React.FC<AnalyseDatsetModalProps> = ({ onClose, onCreate }) => {
  const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>([]);
  const [selectedECGs, setSelectedECGs] = useState<ECG[]>([]);
  const [showNewDatasetModal, setShowNewDatasetModal] = useState<boolean>(false);
  const [newDatasetName, setNewDatasetName] = useState<string>('');
  const [newDatasetDescription, setNewDatasetDescription] = useState<string>('');
  const [sectionVisibility, setSectionVisibility] = useState<{ [key: string]: boolean }>({});


  const { id } = useParams(); // Extracting analysisId from URL params
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  console.log(id)
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(`/api/analyses/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch datasets');
        }
        const data = await response.json();
        setDatasets(data);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    fetchDatasets();
  }, [id]);
  console.log(datasets)

  const toggleSectionVisibility = (datasetId: number) => {
    setSectionVisibility(prevVisibility => ({
      ...prevVisibility,
      [datasetId]: !prevVisibility[datasetId]
    }));
  };

  
  
  const handleECGSelection = (ecg: ECG) => {
    setSelectedECGs(prevSelectedECGs => {

      const index = prevSelectedECGs.findIndex(selectedECG => selectedECG.id === ecg.id);
      if (index !== -1) {
        return prevSelectedECGs.filter(selectedECG => selectedECG.id !== ecg.id);
      } else {
        return [...prevSelectedECGs, ecg];
      }
    });
  };

  const createDatasetFromECGs = (ecgs: ECG[],newDatasetName:string,newDatasetDescription:string): Dataset => {
    const newDataset: Dataset = {
      idDataset:4,
      descriptionDataset:newDatasetDescription,
      typeDataset: 'search_results',
      nameDataset: newDatasetName, 
      //ecgs: ecgs,
      created_at: "string",
      leads_name: "string",
      study_name: "string",
      study_details: "null",
      source_name: "string",
      source_details: "null"
    };
    return newDataset;
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedECGs.length > 0) {
      setShowNewDatasetModal(true);
    }else{
    onCreate(selectedDatasets);
    console.log(selectedECGs);
    console.log(selectedDatasets);
    onClose();
    }
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


  const handleCheckboxChange = (dataset: Dataset) => {
    const newSelectedDatasets = selectedDatasets.includes(dataset)
      ? selectedDatasets.filter(item => item !== dataset)
      : [...selectedDatasets, dataset];
  
    setSelectedDatasets(newSelectedDatasets);
  
    setSectionVisibility(prevVisibility => ({
      ...prevVisibility,
      [dataset.idDataset]: newSelectedDatasets.includes(dataset)
    }));
  };
  
  
  const handleClose = () => {
    setSelectedDatasets([]); // Clear selected ECGs
    setSelectedECGs([]);// Clear selected ECGs
    onClose(); // Close the modal
  };

 
  return (
    <><Modal show onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Datasets</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-4">
            <Table>
              <tbody>
                {datasets.map(dataset => (
                  <tr key={dataset.idDataset} className={selectedDatasets.includes(dataset) ? 'selected' : ''}>
                    <td style={{ width: '10px' }}>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(dataset)}
                        checked={selectedDatasets.includes(dataset)} />
                    </td>
                    <td>
                      <div style={{ whiteSpace: 'nowrap' }}>{dataset.nameDataset}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

          </div>
          <div className="col-md-8">
            {/* <HeaderDataset></HeaderDataset> */}
            {selectedDatasets.map(dataset => (
              <div key={dataset.idDataset}>
                <div className="modal-section">

                <div className="modal-section-title" onClick={() => toggleSectionVisibility(dataset.idDataset)} style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ marginRight: '10px', marginBottom: '0' }}>
                    Informations sur {dataset.nameDataset}
                  </p>
                  <ExpandMoreIcon/>
                </div>

                {sectionVisibility[dataset.idDataset] && (
                  <div className="section-box">
               
                      <div className="input-group mb-3">
                        <span className="input-group-text">Description</span>
                        <input type="text" className="form-control" value={dataset.descriptionDataset ?? 'Aucune description disponible'} readOnly />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">Type</span>
                        <input type="text" className="form-control" value={dataset.typeDataset } readOnly />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">Noms des fils</span>
                        <input type="text" className="form-control" value={dataset.leads_name } readOnly />

                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">Nom de l'étude</span>
                        <input type="text" className="form-control" value={dataset.study_name } readOnly />

                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">Détails de l'étude</span>
                        <input type="text" className="form-control" value={dataset.study_details ?? 'Aucun détail de l\'étude disponible'} readOnly />          
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">Nom de la source</span>
                        <input type="text" className="form-control" value={dataset.source_name } readOnly />

                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">Détails de la source</span>
                        <input type="text" className="form-control" value={dataset.source_details ?? 'Aucun détail de la source disponible'} readOnly />

                      </div>



                    <div className="input-group mb-3">
                      <span className="input-group-text col col-12">Les ECGs</span>
                    </div>
                    <div className="input-group mb-3">

                      {/* <Table>
                        <tbody>
                          {dataset.ecgs.map(ecg => (
                            <tr key={ecg.id} className={selectedECGs.includes(ecg) ? 'selected' : ''}>
                              <td style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="checkbox" onChange={() => handleECGSelection(ecg)} checked={selectedECGs.includes(ecg)} />
                                <div style={{ whiteSpace: 'nowrap', marginLeft: '5px' }}>
                                  <h6 style={{ margin: 0 }}>
                                    Patient {ecg.patientId}
                                  </h6>
                                </div>
                              </td>
                              <td style={{ display: 'flex', alignItems: 'center' }}>
                                  <PlotComponent  data={ecg.data} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table> */}
                    </div>
                  </div>
                )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Form onSubmit={handleSubmit}>
          <Button type="submit" className='custom-button'>
            Ajouter
          </Button>
        </Form>
        <Button onClick={handleClose} variant="secondary">
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
</>
  );
};

export default AnalyseDatsetModal;
