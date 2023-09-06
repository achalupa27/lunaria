import React, { useState } from 'react';
import MakeReceipt from '../Make/MakeReceipt';
import { Doughnut } from 'react-chartjs-2';
import NewMake from '../Make/NewMake';

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
    },
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

const MakePanel = ({ makes }: { makes: Make[] }) => {
    const [makesIn, setMakes] = useState(makes);
    const [newMakeIsOpen, setNewMakeIsOpen] = useState(false);

    return (
        <div className='ms-card py-4 px-8'>
            <NewMake isOpen={newMakeIsOpen} closeForm={() => setNewMakeIsOpen(false)} makes={makesIn} setMakes={setMakes} />

            <div className='flex justify-between pb-4'>
                <h3 className='text-4xl text-green-300'>Making</h3>
                <button className='w-60 rounded-lg border border-green-300 text-green-300 transition duration-200 hover:bg-green-300 hover:text-primary' onClick={() => setNewMakeIsOpen(true)}>
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
    );
};

export default MakePanel;
