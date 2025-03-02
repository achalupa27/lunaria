import { createRecord, readRecords, updateRecord, deleteRecord } from '@/utils/supabase/crud-utils';
import { handleServiceOperation } from '@/utils/error/service-handler';

/**
 * Create CRUD services for a database table
 * @param T Main entity type with id field
 * @param C Create type (usually without id, user_id, created_at, updated_at)
 * @param U Update type (usually with id but without user_id)
 */
export function createCrudServices<T, C, U>(tableName: string) {
    const create = async (data: C): Promise<T> => {
        return handleServiceOperation(
            async () =>
                createRecord<C, T>({
                    table: tableName,
                    data: data as any, // Type cast needed due to generics limitations
                }),
            `create${tableName}Service`
        );
    };

    const read = async (options: Omit<Parameters<typeof readRecords>[0], 'table'> = {}): Promise<T[]> => {
        return handleServiceOperation(
            async () =>
                readRecords<T>({
                    table: tableName,
                    ...options,
                }),
            `read${tableName}Service`
        );
    };

    const update = async (item: U): Promise<T> => {
        const { id, ...updateData } = item as any;
        return handleServiceOperation(
            async () =>
                updateRecord<U, T>({
                    table: tableName,
                    id,
                    data: updateData as U,
                }),
            `update${tableName}Service`
        );
    };

    const remove = async (id: string): Promise<T> => {
        return handleServiceOperation(
            async () =>
                deleteRecord<T>({
                    table: tableName,
                    id,
                }),
            `delete${tableName}Service`
        );
    };

    return {
        create,
        read,
        update,
        remove,
    };
}
