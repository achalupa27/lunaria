import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import SpendReceipt from './Spend/SpendReceipt';
import SaveReceipt from './Save/SaveReceipt';
import MakeReceipt from './Make/MakeReceipt';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Make vs Save vs Spend',
        },
    },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Make',
            data: [12, 32, 34, 12, 43, 12, 43, 54, 23, 76, 13, 54],
            borderColor: 'rgb(39, 220, 116)',
            backgroundColor: 'rgba(39, 220, 116, 0.5)',
        },
        {
            label: 'Save',
            data: [52, 21, 64, 43, 45, 83, 12, 44, 52, 31, 75, 51],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Spend',
            data: [23, 34, 23, 120, 31, 12, 21, 45, 12, 34, 53, 54],
            borderColor: 'rgb(253, 224, 71)',
            backgroundColor: 'rgba(253, 224, 71, 0.5)',
        },
    ],
};

const Dashboard = ({ makes, saves, spends }: any) => {
    return (
        <div className='flex h-screen w-screen flex-col items-center'>
            <h1 className='py-8'>Dashboard</h1>
            <div className='h-[300px] w-[700px]'>
                <Line options={options} data={data} />
            </div>
            <div className='flex space-x-3'>
                <div className='flex flex-col items-center space-y-2'>
                    <h3>Make</h3>
                    {makes.map((make: Make) => (
                        <MakeReceipt key={make.id} make={make} />
                    ))}
                </div>
                <div className='flex flex-col items-center space-y-2'>
                    <h3>Save</h3>
                    {saves.map((save: Save) => (
                        <SaveReceipt key={save.id} save={save} />
                    ))}
                </div>
                <div className='flex flex-col items-center space-y-2'>
                    <h3>Spend</h3>
                    {spends.map((spend: Spend) => (
                        <SpendReceipt key={spend.id} spend={spend} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
