type Props = {
    text: string;
    border?: boolean;
};

const GreenPill = ({ text, border }: Props) => {
    return <div className={`rounded-lg ${border ? 'border border-l-green text-l-green' : 'bg-l-green text-primary'} px-2`}>{text}</div>;
};

export default GreenPill;
