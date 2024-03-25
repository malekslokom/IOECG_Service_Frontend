import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AnalyseDatsetModal from '../Modals/Analyse/AnalyseDatsetModal';
import { useParams } from 'react-router-dom';



const AnalyseShow = () => {
  const [showModalDataset, setShowModalDataset] = useState(false);
  const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>([]);
  const [availableDatasets, setAvailableDatasets] = useState<Dataset[]>([]);
  //const [datasets, setDatasets] = useState<Dataset[]>(selectedDatasets);

  const { id } = useParams(); // Extracting analysisId from URL params
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  console.log(id)
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(`/api/analyses/${id}/datasets`);
        if (!response.ok) {
          throw new Error('Failed to fetch datasets');
        }
        const data = await response.json();
        setDatasets(data);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    fetchDatasets();
  }, [id]);
  console.log(datasets)


  const handleOpenModalDataset = () => {
    setShowModalDataset(true);
  }
  const closeModal = () => {
    setShowModalDataset(false);
  };

  // Function to add new datasets
  const handleCreateDataset = async (newDatasets: Dataset[]) => {
    // Add the newly created datasets to the list of selected datasets for the analysis
   //setSelectedDatasets(prevDatasets => [...prevDatasets, ...newDatasets]);

    // Update the datasets array with the new datasets
    //setDatasets(prevDatasets => [...prevDatasets, ...newDatasets]);
    try {
        // Appeler l'API backend pour ajouter de nouvelles datasets à l'analyse
        const response = await fetch(`/api/analyses/${id}/datasets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDatasets)
        });

        if (!response.ok) {
            throw new Error('Failed to add datasets');
        }

        // Rafraîchir les données des datasets de l'analyse après l'ajout des nouvelles datasets
        const data = await response.json();
        setDatasets(data);
    } catch (error) {
        console.error('Error adding datasets:', error);
    }
  };

  
    return (    
    	 <div className="my-5">
      <div className="container-fluid rounded border " style={{backgroundColor:'white'}}>
      <div className=" p-3" style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          className="btn mb-10"
          style={{
            backgroundColor: "var(--toggle-fg-before-hover)",
            color: "white",
            height: "37px",
            width: "121px",
          }}
        >
          Recherche
        </button>
      </div>
        <div className="row " >

          <div className="col-md-8">
          <div className="rounded border p-3 position-relative shadow-sm" style={{ height: "50vh" }}>
          <div className="d-flex align-items-center justify-content-between">
            <h5 > Expériences</h5>
            <div className="mb-0">
              <button className="btn mb-10" style={{backgroundColor:"#E30613", color:"white"}}>Exécuter</button>
            </div>
            </div>
            <hr style={{color:"#555"}}/>
          </div>
          </div>

          <div className="col-md-4">
          <div className="rounded border p-3 position-relative shadow-sm" style={{ height: "50vh" }}>
          <div className="d-flex align-items-center justify-content-between">
            <h5> Datasets</h5>
            <div className="mt-1 me-2" onClick={handleOpenModalDataset}>
              <FontAwesomeIcon icon={faPlusCircle}  style={{color:"#E30613", fontSize: '1.2em'}} />
            </div>
            </div>
            <hr style={{color:"#555"}}/>
            
            <Table>
              <tbody>
                {datasets.map(dataset => (
                  <tr key={dataset.idDataset} className={selectedDatasets.includes(dataset) ? 'selected' : ''}>
                    <td style={{ width: '10px' }}>
                      <input
                        type="checkbox"
                         />
                    </td>
                    <td>
                      <div style={{ whiteSpace: 'nowrap' }}>{dataset.nameDataset}</div>
                    </td>
                  </tr>
                ))}
                </tbody>
            </Table>
             
          </div>
          </div>

        </div>

        <div className="row mt-3" >
          <div className="col-md-8 ">
          <div className="rounded border p-3 position-relative shadow-sm" style={{ height: "50vh" }}>
            <div className="d-flex align-items-center justify-content-between">
            <h5> Rapports</h5>
            <div className="mb-0">
              <button className="btn px-2" style={{backgroundColor:"#E30613", color:"white"}}>Comparer</button>
            </div>
            </div>
            <hr style={{color:"#555"}}/>
          </div>
          </div>
          <div className="col-md-4">
          <div className="rounded border p-3 position-relative shadow-sm" style={{ height: "50vh" }}>
            <div className="d-flex align-items-center justify-content-between"> 
            <h5> Modèles</h5>
            <div className="mt-1 me-2">
              <FontAwesomeIcon icon={faPlusCircle}  style={{color:"#E30613", fontSize: '1.2em'}}/>
            </div>
            </div>
            <hr style={{color:"#555"}}/>
            </div>
           
          </div>
        </div>


      </div>
      {showModalDataset && <AnalyseDatsetModal onCreate={handleCreateDataset} onClose={closeModal} />}
      </div>



     );
}

export default AnalyseShow;
