import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import MakePanel from './MakePanel';
import SavePanel from './SavePanel';
import SpendPanel from './SpendPanel';
import { useAppSelector } from '@/redux/hooks';
import { selectMaking } from '@/redux/slices/makeSlice';
import { selectSpending } from '@/redux/slices/spendSlice';
import Logo from '@/components/Icons/Logo';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const makes = useAppSelector(selectMaking);
    const saves = useAppSelector(selectMaking);
    const spends = useAppSelector(selectSpending);

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    const data: any = {
        labels,
        datasets: [
            {
                label: 'Make',
                data: makes.map((make) => make.amount),
                borderColor: 'rgb(39, 220, 116)',
                backgroundColor: 'rgb(39, 220, 116)',
                cubicInterpolationMode: 'monotone',
            },
            {
                label: 'Save',
                data: saves.map((save) => save.amount),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(53, 162, 235)',
                cubicInterpolationMode: 'monotone',
            },
            {
                label: 'Spend',
                data: spends.map((spend) => spend.total),
                borderColor: 'rgb(253, 224, 71)',
                backgroundColor: 'rgb(253, 224, 71)',
                cubicInterpolationMode: 'monotone',
            },
        ],
    };

    return (
        <div className='grid max-h-screen w-screen grid-cols-2 gap-2 p-2'>
            <div className='ms-card row-span-3 flex items-center justify-center p-4'> {makes.length === 0 && saves.length === 0 && spends.length === 0 ? <div>Record some transactions to get insights.</div> : <Line options={options} data={data} className='ms-card' />}</div>
            <MakePanel />
            <SavePanel />
            <SpendPanel />
        </div>
    );
};

export default Dashboard;
