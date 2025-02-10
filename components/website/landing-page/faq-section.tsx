import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqItems = [
    { question: 'What is Lunaria?', answer: 'Lunaria is a personal finance tool that helps you track and grow your wealth.' },
    { question: 'How does it work?', answer: 'Lunaria provides insights into your income, spending, and savings to help you make better financial decisions.' },
    { question: 'Is my data secure?', answer: 'Yes, we use state-of-the-art encryption, and we do not share your financial data with anyone.' },
    { question: 'Can I use it for free?', answer: 'Lunaria offers a free plan with essential features, and premium plans for advanced tools.' },
];

const FAQSection = () => {
    return (
        <section className='py-24'>
            <div className='space-12 container mx-auto flex flex-col px-4 md:flex-row'>
                <div className='w-fit'>
                    <div>FAQ</div>
                    <h2 className='mb-12'>Frequently Asked Questions</h2>
                </div>

                <Accordion type='single' collapsible className='w-full'>
                    {faqItems.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className='text-xl font-medium'>{faq.question}</AccordionTrigger>
                            <AccordionContent className='text-lg'>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default FAQSection;
