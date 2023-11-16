import { useState } from 'react';
import { spendingCategories } from '../../../data/constants';
import SpendForm from './SpendForm';
import SpendReceipt from './SpendReceipt';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '@/redux/hooks';
import { selectSpending } from '@/redux/slices/spendSlice';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Spend = () => {
    const spends = useAppSelector(selectSpending);
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
                data: spends.map((spend) => spend.cost),
                borderColor: 'rgb(247, 235, 192)',
                backgroundColor: 'rgba(247, 235, 192, 0.5)',
                cubicInterpolationMode: 'monotone',
            },
        ],
    };

    return (
        <div className='flex h-screen w-screen gap-2 p-2'>
            <SpendForm isOpen={newSpendIsOpen} closeForm={() => setNewSpendIsOpen(false)} />
            <div className='ms-card flex flex-col items-center space-y-2 p-2'>
                <button className='w-60 rounded-md border border-l-yellow p-2 text-l-yellow transition duration-200 hover:bg-l-yellow hover:text-primary' onClick={() => setNewSpendIsOpen(true)}>
                    + Spending
                </button>
                <div className='space-y-2'>
                    {spends.map((spend: Spend) => (
                        <SpendReceipt key={spend._id} spend={spend} />
                    ))}
                </div>
            </div>
            <div className='ms-card flex h-[400px] flex-1 p-4 py-6'>
                <Line options={options} data={data} />
            </div>
            {/* <div className='ms-card h-96 w-60 p-2'>
                <div>Your Subscriptions</div>
                <button className='w-full rounded-md border border-l-yellow p-1 text-l-yellow transition duration-200 hover:bg-l-yellow hover:text-primary'>Add Subscription</button>
            </div> */}
        </div>
    );
};

export default Spend;
