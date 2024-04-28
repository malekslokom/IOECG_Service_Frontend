interface Model {
    // inputShape: number[];
    // outputShape: number[];
    id_model?: number;
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
    id:number;
    task_nature: string;
  }


  interface Analyse {
    id_analysis?:number;
    id_project: number;
    created_at: String;
    last_updated_at:String;
    name_analysis: String;
    description_analysis: String;
    created_by: String;

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
    id: number | null;
    origin_dataset: number | null;
    id_patient: number | null;
    patient_weight: string | null;
    patient_sex: string | null;
    patient_age: number | null;
    patient_race: string | null;
    filepath: string|null;
    recording_started_at: string;
    recording_ended_at: string | null ;
    recording_initial_sampling_rate: number | null;
    recording_sampling_rate: number | null;
    recording_duration: number | null;
    protocol_details: any | null;
    data?: number[];
  }
  

  
  interface Dataset {
    id_dataset :number;
    created_at : string;
    name_dataset : string;
    description_dataset: string;
    type_dataset : 'search_results' | 'standard';
    leads_name ?: string;
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
interface DatasetProjet {
  id_dataset :number;
  created_at : string;
  name_dataset : string;
  description_dataset: string;
  type_dataset : 'search_results' | 'standard';
  leads_name ?: string;
  study_name: string;
  study_details?: string;
  source_name : string;
  source_details? : string;
  id_analysis:(number |null);
}
interface PatientEcgData {
  patient_id: number|null;
  age: number|null;
  height: number|null;
  weight: number|null;
  sex: string|null;
  id_ecg:number;
  recording_started_at: string|null;
  recording_ended_at: string|null;
  recording_initial_sampling_rate: number|null;
  recording_sampling_rate: number|null;
  recording_duration: number|null;
  protocol_details: string|null;
  ecg_filepath: string|null;
  lead_i:  number[]; 
  lead_ii: number[]; 
  lead_iii: number[]; 
  lead_avr:  number[]; 
  lead_avf: number[]; 
  lead_avl:  number[]; 
  lead_v1:  number[]; 
  lead_v2: number[]; 
  lead_v3:  number[]; 
  lead_v4:number[]; 
  lead_v5:  number[]; 
  lead_v6:  number[]; 
  lead_x: number[]; 
  lead_y:number[]; 
  lead_z:  number[]; 
  lead_es: number[]; 
  lead_as:  number[]; 
  lead_ai: number[]; 
  id_dataset: number;
  created_at: string|null;
  name_dataset: string|null;
  description_dataset: string|null;
  type_dataset: string|null;
  leads_name: string;
  study_name: string|null;
  study_details: string|null;
  source_name: string|null;
  source_details: string|null;
  }
  
  interface DatasetECG {
    id: number;
    id_dataset: string;
    id_ecg: string;
    type: string;
  }

    
interface Rapport {
  id_rapport?: number;
  id_experience_rapport: number;
  created_at: string;
  name_rapport: string ;

}


interface LeadData {
  [leadName: string]: number[]; // Assuming each lead's data is an array of numbers
}

interface ECGPlotModalProps {
  ecgData: LeadData[]; // Now ecgData is an array of LeadData objects
  onClose: () => void;
}

interface Experience {
  id_experience?: number;
  id_analysis_experience: number;
  name_experience: string;
  models: (number)[]; // Tableau des id des modeles de l'experience
  datasets: (number)[]; // Tableau des id des datasets de l'experience
  nom_machine: string;
  nb_gpu: number;
  nb_processeurs: number;
  heure_lancement: string; 
  heure_fin_prevu: string;
  statut: 'En cours' | 'Terminé'; // Statut doit être soit 'En cours', soit 'Terminé'
  resultat_prediction: { [key: string]: number };
}

interface PredictionData {
  nom_experience: string;
  evluation  : string;
  analyse_onrigine : string;
  
  predictions: { [key: string]: number };
  f1_score: {
    precision: number;
    recall: number;
    f1_score: number;
  };
  matriceConfusion: {
    vrais_positifs: number;
    faux_positifs: number;
    faux_negatifs: number;
    vrais_negatifs: number;
  };
  datasets: {
    title: string;
    description: string;
    ecgCount: number;
    creationDate: string;
    type: string;
  }[];
  models: {
    name: string;
    accuracy: string;
    trainingTime: string;
    parameters: string;
  }[];
  }