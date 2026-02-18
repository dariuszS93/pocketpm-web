import { useAddTask } from '../hooks/useAddTask.ts';
import { useState } from 'react';

type Task = { id: string; title: string };
type Project = { id: string; name: string; tasks: Task[] };

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  const { mutate: addTask, isPending } = useAddTask();

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const isSubmitDisabled = isPending || !newTaskTitle.trim();

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
      <h3>{project.name}</h3>
      <ul>
        {project.tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
      <div style={{ marginTop: 8 }}>
        <input
          placeholder={'New task title'}
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          disabled={isPending}
        />
        <button
          onClick={() => {
            const title = newTaskTitle.trim();
            if (!title) return;

            addTask(
              { projectId: project.id, title },
              { onSuccess: () => setNewTaskTitle('') },
            );
          }}
          disabled={isSubmitDisabled}
        >
          {isPending ? 'Adding...' : 'Add task'}
        </button>
      </div>
    </div>
  );
};
