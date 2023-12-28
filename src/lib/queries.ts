import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetWorkspaceName = () => {
  const {
    data: workspaceName,
    status,
    refetch: refreshWorkspaceName,
  } = useQuery({
    queryKey: ["workspace"],
    queryFn: async () => {
      const { data } = await axios.get("/api/user?q=workspace");
      return JSON.parse(data) as string;
    },
  });

  return { workspaceName, status, refreshWorkspaceName };
};

export const useGetBoards = () => {
  const {
    data: boards,
    status,
    refetch: refreshBoards,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const { data } = await axios.get("/api/board?q=boards");
      return JSON.parse(data) as BoardProps[];
    },
  });

  return {
    boards,
    status,
    refreshBoards,
  };
};

export const useGetBoard = (props: { id: string }) => {
  const { id } = props;
  const { data: board, status } = useQuery({
    queryKey: ["board", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/board?q=board&boardId=${id}`);
      return JSON.parse(data) as BoardProps;
    },
  });

  return {
    board,
    status,
  };
};
