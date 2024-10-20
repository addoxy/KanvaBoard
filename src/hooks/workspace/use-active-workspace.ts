import { useParams } from 'next/navigation';
import { useGetWorkspaces } from './use-get-workspaces';

export const useActiveWorkspace = () => {
  const params = useParams();
  const workspaceId = params.id as string;

  const { workspaces } = useGetWorkspaces();

  const activeWorkspace = workspaces?.find((workspace) => workspace.id === workspaceId);

  return activeWorkspace;
};
