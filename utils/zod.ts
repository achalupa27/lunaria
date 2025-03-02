import { z } from 'zod';

/**
 * Creates a Zod schema from a TypeScript type with strict type checking.
 * Will catch mismatches between required and optional fields.
 * Also verifies that number fields use coercion to prevent runtime errors.
 */
export function createSchemaFromType<T>(schemaDefinition: {
    [K in keyof T]: undefined extends T[K]
        ? z.ZodOptional<z.ZodType<NonNullable<T[K]>>> // Must be optional schema for optional fields
        : z.ZodType<T[K]>; // Must be non-optional schema for required fields
}): z.ZodObject<any, any, any, T> {
    // Check that all number schemas use coercion
    for (const [key, value] of Object.entries(schemaDefinition)) {
        const schemaToCheck = value instanceof z.ZodOptional ? value._def.innerType : value;

        if (schemaToCheck instanceof z.ZodNumber && !(schemaToCheck as any)._def.coerce && !(schemaToCheck as any)._def.typeName?.includes('ZodEffects')) {
            throw new Error(`Number field '${key}' is not using coercion. Use z.coerce.number() instead of z.number() to handle form inputs.`);
        }
    }

    return z.object(schemaDefinition) as any;
}
