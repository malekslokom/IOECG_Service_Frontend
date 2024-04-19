import React from 'react';

interface ConfusionMatrixProps {
  truePositives: number;
  falsePositives: number;
  falseNegatives: number;
  trueNegatives: number;
}

const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({ truePositives, falsePositives, falseNegatives, trueNegatives }) => {
  // Calculer la somme totale
  const total = truePositives + falsePositives + falseNegatives + trueNegatives;

  // Déterminer la couleur en fonction du pourcentage
  

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className= "bg-light text-dark p-2">Vrais Positifs:</td>
                <td >{truePositives}</td>
              </tr>
              <tr>
                <td >Faux Positifs:</td>
                <td >{falsePositives}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td >Faux Négatifs:</td>
                <td>{falseNegatives}</td>
              </tr>
              <tr>
                <td className="bg-light text-dark p-2">Vrais Négatifs:</td>
                <td >{trueNegatives}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;
