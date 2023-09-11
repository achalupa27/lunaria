import React, { useState } from 'react';
import NewSpend from '../Spend/NewSpend';
import { Doughnut } from 'react-chartjs-2';
import SpendReceipt from '../Spend/SpendReceipt';

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
    },
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

const SpendPanel = ({ spends }: { spends: Spend[] }) => {
    const [newSpendIsOpen, setNewSpendIsOpen] = useState(false);
    const [spendsIn, setSpends] = useState(spends);

    return (
        <div className='ms-card py-4 px-8 '>
            <NewSpend isOpen={newSpendIsOpen} closeForm={() => setNewSpendIsOpen(false)} spends={spendsIn} setSpends={setSpends} />

            <div className='flex justify-between pb-4'>
                <h3 className='text-4xl text-yellow-300 dark:text-yellow-200'>Spending</h3>
                <button className='w-48 rounded-lg border border-yellow-200 text-yellow-200 transition duration-200 hover:bg-yellow-200 hover:text-primary' onClick={() => setNewSpendIsOpen(true)}>
                    + Spending
                </button>
            </div>
            <div className='flex justify-between'>
                <div className='h-fit'>
                    <Doughnut options={options} data={spendDoughnut} />
                </div>
                <div className='h-[200px] space-y-2 overflow-y-auto'>
                    {spendsIn.map((spend: Spend) => (
                        <SpendReceipt key={spend.id} spend={spend} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpendPanel;
