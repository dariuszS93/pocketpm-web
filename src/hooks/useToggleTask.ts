import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleTask } from '../api/projects.ts';

export function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => toggleTask(taskId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
