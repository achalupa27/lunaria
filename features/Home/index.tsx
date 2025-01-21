import Page from '@/components/ui/Page';
import PageHeader from '@/components/ui/PageHeader';
import { useAppSelector } from '@/redux/hooks';
import { selectMaking } from '@/redux/slices/makeSlice';
import { selectSpending } from '@/redux/slices/spendSlice';

const Dashboard = () => {
    const makes = useAppSelector(selectMaking);
    const saves = useAppSelector(selectMaking);
    const spends = useAppSelector(selectSpending);

    return (
        <Page>
            <div className='flex justify-between'>
                <div className='bg-gradient-to-br from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] bg-clip-text text-[40px] font-semibold text-transparent'>Home</div>
            </div>
        </Page>
    );
};

export default Dashboard;
