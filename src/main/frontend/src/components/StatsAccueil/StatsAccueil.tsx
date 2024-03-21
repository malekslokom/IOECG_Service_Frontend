import "./StatsAccueil.css";

interface StatsAccueilProps {
    icon: string; // URL de l'icône
    title: string; // Le texte à afficher, comme "Projets"
    count: number; // Le nombre total à afficher
  }

const StatsAccueil = ({ icon, title, count }:StatsAccueilProps) => {
  return (
  
    <div className="StatsAccueil">
      <div className="StatsAccueil-icon">
        <img src={icon} alt={title} />
      </div>
      <div className="StatsAccueil-content">
        <h3 className="StatsAccueil-title">{title}</h3>
        <div className="StatsAccueil-count">{count} total créé</div>
      </div>
    </div>
  );
}

export default StatsAccueil