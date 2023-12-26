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
      await axios.post(`/api/board?id=${id}&title=${title}`),
    onSuccess: () => refreshBoards(),
    onSettled: () => router.push(`/projects/board/${id}`),
  });

  return createBoardMutation;
};

// update
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

// delete
