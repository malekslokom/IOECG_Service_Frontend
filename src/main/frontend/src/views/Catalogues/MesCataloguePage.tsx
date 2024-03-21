import React, { useEffect, useState } from 'react';
import { fetchModels } from '../../services/ModelService';
import ModelCard from '../../components/Card/ModelCard';
import ModelModal from '../../components/Modals/ModelModal';
import './CataloguePage.css'
import HeaderModel from '../../components/HeaderList/HeaderModel';

const MesCataloguePage: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  useEffect(() => {
    fetchModels()
      .then(data => setModels(data))
      .catch(error => console.error('Error fetching models:', error));
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

  const handleCardClick = (model: Model) => {
    setSelectedModel(model);
  };

  const closeModal = () => {
    setSelectedModel(null);
  };

  return (
    <div className='catalog-page'>
        <div className="content-head">
            <h2>Catalogue des modéles</h2>
        </div>
        <hr />
        <HeaderModel></HeaderModel>
        <div className="model-list-container">
          <div className="row row-cols-1 row-cols-md-3">
          {models.map(model => (
            <div key={model.name} className="col mb-4">
              <ModelCard model={model} onClick={() => handleCardClick(model)} />
            </div>
          ))}
        </div>
        </div>

        

        {selectedModel && <ModelModal model={selectedModel} onClose={closeModal} />}
    </div>
  );
};

export default MesCataloguePage;
