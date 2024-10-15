import React from 'react';
import Loader from './loader';
import { Button, ButtonProps } from './vendor/button';

type ButtonWithLoaderProps = ButtonProps & {
  isPending: boolean;
  children?: React.ReactNode;
};

const ButtonWithLoader = ({ isPending, children, ...buttonProps }: ButtonWithLoaderProps) => {
  return (
    <Button disabled={isPending} {...buttonProps}>
      {isPending ? <Loader /> : children}
    </Button>
  );
};

export default ButtonWithLoader;
