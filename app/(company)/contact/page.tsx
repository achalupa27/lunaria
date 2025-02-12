'use client';

import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { CheckIcon, SendIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const Contact = () => {
    const { register, handleSubmit } = useForm<Inputs>();
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        setIsSending(true);

        fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIsSending(false);
                setIsSent(true);
            })
            .catch((error) => {
                console.error(error);
                setIsSending(false);
            });
    };

    return (
        <section>
            <h3 className='mt-8 text-center'>Contact Us</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='mx-auto mt-20 flex w-[90%] max-w-3xl flex-col space-y-2 '>
                <input {...register('name')} required placeholder='Name' className={`rounded border bg-stone-50 px-3 py-2 ${isSent && `cursor-not-allowed border bg-transparent`}`} readOnly={isSent} disabled={isSending || isSent} />
                <input {...register('email')} required placeholder='Email' className={`rounded border bg-stone-50 px-3 py-2 ${isSent && `cursor-not-allowed border bg-transparent`}`} type='email' readOnly={isSent} disabled={isSending || isSent} />
                <input {...register('subject')} placeholder='Subject' className={`rounded border bg-stone-50 px-3 py-2 ${isSent && `cursor-not-allowed border bg-transparent`}`} required readOnly={isSent} disabled={isSending || isSent} />
                <textarea {...register('message')} required placeholder='Message' className={`h-48 resize-none rounded border bg-stone-50 px-3 py-2  ${isSent && 'cursor-not-allowed border bg-transparent'}`} readOnly={isSent} disabled={isSending || isSent} />

                <Button size='lg' className={`py-3  ${isSent ? 'cursor-not-allowed' : 'hover:bg-green-400'} ${isSending && 'cursor-wait opacity-50'}`} disabled={isSending || isSent}>
                    {isSent ? (
                        <CheckIcon />
                    ) : isSending ? (
                        <span className='ml-2 space-x-2'>
                            <Loader /> <span>Sending...</span>
                        </span>
                    ) : (
                        'Send'
                    )}
                </Button>
            </form>
            {isSent && <div className='pt-2 text-center text-lg font-medium'>Email Received!</div>}
            <div className='pt-12 text-center'>You can also email us at lightsuite@protonmail.com</div>
        </section>
    );
};

export default Contact;
