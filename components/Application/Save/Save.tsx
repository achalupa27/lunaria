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
        <div className='flex h-screen w-screen p-4'>
            <NewSave isOpen={newSaveIsOpen} closeForm={() => setNewSaveIsOpen(false)} saves={savesIn} setSaves={setSaves} />
            <div>
                <h1 className='py-8 text-center text-blue-300'>Saving</h1>
                <div className='h-[300px] w-[700px]'>
                    <Line options={options} data={data} />
                </div>
            </div>
            <div className='flex flex-col items-center space-y-2 '>
                <button className='w-48 rounded-md border border-blue-300 p-2 text-blue-300 transition duration-200 hover:bg-blue-300 hover:text-primary' onClick={() => setNewSaveIsOpen(true)}>
                    + Saving
                </button>
                <div className='space-y-2'>
                    {savesIn.map((save: any) => (
                        <SaveReceipt key={save.id} save={save} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Save;
