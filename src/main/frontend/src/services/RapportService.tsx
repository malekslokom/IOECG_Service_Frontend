const API_BASE_URL = "http://localhost:8080/api/rapports";


export async function fetchRapport(): Promise<Rapport[]> {
    const response = await fetch(`${API_BASE_URL}/allRapport/`);
    if (!response.ok) {
        throw new Error('Failed to fetch rapport ');
    }
    return await response.json();
  }


export async function fetchRapportForAnalysis(id_analysis: number): Promise<Rapport[]> {
    const response = await fetch(`${API_BASE_URL}/analyse/${id_analysis}`);
    if (!response.ok) {
        throw new Error('Failed to get rapport for analysis');
    }
    return await response.json();
  }

export async function fetchRapportForProject(id_project: number): Promise<Rapport[]> {
    const response = await fetch(`${API_BASE_URL}/projet/${id_project}`);
    if (!response.ok) {
        throw new Error('Failed to get rapport for analysis');
    }
    return await response.json();
  }

  export async function createRapport(id_experience: number, newRapport: Rapport): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/experience/${id_experience}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRapport)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create rapport');
      }
      
      // Si la création est réussie, pas besoin de récupérer de données
    } catch (error) {
      console.error("Error creating rapport:", error);
      throw error;
    }
  }
  
  export async function deleteRapportById(id: number): Promise<Rapport> {

    const response = await fetch(`${API_BASE_URL}/delete/${id}`, {method:'DELETE'});
    if (!response.ok) {
        throw new Error('Failed to delete rapport');
    }
    return await response.json();
  }

  
  // Filtre pour les rapport
  export async function getDatasetsWithFilter(startDate: string, endDate: string, searchTerm: string): Promise<Rapport[]> {
    const encodedStartDate = encodeURIComponent(startDate);
    const encodedEndDate = encodeURIComponent(endDate);
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const response = await fetch(`${API_BASE_URL}/filter?start_date=${encodedStartDate}&end_date=${encodedEndDate}&search_term=${encodedSearchTerm}`);
    if (!response.ok) {
      const errorText = await response.text(); // Tente de lire le message d'erreur de la réponse
      throw new Error(`Failed to get datasets with filter: ${response.status} ${errorText}`);
    }
    return await response.json();
  }
  

// Recuperer les datas pour les info pour la prediction :  
export async function predictionResult(id: number): Promise<PredictionData> {
  
        const response = await fetch(`${API_BASE_URL}/${id}/experience`);
        if (!response.ok) {
            console.error('Failed to fetch Ecg lead');
        }
        console.log(response.json);
        return await response.json();
  }

 

