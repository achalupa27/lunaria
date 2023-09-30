import React, { useEffect, useState } from 'react';
import NewSpend from '../Spend/NewSpend';
import { Doughnut } from 'react-chartjs-2';
import SpendReceipt from '../Spend/SpendReceipt';
import { useAppSelector } from '@/redux/hooks';
import { selectSpending } from '@/redux/slices/spendSlice';
import Image from 'next/image';
import { useTheme } from 'next-themes';

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
            backgroundColor: ['#f7ebc0', '#f7ebc0', '#f7ebc0', '#f7ebc0', '#f7ebc0', '#f7ebc0'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 5,
        },
    ],
};

const SpendPanel = () => {
    const [newSpendIsOpen, setNewSpendIsOpen] = useState(false);
    const spends = useAppSelector(selectSpending);

    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <div className='ms-card py-4 px-4'>
            <NewSpend isOpen={newSpendIsOpen} closeForm={() => setNewSpendIsOpen(false)} />

            <div className='flex justify-between pb-4'>
                <div className='flex items-center'>
                    <Image src={theme === 'light' ? '/spend-dark.svg' : '/spend.svg'} alt='' height={48} width={48} />
                    <h3 className='text-4xl text-ld-yellow dark:text-l-yellow'>Spending</h3>
                </div>
                <button className='h-10 w-48 rounded-lg border border-ld-yellow text-ld-yellow transition duration-200 hover:bg-ld-yellow hover:text-primary dark:border-l-yellow dark:text-l-yellow dark:hover:bg-l-yellow dark:hover:text-primary' onClick={() => setNewSpendIsOpen(true)}>
                    + Spending
                </button>
            </div>
            {spends.length === 0 ? (
                <div>Record a spending event to get started.</div>
            ) : (
                <div className='flex justify-between'>
                    <div className='h-fit'>
                        <Doughnut options={options} data={spendDoughnut} />
                    </div>
                    <div className='h-[200px] space-y-2 overflow-y-auto'>
                        {spends.map((spend: Spend) => (
                            <SpendReceipt key={spend.id} spend={spend} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpendPanel;
