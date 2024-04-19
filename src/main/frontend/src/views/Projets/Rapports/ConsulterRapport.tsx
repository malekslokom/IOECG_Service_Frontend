import React, { useState, useEffect } from 'react';
import ShowRapport from '../../../components/Rapport/ShowRapport';
import { predictionResult } from '../../../services/RapportService';
import { useParams } from 'react-router-dom';

const ConsulterRapport = () => {
    const [predictionData, setPredictionData] = useState<PredictionData>();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            const parseId = parseInt(id, 10);
            predictionResult(parseId)
                .then((data) => setPredictionData(data))
                .catch((error) => console.error("Error fetching analyses:", error));
        }
    }, [id]);
   
    return (
        <>
            {predictionData?.predictions ? (
                <ShowRapport predictionData={predictionData} />
                
            ) : (
              <div className="container mt-5">
              <div className="alert alert-dark text-center" role="alert" style={{ backgroundColor: '#ffffff' }}>
                  <h4 className="alert-heading">Échec de génération du rapport</h4>
                  <p className="mb-0">Le rapport n'a pas pu être généré correctement.</p>
                  <p className="mb-0">Veuillez vérifier les données et réessayer.</p>
              </div>
          </div>
            )}
        </>
    );
};

export default ConsulterRapport;
