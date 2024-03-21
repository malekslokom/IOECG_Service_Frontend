import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import AnalyseDatsetModal from '../Modals/Analyse/AnalyseDatsetModal';



const AnalyseShow = () => {
  const [showModalDataset, setShowModalDataset] = useState(false);
  const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>([]);
  const [availableDatasets, setAvailableDatasets] = useState<Dataset[]>([]);

  // const datasets: any[] = [
  //   // { id: 1, name: 'Dataset 1', description: 'Description of Dataset 1', type: 'Type 1' },
  //   // { id: 2, name: 'Dataset 2', description: 'Description of Dataset 2', type: 'Type 2' },
  //   // { id: 3, name: 'Dataset 3', description: 'Description of Dataset 3', type: 'Type 3' },
  //   // Add more datasets as needed
  // ];

  const [datasets, setDatasets] = useState<Dataset[]>(selectedDatasets);

  const handleOpenModalDataset = () => {
    setShowModalDataset(true);
  }
  const closeModal = () => {
    setShowModalDataset(false);
  };

  // Function to add new datasets
  const handleCreateDataset = (newDatasets: Dataset[]) => {
    // Add the newly created datasets to the list of selected datasets for the analysis
    setSelectedDatasets(prevDatasets => [...prevDatasets, ...newDatasets]);
    // Update the datasets array with the new datasets
    setDatasets(prevDatasets => [...prevDatasets, ...newDatasets]);
  };

  
    return (    
    	 <div className="my-5">
      <div className="container-fluid rounded border p-3" style={{backgroundColor:'white'}}>
        
        <div className="row" >

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
                {/* {datasets.map(dataset => (
                    <li key={dataset.id}>{dataset.name}</li>
                  ))} */}


                {datasets.map(dataset => (
                  <tr key={dataset.id} className={selectedDatasets.includes(dataset) ? 'selected' : ''}>
                    <td style={{ width: '10px' }}>
                      <input
                        type="checkbox"
                         />
                    </td>
                    <td>
                      <div style={{ whiteSpace: 'nowrap' }}>{dataset.name}</div>
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
