import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask } from '../api/projects';

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, title }: { projectId: string; title: string }) =>
      addTask(projectId, title),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
