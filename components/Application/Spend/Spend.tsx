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
    const [spendsIn, setSpends] = useState(spends);
    const [newSpendIsOpen, setNewSpendIsOpen] = useState(false);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
    };

    const data: any = {
        labels: spends.map((spends: Spend) => spends.date),
        datasets: [
            {
                label: 'Spending',
                data: spends.map((spend) => spend.amount),
                borderColor: 'rgb(253, 224, 71)',
                backgroundColor: 'rgba(253, 224, 71, 0.5)',
                cubicInterpolationMode: 'monotone',
            },
        ],
    };

    return (
        <div className='flex h-screen w-screen gap-2 p-2'>
            <NewSpend isOpen={newSpendIsOpen} closeForm={() => setNewSpendIsOpen(false)} spends={spendsIn} setSpends={setSpends} />
            <div className='ms-card flex flex-col items-center space-y-2 p-2'>
                <button className='w-60 rounded-md border border-yellow-200 p-2 text-yellow-200 transition duration-200 hover:bg-yellow-200 hover:text-primary' onClick={() => setNewSpendIsOpen(true)}>
                    + Spending
                </button>
                <div className='space-y-2'>
                    {spendsIn.map((spend: Spend) => (
                        <SpendReceipt key={spend.id} spend={spend} />
                    ))}
                </div>
            </div>
            <div className='ms-card flex h-[400px] flex-1 p-4 py-6'>
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default Spend;
