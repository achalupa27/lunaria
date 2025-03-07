'use client';

import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { CheckCircle2Icon } from 'lucide-react';
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

        fetch('/api/contact/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
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
            <h1 className='mt-24 text-center font-medium'>Contact Us</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='mx-auto mt-20 flex max-w-3xl flex-col space-y-2 '>
                <label className='block text-sm font-medium pt-2'>Name</label>
                <input {...register('name')} required className={`rounded-lg border bg-white dark:bg-black px-3 py-2 ${isSent && `cursor-not-allowed border bg-transparent`}`} readOnly={isSent} disabled={isSending || isSent} />
                <label className='block text-sm font-medium pt-2'>Email</label>
                <input {...register('email')} required className={`rounded-lg border bg-white dark:bg-black px-3 py-2 ${isSent && `cursor-not-allowed border bg-transparent dark:bg-black`}`} type='email' readOnly={isSent} disabled={isSending || isSent} />
                <label className='block text-sm font-medium pt-2'>Subject</label>
                <input {...register('subject')} className={`rounded-lg border bg-white dark:bg-black px-3 py-2 ${isSent && `cursor-not-allowed border bg-transparent`}`} required readOnly={isSent} disabled={isSending || isSent} />
                <label className='block text-sm font-medium pt-2'>Message</label>
                <textarea {...register('message')} required className={`h-48 resize-none rounded-lg border bg-white dark:bg-black px-3 py-2  ${isSent && 'cursor-not-allowed border bg-transparent'}`} readOnly={isSent} disabled={isSending || isSent} />

                <Button size='lg' className={`py-3  ${isSent ? 'cursor-not-allowed' : ''} ${isSending && 'cursor-wait opacity-50'}`} disabled={isSending || isSent}>
                    {isSent ? <CheckCircle2Icon /> : isSending ? <Loader /> : 'Send'}
                </Button>
            </form>
            {isSent && <div className='pt-4 text-center text-lg font-medium'>We got your message! We'll get back to you as soon as possible.</div>}
            {/* <div className='pt-12 text-center'>You can also email us at lunaria@protonmail.com</div> */}
        </section>
    );
};

export default Contact;
