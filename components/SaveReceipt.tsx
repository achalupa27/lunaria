type Props = {
    save: Save;
};

const SaveReceipt = ({ save }: Props) => {
    return (
        <div className='flex justify-between space-x-8 rounded-lg border p-2'>
            <div>{save.type}</div>
            <div>${save.amount}</div>
        </div>
    );
};

export default SaveReceipt;
