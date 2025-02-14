import Card from '@/components/ui/card';
import { motion } from 'framer-motion';

const TestimonialSection = () => {
    const testimonials = [
        {
            name: 'Jane Doe',
            feedback: 'This platform completely changed the way I manage my finances. Highly recommend!',
            role: 'Freelancer',
        },
        {
            name: 'John Smith',
            feedback: 'A game-changer in personal finance. The insights are invaluable!',
            role: 'Entrepreneur',
        },
        {
            name: 'Emily Johnson',
            feedback: "I finally feel in control of my money. It's intuitive and powerful!",
            role: 'Software Engineer',
        },
    ];

    return (
        <section className='flex flex-col items-center justify-center py-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-6'>
                What Our Users Say
            </motion.h2>
            <div className='grid items-stretch gap-8 md:grid-cols-3'>
                {testimonials.map((testimonial, index) => (
                    <motion.div key={index} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: index * 0.2 }} viewport={{ once: true }} className='flex h-full'>
                        <Card className='flex h-full flex-col py-12 w-full items-center justify-center'>
                            <div className='text-2xl font-medium'>{testimonial.name}</div>
                            <p className='flex md:min-h-32 min-h-20 items-center italic py-3'>&quot;{testimonial.feedback}&quot;</p>
                            <div className='text-sm text-zinc-600 dark:text-zinc-400'>{testimonial.role}</div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialSection;
