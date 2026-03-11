type Task = {
  id: string;
  title: string;
};

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
    throw new Error(
      `API error: ${response.status}: ${text || response.statusText}`,
    );
  }

  return (await response.json()) as Project[];
}

export async function addTask(
  projectId: string,
  title: string,
): Promise<{ id: string; title: string }> {
  const response = await fetch(`${apiUrl}/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `API error: ${response.status}: ${text || response.statusText}`,
    );
  }

  return response.json();
}

export async function toggleTask(taskId: string) {
  const response = await fetch(`${apiUrl}/tasks/${taskId}/toggle`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('Failed to toggle task');
  }

  return response.json();
}
