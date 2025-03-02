/**
 * Wraps service operations with consistent error handling
 * @param operation The async operation to execute
 * @param serviceName Name of the service for error logging
 * @returns Result of the operation
 */
export async function handleServiceOperation<R>(operation: () => Promise<R>, serviceName: string): Promise<R> {
    try {
        return await operation();
    } catch (error) {
        console.error(`Error in ${serviceName}:`, error);
        throw error; // Re-throw to allow components to handle specific errors
    }
}
