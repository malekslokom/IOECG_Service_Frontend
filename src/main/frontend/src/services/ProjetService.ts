export async function fetchProjets(): Promise<Projet[]> {
    const response = await fetch('http://localhost:8080/api/projets/');
    if (!response.ok) {
      throw new Error('Failed to fetch projets');
    }
    return await response.json()};
export async function getProjectById(id: number): Promise<Projet> {
  console.log("heree")
  console.log(id)

    const response = await fetch(`http://localhost:8080/api/projets/${id}`);
    if (!response.ok) {
        throw new Error('Failed to get project');
    }
    return await response.json();
  }