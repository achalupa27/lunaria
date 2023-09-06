type Props = {
    spend: Spend;
};

const Receipt = ({ spend }: Props) => {
    return (
        <div className='flex w-60 justify-between space-x-8 rounded-md bg-yellow-200 p-2 px-4 dark:text-secondary-dark'>
            <div>{spend.store}</div>
            <div>${spend.amount}</div>
        </div>
    );
};

export default Receipt;
