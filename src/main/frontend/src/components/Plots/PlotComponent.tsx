import React from 'react';
import Plot from 'react-plotly.js';

interface PlotProps {
  data: number[];
}

const PlotComponent: React.FC<PlotProps> = ({ data }) => {
  const xValues = Array.from({ length: data.length }, (_, i) => i + 1);
  const yValues = data;

  return (
    <Plot
      data={[
        {
          type: 'scatter',
          mode: 'lines',
          x: xValues,
          y: yValues,
          marker: { color: 'blue' },
        },
      ]}
      layout={{
        // width: 550,
        // height: 300,
        title: 'ECG Plot',
        xaxis: { title: 'Time' },
        yaxis: { title: 'Amplitude' },
        
      }}
      useResizeHandler={true}
      style={{width: "100%", height: "100%"}}
    />
  );
};

export default PlotComponent;
