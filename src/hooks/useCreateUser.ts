import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/users.api";
import { QUERY_KEYS } from "../constants/queryKeys";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USERS,
      });
    },
  });
};
