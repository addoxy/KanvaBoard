import { api } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<(typeof api.user)['send-reset-password-email']['$post']>;
type RequestType = InferRequestType<(typeof api.user)['send-reset-password-email']['$post']>;

export const useSendResetPasswordEmail = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await api.user['send-reset-password-email']['$post']({ json });
      return await response.json();
    },
  });

  return mutation;
};
