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
    const [makesIn, setMakes] = useState(makes);
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
        <div className='flex h-screen w-screen gap-2 p-2'>
            <NewMake isOpen={newMakeIsOpen} closeForm={() => setNewMakeIsOpen(false)} makes={makesIn} setMakes={setMakes} />
            <div className='ms-card flex flex-col items-center space-y-2 p-2'>
                <button className='w-60 rounded-md border border-green-300 p-2 text-green-300 transition duration-200 hover:bg-green-300 hover:text-primary' onClick={() => setNewMakeIsOpen(true)}>
                    + Making
                </button>
                <div className='space-y-2'>
                    {makesIn.map((make: Make) => (
                        <MakeReceipt key={make.id} make={make} />
                    ))}
                </div>
            </div>
            <div className='ms-card flex h-[400px] w-fit flex-1 p-4 py-6'>
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default Make;
