const API_BASE_URL = "http://localhost:8080/api/rapports";


export async function fetchRapportForAnalysis(id_analysis: number): Promise<Rapport[]> {
    const response = await fetch(`${API_BASE_URL}/${id_analysis}`);
    if (!response.ok) {
        throw new Error('Failed to get rapport for analysis');
    }
    return await response.json();
  }


  export async function createRapport(id_experience: number, newRapport: Rapport): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id_experience}`, {
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
  ;