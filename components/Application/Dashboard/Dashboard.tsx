import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import MakePanel from './MakePanel';
import SavePanel from './SavePanel';
import SpendPanel from './SpendPanel';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
    makes: Make[];
    saves: Save[];
    spends: Spend[];
};

const Dashboard = ({ makes, saves, spends }: Props) => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Make',
                data: makes.map((make) => make.amount),
                borderColor: 'rgb(39, 220, 116)',
                backgroundColor: 'rgb(39, 220, 116)',
            },
            {
                label: 'Save',
                data: saves.map((save) => save.amount),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(53, 162, 235)',
            },
            {
                label: 'Spend',
                data: spends.map((spend) => spend.amount),
                borderColor: 'rgb(253, 224, 71)',
                backgroundColor: 'rgb(253, 224, 71)',
            },
        ],
    };

    return (
        <div className='grid max-h-screen w-[calc(100vw-56px)] grid-cols-2 gap-2 p-2'>
            <div className='ms-card'>
                <Line options={options} data={data} className='ms-card' />
            </div>
            <MakePanel makes={makes} />
            <SavePanel saves={saves} />
            <SpendPanel spends={spends} />
        </div>
    );
};

export default Dashboard;
