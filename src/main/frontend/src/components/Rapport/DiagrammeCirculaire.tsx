import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface PredictionData {
  [key: string]: number;
}

interface DiagrammeCirculaireProps {
  predictions: PredictionData;
}

const DiagrammeCirculaire: React.FC<DiagrammeCirculaireProps> = ({ predictions }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar', // Utilise un histogramme au lieu d'un diagramme circulaire
          data: {
            labels: Object.keys(predictions),
            datasets: [{
              label: 'Répartition des Prédictions',
              data: Object.values(predictions),
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                // Ajoutez plus de couleurs si nécessaire
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                // Correspondant aux couleurs de fond
              ],
              borderWidth: 1
            }]
          },
          options: {
            indexAxis: 'y', // Définit l'axe des catégories sur l'axe Y
            scales: {
              y: {
                beginAtZero: true // Commence l'axe Y à zéro
              }
            }
          }
        });
      }
    }
  }, [predictions]);

  return <canvas ref={canvasRef} width={400} height={300} />;
};

export default DiagrammeCirculaire;
