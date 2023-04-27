import { useState } from 'react';
import { spendingCategories } from '../../../data/constants';
import NewSpend from './NewSpend';
import SpendReceipt from './SpendReceipt';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
    spends: Spend[];
};

const Spend = ({ spends }: Props) => {
    const [newTransactionIsOpen, setNewTransactionIsOpen] = useState(false);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
    };

    const data = {
        labels: spends.map((spends: Spend) => spends.date),
        datasets: [
            {
                label: 'Spending',
                data: spends.map((spend) => spend.amount),
                borderColor: 'rgb(253, 224, 71)',
                backgroundColor: 'rgba(253, 224, 71, 0.5)',
            },
        ],
    };

    return (
        <div className='flex h-screen w-screen flex-col items-center'>
            <NewSpend isOpen={newTransactionIsOpen} closeForm={() => setNewTransactionIsOpen(false)} />
            <h1 className='py-8 text-yellow-300'>Spend</h1>
            <div className='h-[300px] w-[700px]'>
                <Line options={options} data={data} />
            </div>
            <div className='flex flex-col items-center space-y-2 py-6 '>
                <div className='flex items-center justify-center space-x-2'>
                    <h2 className='text-xl font-semibold'>Transactions</h2>
                    <button className='cta-button w-fit bg-yellow-300 px-4 hover:bg-yellow-400 dark:bg-yellow-300 dark:hover:bg-yellow-200' onClick={() => setNewTransactionIsOpen(true)}>
                        + Add
                    </button>
                </div>
                <div className='space-y-2'>
                    {spends.map((spend: Spend) => (
                        <SpendReceipt key={spend.id} spend={spend} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Spend;
