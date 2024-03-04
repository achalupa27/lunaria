import { useAppSelector } from '@/redux/hooks';
import { selectMaking } from '@/redux/slices/makeSlice';
import { selectSpending } from '@/redux/slices/spendSlice';

const Dashboard = () => {
    const makes = useAppSelector(selectMaking);
    const saves = useAppSelector(selectMaking);
    const spends = useAppSelector(selectSpending);

    return <div className=''>Chart</div>;
};

export default Dashboard;
