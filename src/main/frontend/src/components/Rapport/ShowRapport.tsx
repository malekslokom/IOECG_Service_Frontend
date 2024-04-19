import React, { useRef } from 'react';
import Plot from 'react-plotly.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ConfusionMatrix from './ConfusionMatrix';
import DiagrammeCirculaire from './DiagrammeCirculaire';

interface ShowRapportProps {
  predictionData: PredictionData;
  modalSmall?:boolean 
}

const ShowRapport: React.FC<ShowRapportProps> = ({ predictionData ,modalSmall}) => {
  const contentRef = useRef(null);

  const capturePDF = (predictionData: PredictionData) => {
    const content = contentRef.current;

    if (content) {
      html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(
          imgData,
          'PNG',
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight()
        );
        pdf.save(predictionData.nom_experience);
      });
    }
  };

  const { predictions, f1_score, matriceConfusion, datasets, models } = predictionData;

  return (
    <div className="p-4 bg-white text-dark">
      <div style={{ fontFamily: 'Montserrat, sans-serif' }} ref={contentRef}>
        {/* Identité de l'expérience */}
        <div className="mb-4 text-center">
          <h2 className="mb-2"> {predictionData.nom_experience}</h2>
          <p className="mb-1">Évaluation: {predictionData.evluation}</p>
          <p className="mb-0">Origine: {predictionData.analyse_onrigine}</p>
        </div>
        {/* Information de l'expérience */}
        <div className="card mb-3">
          <div className="card-header">
            <h5 className="card-title">Information de l'expérience</h5>
          </div>
          <div className="card-body">
            <div className="row">
            <div className={`col-md-${modalSmall ? '12' : '6'}`}>
                <h6 className="bg-primary text-white p-2">Dataset</h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Nombre d'ECG</th>
                        <th>Date de création</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datasets.map((dataset, index) => (
                        <tr key={index}>
                          <td>{dataset.title}</td>
                          <td>{dataset.description}</td>
                          <td>{dataset.ecgCount}</td>
                          <td>{dataset.creationDate}</td>
                          <td>{dataset.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`col-md-${modalSmall ? '12' : '6'}`}>
                <h6 className="bg-danger text-white p-2 mt-3 mt-md-0">Modèle</h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Nom du modèle</th>
                        <th>Précision</th>
                        <th>Domaine</th>
                        <th>Description </th>
                      </tr>
                    </thead>
                    <tbody>
                      {models.map((model, index) => (
                        <tr key={index}>
                          <td>{model.name}</td>
                          <td>{model.accuracy}</td>
                          <td>{model.trainingTime}</td>
                          <td>{model.parameters}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="card mb-3">
          <div className="card-header">
            <h5 className="card-title">Résultats</h5>
          </div>
          <div className="card-body">
            <div className="row">
            <div className={`col-md-${modalSmall ? '12' : '6'}`}>
                <div className="card mb-3">
                  <div className="card-header">
                    <h6>Plot</h6>
                  </div>
                  <div className="card-body">
                    <h3>Courbe de Prédiction</h3>
                    <Plot
                      data={[
                        {
                          x: Object.keys(predictions).map(key =>
                            parseInt(key)
                          ),
                          y: Object.values(predictions),
                          type: 'scatter',
                          mode: 'lines+markers',
                        },
                      ]}
                      layout={{}}
                    />
                  </div>
                </div>
              </div>
              <div className={`col-md-${modalSmall ? '12' : '6'}`}>
                <div className="card mb-3">
                  <div className="card-header">
                    <h6>Interprétation</h6>
                  </div>
                  <div className="card-body">
                    <div className="border p-3 mb-3">
                      <h3 className="mb-3">Performance Metrics</h3>
                      <p className="mb-1">Sensibilité : {f1_score.recall}</p>
                      <p className="mb-1">Précision : {f1_score.precision}</p>
                      <p className="mb-0">F1-score : {f1_score.f1_score}</p>
                    </div>
                    <div className="border p-3 mb-3">
                      <h3 className="mb-3">Confusion Matrix</h3>
                      <ConfusionMatrix
                        truePositives={matriceConfusion.vrais_positifs}
                        falsePositives={matriceConfusion.faux_positifs}
                        falseNegatives={matriceConfusion.faux_negatifs}
                        trueNegatives={matriceConfusion.vrais_negatifs}
                      />
                    </div>
                    <div className="border p-3">
                      <h3 className="mb-3">Distribution des Prédictions</h3>
                      <DiagrammeCirculaire predictions={predictions} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => capturePDF(predictionData)}
        style={{ fontFamily: 'Montserrat, sans-serif' }}
        className="btn btn-primary mt-3"
      >
        Télécharger PDF
      </button>
    </div>
  );
};

export default ShowRapport;
