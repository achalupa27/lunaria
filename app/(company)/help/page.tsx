'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
    {
        question: 'What makes this app different from other self-development tools?',
        answer: 'Unlike other apps that focus on only one aspect of self-improvement, our platform integrates goals for life, body, and mind into a single, easy-to-use tool, helping you stay focused and connected to your overall vision.',
    },
    {
        question: 'Can I track my progress in different areas of life?',
        answer: 'Yes! You can set and track goals for different areas such as personal development, fitness, mental health, and more. The app helps you stay aligned with all your goals in one place.',
    },
    {
        question: 'Do I have to use all of the categories for the app to work?',
        answer: 'No, you can use as many as you like. It will still help you achieve goals in the areas you use.',
    },
    {
        question: 'How does the daily and weekly progress report work?',
        answer: 'Our app sends you daily and weekly reports that summarize your progress, highlight your achievements, and suggest areas for improvement. These insights help you stay on track and adjust your strategy if needed.',
    },
    {
        question: 'Is the app customizable to my specific goals?',
        answer: 'Yes, the app is designed to be flexible. You can create goals based on your personal aspirations, track different metrics, and adjust settings to suit your needs.',
    },
    {
        question: 'Is there a free version of the app?',
        answer: 'Yes, we offer a free version with essential features. For access to premium tools and advanced insights, there are paid plans available.',
    },
];

const generalQuestions = [
    {
        question: 'How do I sign up?',
        answer: 'To sign up, click the Sign Up button in the top right of the page and follow the instructions.',
    },
    {
        question: 'Is this platform free to use?',
        answer: 'We offer a free plan with essential features. Premium plans with additional benefits are available.',
    },
    {
        question: 'How do I reset my password?',
        answer: 'Click on “Forgot Password” on the login page and follow the instructions to reset your password.',
    },
    {
        question: 'How do I delete my account?',
        answer: 'To delete your account, please contact us through the Contact page with your request.',
    },
    {
        question: 'Can I track my progress over time?',
        answer: 'Yes! Our dashboard allows you to track your progress and view analytics on your self-improvement journey.',
    },
    {
        question: 'What features does this platform offer?',
        answer: 'Our platform includes goal tracking, habit building, fitness plans, meditation guides, and mental health resources.',
    },
    {
        question: 'Can I connect with a coach or mentor?',
        answer: 'There is currently no coach or mentoring available. The app is designed for personal, isolated use.',
    },
    {
        question: 'Can I customize my self-improvement plan?',
        answer: 'Absolutely! You can personalize your goals, habits, and routines to match your lifestyle and needs.',
    },
    {
        question: 'Do you offer integrations with other apps?',
        answer: 'No, we currently do not support integrations with fitness trackers, calendars, and productivity tools.',
    },
    {
        question: 'How do I contact support?',
        answer: 'You can reach out to our support team via the Contact page or email us at support@yourwebsite.com.',
    },
];

const makeQuestions = [
    {
        question: 'How do I create a schedule?',
        answer: 'To create a schedule, go to the Schedule section and add your tasks and goals for the day, week, or month.',
    },
    {
        question: 'Can I set recurring tasks or habits?',
        answer: 'Yes! You can set recurring tasks or habits that repeat daily, weekly, or monthly to help keep you on track.',
    },
    {
        question: 'How do I track my goals?',
        answer: 'Go to the Goals section and set your objectives. You can track your progress, set deadlines, and adjust them as needed.',
    },
    {
        question: 'What’s the best way to stay motivated with my tasks?',
        answer: 'Break your tasks into smaller steps, celebrate small wins, and use reminders to stay motivated and focused.',
    },
    {
        question: 'How do I prioritize my tasks?',
        answer: 'Use the priority feature to categorize tasks by importance, and focus on high-priority tasks first for better time management.',
    },
    {
        question: 'Can I get reminders for my habits or tasks?',
        answer: 'Yes, you can set custom reminders for your habits or tasks to receive notifications at the times you specify.',
    },
    {
        question: 'How do I know if I’m making progress with my goals?',
        answer: 'You can track your progress through our dashboard, where you can visualize your milestones and completed tasks.',
    },
    {
        question: 'How can I stay consistent with my habits?',
        answer: 'Consistency is key! Set realistic goals, start small, and use habit tracking to maintain momentum and build a routine.',
    },
    {
        question: 'Can I organize my tasks by categories or projects?',
        answer: 'Yes, you can group tasks under different categories or projects to stay organized and focused on specific areas of your life.',
    },
    {
        question: 'How do I review my performance and improve?',
        answer: 'Use the Review section to assess your past activities, identify areas of improvement, and adjust your goals accordingly.',
    },
];

const saveQuestions = [
    {
        question: 'How do I create a personalized fitness plan?',
        answer: 'You can create a personalized fitness plan by selecting your goals, preferences, and fitness level in the Fitness section.',
    },
    {
        question: 'Can I track my diet and nutrition?',
        answer: 'Yes! You can log your meals, track calories, and monitor nutrients to ensure you’re meeting your dietary goals.',
    },
    {
        question: 'How do I track my sleep?',
        answer: 'In the Sleep section, you can log your sleep patterns, set sleep goals, and monitor your sleep quality over time.',
    },
    {
        question: 'What kind of workout routines are available?',
        answer: 'We offer a variety of workout routines including strength training, cardio, flexibility, and recovery exercises tailored to different fitness levels.',
    },
    {
        question: 'Can I sync my fitness tracker with the platform?',
        answer: 'Yes, you can sync fitness trackers to automatically log your activity, steps, and workouts directly into your profile.',
    },
    {
        question: 'How can I improve my sleep quality?',
        answer: 'Create a consistent bedtime routine, minimize screen time before bed, and track your sleep to identify patterns that affect your quality.',
    },
    {
        question: 'Can I set a diet plan for specific goals (e.g., weight loss, muscle gain)?',
        answer: 'Yes, you can create diet plans based on your specific fitness goals, such as weight loss, muscle gain, or maintenance.',
    },
    {
        question: 'How do I stay motivated to exercise regularly?',
        answer: 'Set achievable fitness goals, track your progress, and celebrate small victories to stay motivated on your fitness journey.',
    },
    {
        question: 'What should I eat before and after a workout?',
        answer: 'Before a workout, eat a balanced meal with carbs and protein for energy. After a workout, focus on protein to aid in muscle recovery.',
    },
    {
        question: 'How do I know if I’m getting enough rest?',
        answer: 'Track your sleep cycles, and aim for 7-9 hours of sleep per night. You can also monitor how rested you feel during the day.',
    },
];

const spendQuestions = [
    {
        question: 'How do I start a daily journal?',
        answer: 'To start a journal, go to the Journal section and write about your thoughts, feelings, or experiences each day. You can use prompts or write freely.',
    },
    {
        question: 'How do I practice meditation?',
        answer: 'You can practice meditation by following guided sessions in the Meditation section. Choose a session based on your experience level and goals.',
    },
    {
        question: 'What are some breathing exercises I can try?',
        answer: 'We offer a variety of breathing exercises such as deep breathing, box breathing, and diaphragmatic breathing to help you relax and focus.',
    },
    {
        question: 'How do affirmations work?',
        answer: 'Affirmations are positive statements you repeat to yourself to challenge negative thoughts and promote a positive mindset. You can create your own or use preset affirmations.',
    },
    {
        question: 'Can I track my meditation practice?',
        answer: 'Yes, you can track the duration and frequency of your meditation sessions to help you stay consistent and see your progress.',
    },
    {
        question: 'How do I reflect on my day?',
        answer: 'At the end of each day, take a moment to reflect on what went well, what you could improve, and what you learned. This can be done in the Journal section.',
    },
    {
        question: 'What are the benefits of journaling?',
        answer: 'Journaling helps improve self-awareness, reduces stress, enhances creativity, and provides an outlet for expressing thoughts and emotions.',
    },
    {
        question: 'Can I set a reminder for daily affirmations?',
        answer: 'Yes, you can set a daily reminder to practice affirmations at a time that suits you, helping you to stay consistent with your practice.',
    },
    {
        question: 'How do I use reflections for personal growth?',
        answer: 'Use reflections to identify patterns in your thoughts and behaviors. Reflecting on challenges and successes helps you gain insights and make better decisions moving forward.',
    },
    {
        question: 'Can I customize my meditation sessions?',
        answer: 'Yes, you can customize the length, type, and focus of your meditation sessions to fit your preferences and needs.',
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
