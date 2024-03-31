const API_BASE_URL = "http://localhost:8080/api/projets";

export async function fetchDatasetProjets(id_project: number): Promise<Dataset[]> {
    const response = await fetch(`${API_BASE_URL}/${id_project}/datasets`);
    if (!response.ok) {
      throw new Error('Failed to fetch projets');
    }
    return await response.json()};
export async function getDatasetProjetWithFilter(startDate: string, endDate: string, searchTerm: string,id_project:number): Promise<Dataset[]> {
    const encodedStartDate = encodeURIComponent(startDate);
    const encodedEndDate = encodeURIComponent(endDate);
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    console.log(encodedEndDate)
    const response = await fetch(`${API_BASE_URL}/${id_project}/datasets/filter?start_date=${encodedStartDate}&end_date=${encodedEndDate}&search_term=${encodedSearchTerm}`);
    if (!response.ok) {
        const errorText = await response.text(); // Tente de lire le message d'erreur de la réponse
        throw new Error(`Failed to get datasets with filter: ${response.status} ${errorText}`);
    }
    return await response.json();
    }