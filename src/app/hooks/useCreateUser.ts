import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/createUser";
import { USERS_QUERY_KEY, UsersQueryData } from './useUsers';

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
    onMutate: (variables) => {
      const tempUserId = String(Math.random())
      queryClient.setQueryData<UsersQueryData>(
        USERS_QUERY_KEY,
        (old) => old?.concat({
          ...variables,
          id: tempUserId,
          status: 'pending'
        })
      )

      return { tempUserId }
    },
    onSuccess: async (data, _, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY })
      queryClient.setQueryData<UsersQueryData>(
        USERS_QUERY_KEY,
        (old) => old?.map(user => (
          user.id === context.tempUserId ? data : user
        ))
      )
    },
    onError: async (_err, _vars, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY })
      queryClient.setQueryData<UsersQueryData>(
        USERS_QUERY_KEY,
        (old) => old?.filter(user => (
          user.id === context?.tempUserId ? { ...user, status: 'error' } : user
        ))
      )
    }
  });
  return {
    createUser: mutateAsync,
    isLoading: isPending
  }
}
