type Task = {
  id: string;
  title: string;
}

type Project = {
  id: string;
  name: string;
  tasks: Task[];
};

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${apiUrl}/projects`);

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`API error: ${response.status}: ${text || response.statusText}`);
  }

  return (await response.json()) as Project[];
}

export async function addTask() {
  // TODO: implement adding a task to a project
}
