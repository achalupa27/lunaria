export const analyzeIncome = async (incomeData: any) => {
    const response = await fetch('/api/openai/analyze-income', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ incomeData }),
    });

    if (!response.ok) {
        throw new Error('Failed to analyze income');
    }

    const data = await response.json();
    return data.analysis;
};
