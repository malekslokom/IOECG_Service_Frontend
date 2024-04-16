import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
//import datasets from './datasetFakeData';
import Table from "react-bootstrap/Table";
import HeaderDataset from "../../HeaderList/HeaderDataset";
import PlotComponent from "../../Plots/PlotComponent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ECGPlotModal from "../ECG/ECGPlotModal";

interface AnalyseDatsetModalProps {
  onClose: () => void;
  onCreate: (newDatasets: Dataset[]) => void;
}

const AnalyseDatsetModal: React.FC<AnalyseDatsetModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>([]);
  const [selectedECGs, setSelectedECGs] = useState<ECG[]>([]);
  const [showNewDatasetModal, setShowNewDatasetModal] =
    useState<boolean>(false);
  const [newDatasetName, setNewDatasetName] = useState<string>("");
  const [newDatasetDescription, setNewDatasetDescription] =
    useState<string>("");
  const [sectionVisibility, setSectionVisibility] = useState<{
    [key: number]: boolean;
  }>({});

  const { id } = useParams(); // Extracting analysisId from URL params
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [ecgDataForModal, setEcgDataForModal] = useState<any>(null);
  const [showECGModal, setShowECGModal] = useState(false);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(`/api/datasets/`);
        if (!response.ok) {
          throw new Error("Failed to fetch datasets");
        }
        const data = await response.json();
        setDatasets(data);
      } catch (error) {
        console.error("Error fetching datasets:", error);
      }
    };

    fetchDatasets();
  }, [id]);
  console.log(datasets);

  const toggleSectionVisibility = (datasetId: number) => {
    setSectionVisibility((prevVisibility) => ({
      ...prevVisibility,
      [datasetId]: !prevVisibility[datasetId],
    }));
  };

  const handleECGSelection = (ecg: ECG) => {
    setSelectedECGs((prevSelectedECGs) => {
      const index = prevSelectedECGs.findIndex(
        (selectedECG) => selectedECG.id === ecg.id
      );
      if (index !== -1) {
        return prevSelectedECGs.filter(
          (selectedECG) => selectedECG.id !== ecg.id
        );
      } else {
        return [...prevSelectedECGs, ecg];
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(selectedDatasets);
    console.log(selectedECGs);
    console.log(selectedDatasets);
    onClose();
  };

  const handleShowEcg = (ecgDataForCurrentRow: any) => {
    setShowECGModal(true);
    setEcgDataForModal(ecgDataForCurrentRow);
  };

  const handleCheckboxChange = (dataset: Dataset) => {
    const newSelectedDatasets = selectedDatasets.includes(dataset)
      ? selectedDatasets.filter((item) => item !== dataset)
      : [...selectedDatasets, dataset];

    setSelectedDatasets(newSelectedDatasets);

    setSectionVisibility((prevVisibility) => ({
      ...prevVisibility,
      [dataset.id_dataset]: newSelectedDatasets.includes(dataset),
    }));
  };

  const handleClose = () => {
    setSelectedDatasets([]); // Clear selected ECGs
    setSelectedECGs([]); // Clear selected ECGs
    onClose(); // Close the modal
  };

  const closeModal = () => {
    setShowECGModal(false);
    setEcgDataForModal([]);
  };
  return (
    <>
      <Modal show onHide={onClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Ajouter datasets à l'analyse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-4 ">
              <Table>
                <tbody>
                  {datasets.map((dataset) => (
                    <tr
                      key={dataset.id_dataset}
                      className={
                        selectedDatasets.includes(dataset)
                          ? "selected rounded border position-relative shadow-sm"
                          : "rounded border position-relative shadow-sm"
                      }
                    >
                      <td style={{ width: "10px" }}>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(dataset)}
                          checked={selectedDatasets.includes(dataset)}
                        />
                      </td>
                      <td>
                        <div
                          className="text-wrap"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {dataset.name_dataset}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="col-md-8">
              {/* <div className="alert alert-danger" role="alert">
            Veuillez sélectionner un ou plusieurs datasets à ajouter à l'analyse 
          </div> */}
              {/* <HeaderDataset></HeaderDataset> */}
              {selectedDatasets.map((dataset) => (
                <div key={dataset.id_dataset}>
                  <div className="modal-section">
                    <div
                      className="modal-section-title"
                      onClick={() =>
                        toggleSectionVisibility(dataset.id_dataset)
                      }
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <p
                        style={{
                          marginRight: "10px",
                          marginBottom: "0",
                          color: "#4A8BC5",
                        }}
                      >
                        {dataset.name_dataset}
                      </p>
                      <ExpandMoreIcon />
                    </div>

                    {sectionVisibility[dataset.id_dataset] && (
                      <div className="section-box">
                        <div className="input-group mb-3">
                          <span className="input-group-text">Description</span>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              dataset.description_dataset ??
                              "Aucune description disponible"
                            }
                            readOnly
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">Type</span>
                          <input
                            type="text"
                            className="form-control"
                            value={dataset.type_dataset}
                            readOnly
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            Noms des fils
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            value={dataset.leads_name}
                            readOnly
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            Nom de l'étude
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            value={dataset.study_name}
                            readOnly
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            Détails de l'étude
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              dataset.study_details ??
                              "Aucun détail de l'étude disponible"
                            }
                            readOnly
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            Nom de la source
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            value={dataset.source_name}
                            readOnly
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            Détails de la source
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              dataset.source_details ??
                              "Aucun détail de la source disponible"
                            }
                            readOnly
                          />
                        </div>

                        {/* <div className="input-group mb-3">
                      <span className="input-group-text col col-12">Les ECGs</span>
                    </div> */}
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
                          {/* <Form onSubmit={handleSubmit}>
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
                                <th></th>
                              </tr>
                              </thead>
                          <tbody>
                              {filteredData.data.map(dataset => (
                                <tr key={dataset.id_dataset}>
                                  <td>
                                    <Form.Check
                                      type="checkbox"
                                     
                                      onChange={() => handleECGSelection(dataset.id_ecg)} checked={selectedECGs.includes(dataset.id_ecg)}
                                    />
                                  </td>
                                  <td>{dataset.age}</td>
                                  <td>{dataset.height}</td>
                                  <td>{dataset.weight}</td>
                                  <td>{dataset.sex}</td>
                                  <td>{dataset.name_dataset}</td>
                                 
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
                          
                        </Form> */}
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
            <Button type="submit" className="custom-button">
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
