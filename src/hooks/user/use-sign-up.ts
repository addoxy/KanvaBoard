import { api } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<(typeof api.user)['sign-up']['$post']>;
type RequestType = InferRequestType<(typeof api.user)['sign-up']['$post']>;

export const useSignUp = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await api.user['sign-up']['$post']({ json });
      return await response.json();
    },
  });

  return mutation;
};
