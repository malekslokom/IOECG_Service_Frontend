import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReadDataset from '../../../components/ReadDataset/ReadDataset';
import { getDatasetById ,fetchDatasetEcg,fetchDatasetRechercheEcg} from '../../../services/DatasetService';


const ConsulterDataset = () => {
// fonction 
const navigate = useNavigate();
const handleGoBack = () => {
  navigate(-1);
};

const [dataset, setDataset] = useState<Dataset>(); // Définir le type comme Dataset | undefined
var parseId = 0;
const { id } = useParams<{ id: string }>();
const [listDatasetEcg, setListDatasetEcg] = useState<ECG[]>([]);

useEffect(() => {
if (id) {
    const parseId = parseInt(id, 10);

    getDatasetById(parseId)
    .then((datasetData) => {
        setDataset(datasetData);

        // Vérifiez le type de données avant d'appeler fetchDatasetEcg
        if (datasetData.type_dataset === "standard") {
        fetchDatasetEcg(parseId)
            .then((ecgData) => {
            setListDatasetEcg(ecgData);
            })
            .catch((error) => console.error("Error fetching Ecg:", error));
        } else {
        fetchDatasetRechercheEcg(parseId)
        .then((ecgData) => {
            setListDatasetEcg(ecgData);
        })
        // Si le type de données n'est pas standard, vous pouvez faire autre chose ici
        console.log("Type de données non standard:");
        }
    })
    .catch((error) => console.error("Error fetching dataset:", error));
}
}, [id]);


{dataset && console.log(listDatasetEcg)}
const showListDataset = () => {};

return (

<div >
    <div className="navigation-link" onClick={handleGoBack}>
    <strong className="navigation-text">Mes Datasets</strong>{" "}
    <strong className="navigation-separator">&gt;</strong>
    <strong>{dataset?.name_dataset}</strong>
    </div>
    {dataset && <ReadDataset id={parseId} dataset={dataset} ecg={listDatasetEcg} onClose={showListDataset} />}

</div>

  );
}

export default ConsulterDataset;
