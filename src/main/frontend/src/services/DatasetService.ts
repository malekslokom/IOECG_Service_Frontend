export async function fetchDatasets(): Promise<Dataset[]> {
    const response = await fetch('http://localhost:8080/api/datasets/');
    if (!response.ok) {
      throw new Error('Failed to fetch datasets');
    }
    return await response.json();
  }
  
  