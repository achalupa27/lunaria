import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import SpendReceipt from './Spend/SpendReceipt';
import SaveReceipt from './Save/SaveReceipt';
import MakeReceipt from './Make/MakeReceipt';
import NewMake from './Make/NewMake';
import NewSpend from './Spend/NewSpend';
import NewSave from './Save/NewSave';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
    makes: Make[];
    saves: Save[];
    spends: Spend[];
};

export const makeDoughnut = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1,
        },
    ],
};

export const saveDoughnut = {
    labels: ['Withdrawals', 'Deposits'],
    datasets: [
        {
            label: 'Amount: ',
            data: [12, 19],
            backgroundColor: ['rgb(252, 165, 165)', 'rgb(147, 197, 253)'],
            borderWidth: 0,
        },
    ],
};

export const spendDoughnut = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1,
        },
    ],
};

const Dashboard = ({ makes, saves, spends }: Props) => {
    const [makesIn, setMakes] = useState(makes);
    const [savesIn, setSaves] = useState(saves);
    const [spendsIn, setSpends] = useState(spends);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
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
                backgroundColor: 'rgb(39, 220, 116)',
            },
            {
                label: 'Save',
                data: saves.map((save) => save.amount),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(53, 162, 235)',
            },
            {
                label: 'Spend',
                data: spends.map((spend) => spend.amount),
                borderColor: 'rgb(253, 224, 71)',
                backgroundColor: 'rgb(253, 224, 71)',
            },
        ],
    };

    const [newMakeIsOpen, setNewMakeIsOpen] = useState(false);
    const [newSpendIsOpen, setNewSpendIsOpen] = useState(false);
    const [newSaveIsOpen, setNewSaveIsOpen] = useState(false);

    return (
        <div className='grid h-screen w-[calc(100vw-56px)] grid-cols-2 gap-1 p-1 dark:bg-[#2c2c2c]'>
            <NewMake isOpen={newMakeIsOpen} closeForm={() => setNewMakeIsOpen(false)} makes={makesIn} setMakes={setMakes} />
            <NewSpend isOpen={newSpendIsOpen} closeForm={() => setNewSpendIsOpen(false)} spends={spendsIn} setSpends={setSpends} />
            <NewSave isOpen={newSaveIsOpen} closeForm={() => setNewSaveIsOpen(false)} saves={savesIn} setSaves={setSaves} />
            <div className='flex items-center justify-center rounded-md bg-gray-100 p-4 dark:bg-primary'>
                <div className='pl-8'>
                    <Line options={options} data={data} />
                </div>
            </div>
            <div className='ms-card py-4 px-8'>
                <div className='flex justify-between pb-4'>
                    <h3 className='text-4xl text-green-300'>Making</h3>
                    <button className='w-48 rounded-md border border-green-300 text-green-300 transition duration-200 hover:bg-green-300 hover:text-primary' onClick={() => setNewMakeIsOpen(true)}>
                        + Making
                    </button>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <Doughnut options={options} data={makeDoughnut} />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        {makesIn.map((make: Make) => (
                            <MakeReceipt key={make.id} make={make} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='ms-card py-4 px-8'>
                <div className='flex justify-between pb-4'>
                    <h3 className='text-4xl text-blue-300'>Saving</h3>
                    <button className='w-48 rounded-md border border-blue-300 text-blue-300 transition duration-200 hover:bg-blue-300 hover:text-primary' onClick={() => setNewSaveIsOpen(true)}>
                        + Saving
                    </button>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <Doughnut options={options} data={saveDoughnut} />
                    </div>
                    <div className='flex max-h-fit flex-col space-y-2 overflow-y-auto   '>
                        {savesIn.map((save: Save) => (
                            <SaveReceipt key={save.id} save={save} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='ms-card py-4 px-8 '>
                <div className='flex justify-between pb-4'>
                    <h3 className='text-4xl text-yellow-300 dark:text-yellow-200'>Spending</h3>
                    <button className='w-48 rounded-md border border-yellow-200 text-yellow-200 transition duration-200 hover:bg-yellow-200 hover:text-primary' onClick={() => setNewSpendIsOpen(true)}>
                        + Spending
                    </button>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <Doughnut options={options} data={spendDoughnut} />
                    </div>
                    <div className='flex max-h-fit flex-col space-y-2 overflow-y-auto'>
                        {spendsIn.map((spend: Spend) => (
                            <SpendReceipt key={spend.id} spend={spend} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
