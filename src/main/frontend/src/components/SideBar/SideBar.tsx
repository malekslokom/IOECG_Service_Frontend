import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import HistoryIcon from "@mui/icons-material/History";
import DatasetIcon from "@mui/icons-material/Dataset";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./SideBar.css";

const SideBar = () => {
  const [showProjects, setShowProjects] = useState(false);

  const toggleProjects = () => {
    setShowProjects(!showProjects);
  };

  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-3" id="side_nav">
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button
            className="nav-link d-flex align-items-center"
            onClick={toggleProjects}
          >
            <HomeIcon />
            <span className="sidebar-text d-none d-lg-inline"><Link to="/projets">Projets</Link></span>
            <ExpandMoreIcon
              className={`expand-icon ${!showProjects ? "rotate" : ""}`}
            />
          </button>
          {showProjects && (
            <ul className="nav flex-column">
              <li>
                <Link
                  className="nav-link d-flex align-items-center"
                  to="/projets/catalogues"
                >
                  <span className="ms-4">Catalogues</span>
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link d-flex align-items-center"
                  to="/projets/analyses"
                >
                  <span className="ms-4">Analyses</span>
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link d-flex align-items-center"
                  to="/projets/rapports"
                >
                  <span className="ms-4">Rapports</span>
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link d-flex align-items-center"
                  to="/projets/datasets"
                >
                  <span className="ms-4">Datasets</span>
                </Link>
              </li>
            </ul>
          )}
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
