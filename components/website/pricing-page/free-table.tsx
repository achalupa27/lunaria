'use client';

import { Button } from '@/components/ui/button';
import { freeFeatures } from '@/components/website/pricing-page/data/features-free';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Props = {
    onSignUpClick: () => void;
};

const FreeTable = ({ onSignUpClick }: Props) => {
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
        <div className='flex h-auto min-h-[36rem] sm:h-[36rem] w-full sm:w-[20rem] flex-col rounded-2xl border border-orange-50 bg-white p-1 shadow dark:bg-black'>
            <div className='mx-auto mt-4 text-center'>
                <div className='text-4xl'>Free</div>
                <div className='text-base sm:text-lg'>No Credit Card required.</div>
            </div>
            <div className='grow px-6 pt-4'>
                {freeFeatures.map((feature, i) => (
                    <div key={i} className='flex items-center gap-2 text-sm leading-8 sm:text-base sm:leading-8'>
                        <CheckCircle size={18} className='text-green-400' />
                        <div>{feature.feature}</div>
                    </div>
                ))}
            </div>
            {session ? (
                <Button asChild className='rounded-b-xl py-5'>
                    <Link href='/dashboard'>Go to Dashboard</Link>
                </Button>
            ) : (
                <Button onClick={onSignUpClick} className='rounded-b-xl py-5'>
                    Sign Up
                </Button>
            )}
        </div>
    );
};

export default FreeTable;
