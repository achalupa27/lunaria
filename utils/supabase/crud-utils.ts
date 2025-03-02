import { SupabaseClient } from '@supabase/supabase-js';
import { executeSupabaseOperation } from './operation-wrapper';

interface CreateOptions<C> {
    table: string;
    data: C;
    select?: string;
}

interface ReadOptions {
    table: string;
    select?: string;
    filters?: Record<string, any>;
    order?: {
        column: string;
        ascending?: boolean;
    };
    limit?: number;
}

interface UpdateOptions<U> {
    table: string;
    id: string;
    data: U;
    select?: string;
}

interface DeleteOptions {
    table: string;
    id: string;
    select?: string;
}

export async function createRecord<C, T>(options: CreateOptions<C>): Promise<T> {
    return executeSupabaseOperation<T>({
        operationName: `create_${options.table}`,
        operation: async (supabase: SupabaseClient, userId: string) => {
            return supabase
                .from(options.table)
                .insert({
                    ...options.data,
                    user_id: userId,
                })
                .select(options.select || '*')
                .single();
        },
        notFoundMessage: `No data returned after creating ${options.table}`,
    });
}

export async function readRecords<T>(options: ReadOptions): Promise<T[]> {
    return executeSupabaseOperation<T[]>({
        operationName: `read_${options.table}`,
        operation: async (supabase: SupabaseClient, userId: string) => {
            // Build query
            let query = supabase
                .from(options.table)
                .select(options.select || '*')
                .eq('user_id', userId);

            // Apply additional filters
            if (options.filters) {
                Object.entries(options.filters).forEach(([key, value]) => {
                    query = query.eq(key, value);
                });
            }

            // Apply ordering
            if (options.order) {
                query = query.order(options.order.column, {
                    ascending: options.order.ascending ?? false,
                });
            }

            // Apply limit
            if (options.limit) {
                query = query.limit(options.limit);
            }

            // Execute query
            return query as any;
        },
        notFoundMessage: `No data returned when reading from ${options.table}`,
    });
}

export async function getRecord<T>(table: string, id: string, select: string = '*'): Promise<T> {
    return executeSupabaseOperation<T>({
        operationName: `get_${table}`,
        operation: async (supabase: SupabaseClient, userId: string) => {
            return supabase.from(table).select(select).eq('id', id).eq('user_id', userId).single();
        },
        notFoundMessage: `Record not found in ${table}`,
    });
}

export async function updateRecord<U, T>(options: UpdateOptions<U>): Promise<T> {
    return executeSupabaseOperation<T>({
        operationName: `update_${options.table}`,
        operation: async (supabase: SupabaseClient, userId: string) => {
            return supabase
                .from(options.table)
                .update(options.data)
                .eq('id', options.id)
                .eq('user_id', userId)
                .select(options.select || '*')
                .single();
        },
        notFoundMessage: `${options.table} not found or not updated`,
    });
}

export async function deleteRecord<T>(options: DeleteOptions): Promise<T> {
    // First get the record to return it after deletion
    const record = await getRecord<T>(options.table, options.id, options.select || '*');

    // Then delete it
    await executeSupabaseOperation<null>({
        operationName: `delete_${options.table}`,
        operation: async (supabase: SupabaseClient, userId: string) => {
            return supabase.from(options.table).delete().eq('id', options.id).eq('user_id', userId);
        },
        requiresData: false,
    });

    return record;
}
