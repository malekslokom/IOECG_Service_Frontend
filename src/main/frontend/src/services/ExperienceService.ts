const API_BASE_URL = "http://localhost:8080/api/analyses";

export async function fetchExperiences(): Promise<Experience[]> {
  const response = await fetch(`${API_BASE_URL}/experiences/all/`);
  if (!response.ok) {
      throw new Error('Failed to fetch experiences');
    }
    return await response.json();
  }

export async function fetchExperienceForAnalysis(id_analysis: number): Promise<Experience[]> {
    const response = await fetch(`${API_BASE_URL}/${id_analysis}/experiences`);
    if (!response.ok) {
        throw new Error('Failed to get experience for analysis');
    }
    return await response.json();
  }

export async function getExperienceById(id_experience: number): Promise<Experience> {
    const response = await fetch(`${API_BASE_URL}/experiences/${id_experience}`);
    if (!response.ok) {
        throw new Error('Failed to get the experience');
    }
    return await response.json();
  }

  export async function createExperience(id_analysis: number, newExperience: Experience): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id_analysis}/experiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExperience)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create experience');
      }
      
      // Si la création est réussie, pas besoin de récupérer de données
    } catch (error) {
      console.error("Error creating experience:", error);
      throw error;
    }
  }
  ;

  export async function updateExperienceStatus(id_experience: number, newStatus: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/experiences/${id_experience}/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ statut: newStatus })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update experience status');
      }
    } catch (error) {
      console.error("Error updating experience status:", error);
      throw error;
    }
}