type Props = {
    make: Make;
};

const MakeReceipt = ({ make }: Props) => {
    return (
        <div className='flex w-48 justify-between space-x-8 rounded-md bg-green-300 p-2 px-4 dark:text-secondary-dark'>
            <div>{make.source}</div>
            <div>${make.amount}</div>
        </div>
    );
};

export default MakeReceipt;
