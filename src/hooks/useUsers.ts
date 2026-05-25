import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { fetchUsers } from "../api/users.api";

export const useUsers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: fetchUsers,

    staleTime: 1000 * 60,
  });
};
