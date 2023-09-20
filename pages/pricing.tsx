import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import freeFeatures from '../data/features-free.json';
import basicFeatures from '../data/features-basic.json';
import professionalFeatures from '../data/features-professional.json';
import Link from 'next/link';

function Pricing() {
    //monthly basic - price_1MV9BxFcFQVvj4RKvh3caJfZ
    //monthly professional - price_1MV9BxFcFQVvj4RKAmWkAPE3

    const user = false;

    async function purchaseSubscription(type: string, term: string) {
        var price;
        if (type === 'Basic' && term === 'Monthly') {
            price = 'price_1MV9BxFcFQVvj4RKvh3caJfZ';
        } else if (type === 'Basic' && term === 'Yearly') {
            price = 'price_1MZMbnFcFQVvj4RKgTSS8bQU';
        } else if (type === 'Professional' && term === 'Monthly') {
            price = 'price_1MV9BxFcFQVvj4RKAmWkAPE3';
        } else if (type === 'Professional' && term === 'Yearly') {
            price = 'price_1MZMacFcFQVvj4RKO4ehFLva';
        }

        const stripe = await loadStripe('pk_test_51MV97ZFcFQVvj4RK5IxZX1DkxYgiJXx5uoB18RP50uRxWXd9At9xpIxcFbjsGeEDnqpLsJGRGmoMkKBExTjCNhG2009xsqUoI2');
        const { error }: any = await stripe?.redirectToCheckout({
            lineItems: [
                {
                    price,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            successUrl: 'https://www.mapfeed.io/app',
            cancelUrl: 'https://www.mapfeed.io/features',
        });

        if (error) {
            console.log(error);
        }
    }

    var selectedTerm: string = 'Yearly';

    const [term, setTerm] = useState('Yearly');

    const handleTerm = (term: string) => {
        setTerm(term);
        selectedTerm = term;
    };

    return (
        <div className='flex min-h-screen flex-col items-center gap-12 pt-32 pb-12'>
            <h1 className='bg-gradient-to-r from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] bg-clip-text text-4xl font-semibold tracking-tighter text-transparent md:text-6xl'>Start Today.</h1>
            <div className='relative flex h-10 w-80 items-center justify-center rounded-xl bg-gradient-to-br from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] p-[2px] text-secondary'>
                <div className='absolute flex h-[38px] w-[318px] items-center justify-center rounded-xl bg-primary p-[2px] text-primary'>
                    <div className={`flex h-[34px] w-1/2 items-center justify-center space-x-2 rounded-xl text-sm font-semibold transition duration-200 ${term == 'Monthly' ? ' bg-gradient-to-r from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] text-primary' : 'text-secondary'}`} onClick={() => handleTerm('Monthly')}>
                        Monthly
                    </div>
                    <div className={`flex h-[34px] w-1/2 items-center justify-center space-x-2 rounded-xl text-sm font-semibold transition duration-200 ${term == 'Yearly' ? 'bg-gradient-to-r from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] text-primary' : 'text-secondary'}`} id='optionYearly' onClick={() => handleTerm('Yearly')}>
                        <p>Yearly</p>
                        <div className={`text-xs  ${term === 'Yearly' ? 'text-primary' : 'text-[#39c269]'}`}>
                            <strong>SAVE 20%</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative flex flex-wrap justify-center gap-8'>
                {/* <div className='flex h-[32rem] w-[20rem] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] text-primary '> */}
                <div className='flex h-[calc(32rem-2px)] w-[calc(20rem-2px)] flex-col rounded-xl border border-white bg-primary p-1 text-secondary'>
                    <div className='items flex flex-col items-center px-4 py-2'>
                        <div className='text-3xl'>Free</div>
                        <div className='text-sm '>No Credit Card required.</div>
                    </div>
                    <div className='grow px-2'>
                        {freeFeatures.map((feature, i) => (
                            <div key={i} className='flex items-center gap-3 px-2 text-sm leading-8'>
                                <i className='fi fi-rr-check'></i> <div>{feature.feature}</div>
                            </div>
                        ))}
                    </div>
                    {user ? (
                        <Link href='/dashboard'>
                            <button className={`button-secondary w-full`}>Dashboard</button>
                        </Link>
                    ) : (
                        <Link href='/dashboard'>
                            <button className={`button-secondary w-full`}>Sign Up</button>
                        </Link>
                    )}
                </div>
                {/* </div> */}
                <div className='flex h-[32rem] w-[20rem] flex-col rounded-xl bg-gradient-to-br from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] p-1 text-primary '>
                    <div className='items flex flex-col items-center px-4 py-2'>
                        <div className='text-3xl'>
                            <strong>Pro</strong>
                        </div>
                        <div className='text-sm'>{term === 'Monthly' ? '$9.95' : '$7.95'} USD per month</div>
                    </div>
                    <div className='grow px-2'>
                        {professionalFeatures.map((feature, i) => (
                            <div key={i} className='flex items-center gap-3 px-2 text-sm leading-8'>
                                <i className='fi fi-rr-check'></i> <div>{feature.feature}</div>
                            </div>
                        ))}
                    </div>
                    {user ? (
                        <button className='button-primary w-full' onClick={() => purchaseSubscription('Professional', selectedTerm)}>
                            Start Trial
                        </button>
                    ) : (
                        <Link href='/dashboard'>
                            <button className='button-primary w-full'>Sign Up</button>
                        </Link>
                    )}
                </div>
            </div>
            <div className='flex flex-col items-center justify-center px-6'>
                <p className='text-xl'>
                    Become <strong>your own</strong> financial advisor.
                </p>
            </div>
        </div>
    );
}

export default Pricing;
