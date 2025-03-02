import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Options for executing a Supabase operation
 */
type SupabaseOperationOptions<T> = {
    operationName: string;
    operation: (
        supabase: SupabaseClient,
        userId: string
    ) => Promise<{
        data: T | null;
        error: any | null;
    }>;
    requiresData?: boolean;
    notFoundMessage?: string;
};

/**
 * Wrapper for Supabase operations that handles common patterns:
 * - Creating the Supabase client
 * - Getting and validating the current user
 * - Executing the operation
 * - Error handling
 * - Data validation
 */
export async function executeSupabaseOperation<T>(options: SupabaseOperationOptions<T>): Promise<T> {
    const { operationName, operation, requiresData = true, notFoundMessage } = options;
    const supabase = createClient();

    // Get the current user
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error(`Error fetching user for ${operationName}:`, userError.message);
        throw new Error('Authentication required');
    }

    if (!user || !user.user) {
        throw new Error('User not found');
    }

    // Execute the operation
    const { data, error } = await operation(supabase, user.user.id);

    // Handle operation error
    if (error) {
        console.error(`Error in ${operationName}:`, error.message);
        throw new Error(`Operation failed: ${error.message}`);
    }

    // Validate data if required
    if (requiresData && !data) {
        const errorMessage = notFoundMessage || `No data returned from ${operationName}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    return data as T;
}
