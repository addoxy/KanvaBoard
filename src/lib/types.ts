import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

export type Workspace = {
  name: string;
  id: string;
  ownerId: string;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
};
