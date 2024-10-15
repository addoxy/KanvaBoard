import { SIGN_IN_REDIRECT_URL } from '@/lib/constants';
import { api } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<(typeof api.user)['sign-in']['$post']>;
type RequestType = InferRequestType<(typeof api.user)['sign-in']['$post']>;

export const useSignIn = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await api.user['sign-in']['$post']({ json });
      return await response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        window.location.href = SIGN_IN_REDIRECT_URL;
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
