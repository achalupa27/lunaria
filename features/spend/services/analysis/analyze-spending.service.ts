export const analyzeSpending = async (spendingData: any) => {
    const response = await fetch('/api/openai/analyze-spending', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ spendingData }),
    });

    if (!response.ok) {
        throw new Error('Failed to analyze spending');
    }

    const data = await response.json();
    return data.analysis;
};
