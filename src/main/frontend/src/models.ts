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
    id_analysis:number;    
  };
  
  interface Projet {
    created_at: string;
    name_project: string ;
    description_project: string;
    created_by: string; 
    type_project:string;
    id_project?: number; 
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
    id_dataset? :number;
    created_at : string;
    name_dataset : string;
    description_dataset: string;
    type_dataset : string;
    leads_name : string;
    study_name?: string;
    study_details?: string;
    source_name? : string;
    source_details? : string;
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