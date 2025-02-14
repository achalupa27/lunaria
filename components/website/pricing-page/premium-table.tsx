'use client';

import { Button } from '@/components/ui/button';
import { MONTHLY_PREMIUM_PRICE, PREMIUM_MONTHLY_URL, PREMIUM_YEARLY_URL, YEARLY_PREMIUM_PRICE } from '@/constants';
import {} from '@/components/website/pricing-page/data/features-professional';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { premiumFeatures } from './data/features-premium';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Props = {
    term: string;
    onSignUpClick: () => void;
};

const PremiumTable = ({ term, onSignUpClick }: Props) => {
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
        <div className='gold-gradient relative flex h-auto sm:h-[36rem] w-full sm:w-[20rem] lg:w-[22rem] flex-col rounded-2xl border border-orange-200 p-1 dark:bg-black dark:text-black'>
            <div className='absolute left-0 top-0 -z-10 flex h-auto sm:h-[36rem] w-full sm:w-[20rem] lg:w-[22rem] flex-col rounded-2xl bg-orange-100 blur' />

            <div className='mx-auto mt-4 text-center'>
                <div className='text-4xl font-semibold'>Premium</div>
                <div className='text-lg'>{`$${term === 'Monthly' ? MONTHLY_PREMIUM_PRICE : YEARLY_PREMIUM_PRICE} per month`}</div>
                {/* {term === 'Yearly' && <div className='-mt-1 text-sm text-zinc-700'>Billed annually.</div>} */}
            </div>
            <div className='grow px-6 pt-4'>
                {premiumFeatures.map((feature, i) => (
                    <div key={i} className='flex items-center gap-2 text-sm leading-8 sm:text-base sm:leading-8'>
                        <CheckCircle size={18} className='text-black' /> <div>{feature.feature}</div>
                    </div>
                ))}
            </div>
            {session ? (
                <Button asChild className='rounded-b-xl' size='lg'>
                    <Link href={term === 'Monthly' ? PREMIUM_MONTHLY_URL : PREMIUM_YEARLY_URL}>Start Trial</Link>
                </Button>
            ) : (
                <Button onClick={onSignUpClick} className='rounded-b-xl' size='lg'>
                    Sign Up
                </Button>
            )}
        </div>
    );
};

export default PremiumTable;
