import React from 'react';

const StatSparkline = ({ color, data }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 60;
  const height = 30;

  // Simple SVG bar chart for sparkline
  return (
    <svg width={width} height={height} className="sparkline-container">
      {data.map((val, i) => {
        const barHeight = ((val - min) / range) * height + 2; // +2 for minimum height
        const x = i * (width / data.length);
        const y = height - barHeight;
        return (
          <rect key={i} x={x} y={y} width={(width / data.length) - 1} height={barHeight} fill={color} opacity={0.6} />
        );
      })}
    </svg>
  );
};

export default StatSparkline;
