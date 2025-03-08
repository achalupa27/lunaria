import type { Meta, StoryObj } from '@storybook/react';
import TermChanger from '../components/term-changer';

const meta = {
    title: 'Website/Pricing/TermChanger',
    component: TermChanger,
    parameters: {
        layout: 'centered',
    },
    args: {
        term: 'Monthly',
        setTerm: () => {},
    },
} satisfies Meta<typeof TermChanger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const YearlySelected: Story = {
    args: {
        term: 'Yearly',
    },
};
