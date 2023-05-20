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
    const [newSpendIsOpen, setNewSpendIsOpen] = useState(false);

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
            <NewSpend isOpen={newSpendIsOpen} closeForm={() => setNewSpendIsOpen(false)} />
            <h1 className='py-8 text-yellow-200'>Spending</h1>
            <div className='h-[300px] w-[700px]'>
                <Line options={options} data={data} />
            </div>
            <div className='flex flex-col items-center space-y-2 py-6 '>
                <div className='flex items-center justify-center space-x-2'>
                    <button className='w-48 rounded-md border border-yellow-200 p-2 text-yellow-200 transition duration-200 hover:bg-yellow-200 hover:text-primary' onClick={() => setNewSpendIsOpen(true)}>
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
