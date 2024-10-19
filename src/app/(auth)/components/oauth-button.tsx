import { GitHubIcon, GoogleIcon } from '@/components/icons';
import { Button } from '@/components/vendor/button';
import { SIGN_IN_REDIRECT_URL } from '@/lib/constants';
import { signIn } from 'next-auth/react';

type OAuthButtonProps = {
  provider: 'google' | 'github';
  disabled: boolean;
};

const OAuthButton = ({ provider, disabled = false }: OAuthButtonProps) => {
  return (
    <Button
      variant="outline"
      className="w-full gap-2"
      disabled={disabled}
      onClick={() =>
        signIn(provider, {
          callbackUrl: SIGN_IN_REDIRECT_URL,
        })
      }
    >
      {provider === 'google' && <GoogleIcon className="size-5" />}
      {provider === 'github' && <GitHubIcon className="size-5" />}
      <span className="capitalize">{provider}</span>
    </Button>
  );
};

export default OAuthButton;
