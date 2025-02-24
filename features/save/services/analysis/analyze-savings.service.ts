export const analyzeSavings = async (savingsData: any) => {
    const response = await fetch('/api/openai/analyze-savings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ savingsData }),
    });

    if (!response.ok) {
        throw new Error('Failed to analyze savings');
    }

    const data = await response.json();
    return data.analysis;
};
