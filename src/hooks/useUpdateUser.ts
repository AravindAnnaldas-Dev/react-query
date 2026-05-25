import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/users.api";
import { QUERY_KEYS } from "../constants/queryKeys";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USERS,
      });
    },
  });
};
