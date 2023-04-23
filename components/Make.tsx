import React, { useState } from 'react';
import NewMake from './NewMake';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import MakeReceipt from './MakeReceipt';

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
            label: 'Dataset 1',
            data: [12, 32, 34, 12, 43, 12, 43, 54, 23, 76, 13, 54],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

const Make = ({ makes }: any) => {
    const [newIncomeIsOpen, setNewIncomeIsOpen] = useState(false);

    return (
        <div className='flex h-screen w-screen flex-col items-center'>
            <NewMake isOpen={newIncomeIsOpen} createIncome={setNewIncomeIsOpen} closeForm={() => setNewIncomeIsOpen(false)} />
            <h1 className='py-8 text-primary dark:text-primary-dark'>Make</h1>
            <div className='h-[300px] w-[700px] rounded-2xl'>
                <Line options={options} data={data} />
            </div>
            <div className='flex flex-col items-center space-y-2 py-6 '>
                <div className='flex items-center justify-center space-x-2'>
                    <h2 className='text-xl font-semibold'>Income</h2>
                    <button className='cta-button w-fit px-4' onClick={() => setNewIncomeIsOpen(true)}>
                        + Add
                    </button>
                </div>
                <div className='space-y-2'>
                    {makes.map((make: Make) => (
                        <MakeReceipt key={make.id} make={make} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Make;
