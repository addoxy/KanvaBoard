import OAuthButton from './oauth-button';

type OAuthSectionProps = {
  disabled: boolean;
};

const OAuthSection = ({ disabled }: OAuthSectionProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="h-px w-full bg-muted-foreground/15" />
        <span className="shrink-0 text-sm text-muted-foreground">OR CONTINUE WITH</span>
        <div className="h-px w-full bg-muted-foreground/15" />
      </div>
      <div className="flex gap-2">
        <OAuthButton provider="google" disabled={disabled} />
        <OAuthButton provider="github" disabled={disabled} />
      </div>
    </>
  );
};

export default OAuthSection;
