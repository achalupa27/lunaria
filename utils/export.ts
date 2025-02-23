import { format } from 'date-fns';

export const exportToCSV = (transactions: (Spend | Make | Save)[], filename: string) => {
    // Define headers based on all possible fields
    const headers = ['Date', 'Type', 'Description', 'Amount', 'Category', 'Additional Details'];

    // Convert transactions to CSV rows
    const rows = transactions.map((transaction) => {
        let type = 'Unknown';
        let description = '';
        let amount = 0;
        let additionalDetails = '';

        if ('necessity' in transaction) {
            type = 'Purchase';
            description = transaction.item;
            amount = transaction.cost;
            additionalDetails = `Necessity: ${transaction.necessity}, Store: ${transaction.store}`;
        } else if ('source' in transaction) {
            type = 'Income';
            description = transaction.source;
            amount = transaction.amount;
            additionalDetails = `Source Type: ${transaction.source_type}`;
        } else if ('goal' in transaction) {
            type = 'Savings';
            description = transaction.goal;
            amount = transaction.amount;
            additionalDetails = `Goal Type: ${transaction.goal_type}`;
        }

        return [format(new Date(transaction.date), 'yyyy-MM-dd'), type, description, amount.toString(), transaction.category || '-', additionalDetails];
    });

    // Combine headers and rows
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
