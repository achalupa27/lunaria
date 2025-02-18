'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('help', {
    title: 'Help Center',
    description: "Find answers to common questions about using Lunaria's financial management tools.",
});

const faqs = [
    {
        question: 'What is Lunaria?',
        answer: 'Lunaria is a personal finance tool that helps you track and grow your wealth through income tracking, savings management, and spending analysis.',
    },
    {
        question: 'Is my financial data secure?',
        answer: 'Yes, your financial data is encrypted and stored securely. We use state-of-the-art encryption and never share your data without your consent.',
    },
    {
        question: 'What features are included in the free plan?',
        answer: 'The free plan includes basic features like 10 transactions per day, 3 spending categories, 1 spending budget, 1 savings account, 1 debt account, and 1 income source tracking.',
    },
    {
        question: 'What are transactions?',
        answer: 'Transactions are the individual entries in your account. They can be expenses, income, or transfers between accounts.',
    },
];

const generalQuestions = [
    {
        question: 'How do I sign up?',
        answer: 'To sign up, click the Sign Up button in the top right of the page and follow the instructions.',
    },
    {
        question: 'What subscription plans do you offer?',
        answer: 'We offer three plans: Basic (free), Professional, and Premium. Each plan includes different features and transaction limits to suit your needs.',
    },
    {
        question: 'Can I upgrade or downgrade my plan?',
        answer: 'Yes, you can change your subscription plan at any time. Your features will be adjusted accordingly based on the new plan.',
    },
    {
        question: 'What are the daily transaction limits?',
        answer: 'Transaction limits vary by plan: Free users get 10 transactions per day, Professional users get 100 transactions per day, and Premium users get 1000 transactions per day.',
    },
    {
        question: 'What is AI Analysis and who can access it?',
        answer: "AI Analysis is a Premium feature that provides personalized financial insights, spending pattern analysis, and recommendations for optimizing your finances. It's only available in the Premium plan.",
    },
    {
        question: 'What are "Detailed" accounts?',
        answer: 'Detailed accounts (available in Professional and Premium plans) provide advanced tracking features, custom fields, and deeper analytics for your income sources, debt accounts, and savings accounts.',
    },
];

const makeQuestions = [
    {
        question: 'How do I track my income?',
        answer: 'You can track both active income (salary, freelancing) and passive income (dividends, investments) by adding new income entries in the Make section. Each entry can be categorized and analyzed over time.',
    },
    {
        question: 'Can I track multiple income sources?',
        answer: 'Yes, you can track multiple income sources. Free users can track 1 source, Professional users can track 3 sources, and Premium users can track up to 50 income sources.',
    },
    {
        question: 'Does Lunaria provide income analysis?',
        answer: 'Yes, Premium users get AI-powered income analysis that provides insights into income patterns, growth opportunities, and financial recommendations.',
    },
    {
        question: 'What are Detailed Income Sources?',
        answer: 'Detailed Income Sources, available in Professional and Premium plans, allow you to track additional information about each income source, such as payment schedules, tax information, and historical trends.',
    },
    {
        question: 'How do I set up recurring income tracking?',
        answer: 'Professional and Premium users can set up recurring income tracking in their income sources to automatically track regular payments like salary or rental income.',
    },
];

const saveQuestions = [
    {
        question: 'How do I manage my savings accounts?',
        answer: 'You can add and manage both savings and debt accounts in the Save section. Track balances, deposits, withdrawals, and get an overview of your net savings.',
    },
    {
        question: 'Can I track multiple savings and debt accounts?',
        answer: 'Yes, the number of accounts you can track depends on your plan. Free users get 1 account each, Professional users get 3 accounts each, and Premium users can track up to 50 savings and debt accounts.',
    },
    {
        question: 'How does debt tracking work?',
        answer: 'You can add debt accounts, track balances, and monitor your total debt. The system helps you understand your net savings position (savings minus debt) and provides insights for debt management.',
    },
    {
        question: "What's the difference between basic and detailed savings accounts?",
        answer: 'Basic savings accounts (Free plan) track balance and transactions. Detailed accounts (Professional and Premium plans) add features like interest rate tracking, goal setting, and projected growth analysis.',
    },
    {
        question: 'How many spending budgets can I create?',
        answer: 'Free users can create 1 spending budget, Professional users can create 10 budgets, and Premium users can create up to 100 spending budgets to track different financial goals.',
    },
];

const spendQuestions = [
    {
        question: 'How do I track my expenses?',
        answer: 'You can track expenses by adding transactions in the Spend section. Each expense can be categorized and analyzed to help you understand your spending patterns.',
    },
    {
        question: 'How many spending categories can I create?',
        answer: 'The number of spending categories depends on your plan: Free users get 3 categories, Professional users get 10 categories, and Premium users can create up to 100 spending categories.',
    },
    {
        question: 'Does Lunaria provide spending analysis?',
        answer: 'Yes, the platform analyzes your spending patterns and provides insights. Premium users get detailed AI-powered analysis to help optimize their spending habits.',
    },
    {
        question: 'What are Spending Details?',
        answer: 'Spending Details, available in Professional and Premium plans, provide enhanced expense tracking with features like receipt uploads, custom tags, and detailed spending analytics.',
    },
    {
        question: 'Can I export my spending data?',
        answer: 'Yes, Professional and Premium users can export their spending data for external analysis or record-keeping. Free users can view their data within the platform.',
    },
];

const Help = () => {
    return (
        <div>
            <section>
                <h1 className='mb-24 mt-24 text-center font-medium'>Help Center</h1>
                <h3 className='mb-3'>FAQ</h3>
                <Accordion type='single' collapsible>
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className='text-xl font-medium'>{faq.question}</AccordionTrigger>
                            <AccordionContent className='text-lg'>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <h3 className='mt-12 mb-3'>General</h3>
                <Accordion type='single' collapsible>
                    {generalQuestions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className='text-xl font-medium'>{faq.question}</AccordionTrigger>
                            <AccordionContent className='text-lg'>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <h3 className='mt-12 mb-3'>Make</h3>
                <Accordion type='single' collapsible>
                    {makeQuestions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className='text-xl font-medium'>{faq.question}</AccordionTrigger>
                            <AccordionContent className='text-lg'>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <h3 className='mt-12 mb-3'>Save</h3>
                <Accordion type='single' collapsible>
                    {saveQuestions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className='text-xl font-medium'>{faq.question}</AccordionTrigger>
                            <AccordionContent className='text-lg'>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <h3 className='mt-12 mb-3'>Spend</h3>
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
