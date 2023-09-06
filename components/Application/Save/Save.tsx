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
    const [savesIn, setSaves] = useState(saves);
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
        <div className='flex h-screen w-screen gap-2 p-2'>
            <NewSave isOpen={newSaveIsOpen} closeForm={() => setNewSaveIsOpen(false)} saves={savesIn} setSaves={setSaves} />
            <div className='ms-card flex flex-col items-center space-y-2 p-2'>
                <button className='w-60 rounded-lg border border-blue-300 p-2 text-blue-300 transition duration-200 hover:bg-blue-300 hover:text-primary' onClick={() => setNewSaveIsOpen(true)}>
                    + Saving
                </button>
                <div className='space-y-2'>
                    {savesIn.map((save: any) => (
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
