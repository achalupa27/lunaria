'use client';

type Props = {
    text: string;
    border?: boolean;
};

const RedPill = ({ text, border }: Props) => {
    return <div className={`rounded-lg ${border ? 'border border-red-300 text-red-300' : 'bg-red-300 text-primary'} px-2`}>{text}</div>;
};

export default RedPill;
