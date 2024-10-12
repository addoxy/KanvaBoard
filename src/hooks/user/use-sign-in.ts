import { api } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<(typeof api.user)['sign-in']['$post']>;
type RequestType = InferRequestType<(typeof api.user)['sign-in']['$post']>;

export const useSignIn = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await api.user['sign-in']['$post']({ json });
      return await response.json();
    },
  });

  return mutation;
};
