export const analyzeSpending = async (spendingData: string): Promise<string> => {
    try {
        const response = await fetch('/api/openai/analyze-spending', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                spendingData,
            }),
        });

        const data = await response.json();
        return data.analysis;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to analyze spending');
    }
};
