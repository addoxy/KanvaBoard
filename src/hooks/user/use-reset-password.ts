import { api } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<(typeof api.user)['change-password']['$post']>;
type RequestType = InferRequestType<(typeof api.user)['change-password']['$post']>;

export const useResetPassword = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await api.user['change-password']['$post']({ json });
      return await response.json();
    },
  });

  return mutation;
};
