import { useAddTask } from '../hooks/useAddTask';
import { useState } from 'react';
import { useToggleTask } from '../hooks/useToggleTask';
import { useDeleteTask } from '../hooks/useDeleteTask';
import type { Project } from '../types/project';

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  const { mutate: addTask, isPending } = useAddTask();
  const { mutate: toggleTaskMutation } = useToggleTask();
  const { mutate: deleteTaskMutation, isPending: isDeleting } = useDeleteTask();

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const isSubmitDisabled = isPending || !newTaskTitle.trim();

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
      <h3>{project.name}</h3>
      <ul>
        {project.tasks.map((t) => (
          <li
            key={t.id}
            style={{ display: 'flex', gap: 8, alignItems: 'center' }}
          >
            <span
              onClick={() => toggleTaskMutation(t.id)}
              style={{
                cursor: 'pointer',
                textDecoration: t.done ? 'line-through' : 'none',
                color: t.done ? '#888' : 'inherit',
                flex: 1,
              }}
            >
              {t.title}
            </span>
            <button
              onClick={() => {
                if (!confirm('Delete this task?')) return;
                deleteTaskMutation(t.id);
              }}
              disabled={isDeleting}
              aria-label="Delete task"
              title="Delete task"
              style={{ color: 'red' }}
            >
              x
            </button>
          </li>
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
