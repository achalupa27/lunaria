import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import SpendReceipt from './Spend/SpendReceipt';
import SaveReceipt from './Save/SaveReceipt';
import MakeReceipt from './Make/MakeReceipt';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
    makes: Make[];
    saves: Save[];
    spends: Spend[];
};

const Dashboard = ({ makes, saves, spends }: Props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Make vs Save vs Spend',
            },
        },
    };

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Make',
                data: makes.map((make) => make.amount),
                borderColor: 'rgb(39, 220, 116)',
                backgroundColor: 'rgba(39, 220, 116, 0.5)',
            },
            {
                label: 'Save',
                data: saves.map((save) => save.amount),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Spend',
                data: spends.map((spend) => spend.amount),
                borderColor: 'rgb(253, 224, 71)',
                backgroundColor: 'rgba(253, 224, 71, 0.5)',
            },
        ],
    };

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
