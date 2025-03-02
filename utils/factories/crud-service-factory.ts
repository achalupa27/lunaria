import { createRecord, readRecords, updateRecord, deleteRecord } from '@/utils/supabase/crud-utils';
import { handleServiceOperation } from '@/utils/error/service-handler';

/**
 * Create CRUD services for a database table
 * @param R Row type
 * @param C Create type (Row type without id, user_id, created_at, updated_at)
 * @param U Update type (Create type with id)
 */
export function createCrudServices<R, C, U>(tableName: string) {
    const create = async (data: C): Promise<R> => {
        return handleServiceOperation(
            async () =>
                createRecord<C, R>({
                    table: tableName,
                    data: data as any, // Type cast needed due to generics limitations
                }),
            `create${tableName}Service`
        );
    };

    const read = async (options: Omit<Parameters<typeof readRecords>[0], 'table'> = {}): Promise<R[]> => {
        return handleServiceOperation(
            async () =>
                readRecords<R>({
                    table: tableName,
                    ...options,
                }),
            `read${tableName}Service`
        );
    };

    const update = async (item: U): Promise<R> => {
        const { id, ...updateData } = item as any;
        return handleServiceOperation(
            async () =>
                updateRecord<U, R>({
                    table: tableName,
                    id,
                    data: updateData as U,
                }),
            `update${tableName}Service`
        );
    };

    const remove = async (id: string): Promise<R> => {
        return handleServiceOperation(
            async () =>
                deleteRecord<R>({
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
