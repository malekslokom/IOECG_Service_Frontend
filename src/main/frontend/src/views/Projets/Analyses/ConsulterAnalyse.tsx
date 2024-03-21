import AnalyseShow from "../../../components/AnalyseShow/AnalyseShow";
import { useParams } from 'react-router-dom';

const ConsulterAnalyse = () => {
    const { id } = useParams();
    return (    
    	 <div> 
            <AnalyseShow/>;
         </div>

     );
}

export default ConsulterAnalyse;
