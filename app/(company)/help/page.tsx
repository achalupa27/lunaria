'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
    {
        question: 'Question',
        answer: 'Answer.',
    },
];

const generalQuestions = [
    {
        question: 'How do I sign up?',
        answer: 'To sign up, click the Sign Up button in the top right of the page and follow the instructions.',
    },
];

const makeQuestions = [
    {
        question: 'Question?',
        answer: 'Answer.',
    },
];

const saveQuestions = [
    {
        question: 'Question?',
        answer: 'Answer.',
    },
];

const spendQuestions = [
    {
        question: 'Question?',
        answer: 'Answer.',
    },
];

const Help = () => {
    return (
        <div>
            <section>
                <h2 className='mb-24 mt-12 text-center'>Help Center</h2>
                <h4>FAQ</h4>
                <Accordion type='single' collapsible>
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className='text-xl font-medium'>{faq.question}</AccordionTrigger>
                            <AccordionContent className='text-lg'>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <h4 className='mt-12'>General</h4>
                <Accordion type='single' collapsible>
                    {generalQuestions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className='text-xl font-medium'>{faq.question}</AccordionTrigger>
                            <AccordionContent className='text-lg'>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <h4 className='mt-12'>Make</h4>
                <Accordion type='single' collapsible>
                    {makeQuestions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className='text-xl font-medium'>{faq.question}</AccordionTrigger>
                            <AccordionContent className='text-lg'>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <h4 className='mt-12'>Save</h4>
                <Accordion type='single' collapsible>
                    {saveQuestions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className='text-xl font-medium'>{faq.question}</AccordionTrigger>
                            <AccordionContent className='text-lg'>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <h4 className='mt-12'>Spend</h4>
                <Accordion type='single' collapsible>
                    {spendQuestions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className='text-xl font-medium'>{faq.question}</AccordionTrigger>
                            <AccordionContent className='text-lg'>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    );
};

export default Help;
