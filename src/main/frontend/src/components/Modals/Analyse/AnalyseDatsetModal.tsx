import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import datasets from './datasetFakeData';
import Table from 'react-bootstrap/Table';
import HeaderDataset from '../../HeaderList/HeaderDataset';
import PlotComponent from '../../Plots/PlotComponent';


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
      id: Date.now(), 
      description:newDatasetDescription,
      type:"Recherche",
      name: newDatasetName, 
      ecgs: ecgs,
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
    if (newDatasetName.trim() !== '') {
      const newDataset = createDatasetFromECGs(selectedECGs,newDatasetName,newDatasetDescription);
      setSelectedDatasets([newDataset]);
      onCreate([newDataset]);
      setShowNewDatasetModal(false);
      onClose();
    }
  };


  const handleCheckboxChange = (dataset: Dataset) => {
    if (selectedDatasets.includes(dataset)) {
      // Dataset already exists, so remove it
      setSelectedDatasets(prevSelectedDatasets => prevSelectedDatasets.filter(item => item !== dataset));
    } else {
      // Dataset doesn't exist, so add it
      setSelectedDatasets(prevSelectedDatasets => [...prevSelectedDatasets, dataset]);
    }
  };
  
  
  const handleClose = () => {
    setSelectedDatasets([]); // Clear selected ECGs
    setSelectedECGs([]);// Clear selected ECGs
    onClose(); // Close the modal
  };

 
  return (
    <><Modal show onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Datasets</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-3">
            <Table>
              <tbody>
                {datasets.map(dataset => (
                  <tr key={dataset.id} className={selectedDatasets.includes(dataset) ? 'selected' : ''}>
                    <td style={{ width: '10px' }}>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(dataset)}
                        checked={selectedDatasets.includes(dataset)} />
                    </td>
                    <td>
                      <div style={{ whiteSpace: 'nowrap' }}>{dataset.name}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

          </div>
          <div className="col-md-9">
            <HeaderDataset></HeaderDataset>
            {selectedDatasets.map(dataset => (
              <div key={dataset.id}>
                <div className="modal-section">
                  <p className="modal-section-title">Informations sur {dataset.name}</p>
                  <div className="section-box">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Description</span>
                      <input type="text" className="form-control" value={dataset.description} readOnly />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Type</span>
                      <input type="text" className="form-control" value={dataset.type} readOnly />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text col col-12">Les ECGs</span>
                    </div>
                    <div className="input-group mb-3">

                      <Table>
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
                      </Table>
                    </div>
                  </div>
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

export default AnalyseDatsetModal;
