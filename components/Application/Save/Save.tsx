import React, { useState } from 'react';
import NewSave from './NewSave';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import SaveReceipt from './SaveReceipt';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
    saves: Save[];
};

const Save = ({ saves }: Props) => {
    const [newSaveIsOpen, setNewSaveIsOpen] = useState(false);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
    };

    const data = {
        labels: saves.map((save: Save) => save.date),
        datasets: [
            {
                label: 'Saving',
                data: saves.map((save) => save.amount),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className='flex h-screen w-screen flex-col items-center'>
            <NewSave isOpen={newSaveIsOpen} closeForm={() => setNewSaveIsOpen(false)} />
            <h1 className='py-8 text-ms-blue'>Save</h1>
            <div className='h-[300px] w-[700px]'>
                <Line options={options} data={data} />
            </div>
            <div className='flex flex-col items-center space-y-2 py-6 '>
                <div className='flex items-center justify-center space-x-2'>
                    <h2 className='text-xl font-semibold'>Deposits and Withdrawals</h2>
                    <button className='cta-button w-fit bg-ms-blue px-4 hover:bg-ms-blue-hover dark:bg-ms-blue dark:hover:bg-ms-blue-dark-hover' onClick={() => setNewSaveIsOpen(true)}>
                        + Add
                    </button>
                </div>
                <div className='space-y-2'>
                    {saves.map((save: any) => (
                        <SaveReceipt key={save.id} save={save} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Save;
