type Props = {
    save: Save;
};

const SaveReceipt = ({ save }: Props) => {
    return (
        <div className={`${save.type === 'Deposit' ? 'border-l-blue text-l-blue' : 'border-red-200 text-red-200'} flex w-60 justify-between space-x-8 rounded-lg border p-2 px-4`}>
            <div>{save.type}</div>
            <div>${save.amount}</div>
        </div>
    );
};

export default SaveReceipt;
