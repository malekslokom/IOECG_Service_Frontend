
import "./ListProjets.css";

  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faSync, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';



import oeil from "../../assets/oeil.png";
import delete1 from "../../assets/delete.png";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material";

interface ListProjetsProps {
  projects: any[]; // liste des projets
}

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'var(--foreground-color)', // Couleur de votre choix
            color: 'white',
          },
        },
      },
    },
  },
});

const ListProjets = ({ projects}:ListProjetsProps) => {
    
      return (
        <div className="App">
        <div className="container-fluid">
          <h2>Projets</h2>
          <p><button>Créer</button></p>
          <br /> 
          <br/>
          
        
          
            <div className="col-12">
            <hr/>
             <div className="custom-menu">
              <button className="menu-item">
                <FontAwesomeIcon icon={faSync} style={{ fontSize: '1.5em', color: 'rgba(59,153,255,255)' }} />
              </button>

              <div className="menu-item">
                <input type="date" className="date-picker" />
              </div>

              <div className="menu-item">
                <input type="date" className="date-picker" />
              </div>

              <div className="menu-item">
                <select className="select-picker" defaultValue="Type">
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                </select>
              </div>

              <div className="menu-item">
                <select className="select-picker" defaultValue="Version">
                  <option value="v1">v1</option>
                  <option value="v2">v2</option>
                </select>
              </div>

              <button className="menu-item">
                <FontAwesomeIcon icon={faFilter} style={{ fontSize: '1.5em' }} />
                Filtre
              </button>

              <div className="menu-item search-input">
                <input
                  type="text"
                  placeholder="chercher ...."
                  className="search-box"
                />
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>  
            </div>
              <br/><br/>
              <br/><br/><br/>
            </div>

              
             
              <table className="table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Date création</th>
                    <th>Auteur</th>
                    <th>Version</th>
                    <th>Type</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={index}>
                      <td>{project.name}</td>
                      <td>{project.creationDate}</td>
                      <td>{project.author}</td>
                      <td>{project.version}</td>
                      <td>{project.type}</td>
                      <td><FontAwesomeIcon icon={faTrash} className="icon-trash" /></td>
                      <td><FontAwesomeIcon icon={faEye} className="icon-eye" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br/><br/><br/>
              <ThemeProvider theme={theme}>
                <div style={{ marginLeft:'1100px'}}>
                  <Stack spacing={2}>
                      <Pagination count={10} variant="outlined" shape="rounded" />
                  </Stack>
                </div>
            </ThemeProvider>
        </div>
  );
};

export default ListProjets;
