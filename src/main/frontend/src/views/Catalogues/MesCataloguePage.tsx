import React, { useEffect, useState } from "react";
import { fetchModels, getModelsWithFilter } from "../../services/ModelService";
import ModelCard from "../../components/Card/ModelCard";
import ModelModal from "../../components/Modals/ModelModal";
import "./CataloguePage.css";
import { isTypeOnlyImportDeclaration } from "typescript";

import HeaderModel from "../../components/HeaderList/HeaderModel";
const MesCataloguePage: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  useEffect(() => {
    fetchModels()
      .then((data) => setModels(data))
      .catch((error) => console.error("Error fetching models:", error));
  }, []);

  // useEffect(() => {
  //   // Fetch service information from Consul when the component mounts
  //   fetchServiceInfo();
  // }, []);

  // const fetchServiceInfo = async () => {
  //   try {
  //     const response = await fetch('http://127.0.0.1:8500/v1/catalog/service/models');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch service information from Consul');
  //     }
  //     const data = await response.json();
  //     setModels(data);
  //   } catch (error) {
  //     console.error('Error fetching service information from Consul:', error);
  //   }
  // };
  const [filters, setFilters] = useState({
    nomModel: "",
    typeModel: "",
    searchTerm: "",
  });
  const handleCardClick = (model: Model) => {
    setSelectedModel(model);
  };

  const closeModal = () => {
    setSelectedModel(null);
  };
  useEffect(() => {
    if (filters.nomModel || filters.typeModel || filters.searchTerm) {
      getModelsWithFilter(
        filters.nomModel,
        filters.typeModel,
        filters.searchTerm
      )
        .then(setModels)
        .catch((error) => console.error("Error fetching projects:", error));
    } else {
      fetchModels()
        .then(setModels)
        .catch((error) => console.error("Error fetching projects:", error));
    }
  }, [filters]); // Écoute les changements de filtres

  const handleFilter = (
    typeModel: string,
    searchTerm: string,
    nomModel: string
  ) => {
    setFilters({ typeModel, searchTerm, nomModel });
  };

  return (
    <div className="catalog-page">
      <div
        style={{ color: "var(--primary-text-color)" }}
        className="content-head"
      >
        <h2>Catalogue des modéles</h2>
      </div>
      <hr />
      <HeaderModel onFilter={handleFilter}></HeaderModel>
      <div className="model-list-container">
        <div className="row row-cols-1 row-cols-md-3">
          {models.map((model) => (
            <div key={model.name} className="col mb-4">
              <ModelCard model={model} onClick={() => handleCardClick(model)} />
            </div>
          ))}
        </div>
      </div>

      {selectedModel && (
        <ModelModal model={selectedModel} onClose={closeModal} />
      )}
    </div>
  );
};

export default MesCataloguePage;
