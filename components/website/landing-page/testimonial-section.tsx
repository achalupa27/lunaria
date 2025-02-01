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
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-6 text-4xl font-semibold'>
                What Our Users Say
            </motion.h2>
            <div className='mt-12 flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0'>
                {testimonials.map((testimonial, index) => (
                    <motion.div key={index} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: index * 0.3 }} viewport={{ once: true }}>
                        <Card className='py-12'>
                            <div className='mb-2 text-2xl font-medium'>{testimonial.name}</div>
                            <p className='italic text-zinc-500'>"{testimonial.feedback}"</p>
                            <div className='mt-2 text-sm text-zinc-400'>{testimonial.role}</div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialSection;
