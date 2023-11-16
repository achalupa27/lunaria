import React, { useState } from 'react';
import NewMake from './MakeForm';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import MakeReceipt from './MakeReceipt';
import { useAppSelector } from '@/redux/hooks';
import { selectMaking } from '@/redux/slices/makeSlice';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Make = () => {
    const makes = useAppSelector(selectMaking);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
    };

    const data: any = {
        labels: makes.map((make: Make) => make.date),
        datasets: [
            {
                label: 'Making',
                data: makes.map((make) => make.amount),
                borderColor: 'rgb(153, 245, 209)',
                backgroundColor: 'rgba(153, 245, 209, 0.5)',
                cubicInterpolationMode: 'monotone',
            },
        ],
    };

    const [newMakeIsOpen, setNewMakeIsOpen] = useState(false);

    return (
        <div className='flex h-screen w-screen gap-2 p-2'>
            <NewMake isOpen={newMakeIsOpen} closeForm={() => setNewMakeIsOpen(false)} />
            <div className='ms-card flex flex-col items-center space-y-2 p-2'>
                <button className='w-60 rounded-md border border-l-green p-2 text-l-green transition duration-200 hover:bg-l-green hover:text-primary' onClick={() => setNewMakeIsOpen(true)}>
                    + Making
                </button>
                <div className='space-y-2'>
                    {makes.map((make: Make) => (
                        <MakeReceipt key={make._id} make={make} />
                    ))}
                </div>
            </div>
            <div className='ms-card flex h-[400px] w-fit flex-1 p-4 py-6'>
                <Line options={options} data={data} />
            </div>
            {/* <div className='ms-card h-96 w-60 p-2'>
                <div>Your Income Sources</div>
                <button className='w-full rounded-md border border-l-green p-1 text-l-green transition duration-200 hover:bg-l-green hover:text-primary'>Add Income Source</button>
            </div> */}
        </div>
    );
};

export default Make;
