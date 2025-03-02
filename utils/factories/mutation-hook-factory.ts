import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type MutationHookOptions<R, C, U> = {
    entityName: string;
    queryKey: string | string[];
    services: {
        create: (data: C) => Promise<R>;
        update: (item: U) => Promise<R>;
        delete: (id: string) => Promise<R>;
    };
    messages?: {
        createSuccess?: string;
        updateSuccess?: string;
        deleteSuccess?: string;
        createError?: string | ((error: Error) => string);
        updateError?: string | ((error: Error) => string);
        deleteError?: string | ((error: Error) => string);
    };
};

/**
 * Create mutation hooks for an entity
 * @param R Row type
 * @param C Create type (Row type without id, user_id, created_at, updated_at)
 * @param U Update type (Create type with id)
 */
export function createMutationHooks<R, C, U>(options: MutationHookOptions<R, C, U>) {
    const { entityName, queryKey, services, messages = {} } = options;

    // Default messages
    const defaultMessages = {
        createSuccess: `${entityName} created!`,
        updateSuccess: `${entityName} updated!`,
        deleteSuccess: `${entityName} deleted!`,
        createError: (error: Error) => `Failed to create ${entityName.toLowerCase()}: ${error.message}`,
        updateError: (error: Error) => `Failed to update ${entityName.toLowerCase()}: ${error.message}`,
        deleteError: (error: Error) => `Failed to delete ${entityName.toLowerCase()}: ${error.message}`,
    };

    // Merge default messages with custom messages
    const finalMessages = {
        ...defaultMessages,
        ...messages,
    };

    // Create the hook
    function useMutateEntity() {
        const queryClient = useQueryClient();
        const queryKeyArray = Array.isArray(queryKey) ? queryKey : [queryKey];

        // Create mutation
        const createMutation = useMutation({
            mutationFn: services.create,
            onMutate: async (newItem) => {
                // Cancel outgoing refetches
                await queryClient.cancelQueries({ queryKey: queryKeyArray });

                // Snapshot previous value
                const previousItems = queryClient.getQueryData(queryKeyArray);

                // Optimistically update the cache
                queryClient.setQueryData(queryKeyArray, (old: R[] = []) => {
                    const optimisticItem = {
                        ...newItem,
                        id: `temp-${Date.now()}`,
                    } as R;
                    return [optimisticItem, ...old];
                });

                return { previousItems };
            },
            onError: (error, _, context) => {
                // Revert to previous state if mutation fails
                if (context?.previousItems) {
                    queryClient.setQueryData(queryKeyArray, context.previousItems);
                }
                const errorMsg = typeof finalMessages.createError === 'function' ? finalMessages.createError(error as Error) : finalMessages.createError;
                toast.error(errorMsg);
            },
            onSuccess: () => {
                toast.success(finalMessages.createSuccess);
            },
            onSettled: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: queryKeyArray });
            },
        });

        // Update mutation
        const updateMutation = useMutation({
            mutationFn: services.update,
            onMutate: async (updatedItem) => {
                await queryClient.cancelQueries({ queryKey: queryKeyArray });

                const previousItems = queryClient.getQueryData(queryKeyArray);

                queryClient.setQueryData(queryKeyArray, (old: R[] = []) => {
                    return old.map((item: any) => (item.id === (updatedItem as any).id ? { ...item, ...(updatedItem as any) } : item));
                });

                return { previousItems };
            },
            onError: (error, _, context) => {
                if (context?.previousItems) {
                    queryClient.setQueryData(queryKeyArray, context.previousItems);
                }
                const errorMsg = typeof finalMessages.updateError === 'function' ? finalMessages.updateError(error as Error) : finalMessages.updateError;
                toast.error(errorMsg);
            },
            onSuccess: () => {
                toast.success(finalMessages.updateSuccess);
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: queryKeyArray });
            },
        });

        // Delete mutation
        const deleteMutation = useMutation({
            mutationFn: services.delete,
            onMutate: async (id) => {
                await queryClient.cancelQueries({ queryKey: queryKeyArray });

                const previousItems = queryClient.getQueryData(queryKeyArray);

                queryClient.setQueryData(queryKeyArray, (old: R[] = []) => {
                    return old.filter((item: any) => item.id !== id);
                });

                return { previousItems };
            },
            onError: (error, _, context) => {
                if (context?.previousItems) {
                    queryClient.setQueryData(queryKeyArray, context.previousItems);
                }
                const errorMsg = typeof finalMessages.deleteError === 'function' ? finalMessages.deleteError(error as Error) : finalMessages.deleteError;
                toast.error(errorMsg);
            },
            onSuccess: () => {
                toast.success(finalMessages.deleteSuccess);
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: queryKeyArray });
            },
        });

        return {
            create: createMutation.mutate,
            update: updateMutation.mutate,
            delete: deleteMutation.mutate,
            isCreating: createMutation.isPending,
            isUpdating: updateMutation.isPending,
            isDeleting: deleteMutation.isPending,
            createError: createMutation.error,
            updateError: updateMutation.error,
            deleteError: deleteMutation.error,
        };
    }

    return useMutateEntity;
}
