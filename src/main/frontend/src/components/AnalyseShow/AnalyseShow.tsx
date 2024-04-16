import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AnalyseDatsetModal from "../Modals/Analyse/AnalyseDatsetModal";
import AnalyseSearchDatsetModal from "../Modals/Analyse/AnalyseSearchDatsetModal";
import { useParams } from "react-router-dom";
import { fetchAnalyseModels } from "../../services/AnalyseService";
import {
  addModelAnalyse,
  deleteModelAnalyse,
} from "../../services/AnalyseService";
import AnalyseModelModal from "../Modals/Analyse/AnalyseModelModal";
import { Numbers } from "@mui/icons-material";

const AnalyseShow = () => {
  const [showModalDataset, setShowModalDataset] = useState(false);
  const [ShowModalSearchDataset, setShowModalSearchDataset] = useState(false);
  const [showModalModel, setShowModalModel] = useState(false);

  const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>([]);
  const [selectedModels, setSelectedModels] = useState<Model[]>([]);
  const [availableDatasets, setAvailableDatasets] = useState<Dataset[]>([]);
  //const [datasets, setDatasets] = useState<Dataset[]>(selectedDatasets);

  const { id } = useParams();
  const [datasets, setDatasets] = useState<DatasetAnalyse[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  console.log(id);
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(`/api/analyses/${id}/datasets`);
        if (!response.ok) {
          throw new Error("Failed to fetch datasets");
        }
        const data = await response.json();
        setDatasets(data);
      } catch (error) {
        console.error("Error fetching datasets:", error);
      }
    };

    const fetchAnalyseModels = async () => {
      try {
        const response = await fetch(`/api/analyses/${id}/models`);
        if (!response.ok) {
          throw new Error("Failed to fetch models");
        }
        const data = await response.json();
        setModels(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchDatasets();
    fetchAnalyseModels();
  }, [id]);

  const handleOpenModalDataset = () => {
    setShowModalDataset(true);
  };
  const handleOpenModalModel = () => {
    setShowModalModel(true);
  };

  const handleOpenModalSearchDataset = () => {
    setShowModalSearchDataset(true);
  };
  const closeModal = () => {
    setShowModalDataset(false);
  };

  const closeModalModel = () => {
    setShowModalModel(false);
  };
  const closeModalSearchDataset = () => {
    setShowModalSearchDataset(false);
  };

  // Function to add new datasets
  const handleAddDatasetToAnalyse = async (newDatasets: Dataset[]) => {
    try {
      const response = await fetch(`/api/analyses/${id}/datasets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDatasets),
      });

      if (!response.ok) {
        throw new Error("Failed to add datasets");
      }

      const data = await response.json();
      setDatasets(data);
    } catch (error) {
      console.error("Error adding datasets:", error);
    }
  };
  const handleAddModelToAnalyse = async (newModels: Model[]) => {
    const analyseId = id ? parseInt(id, 10) : -1;
    addModelAnalyse(analyseId, newModels)
      .then((data) => setModels(data))
      .catch((error) => console.error("Error fetching models", error));
  };
  const handleDeleteModelToAnalyse = async (modelId: number) => {
    const analyseId = id ? parseInt(id, 10) : -1;

    await deleteModelAnalyse(analyseId, modelId);
    // Remove the deleted dataset from the state
    setModels((prevModels) =>
      prevModels.filter((model) => model.id !== modelId)
    );
  };

  const handleDeleteDatasetAnalyse = async (datasetId: number) => {
    try {
      const response = await fetch(
        `/api/analyses/${id}/datasets/${datasetId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete dataset");
      }
      // Remove the deleted dataset from the state
      setDatasets((prevDatasets) =>
        prevDatasets.filter((dataset) => dataset.id_dataset !== datasetId)
      );
    } catch (error) {
      console.error("Error deleting dataset:", error);
    }
  };
  const handleAddSearchDatasetToAnalyse = async (newDatasets: Dataset[]) => {};
  return (
    <div className="my-5">
      <div
        className="container-fluid rounded border "
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <div
          className=" p-3"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button
            className="btn mb-10"
            style={{
              backgroundColor: "var(--toggle-fg-before-hover)",
              color: "var(--background-color)",
              height: "37px",
              width: "121px",
            }}
            onClick={handleOpenModalSearchDataset}
          >
            Recherche
          </button>
        </div>
        <div className="row ">
          <div className="col-md-6">
            <div
              className="rounded border p-3 position-relative shadow-sm"
              style={{ height: "50vh" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h5> Expériences</h5>
                <div className="mb-0">
                  <button
                    className="btn mb-10"
                    style={{ backgroundColor: "#E30613", color: "white" }}
                  >
                    Exécuter
                  </button>
                </div>
              </div>
              <hr style={{ color: "#555" }} />
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="rounded border p-3 position-relative shadow-sm"
              style={{ height: "50vh", overflowY: "auto" }}
            >
              <div className="d-flex align-items-center justify-content-between ">
                <h5> Datasets</h5>
                <div className="mt-1 me-2" onClick={handleOpenModalDataset}>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ color: "#E30613", fontSize: "1.2em" }}
                  />
                </div>
              </div>
              <hr style={{ color: "#555" }} />

              <Table>
                <tbody>
                  {datasets.map((dataset) => (
                    <tr
                      key={dataset.id_dataset}
                      className={
                        selectedDatasets.includes(dataset) ? "selected" : ""
                      }
                    >
                      <td style={{ width: "10px" }}>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <div style={{ whiteSpace: "nowrap" }}>
                          {dataset.name_dataset} ({dataset.numPatients}{" "}
                          patients, {dataset.numECGs} ECGs)
                        </div>
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="icon-trash"
                          onClick={() =>
                            handleDeleteDatasetAnalyse(dataset.id_dataset)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6 ">
            <div
              className="rounded border p-3 position-relative shadow-sm"
              style={{ height: "50vh" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h5> Rapports</h5>
                <div className="mb-0">
                  <button
                    className="btn px-2"
                    style={{ backgroundColor: "#E30613", color: "white" }}
                  >
                    Comparer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="rounded border p-3 position-relative shadow-sm"
              style={{ height: "50vh" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h5> Modèles</h5>
                <div className="mt-1 me-2" onClick={handleOpenModalModel}>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ color: "#E30613", fontSize: "1.2em" }}
                  />
                </div>
              </div>
              <hr style={{ color: "#555" }} />
              <Table>
                <tbody>
                  {models.map((model) => (
                    <tr
                      key={model.id}
                      className={
                        selectedModels.includes(model) ? "selected" : ""
                      }
                    >
                      <td style={{ width: "10px" }}>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <div style={{ whiteSpace: "nowrap" }}>
                          {model.name} {"(version "}
                          {model.architecture_version} ,{" projet "}{" "}
                          {model.project_name}
                          {")"}
                        </div>
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="icon-trash"
                          onClick={() => handleDeleteModelToAnalyse(model.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      {showModalDataset && (
        <AnalyseDatsetModal
          onCreate={handleAddDatasetToAnalyse}
          onClose={closeModal}
        />
      )}
      {ShowModalSearchDataset && (
        <AnalyseSearchDatsetModal
          onCreate={handleAddDatasetToAnalyse}
          onClose={closeModalSearchDataset}
        />
      )}
      {showModalModel && (
        <AnalyseModelModal
          onCreate={handleAddModelToAnalyse}
          onClose={closeModalModel}
        />
      )}
    </div>
  );
};

export default AnalyseShow;
