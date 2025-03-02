import { z } from 'zod';

/**
 * Creates a Zod schema from a TypeScript type with strict type checking.
 * Will catch mismatches between required and optional fields.
 */
export function createSchemaFromType<T>(schemaDefinition: {
    [K in keyof T]: undefined extends T[K]
        ? z.ZodOptional<z.ZodType<NonNullable<T[K]>>> // Must be optional schema for optional fields
        : z.ZodType<T[K]>; // Must be non-optional schema for required fields
}): z.ZodObject<any, any, any, T> {
    return z.object(schemaDefinition) as any;
}
