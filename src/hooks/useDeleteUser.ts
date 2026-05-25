import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/users.api";
import { QUERY_KEYS } from "../constants/queryKeys";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USERS,
      });
    },
  });
};
