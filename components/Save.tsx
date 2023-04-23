import React, { useState } from 'react';
import NewSave from './NewSave';
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
            text: 'Your saving activity',
        },
    },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 2',
            data: [52, 21, 64, 43, 45, 83, 12, 44, 52, 31, 75, 51],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const Save = () => {
    const [newSaveIsOpen, setNewSaveIsOpen] = useState(false);

    return (
        <div className='flex h-screen w-screen flex-col items-center'>
            <NewSave isOpen={newSaveIsOpen} createSave={setNewSaveIsOpen} closeForm={() => setNewSaveIsOpen(false)} />
            <h1 className='py-8 text-ms-blue'>Save</h1>
            <div className='h-[300px] w-[700px]'>
                <Line options={options} data={data} />
            </div>
            <div className='flex flex-col items-center space-y-2 py-6 '>
                <div className='flex items-center justify-center space-x-2'>
                    <h2 className='text-xl font-semibold'>Deposits and Withdrawals</h2>
                    <button className='cta-button w-fit px-4' onClick={() => setNewSaveIsOpen(true)}>
                        + Add
                    </button>
                </div>
                <div className='rounded-xl border border-primary p-2 text-primary dark:border-primary-dark dark:text-primary-dark'>+$304</div>
                <div className='rounded-xl border p-2'>-$124</div>
            </div>
        </div>
    );
};

export default Save;
