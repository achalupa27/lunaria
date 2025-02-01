import FeatureRow from './feature-row';
import { Separator } from '@/components/ui/separator';

const FeatureTable = ({ category, features }: any) => {
    return (
        <div className='flex w-full max-w-7xl flex-col items-center justify-center space-y-2 rounded-2xl border-stone-50 bg-stone-100 py-16 pb-24 shadow'>
            <div className='pb-4 text-4xl font-bold'>{category}</div>
            <div className='flex w-[80%] flex-col justify-center space-y-6'>
                {Object.keys(features).map((sectionKey: string) => (
                    <div key={sectionKey} className='w-full'>
                        <div className='flex items-center py-2'>
                            <div className='flex flex-1 items-center space-x-2 font-semibold'>
                                <span>{sectionKey}</span>
                            </div>
                            <div className='flex-1 text-center'>Basic</div>
                            <div className='flex-1 text-center font-semibold'>Pro</div>
                        </div>
                        <div className=''>
                            {(features as Record<string, any>)[sectionKey].map((feature: FeatureRow) => (
                                <FeatureRow key={feature.description} description={feature.description} includedFree={feature.includedFree} includedProfessional={feature.includedProfessional} />
                            ))}
                            <div className='pt-3'>
                                <Separator className='border-stone-400' orientation='horizontal' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureTable;
