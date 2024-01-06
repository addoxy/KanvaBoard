import { notify, notifyPromise } from "@/utils/notify";
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

export const useCreateColumnMutation = (props: {
  boardId: string;
  title: string;
  order: number;
  refreshBoard: () => void;
}) => {
  const { boardId, title, order, refreshBoard } = props;

  const createColumnMutation = useMutation({
    mutationFn: async () => {
      const createColumnPromise = axios.post(
        `/api/column?title=${title}&boardId=${boardId}&order=${order}`
      );

      notifyPromise(createColumnPromise, {
        loading: "Creating column...",
        success: "Created the column",
        error: "Unable to create column",
      });

      return createColumnPromise;
    },
    onSuccess: () => {
      refreshBoard();
    },
  });

  return createColumnMutation;
};

export const useCreateTaskMutation = (props: {
  boardId: string;
  columnId: string;
  content: string;
  order: number;
  refreshBoard: () => void;
}) => {
  const { boardId, columnId, content, order, refreshBoard } = props;

  const createTaskMutation = useMutation({
    mutationFn: async () => {
      const createTaskPromise = axios.post(
        `/api/task?boardId=${boardId}&columnId=${columnId}&content=${content}&order=${order}`
      );

      notifyPromise(createTaskPromise, {
        loading: "Creating task...",
        success: "Created the task",
        error: "Unable to create task",
      });

      return createTaskPromise;
    },
    onSuccess: () => {
      refreshBoard();
    },
  });

  return createTaskMutation;
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

export const useUpdateBoardTitleMutation = (props: {
  id: string;
  newTitle: string;
}) => {
  const { id, newTitle } = props;

  const updateBoardTitleMutation = useMutation({
    mutationFn: async () =>
      await axios.put(`/api/board?q=title&boardId=${id}&newTitle=${newTitle}`),
    onError: () => {
      notify("Unable to update board title", "failure");
    },
  });

  return updateBoardTitleMutation;
};

export const useUpdateColumnTitleMutation = (props: {
  id: string;
  newTitle: string;
}) => {
  const { id, newTitle } = props;

  const updateColumnTitleMutation = useMutation({
    mutationFn: async () =>
      await axios.put(
        `/api/column?q=title&columnId=${id}&newTitle=${newTitle}`
      ),
    onError: () => {
      notify("Unable to update column title", "failure");
    },
  });

  return updateColumnTitleMutation;
};

export const useUpdateTaskMutation = (props: {
  id: string;
  newContent: string;
  refreshBoard: () => void;
}) => {
  const { id, newContent, refreshBoard } = props;

  const updateTaskMutation = useMutation({
    mutationFn: async () => {
      const updateTaskPromise = axios.put(
        `/api/task?q=update&id=${id}&newContent=${newContent}`
      );

      notifyPromise(updateTaskPromise, {
        loading: "Updating task...",
        success: "Updated the task",
        error: "Unable to update task",
      });
    },
    onSuccess: () => refreshBoard(),
  });

  return updateTaskMutation;
};

export const useUpdateColumnOrderMutation = (props: {
  boardId: string;
  columns: Column[];
}) => {
  const { boardId, columns } = props;

  const updateColumnOrderMutation = useMutation({
    mutationFn: async () =>
      await axios.put(
        `/api/column?q=reorder&boardId=${boardId}&columns=${JSON.stringify(
          columns
        )}`
      ),

    onError: () => notify("Unable to reorder columns", "warning"),
  });

  return updateColumnOrderMutation;
};

export const useUpdateTaskOrderMutation = () => {
  const updateTaskOrderMutation = useMutation({
    mutationFn: async (variables: Task[]) => {
      await axios.put(
        `/api/task?q=reorderSame&tasks=${JSON.stringify(variables)}`
      );
    },
  });

  return updateTaskOrderMutation;
};

interface RequiredProps {
  taskId: string;
  oldColumnId: string;
  newColumnId: string;
  oldOrder: number;
  newOrder: number;
}

export const useUpdateTaskOrderCMutation = () => {
  const updateTaskOrderCMutation = useMutation({
    mutationFn: async (variables: RequiredProps) => {
      const { taskId, oldColumnId, newColumnId, oldOrder, newOrder } =
        variables;

      const updateTaskOrderCPromise = axios.put(
        `/api/task?q=reorderC&taskId=${taskId}&oldColumnId=${oldColumnId}&newColumnId=${newColumnId}&oldOrder=${oldOrder}&newOrder=${newOrder}`
      );

      return updateTaskOrderCPromise;
    },
  });

  return updateTaskOrderCMutation;
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

export const useDeleteColumnMutation = (props: {
  id: string;
  refreshBoard: () => void;
}) => {
  const { id, refreshBoard } = props;

  const deleteColumnMutation = useMutation({
    mutationFn: async () => {
      const deleteColumnPromise = axios.delete(`/api/column?id=${id}`);

      notifyPromise(deleteColumnPromise, {
        loading: "Deleting column...",
        success: "Deleted the column",
        error: "Unable to delete the column",
      });

      return deleteColumnPromise;
    },

    onSuccess: () => refreshBoard(),
  });

  return deleteColumnMutation;
};

export const useDeleteTaskMutation = (props: {
  id: string;
  refreshBoard: () => void;
}) => {
  const { id, refreshBoard } = props;

  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      const deleteTaskPromise = axios.delete(`/api/task?id=${id}`);

      notifyPromise(deleteTaskPromise, {
        loading: "Deleting task...",
        success: "Deleted the task",
        error: "Unable to delete the task",
      });

      return deleteTaskPromise;
    },
    onSuccess: () => refreshBoard(),
  });

  return deleteTaskMutation;
};
