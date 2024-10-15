import { api } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<(typeof api.user)['verify-email']['$post']>;
type RequestType = InferRequestType<(typeof api.user)['verify-email']['$post']>;

export const useVerifyEmail = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await api.user['verify-email']['$post']({ json });
      return await response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error('Something went wrong!');
    },
  });

  return mutation;
};
