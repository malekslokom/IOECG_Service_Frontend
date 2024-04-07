import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Plot from 'react-plotly.js';

interface ECGPlotModalProps {
  ecgData:  number[][] ;
  onClose: () => void;
}

const ECGPlotModal: React.FC<ECGPlotModalProps> = ({ ecgData, onClose }) => {
  const handleClose = () => {
    console.log("Close button clicked");
    onClose();
  };
  
  const renderSubplots = () => {
    if (!ecgData || ecgData.length === 0) {
      return <div>No data available</div>;
    }
  
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
  };
  
  return (
    <Modal show onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>ECG Plot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderSubplots()}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ECGPlotModal;