import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

// create
export const useCreateBoardMutation = (props: {
  id: string;
  title: string;
  refreshBoards: () => void;
}) => {
  const { title, id, refreshBoards } = props;
  const router = useRouter();

  const createBoardMutation = useMutation({
    mutationFn: async () =>
      await axios.post(`/api/board?q=create&id=${id}&title=${title}`),
    onSuccess: () => refreshBoards(),
    onSettled: () => router.push(`/projects/board/${id}`),
  });

  return createBoardMutation;
};

export const useCreateTemplateMutation = (props: {
  id: string;
  type: "todos" | "weeklyPlanner";
  refreshBoards: () => void;
}) => {
  const { id, type, refreshBoards } = props;
  const router = useRouter();

  const createTemplateMutation = useMutation({
    mutationFn: async () =>
      await axios.post(`/api/board?q=template&type=${type}&boardId=${id}`),
    onSuccess: () => refreshBoards(),
    onSettled: () => router.push(`/projects/board/${id}`),
  });

  return createTemplateMutation;
};

// update
export const useUpdateWorkspaceNameMutation = (props: {
  newName: string;
  refreshWorkspaceName: () => void;
}) => {
  const { newName, refreshWorkspaceName } = props;

  const favoriteBoardMutation = useMutation({
    mutationFn: async () =>
      await axios.put(`/api/user?q=workspace&newName=${newName}`),
    onSuccess: () => refreshWorkspaceName(),
  });

  return favoriteBoardMutation;
};

export const useUpdateFavoriteMutation = (props: {
  id: string;
  favorite: boolean;
  refreshBoards: () => void;
}) => {
  const { id, favorite, refreshBoards } = props;

  const favoriteBoardMutation = useMutation({
    mutationFn: async () =>
      await axios.put(
        `/api/board?q=favorite&boardId=${id}&isFavorited=${favorite}`
      ),
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
    mutationFn: async () => await axios.delete(`/api/board?id=${id}`),
    onSuccess: () => refreshBoards(),
  });

  return deleteBoardMutation;
};