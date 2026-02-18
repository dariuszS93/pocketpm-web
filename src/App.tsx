import { useProjects } from './hooks/useProjects';
import { ProjectCard } from './components/ProjectCard.tsx';

function App() {
  const { data: projects, isLoading, isError, error } = useProjects();

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return <div>Error: {message}</div>;
  }

  if (!projects || projects.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Pocket PM - projects</h1>
        <div>No projects found</div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>PocketPM - Projects</h1>
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}

export default App;
