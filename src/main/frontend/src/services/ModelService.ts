const API_BASE_URL = "http://localhost:8080/api/models";

export async function fetchModels(): Promise<Model[]> {
  const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    return await response.json();
  }
  
  export async function getModelsWithFilter(nomModel: string, typeModel: string, auteurModel: string): Promise<Model[]> {
    const encodedTypeModel = encodeURIComponent(typeModel);
    const encodedNomModel = encodeURIComponent(nomModel);
    const encodedAuteurModel = encodeURIComponent(auteurModel);
  
    const response = await fetch(`${API_BASE_URL}/filter?name=${encodedNomModel}&author=${encodedAuteurModel}&task_nature=${encodedTypeModel}`);
    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`Failed to get models with filter: ${response.status} ${errorText}`);
    }
    return await response.json();
  }