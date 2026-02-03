import { useProjects } from './hooks/useProjects';

function App() {

  const { data: projects, isLoading, isError, error } = useProjects();

  if (isLoading) return <div>Loading...</div>

  if (isError) {
    const message = error instanceof Error ? error.message: 'Unknown error';
    return <div>Error: {message}</div>
  }

  if (!projects || projects.length === 0) {
    return (
      <div style={{ padding: 24}}>
        <h1>Pocket PM - projects</h1>
        <div>No projects found</div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>PocketPM - Projects</h1>
      {projects.map((p) => (
        <div
          key={p.id}
          style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}
        >
          <h3>{p.name}</h3>
          <ul>
            {p.tasks.map((t) => (
              <li key={t.id}>{t.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
