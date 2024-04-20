import React, { useState, useEffect, useRef } from "react";
import { fetchDatasetsIRD } from "../../../services/DatasetService";
import { Modal, Button, Table } from "react-bootstrap";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import * as Papa from "papaparse";
import "./ImportDataset.css";

interface ImportDatasetModelProps {
  onClose: () => void;
  onCreate: (newDatasets: Dataset) => void;
}

const ImportDatasetModel: React.FC<ImportDatasetModelProps> = ({
  onClose,
  onCreate,
}) => {
  const [listDatasets, setListDatasets] = useState<Dataset[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const datasetsPerPage = 5;
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDatasetsIRD()
      .then((data) => setListDatasets(data))
      .catch((error) => console.error("Error fetching datasets:", error));
  }, []);
  const addDataset = (dataset: Dataset) => {
    onCreate(dataset);
    console.log("Ajouter dataset", dataset);
  };

  const datasetsToShow = listDatasets.slice(
    currentPage * datasetsPerPage,
    (currentPage + 1) * datasetsPerPage
  );
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      Papa.parse<Dataset>(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const newDatasets = results.data.map((item, index) => ({
            id_dataset: Math.random(), // Generate a unique ID for each dataset
            created_at: new Date().toISOString(),
            name_dataset: item.name_dataset,
            description_dataset: item.description_dataset,
            type_dataset: item.type_dataset || "standard", // Default to 'standard' if not specified
            study_name: item.study_name,
            source_name: item.source_name,
            leads_name: item.leads_name,
            study_details: item.study_details,
          }));

          // Append new datasets to the existing list
          setListDatasets((prevDatasets) => [...prevDatasets, ...newDatasets]);
        },
      });
    }
  };

  return (
    <Modal
      show
      onHide={onClose}
      size="xl"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Importer Datasets</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recherche"
            />
            <Button variant="outline-secondary">Filter</Button>
          </div>
          <div className="d-flex justify-content-center">
            <div
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                width: "100%",
                margin: "auto",
              }}
            >
              <p style={{ textAlign: "center", fontWeight: "bold" }}>
                Faites glisser et déposez un fichier ici
              </p>
              <div className="text-center">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
                <Button
                  variant="outline-danger"
                  className="customButton"
                  style={{
                    padding: "10px",
                    fontWeight: "bold",
                  }}
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                >
                  Choisir fichier
                </Button>
              </div>
            </div>
          </div>
          <Table striped bordered hover responsive className="mt-3">
            <thead style={{ backgroundColor: "black", color: "white" }}>
              <tr>
                <th>Nom</th>
                <th>Date création</th>
                <th>Description</th>
                <th>Nom étude</th>
                <th>Nom source</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {datasetsToShow.map((dataset, index) => (
                <tr key={index}>
                  <td>{dataset.name_dataset}</td>
                  <td>{dataset.created_at}</td>
                  <td>{dataset.description_dataset}</td>
                  <td>{dataset.study_name}</td>
                  <td>{dataset.source_name}</td>
                  <td>
                    <AddCircleOutlineIcon
                      onClick={() => addDataset(dataset)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <Button
              disabled={currentPage <= 0}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Préc
            </Button>
            <Button
              disabled={
                (currentPage + 1) * datasetsPerPage >= listDatasets.length
              }
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Suiv
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImportDatasetModel;
