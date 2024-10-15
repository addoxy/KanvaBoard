import { api } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkspaces = () => {
  const { data: workspaces, status } = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await api.workspace['get-workspaces'].$get();

      if (!response.ok) {
        throw new Error('Unable to get your workspaces');
      }

      const { data } = await response.json();
      return data;
    },
  });

  const isPending = status === 'pending';
  const isError = status === 'error';
  const isSuccess = status === 'success';

  return { workspaces, isPending, isError, isSuccess };
};
