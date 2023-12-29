import { notifyPromise } from "@/utils/notify";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

// create
export const useCreateBoardMutation = (props: {
  title: string;
  refreshBoards: () => void;
}) => {
  const { title, refreshBoards } = props;
  const router = useRouter();

  const createBoardMutation = useMutation({
    mutationFn: async () => {
      const createBoardPromise = axios.post(
        `/api/board?q=create&title=${title}`
      );

      notifyPromise(createBoardPromise, {
        loading: "Creating project...",
        success: "Created the project",
        error: "Unable to create a project",
      });

      return createBoardPromise;
    },
    onSuccess: (result) => {
      refreshBoards();
      const res = JSON.parse(result.data);
      const boardId = res.boardId;
      router.push(`/projects/board/${boardId}`);
    },
  });

  return createBoardMutation;
};

export const useCreateTemplateMutation = (props: {
  type: "todos" | "weeklyPlanner";
  refreshBoards: () => void;
}) => {
  const { type, refreshBoards } = props;
  const router = useRouter();

  const createTemplateMutation = useMutation({
    mutationFn: async () => {
      const createTemplatePromise = axios.post(
        `/api/board?q=template&type=${type}`
      );

      notifyPromise(createTemplatePromise, {
        loading: "Cloning template...",
        success: "Created the template",
        error: "Unable to clone template",
      });

      return createTemplatePromise;
    },
    onSuccess: (result) => {
      refreshBoards();
      const res = JSON.parse(result.data);
      const boardId = res.boardId;
      router.push(`/projects/board/${boardId}`);
    },
  });

  return createTemplateMutation;
};

// update
export const useUpdateWorkspaceNameMutation = (props: {
  newName: string;
  refreshWorkspaceName: () => void;
}) => {
  const { newName, refreshWorkspaceName } = props;

  const updateWorkspaceNameMutation = useMutation({
    mutationFn: async () => {
      const updateWorkspaceNamePromise = axios.put(
        `/api/user?q=workspace&newName=${newName}`
      );

      notifyPromise(updateWorkspaceNamePromise, {
        loading: "Updating workspace name...",
        success: "Updated workspace name",
        error: "Unable to update workspace name",
      });

      return updateWorkspaceNamePromise;
    },
    onSuccess: () => refreshWorkspaceName(),
  });

  return updateWorkspaceNameMutation;
};

export const useUpdateFavoriteMutation = (props: {
  id: string;
  favorite: boolean;
  refreshBoards: () => void;
}) => {
  const { id, favorite, refreshBoards } = props;

  const favoriteBoardMutation = useMutation({
    mutationFn: async () => {
      const favoriteBoardPromise = axios.put(
        `/api/board?q=favorite&boardId=${id}&isFavorited=${favorite}`
      );

      if (favorite) {
        notifyPromise(favoriteBoardPromise, {
          loading: "Removing from favorites...",
          success: "Removed from favorites",
          error: "Unable to remove from favorites",
        });
      }

      if (!favorite) {
        notifyPromise(favoriteBoardPromise, {
          loading: "Adding to favorites...",
          success: "Added to favorites",
          error: "Unable to add to favorites",
        });
      }

      return favoriteBoardPromise;
    },
    onSuccess: () => refreshBoards(),
  });

  return favoriteBoardMutation;
};

export const useUpdateViewedAtMutation = (props: {
  id: string;
  refreshBoards: () => void;
}) => {
  const { id, refreshBoards } = props;

  const favoriteBoardMutation = useMutation({
    mutationFn: async () =>
      await axios.put(`/api/board?q=recent&boardId=${id}`),
    onSuccess: () => refreshBoards(),
  });

  return favoriteBoardMutation;
};

// delete
export const useDeleteBoardMutation = (props: {
  id: string;
  refreshBoards: () => void;
}) => {
  const { id, refreshBoards } = props;

  const deleteBoardMutation = useMutation({
    mutationFn: async () => {
      const deleteBoardPromise = axios.delete(`/api/board?id=${id}`);

      notifyPromise(deleteBoardPromise, {
        loading: "Deleting project...",
        success: "Deleted the project",
        error: "Unable to delete the project",
      });

      return deleteBoardPromise;
    },

    onSuccess: () => refreshBoards(),
  });

  return deleteBoardMutation;
};
