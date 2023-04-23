import { useState } from 'react';
import { spendingCategories } from '../data/constants';
import NewSpend from './NewSpend';
import SpendReceipt from './SpendReceipt';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Income',
            data: [23, 34, 23, 120, 31, 12, 21, 45, 12, 34, 53, 54],
            borderColor: 'rgb(253, 224, 71)',
            backgroundColor: 'rgba(253, 224, 71, 0.5)',
        },
    ],
};

const Spend = ({ spends }: any) => {
    const [newTransactionIsOpen, setNewTransactionIsOpen] = useState(false);

    return (
        <div className='flex h-screen w-screen flex-col items-center'>
            <NewSpend isOpen={newTransactionIsOpen} createTransaction={setNewTransactionIsOpen} closeForm={() => setNewTransactionIsOpen(false)} />
            <h1 className='py-8 text-yellow-300'>Spend</h1>
            <div className='h-[300px] w-[700px]'>
                <Line options={options} data={data} />
            </div>
            <div className='flex flex-col items-center space-y-2 py-6 '>
                <div className='flex items-center justify-center space-x-2'>
                    <h2 className='text-xl font-semibold'>Transactions</h2>
                    <button className='cta-button w-fit px-4' onClick={() => setNewTransactionIsOpen(true)}>
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
