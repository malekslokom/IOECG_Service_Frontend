interface Model {
    // inputShape: number[];
    // outputShape: number[];
    name: string;
    description: string;
    author: string;
    project_name: string;
    architecture_name: string;
    architecture_version: string;
    architecture_description: string;
    total_params: number;
    model_size: string;
    batch_size: string;
    learning_rate:Float32Array;
  //  hyperparameters: { [key: string]: string };

   // architectureImage: string;
    task_nature: string;
  }


  interface Analyse {
    dateCreation: string ;
    nom: string;
    auteur: string;
    description: string;    
  };
  
  interface Projet {
    dateCreation: string;
    nom: string ;
    auteur: string;
    type: string; 
    version:string;
  }

  interface ECG {
    id: number;
    origineDatasetId:number;
    patientId: number;
    filepath: string;
    recordingStartedAt: string;
    recordingEndedAt: string;
    recordingInitialSamplingRate: number;
    recordingSamplingRate: number;
    recordingDuration: number;
    protocolDetails: any;
    data: number[];

  }
  
  interface Dataset {
    id: number;
    name: string;
    description: string;
    type: string;
    ecgs: ECG[];
  }
  

  interface DatasetECG {
    id: number;
    idDataset: string;
    idEcg: string;
    type: string;
  }

    
interface Rapport {
  dateCreation: string;
  nom: string ;
  modeles: string[];   //ou Model[]  ?
  datasets: string[] // ou Dataset[] ?
}