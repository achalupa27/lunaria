export const formatCurrency = (value: number) => {
    const absValue = Math.abs(value).toFixed(2);
    const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(absValue as any);
    return value < 0 ? `-$${formatted}` : `$${formatted}`;
};
