// create

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// update
export const useUpdateFavoriteMutation = (props: {
  id: string;
  favorite: boolean;
  refreshBoards: () => void;
}) => {
  const { id, favorite, refreshBoards } = props;

  const favoriteMutation = useMutation({
    mutationFn: async () =>
      await axios.put(
        `/api/board?q=favorite&boardId=${id}&isFavorited=${favorite}`
      ),
    onSuccess: () => refreshBoards(),
  });

  return favoriteMutation;
};

// delete
