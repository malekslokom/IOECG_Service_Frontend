// StatsAccueil.tsx

import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./StatsAccueil.css";

interface StatsAccueilProps {
  icon: string;
  title: string;
  count: number;
  maxValue: number;
}

const StatsAccueil = ({ icon, title, count, maxValue }: StatsAccueilProps) => {
  const percentage = (count / maxValue) * 100 || 0;

  return (
    <div className="StatsAccueil">
      <div className="StatsAccueil-icon">
        <img src={icon} alt={title} />
      </div>
      <div className="StatsAccueil-content">
        <h3 className="StatsAccueil-title">{title}</h3>
        <div className="StatsAccueil-count">{count} total créé</div>
        <ProgressBar percentage={percentage} />
      </div>
    </div>
  );
};

export default StatsAccueil;
