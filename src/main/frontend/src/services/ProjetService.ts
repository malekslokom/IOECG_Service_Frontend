const API_BASE_URL = "http://localhost:8080/api/projets";

export async function fetchProjets(): Promise<Projet[]> {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch projets');
    }
    return await response.json()};
export async function getProjectById(id: number): Promise<Projet> {

    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to get project');
    }
    return await response.json();
  }
  export async function getProjectWithFilter(startDate: string, endDate: string, searchTerm: string): Promise<Projet[]> {
    const encodedStartDate = encodeURIComponent(startDate);
    const encodedEndDate = encodeURIComponent(endDate);
    const encodedSearchTerm = encodeURIComponent(searchTerm);
  
    const response = await fetch(`${API_BASE_URL}/filter?start_date=${encodedStartDate}&end_date=${encodedEndDate}&search_term=${encodedSearchTerm}`);
    if (!response.ok) {
      const errorText = await response.text(); // Tente de lire le message d'erreur de la réponse
      throw new Error(`Failed to get projects with filter: ${response.status} ${errorText}`);
    }
    return await response.json();
  }