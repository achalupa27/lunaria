import React from 'react';

type Props = {
    title: string;
    value: string | number;
    currency?: string;
    change?: string;
    color?: string;
    isSelected?: boolean;
    onClick: any;
};

const HeaderCard = ({ title, value, currency = 'CAD', change, color, isSelected, onClick }: Props) => {
    return (
        <div
            className={`hover flex h-fit w-fit flex-col items-end justify-center rounded-lg border ${color === 'green' && 'border-l-green text-l-green'} ${color === 'blue' && 'border-l-blue text-l-blue'} ${color === 'red' && 'border-l-red text-l-red'} ${color === 'yellow' && 'border-l-yellow text-l-yellow'} ${isSelected && 'text-primary'}  ${
                isSelected ? `${color === 'yellow' && 'bg-l-yellow'} ${color === 'blue' && 'bg-l-blue'} ${color === 'green' && 'bg-l-green'}  ${color === 'red' && 'bg-l-red'}` : 'bg-transparent hover:cursor-pointer hover:bg-white/30'
            } px-4 py-2 pt-3`}
            onClick={onClick}>
            <span className='leading-none'>{title}</span>
            <div className='space-x-2'>
                <span className=''>{currency}</span>
                <span className='text-3xl font-semibold'>${value}</span>
            </div>
            {change && <span className='text-sm leading-none text-primary'>+{change}%</span>}
        </div>
    );
};

export default HeaderCard;
