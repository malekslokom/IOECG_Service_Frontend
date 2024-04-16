
const API_BASE_URL = "http://localhost:8080/api/analyses";
export async function fetchAnalyses(): Promise<Analyse[]> {
  const response = await fetch(`${API_BASE_URL}/allAnalyse`);
  if (!response.ok) {
      throw new Error('Failed to fetch analyses');
    }
    return await response.json();
  }

  
  export async function getAnalyseById(id: number): Promise<Analyse> {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
      throw new Error('Failed to get analyse');
  }
  return await response.json();
}
export async function getAnalysesWithFilter(startDate: string, endDate: string, searchTerm: string): Promise<Analyse[]> {
  const encodedStartDate = encodeURIComponent(startDate);
  const encodedEndDate = encodeURIComponent(endDate);
  const encodedSearchTerm = encodeURIComponent(searchTerm);

  const response = await fetch(`${API_BASE_URL}/filter?start_date=${encodedStartDate}&end_date=${encodedEndDate}&search_term=${encodedSearchTerm}`);
  if (!response.ok) {
    const errorText = await response.text(); // Tente de lire le message d'erreur de la réponse
    throw new Error(`Failed to get analyses with filter: ${response.status} ${errorText}`);
  }
  return await response.json();
}
export async function addModelAnalyse (id_analysis:number,models:Model[]): Promise<Model[]> {
  const response = await fetch(`${API_BASE_URL}/${id_analysis}/models`, {method:'POST',headers: {'Content-Type': 'application/json'}, body: JSON.stringify(models)});
  if (!response.ok) {
      throw new Error('Failed to add model to analyse');
  }
  return await response.json();

}
export async function deleteModelAnalyse (id_analyse:number,id_model:number): Promise<Model[]> {

  const response = await fetch(`${API_BASE_URL}/${id_analyse}/models/${id_model}`,{method:'DELETE'});
  if (!response.ok) {
      throw new Error('Failed to delete model from analyse');
  }
  return await response.json();

}
export async function fetchAnalyseModels(id_analyse:number): Promise<Model[]> {
  const response = await fetch(`${API_BASE_URL}/${id_analyse}/models`);
  if (!response.ok) {
      throw new Error('Failed to fetch models');
  }
      return await response.json();

}
  export async function deleteAnalyseById(id: number): Promise<Analyse> {

    const response = await fetch(`${API_BASE_URL}/delete/${id}`, {method:'DELETE'});
    if (!response.ok) {
        throw new Error('Failed to delete Analyse');
    }
    return await response.json();
  }

  export async function createAnalyse(newAnalyse: Analyse): Promise<Analyse> {
    console.log('here service ', newAnalyse);
    const response = await fetch(`${API_BASE_URL}/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newAnalyse)
    });

    if (!response.ok) {
        throw new Error('Failed to create analyse');
    }

    return await response.json();
}


  


  
  
