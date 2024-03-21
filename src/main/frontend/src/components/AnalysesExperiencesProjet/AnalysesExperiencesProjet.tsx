import './AnalysesExperiencesProjet.css'

interface AnalysisListProps {
    title: string;
    data: {
      key: number;
      name: string;
      dateCreation: string;
      author: string;
    }[];
  }

const AnalysesExperiencesProjet = ({ title, data }: AnalysisListProps) => {
   
  return (
    

<div className='analyses'>
  <h4>{title}</h4>
  <div className="table-container">
  <table>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Date création</th>
        <th>Auteur</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.key}>
          <td>{item.name}</td>
          <td>{item.dateCreation}</td>
          <td>{item.author}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
</div>
  )
}

export default AnalysesExperiencesProjet