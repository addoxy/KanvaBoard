import { api } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<(typeof api.workspace)['create-workspace']['$post']>;
type RequestType = InferRequestType<(typeof api.workspace)['create-workspace']['$post']>;

type UseCreateWorkspaceOptions = {
  onSuccessCallback?: () => void;
};

export const useCreateWorkspace = ({ onSuccessCallback }: UseCreateWorkspaceOptions = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await api.workspace['create-workspace']['$post']({ json });
      return await response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong!');
    },
  });

  return mutation;
};
