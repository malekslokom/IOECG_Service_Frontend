import "./NavBar.css";
import Toggle from "../Toggle/Toggle";
import useLocalStorage from "use-local-storage";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  theme: boolean;
  onThemeChange: (isDark: boolean) => void;
}

const NavBar = ({ theme, onThemeChange }: Props) => {
  const [isDark, setIsDark] = useLocalStorage("isDark", theme);

  return (
    <nav
      className="navbar navbar-expand"
      style={{
        backgroundColor: "var(--background-color)",
        boxShadow: "0px 4px 8px var(--shadow)",
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <img
            src="/assets/IRD.png"
            style={{ height: "70px", width: "auto" }}
          />
        </a>
        <div className="d-flex align-items-center">
          <Toggle
            isChecked={isDark}
            handleChange={(isChecked) => {
              setIsDark(isChecked);
              onThemeChange(isChecked);
            }}
          />
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="/assets/exemple-user.png"
                alt="User"
                style={{ width: "40px", height: "40px" }}
              />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <h5 className="dropdown-header">
                  Andy
                  <br />
                  <small>andy@gmail.com</small>
                </h5>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <SettingsIcon /> Paramètres
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <LogoutIcon /> Déconnexion
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
