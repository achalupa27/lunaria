import React, { useState } from 'react';
import NewSave from './NewSave';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import SaveReceipt from './SaveReceipt';
import { useAppSelector } from '@/redux/hooks';
import { selectSaving } from '@/redux/slices/saveSlice';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Save = () => {
    const saves = useAppSelector(selectSaving);
    const [newSaveIsOpen, setNewSaveIsOpen] = useState(false);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
    };

    const data: any = {
        labels: saves.map((save: Save) => save.date),
        datasets: [
            {
                label: 'Saving',
                data: saves.map((save) => save.amount),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                cubicInterpolationMode: 'monotone',
            },
        ],
    };

    return (
        <div className='flex h-screen w-screen gap-2 p-2'>
            <NewSave isOpen={newSaveIsOpen} closeForm={() => setNewSaveIsOpen(false)} />
            <div className='ms-card flex flex-col items-center space-y-2 p-2'>
                <button className='w-60 rounded-lg border border-l-blue p-2 text-l-blue transition duration-200 hover:bg-l-blue hover:text-primary' onClick={() => setNewSaveIsOpen(true)}>
                    + Saving
                </button>
                <div className='space-y-2'>
                    {saves.map((save: any) => (
                        <SaveReceipt key={save.id} save={save} />
                    ))}
                </div>
            </div>
            <div className='ms-card flex h-[400px] w-fit flex-1 p-4 py-6'>
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default Save;
