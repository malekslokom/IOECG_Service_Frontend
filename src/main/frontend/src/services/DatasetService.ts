const API_BASE_URL = "http://localhost:8080/api/datasets";

export async function fetchDatasets(): Promise<Dataset[]> {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch datasets');
    }
    return await response.json();
  }
  export async function getDatasetById(id: number): Promise<Projet> {

    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to get datasets');
    }
    return await response.json();
  }
  export async function getDatasetsWithFilter(startDate: string, endDate: string, searchTerm: string): Promise<Dataset[]> {
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
  export async function addDataset(newDataset: Dataset): Promise<Dataset> {
    const response = await fetch(`${API_BASE_URL}/`,  {method:'POST',headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newDataset)});
    if (!response.ok) {
        throw new Error('Failed to create dataset');
    }
    return await response.json();
  }