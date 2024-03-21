export async function fetchModels(): Promise<Model[]> {
    const response = await fetch('http://localhost:8080/api/models');
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    return await response.json();
  }
  