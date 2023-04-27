import React, { useState } from 'react';
import NewMake from './NewMake';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import MakeReceipt from './MakeReceipt';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
    makes: Make[];
};

const Make = ({ makes }: Props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
    };

    const data = {
        labels: makes.map((make: Make) => make.date),
        datasets: [
            {
                label: 'Making',
                data: makes.map((make) => make.amount),
                borderColor: 'rgb(39, 220, 116)',
                backgroundColor: 'rgba(39, 220, 116, 0.5)',
            },
        ],
    };

    const [newMakeIsOpen, setNewMakeIsOpen] = useState(false);

    return (
        <div className='flex h-screen w-screen flex-col items-center'>
            <NewMake isOpen={newMakeIsOpen} closeForm={() => setNewMakeIsOpen(false)} makes={makes} />
            <h1 className='py-8 text-primary dark:text-primary-dark'>Make</h1>
            <div className='h-[300px] w-[700px] rounded-2xl'>
                <Line options={options} data={data} />
            </div>
            <div className='flex flex-col items-center space-y-2 py-6 '>
                <div className='flex items-center justify-center space-x-2'>
                    <h2 className='text-xl font-semibold'>Income</h2>
                    <button className='cta-button w-fit px-4' onClick={() => setNewMakeIsOpen(true)}>
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
