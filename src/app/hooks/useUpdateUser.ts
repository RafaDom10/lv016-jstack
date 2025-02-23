import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/updateUser";
import { USERS_QUERY_KEY } from "./useUsers";
import { IUser } from "../types/IUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onMutate: (variables) => {
      const previousUsersData = queryClient.getQueryData<IUser[]>(USERS_QUERY_KEY)
      queryClient.setQueryData<IUser[]>(
        USERS_QUERY_KEY,
        (old) => old?.map(user => (
          user.id === variables.id ? { ...user, ...variables } : user
        ))
      )
      return { previousUsersData }
    },
    onError: async (_err, _vars, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY })
      queryClient.setQueryData<IUser[]>(
        USERS_QUERY_KEY,
        context?.previousUsersData
      )
    }
  });
  return {
    updateUser: mutateAsync,
    isLoading: isPending
  }
}
