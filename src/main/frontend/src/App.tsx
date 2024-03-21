import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import ListProjetsPage from "./views/Projets/ListProjets/ListProjetsPage";
import CatalogueProjetPage from "./views/Projets/Catalogues/CatalogueProjetPage";
import DatasetProjetPage from "./views/Projets/Datasets/DatasetProjetPage";
import AnalyseProjetPage from "./views/Projets/Analyses/AnalyseProjetPage";
import RapportProjetPage from "./views/Projets/Rapports/RapportProjetPage";
import MesCataloguePage from "./views/Catalogues/MesCataloguePage";
import HistoriquePage from "./views/Historique/HistoriquePage";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import MesDatasetPage from "./views/Datasets/MesDatasetPage";
import ConsulterAnalyse from "./views/Projets/Analyses/ConsulterAnalyse";
import AccueilPage from "./views/Accueil/AccueilPage";
import ConsulterProjetPage from "./views/Projets/ListProjets/ConsulterProjetPage";
import ListEcgPage from "./views/Projets/Ecg/ListEcgPage";
import ConsulterRapport from "./views/Projets/Rapports/ConsulterRapport";

function App() {
  const [isDark, setIsDark] = useState(() => {
    const themePreference = localStorage.getItem("themePreference");
    return themePreference
      ? JSON.parse(themePreference)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("themePreference", JSON.stringify(isDark));
  }, [isDark]);

  const handleThemeChange = (isChecked: boolean) => {
    setIsDark(isChecked);
  };

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <BrowserRouter>
        <NavBar theme={isDark} onThemeChange={handleThemeChange} />
        <SideBar />
        <div className="content">
          <Routes>
            <Route path="/home" element={<AccueilPage />} />
            <Route path="/projets" element={<ListProjetsPage />} />
            <Route
              path="/projets/catalogues"
              element={<CatalogueProjetPage />}
            />
            <Route path="/projets/datasets" element={<DatasetProjetPage />} />
            <Route path="/projets/analyses" element={<AnalyseProjetPage />} />
            <Route path="/projets/rapports" element={<RapportProjetPage />} />
            <Route path="/mes-catalogues" element={<MesCataloguePage />} />
            <Route path="/mes-datasets" element={<MesDatasetPage />} />
            <Route path="/projets/:id" element={<ConsulterProjetPage />} />

            <Route path="/historique" element={<HistoriquePage />} />
            {/* Autres routes */}
            <Route path="projets/analyses/:id" element={<ConsulterAnalyse />} />
            <Route path="projets/datasets/:id/ecg" element={<ListEcgPage />} />
            <Route path="projets/rapports/:id" element={<ConsulterRapport />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
