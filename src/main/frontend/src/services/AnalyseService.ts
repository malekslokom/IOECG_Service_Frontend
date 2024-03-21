export async function fetchAnalyses(): Promise<Analyse[]> {
    const response = await fetch('http://localhost:8080/api/analyses/');
    if (!response.ok) {
      throw new Error('Failed to fetch analyses');
    }
    return await response.json();
  }
  
  