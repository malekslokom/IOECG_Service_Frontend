// ProgressBar.js

import React from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div className="progress-circle">
      <div
        className="progress"
        style={{ transform: `rotate(${percentage * 3.6}deg)` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
