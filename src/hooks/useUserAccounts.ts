import { api } from '@/trpc/react'; // Ensure this path is correct
import { useQueryClient } from '@tanstack/react-query';

const USER_ACCOUNTS_QUERY_KEY = 'userAccount';

// Hook to get all user accounts
export const useGetAllUserAccounts = () => {
  return api.userAccount.getAll.useQuery();
};

// Hook to create a new user account
export const useCreateUserAccount = () => {
  const queryClient = useQueryClient();

  return api.userAccount.create.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_ACCOUNTS_QUERY_KEY],
      });
    },
  });
};

// Hook to get a user account by ID
export const useGetUserAccountById = (id: number) => {
  return api.userAccount.getById.useQuery({ id });
};

// Hook to update a user account
export const useUpdateUserAccount = () => {
  const queryClient = useQueryClient();

  return api.userAccount.update.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_ACCOUNTS_QUERY_KEY],
      });
    },
  });
};

// Hook to delete a user account
export const useDeleteUserAccount = () => {
  const queryClient = useQueryClient();

  return api.userAccount.delete.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_ACCOUNTS_QUERY_KEY],
      });
    },
  });
};
