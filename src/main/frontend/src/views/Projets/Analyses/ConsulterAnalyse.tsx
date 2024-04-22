import AnalyseShow from "../../../components/AnalyseShow/AnalyseShow";
import { useParams } from 'react-router-dom';

const ConsulterAnalyse = () => {
    const { projectId, analyseId } = useParams();
console.log( useParams())
    return (    
    	 <div> 
            <AnalyseShow projectId={projectId} analyseId={analyseId} />
         </div>
// idProjet={idProjet} idAnalyse={idAnalyse}
     );
}

export default ConsulterAnalyse;
