type Props = {
    make: Make;
};

const MakeReceipt = ({ make }: Props) => {
    return (
        <div className='flex justify-between space-x-8 rounded-lg border p-2'>
            <div>{make.source}</div>
            <div>${make.amount}</div>
        </div>
    );
};

export default MakeReceipt;
