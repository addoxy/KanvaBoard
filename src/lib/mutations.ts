import { notify, notifyPromise } from "@/utils/notify";
import { UniqueIdentifier } from "@dnd-kit/core";
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

interface ColumnOrderVariables {
  boardId: string;
  activeColumnId: string | UniqueIdentifier;
  activeOrder: number;
  overOrder: number;
}

export const useUpdateColumnOrderMutation = (props: {
  refreshBoard: () => void;
}) => {
  const { refreshBoard } = props;
  const updateColumnOrderMutation = useMutation({
    mutationFn: async (variables: ColumnOrderVariables) => {
      const { boardId, activeColumnId, activeOrder, overOrder } = variables;
      const updateColumnOrderPromise = axios.put(
        `/api/column?q=reorder&boardId=${boardId}&activeColumnId=${activeColumnId}&activeOrder=${activeOrder}&overOrder=${overOrder}`
      );

      return updateColumnOrderPromise;
    },
    onSuccess: () => refreshBoard(),
  });

  return updateColumnOrderMutation;
};

interface TaskReorderProps {
  columnId: string | UniqueIdentifier;
  activeTaskId: string | UniqueIdentifier;
  activeOrder: number;
  overOrder: number;
}

export const useTaskReorderSameMutation = (props: {
  refreshBoard: () => void;
}) => {
  const { refreshBoard } = props;

  const taskReorderSameMutation = useMutation({
    mutationFn: async (variables: TaskReorderProps) => {
      const { columnId, activeTaskId, activeOrder, overOrder } = variables;
      const taskReorderSamePromise = axios.put(
        `/api/task?q=reorderSame&columnId=${columnId}&activeTaskId=${activeTaskId}&activeOrder=${activeOrder}&overOrder=${overOrder}`
      );

      return taskReorderSamePromise;
    },
    // onSuccess: () => refreshBoard(),
  });

  return taskReorderSameMutation;
};

interface DropTaskInColumnProps {
  taskId: string | UniqueIdentifier;
  activeOrder: number;
  overOrder: number;
  oldColumnId: string | UniqueIdentifier;
  newColumnId: string | UniqueIdentifier;
}

export const useDropTaskInColumnMutation = (props: {
  refreshBoard: () => void;
}) => {
  const { refreshBoard } = props;

  const dropTaskInColumnMutation = useMutation({
    mutationFn: async (variables: DropTaskInColumnProps) => {
      const { taskId, activeOrder, overOrder, oldColumnId, newColumnId } =
        variables;
      const dropTaskInColumnPromise = axios.put(
        `/api/task?q=dropInColumn&taskId=${taskId}&activeOrder=${activeOrder}&overOrder=${overOrder}&oldColumnId=${oldColumnId}&newColumnId=${newColumnId}`
      );

      return dropTaskInColumnPromise;
    },
    // onSuccess: () => refreshBoard(),
  });

  return dropTaskInColumnMutation;
};

interface TaskReorderDifferentProps {
  taskId: string | UniqueIdentifier;
  oldColumnId: string | UniqueIdentifier;
  newColumnId: string | UniqueIdentifier;
  activeOrder: number;
  overOrder: number;
}

export const useTaskReorderDifferentMutation = (props: {
  refreshBoard: () => void;
}) => {
  const { refreshBoard } = props;

  const taskReorderDifferentMutation = useMutation({
    mutationFn: async (variables: TaskReorderDifferentProps) => {
      const { taskId, oldColumnId, newColumnId, activeOrder, overOrder } =
        variables;
      const taskReorderDifferentPromise = axios.put(
        `/api/task?q=dropDifferent&taskId=${taskId}&activeOrder=${activeOrder}&overOrder=${overOrder}&oldColumnId=${oldColumnId}&newColumnId=${newColumnId}`
      );

      return taskReorderDifferentPromise;
    },
    // onSuccess: () => refreshBoard(),
  });

  return taskReorderDifferentMutation;
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
