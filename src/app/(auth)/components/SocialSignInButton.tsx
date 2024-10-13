import { GitHubIcon, GoogleIcon } from '@/components/icons';
import { Button } from '@/components/vendor/button';
import { SIGN_IN_REDIRECT_URL } from '@/lib/constants';
import { signIn } from 'next-auth/react';

type SocialSignInButtonProps = {
  provider: 'google' | 'github';
  disabled: boolean;
};

const SocialSignInButton = ({ provider, disabled = false }: SocialSignInButtonProps) => {
  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={disabled}
      onClick={() =>
        signIn(provider, {
          callbackUrl: SIGN_IN_REDIRECT_URL,
        })
      }
    >
      {provider === 'google' && <GoogleIcon className="size-5" />}
      {provider === 'github' && <GitHubIcon className="size-5" />}
      <p>
        Sign in with <span className="capitalize">{provider}</span>
      </p>
    </Button>
  );
};

export default SocialSignInButton;
