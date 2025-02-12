'use client';

import { Button } from '@/components/ui/button';
import { MONTHLY_PRO_PRICE, PRO_MONTHLY_URL, PRO_YEARLY_URL, YEARLY_PRO_PRICE } from '@/constants';
import { professionalFeatures } from '@/components/website/pricing-page/data/features-professional';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Props = {
    term: string;
    onSignUpClick: () => void;
};

const ProTable = ({ term, onSignUpClick }: Props) => {
    const [session, setSession] = useState<any | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            setSession(data?.session?.user);
        };

        getSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase.auth]);

    return (
        <div className='relative flex h-[36rem] w-full sm:w-[22rem] flex-col rounded-2xl border border-orange-100/60 bg-white p-1 dark:bg-black'>
            <div className='dark:gradient-bg absolute left-0 top-0 -z-10 flex h-[36rem] w-full sm:w-[22rem] flex-col rounded-2xl bg-orange-100 blur dark:bg-gradient-to-tr' />

            <div className='mx-auto mt-4 text-center'>
                <div className='text-4xl font-semibold'>Pro</div>
                <div className='text-lg'>{`$${term === 'Monthly' ? MONTHLY_PRO_PRICE : YEARLY_PRO_PRICE} per month`}</div>
                {/* {term === 'Yearly' && <div className='-mt-1 text-sm text-zinc-700'>Billed annually.</div>} */}
            </div>
            <div className='grow px-6 pt-4'>
                {professionalFeatures.map((feature, i) => (
                    <div key={i} className='flex items-center gap-2 leading-8 text-sm sm:text-base'>
                        <CheckCircle size={18} className='text-green-400' /> <div>{feature.feature}</div>
                    </div>
                ))}
            </div>
            {session ? (
                <Button className='rounded-b-xl' size='lg' asChild>
                    <Link href={term === 'Monthly' ? PRO_MONTHLY_URL : PRO_YEARLY_URL}>Start Trial</Link>
                </Button>
            ) : (
                <Button onClick={onSignUpClick} className='rounded-b-xl' size='lg'>
                    Sign Up
                </Button>
            )}
        </div>
    );
};

export default ProTable;
