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
  
  // interface Dataset {
  //   id: number;
  //   name: string;
  //   description: string;
  //   type: string;
  //   ecgs: ECG[];
  // }
  
  interface Dataset {
    id_dataset :number;
    created_at : string;
    name_dataset : string;
    description_dataset: string;
    type_dataset : 'search_results' | 'standard';
    leads_name : string;
    study_name: string;
    study_details?: string;
    source_name : string;
    source_details? : string;
  }

  interface DatasetAnalyse{
  id_dataset :number;
  created_at : string;
  name_dataset : string;
  description_dataset: string;
  type_dataset : 'search_results' | 'standard';
  leads_name : string;
  study_name: string;
  study_details?: string;
  source_name : string;
  source_details? : string;
  numPatients:number;
  numECGs:number;
}
interface PatientEcgData {
  patient_id: number;
  age: number;
  height: number;
  weight: number;
  sex: string;
  id_ecg:number;
  recording_started_at: string;
  recording_ended_at: string;
  recording_initial_sampling_rate: number;
  recording_sampling_rate: number;
  recording_duration: number;
  protocol_details: string;
  ecg_filepath: string;
  lead_i: string;
  lead_ii: string;
  lead_iii: string;
  lead_avr: string;
  lead_avf: string;
  lead_avl: string;
  lead_v1: string;
  lead_v2: string;
  lead_v3: string;
  lead_v4: string;
  lead_v5: string;
  lead_v6: string;
  lead_x: string;
  lead_y: string;
  lead_z: string;
  lead_es: string;
  lead_as: string;
  lead_ai: string;
  id_dataset: number;
  created_at: string;
  name_dataset: string;
  description_dataset: string;
  type_dataset: string;
  leads_name: string;
  study_name: string;
  study_details: string;
  source_name: string;
  source_details: string;
}
  interface DatasetECG {
    id: number;
    id_dataset: string;
    id_ecg: string;
    type: string;
  }

    
interface Rapport {
  id_rapport: number;
  dateCreation: string;
  nom: string ;
  modeles: string[];   //ou Model[]  ?
  datasets: string[] // ou Dataset[] ?
}


interface LeadData {
  [leadName: string]: number[]; // Assuming each lead's data is an array of numbers
}

interface ECGPlotModalProps {
  ecgData: LeadData[]; // Now ecgData is an array of LeadData objects
  onClose: () => void;
}