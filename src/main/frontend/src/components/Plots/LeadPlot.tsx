import React from 'react';
import Plot from 'react-plotly.js';

interface LeadPlotProps {
  leadData: number[]; // Array of ECG data for the lead
  leadName: string; // Name of the lead
}

const LeadPlot: React.FC<LeadPlotProps> = ({ leadData, leadName }) => {
  return (
    <div className="lead-plot">
      <Plot
        data={[
          {
            y: leadData, // ECG data for the current lead
            type: 'scatter',
            mode: 'lines',
            line: { color: 'blue' }, // Adjust color as needed
            name: leadName, // Lead name as legend
          },
        ]}
        layout={{ width: 400, height: 300, title: leadName }} // Adjust width, height, and title as needed
      />
    </div>
  );
};

export default LeadPlot;
