import React from 'react';
import { Modal } from 'react-bootstrap';
//import ECGPlotModal from '../Modals/ECG/ECGPlotModal';
import Plot from 'react-plotly.js';
interface ShowECGModalProps {
  show: boolean;
  onClose: () => void;
  ecg_lead: PatientEcgData|null; // Assurez-vous de définir correctement le type ECG
}

  
 
 
  
const ShowECGModal: React.FC<ShowECGModalProps> = ({ show, onClose, ecg_lead }) => {
  const closeModal = () => {};

  let ecgData: number[][] = []; // Initialisation avec une valeur par défaut

  if (ecg_lead !== null) {
    ecgData = [
      ecg_lead.lead_i, ecg_lead.lead_ii, ecg_lead.lead_iii,
      ecg_lead.lead_avr, ecg_lead.lead_avf, ecg_lead.lead_avl,
      ecg_lead.lead_v1, ecg_lead.lead_v2, ecg_lead.lead_v3,
      ecg_lead.lead_v4, ecg_lead.lead_v5, ecg_lead.lead_v6,
      ecg_lead.lead_x, ecg_lead.lead_y, ecg_lead.lead_z,
      ecg_lead.lead_es, ecg_lead.lead_as, ecg_lead.lead_ai
    ];
    console.log(ecgData);
  }
////plot 
const renderSubplots = () => {
  
 
    
  
  if (ecgData && ecgData.length !== 0) {
    const plots: JSX.Element[] = [];
    const numPlotsPerRow = 2;
    console.log(ecgData.length)
    const numRows = Math.ceil(ecgData.length / numPlotsPerRow);
  
    for (let i = 0; i < numRows; i++) {
      const plotsInRow: JSX.Element[] = [];
  
      for (let j = 0; j < numPlotsPerRow; j++) {
        const dataIndex = i * numPlotsPerRow + j;
        if (dataIndex < Object.keys(ecgData).length) {
          const leadData = ecgData[dataIndex];
          const subplotData = {
            x: Array.from({ length: leadData.length }, (_, w) => w + 1),
            y: leadData, // Using leadData as y-values
            type: 'scatter',
            mode: 'lines',
            name: `Lead ${dataIndex + 1}`, // Naming the plot
          };
          const layout = {
            title: `Lead ${dataIndex + 1}`, // Title of the plot
            // width: 400, // Width of each plot
            // height: 300, // Height of each plot
            // margin: { l: 40, r: 40, t: 40, b: 40 },
          };
  
          plotsInRow.push(
            <div key={dataIndex} className="col-md-6">
              <Plot
                data={[subplotData as any]}
                layout={layout}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
                
              />
            </div>
          );
        }
      }
  
      plots.push(<div key={i} className="row">{plotsInRow}</div>);
    }
  
    return plots;
  }
  return (
    <div className="text-center p-3">
      <p className="text-muted">No data available</p>
    </div>
  );
}

  return (
    <Modal show={show} onHide={onClose}  size="xl" dialogClassName="modal-dialog-scrollable"> 
    <Modal.Header closeButton>
        <Modal.Title>ECG Plot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderSubplots()}
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
  
    </Modal>
  );
};


export default ShowECGModal;
