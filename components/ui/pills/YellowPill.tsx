import React from 'react';

type Props = {
    text: string;
    border?: boolean;
};

const YellowPill = ({ text, border }: Props) => {
    return <div className={`rounded-lg ${border ? 'border border-l-yellow text-l-yellow' : 'bg-l-yellow text-primary'} px-2`}>{text}</div>;
};

export default YellowPill;
