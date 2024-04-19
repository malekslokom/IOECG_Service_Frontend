import React, { useEffect, useState } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import ShowRapport from './ShowRapport';
import { predictionResult } from '../../services/RapportService';

interface ReportComparisonModalProps {
  show: boolean;
  onHide: () => void;
  selectedReports: number[];
}

const ReportComparisonModal: React.FC<ReportComparisonModalProps> = ({ show, onHide, selectedReports }) => {
  const [predictionData1, setPredictionData1] = useState<PredictionData | null>(null);
  const [predictionData2, setPredictionData2] = useState<PredictionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedReports.length === 2) {
          const [data1, data2] = await Promise.all(selectedReports.map(reportId => predictionResult(reportId)));
          setPredictionData1(data1);
          setPredictionData2(data2);
        }
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    fetchData();
  }, [selectedReports]);

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton className="bg-light">
        <h3 className="text-center text-dark mb-0">Comparaison des rapports</h3>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-4">
          <Col md={6}>
            <h5 className="text-center text-primary">Rapport 1</h5>
            <p className="text-center font-weight-bold">{predictionData1?.nom_experience}</p>
          </Col>
          <Col md={6}>
            <h5 className="text-center text-primary">Rapport 2</h5>
            <p className="text-center font-weight-bold">{predictionData2?.nom_experience}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {predictionData1?.predictions ? (
              <ShowRapport predictionData={predictionData1} modalSmall={true} />
            ) : (
              <div className="container mt-5">
                <div className="alert alert-dark text-center" role="alert">
                  <h4 className="alert-heading">Échec de génération du rapport</h4>
                  <p>Le rapport n'a pas pu être généré correctement.</p>
                  <p>Veuillez vérifier les données et réessayer.</p>
                </div>
              </div>
            )}
          </Col>
          <Col md={6}>
            {predictionData2?.predictions ? (
              <ShowRapport predictionData={predictionData2} modalSmall={true} />
            ) : (
              <div className="container mt-5">
                <div className="alert alert-dark text-center" role="alert">
                  <h4 className="alert-heading">Comparaison Impossible</h4>
                  <p>Échec de génération du rapport.</p>
                  <p>Le rapport n'a pas pu être généré correctement.</p>
                  <p>Veuillez vérifier les données et réessayer.</p>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ReportComparisonModal;
