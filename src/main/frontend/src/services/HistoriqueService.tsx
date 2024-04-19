const API_BASE_URL = "http://localhost:8080/api/analyses";


export async function fetchExperiences(): Promise<Experience[]> {
    const response = await fetch(`${API_BASE_URL}/experiences/all/`);
    if (!response.ok) {
        throw new Error('Failed to fetch experiences');
      }
      return await response.json();
    }

    