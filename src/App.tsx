import {useEffect, useState} from "react";

type Task = { id: string, title: string };
type Project = { id: string, name: string, tasks: Task[] };

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${apiUrl}/projects`)
      .then(res => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      })

  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div style={{ padding: 24 }}>
      <h1>PocketPM - Projects</h1>
      {projects.map(p => (
        <div key={p.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
          <h3>{p.name}</h3>
          <ul>
            {p.tasks.map(t => <li key={t.id}>{t.title}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
