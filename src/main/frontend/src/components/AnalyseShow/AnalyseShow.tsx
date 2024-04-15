import { faPlusCircle,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchExperienceForAnalysis, createExperience } from '../../services/ExperienceService';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AnalyseDatsetModal from '../Modals/Analyse/AnalyseDatsetModal';
import AnalyseSearchDatsetModal from '../Modals/Analyse/AnalyseSearchDatsetModal';
import CreateExperienceModal from '../Modals/Analyse/CreateExperienceModal';
import InfoExperienceModal from '../Modals/Analyse/InfoExperienceModal';
import ElementsList from '../ElementsList/ElementsLits';
import { useParams } from 'react-router-dom';
import { NetworkWifi } from '@mui/icons-material';






const AnalyseShow = () => {
 const [showModalDataset, setShowModalDataset] = useState(false);
 const [ShowModalSearchDataset, setShowModalSearchDataset] = useState(false);
 const [showModalExperience, setShowModalExperience] = useState(false);
 const [showModalInfoExperience, setShowModalInfoExperience] = useState(false);


 const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>([]);
 const [availableDatasets, setAvailableDatasets] = useState<Dataset[]>([]);
 //const [datasets, setDatasets] = useState<Dataset[]>(selectedDatasets);

 const [selectedModels, setSelectedModels] = useState<Model[]>([]);

 const [selectedExperience, setSelectedExperience] = useState<Experience>({ 
  id_experience: 1,
  id_analysis: 1,
  name_experience: "Test",
  models: [],
  datasets: [],
  nom_machine: "", 
  nb_gpu: 0, 
  nb_processeurs: 0, 
  heure_lancement: "", 
  heure_fin_prevu: "", 
  statut: "En cours", 
  resultat_prediction: [], 
});    //Experience selectionnée pour visualiser les informations
  

 const [columnsExperience, setColumnsExperience] = useState([
  "Nom",
  "Heure lancement",
  "Heure de fin",
  "Statut"
]);

 const { id } = useParams();  //id de l'analyse
 const [datasets, setDatasets] = useState<DatasetAnalyse[]>([]);
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


 /////////EXPERIENCE FUNCTIONS
 const handleOpenModalExperience = () => {
  setShowModalExperience(true);
 }

 const handleAddExperience = async (newExperience: Experience) => {
  try {
    await createExperience(Number(id), newExperience);
    setExperienceList([...experiencesList,newExperience]);  //Mise à jour de la liste des experiences de l'analyse
    }
    catch (error) {
      console.error("Error adding experience:", error);
    }
  }

const closeModalExperience =() => {
  setShowModalExperience(false);
}

const handleOpenInfoExperience = (idExperience: number) => {
  setShowModalInfoExperience(true);

  console.log("Ouverture des infos de l'experience");
  const experience = experiencesList.find(exp => exp.id_experience === idExperience);
  if (experience) {
    setSelectedExperience(experience);
  }
}

const handleCloseInfoExperience = () => {
  setShowModalInfoExperience(false);
}

const handleDeleteExperience = () => {
}

//Liste experience
const [experiencesList,setExperienceList] = useState<Experience[]>([]);
useEffect(() => {
  fetchExperienceForAnalysis(Number(id))
    .then((data)=> setExperienceList(data))
    .catch((error) => console.error("Error fetching experiences:", error));
}, []);

//Permet de changer le string HH:MM:SS en type Date pour la comparaison
const parseTimeStringToTime = (timeString: string) => {
  const [hour, minute, second] = timeString.split(':').map(Number);
  return new Date(0, 0, 0, hour, minute, second);
};

/////////Verificatioon pour le changement de statut
useEffect(() => {
  const timer = setInterval(() => {
    //console.log('This will run every second!');

    setExperienceList(prevExperiences => prevExperiences.map((experience) => {
      if (experience.statut === "En cours" && experience.heure_fin_prevu) {

        const currentTime = new Date();
        const endTime = parseTimeStringToTime(experience.heure_fin_prevu);

        console.log(currentTime, endTime ,experience.statut)

        if (currentTime > endTime) {
          console.log("Temps dépassé");
          return { ...experience, statut: "Terminé" } as Experience;
        }
      }
      return experience;
    }));
  }, 1000);

  return () => clearInterval(timer);

},  []);

 /////////DATASET FUNCTIONS
 const handleOpenModalDataset = () => {
   setShowModalDataset(true);
 }


 const handleOpenModalSearchDataset = () => {
   setShowModalSearchDataset(true);
 }

  const closeModal = () => {
   setShowModalDataset(false);
 };

 const closeModalSearchDataset = () => {
   setShowModalSearchDataset(false);
 };


 // Function to add new datasets
 const handleAddDatasetToAnalyse = async (newDatasets: Dataset[]) => {
   try {
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


       const data = await response.json();
       setDatasets(data);
   } catch (error) {
       console.error('Error adding datasets:', error);
   }
 };

 const handleDeleteDatasetAnalyse= async (datasetId: number) => {
   try {
     const response = await fetch(`/api/analyses/${id}/datasets/${datasetId}`, {
       method: 'DELETE',
     });
      if (!response.ok) {
       throw new Error('Failed to delete dataset');
     }
      // Remove the deleted dataset from the state
     setDatasets((prevDatasets) =>
       prevDatasets.filter((dataset) => dataset.id_dataset !== datasetId)
     );
   } catch (error) {
     console.error('Error deleting dataset:', error);
   }
 };
 const handleAddSearchDatasetToAnalyse = async (newDatasets: Dataset[]) => {

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
         onClick={handleOpenModalSearchDataset}
       >
         Recherche
       </button>
     </div>
       <div className="row " >


         <div className="col-md-6">
          {/*EXPERIENCE */}
         <div className="rounded border p-3 position-relative shadow-sm" style={{ height: "50vh" }}>
         <div className="d-flex align-items-center justify-content-between">
           <h5 > Expériences</h5>
           <div className="mb-0">
             <button className="btn mb-10" style={{backgroundColor:"#E30613", color:"white"}} onClick={handleOpenModalExperience}>Exécuter</button>
           </div>
           </div>
           <hr style={{color:"#555"}}/>
           
           <div className="overflow-x-auto">
            <ElementsList
              nameModule="experience"
              columns={columnsExperience}
              elementsList={experiencesList}
              onShow={handleOpenInfoExperience}
              onDelete={handleDeleteExperience}
            />
           </div>
           

         </div>
         </div>


         <div className="col-md-6">
          {/*LISTE DES DATASETS*/}
          <div className="rounded border p-3 position-relative shadow-sm" style={{ height: "50vh", overflowY: "auto" }}>
            <div className="d-flex align-items-center justify-content-between " >
              <h5> Datasets</h5>
              <div className="mt-1 me-2" onClick={handleOpenModalDataset}>
                <FontAwesomeIcon icon={faPlusCircle}  style={{color:"#E30613", fontSize: '1.2em'}} />
              </div>
            </div>
            <hr style={{color:"#555"}}/>
          
            <Table >
              <tbody>
                {datasets.map(dataset => (
                  <tr key={dataset.id_dataset} className={selectedDatasets.includes(dataset) ? 'selected' : ''}>
                    <td style={{ width: '10px' }}>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div style={{ whiteSpace: 'nowrap' }}>
                        {dataset.name_dataset} ({dataset.numPatients} patients, {dataset.numECGs} ECGs)
                      </div>
                    </td>
                    <td><FontAwesomeIcon icon={faTrash} className="icon-trash" onClick={() => handleDeleteDatasetAnalyse(dataset.id_dataset)}/></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>



       </div>


       <div className="row mt-3" >
         <div className="col-md-6 ">
          {/*LISTE DES RAPPORTS */}
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
         <div className="col-md-6">

          {/*LISTE DES MODELES */}
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
     {showModalDataset && <AnalyseDatsetModal onCreate={handleAddDatasetToAnalyse} onClose={closeModal} />}
     {ShowModalSearchDataset && <AnalyseSearchDatsetModal onCreate={handleAddDatasetToAnalyse} onClose={closeModalSearchDataset} />}
     {showModalExperience && <CreateExperienceModal id_analyse={Number(id)} onCreate={handleAddExperience} onClose={closeModalExperience} modelsList={selectedModels} datasetsList={selectedDatasets}/>}
     {showModalInfoExperience && <InfoExperienceModal experience={selectedExperience} onClose={handleCloseInfoExperience}/>}
     </div>






    );
}


export default AnalyseShow;



