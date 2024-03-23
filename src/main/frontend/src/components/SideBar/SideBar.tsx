import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import HistoryIcon from "@mui/icons-material/History";
import DatasetIcon from "@mui/icons-material/Dataset";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import "./SideBar.css";

const SideBar = () => {
  const [showProjects, setShowProjects] = useState(false);

  const toggleProjects = () => {
    setShowProjects(!showProjects);
  };

  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-3" id="side_nav">
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link
            to="/projets"
            className="nav-link d-flex align-items-center"
          >
            <HomeIcon />
            <span className="sidebar-text d-none d-lg-inline">
            Mes Projets
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/mes-catalogues"
            className="nav-link d-flex align-items-center"
          >
            <BookIcon />
            <span className="sidebar-text d-none d-lg-inline">
              Mes Catalogues
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/mes-analyses"
            className="nav-link d-flex align-items-center"
          >
            <AnalyticsIcon />
            <span className="sidebar-text d-none d-lg-inline">
              Mes Analyses
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/mes-datasets"
            className="nav-link d-flex align-items-center"
          >
            <DatasetIcon />
            <span className="sidebar-text d-none d-lg-inline">
              Mes Datasets
            </span>
          </Link>
        </li>
        <li>
          <Link to="/historique" className="nav-link d-flex align-items-center">
            <HistoryIcon />
            <span className="sidebar-text d-none d-lg-inline">Historique</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
