type Props = {
    save: Save;
};

const SaveReceipt = ({ save }: Props) => {
    return (
        <div className={`${save.type === 'Deposit' ? 'bg-blue-300' : 'bg-red-300'} flex w-48 justify-between space-x-8 rounded-md p-2 px-4 dark:text-secondary-dark`}>
            <div>{save.type}</div>
            <div>${save.amount}</div>
        </div>
    );
};

export default SaveReceipt;
