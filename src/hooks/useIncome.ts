import { api } from '@/trpc/react'; // Ensure this path is correct
import { useQueryClient } from '@tanstack/react-query';

const INCCOME_QUERY_KEY = 'income';

// Hook to get all user accounts
export const useGetAllUserIncome = () => {
  return api.income.getAll.useQuery();
};

// Hook to create a new user account
export const useCreateUserIncome = () => {
  const queryClient = useQueryClient();

  return api.income.create.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [INCCOME_QUERY_KEY],
      });
    },
  });
};

// Hook to get a user account by ID
export const useGetUserIncomeById = (id: number) => {
  return api.income.getById.useQuery({ id });
};

// Hook to update a user account
export const useUpdateUserIncome = () => {
  const queryClient = useQueryClient();

  return api.income.update.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [INCCOME_QUERY_KEY],
      });
    },
  });
};

// Hook to delete a user account
export const useDeleteUserIncome = () => {
  const queryClient = useQueryClient();

  return api.income.delete.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [INCCOME_QUERY_KEY],
      });
    },
  });
};
