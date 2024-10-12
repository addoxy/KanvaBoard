import { cn } from '@/utils/utils';
import { Loader2 } from 'lucide-react';

type LoaderProps = {
  className?: string;
};

const Loader = ({ className }: LoaderProps) => {
  return <Loader2 className={cn('size-4 animate-spin text-background', className)} />;
};

export default Loader;
