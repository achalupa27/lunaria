import HeaderCard from '@/components/ui/buttons/header-card';
import Page from '@/components/ui/page';
import { useAppSelector } from '@/redux/hooks';
import { selectMaking } from '@/redux/slices/makeSlice';
import { selectSpending } from '@/redux/slices/spendSlice';

const Home = () => {
    const makes = useAppSelector(selectMaking);
    const saves = useAppSelector(selectMaking);
    const spends = useAppSelector(selectSpending);

    return (
        <Page>
            <div className='flex justify-between'>
                <div className='bg-gradient-to-br from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] bg-clip-text text-[40px] font-semibold text-transparent'>Home</div>
            </div>
            <div className='my-2 flex space-x-6'>
                <HeaderCard title={'Net Income'} value={'30'} isSelected={true} color='green' />
                <HeaderCard title={'Net Savings'} value={'-12331'} isSelected={true} color='blue' />
                <HeaderCard title={'Net Spending'} value={'30'} isSelected={true} color='yellow' />
            </div>
        </Page>
    );
};

export default Home;
