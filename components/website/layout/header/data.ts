type ProductCategory<T = string> = {
    label: string;
    summary: string;
};

type Products<T = string> = {
    [category: string]: ProductCategory<T>[];
};

export const products: Products = {
    life: [
        {
            label: 'Goals',
            summary: 'Scientifically crafted goal structures linked throughout the entire application.',
        },
        {
            label: 'Schedule',
            summary: 'Daily and Weekly schedules, + a built in time tracker.',
        },
        {
            label: 'Habits',
            summary: 'Build better habits effortlessly with intuitive tracking.',
        },
        {
            label: 'Tasks',
            summary: 'Prioritize tasks and stay organized.',
        },
    ],
    body: [
        {
            label: 'Workouts',
            summary: 'Monitor progress for all types of workouts.',
        },
        {
            label: 'Diet',
            summary: 'Transform your health and well-being through mindful eating habits.',
        },
        {
            label: 'Sleep',
            summary: 'Non-intrusive insights into your sleeping habits.',
        },
    ],
    mind: [
        {
            label: 'Journal',
            summary: 'Daily journal for thoughts, gratitude, events, and dreams.',
        },
        {
            label: 'Meditation',
            summary: 'Find calm and clarity by building a consistent meditation practice.',
        },
        {
            label: 'Breathing',
            summary: 'Enhance focus and reduce stress through guided breathing exercises.',
        },
        {
            label: 'Affirmations',
            summary: 'Define yourself and plant seeds for the future.',
        },
        {
            label: 'Reflections',
            summary: 'A 5-step process for reflecting and improving on any event.',
        },
    ],
    tools: [
        {
            label: 'Notes',
            summary: 'Keep any self improvement related notes here.',
        },
        {
            label: 'Lists',
            summary: 'Any lists necessary.',
        },
    ],
};
